package com.lol.lolback.matches;

import com.lol.lolback.util.ValidationException;
import no.stelar7.api.r4j.basic.constants.api.regions.LeagueShard;
import no.stelar7.api.r4j.basic.constants.types.lol.EventType;
import no.stelar7.api.r4j.basic.exceptions.APIEnumNotUpToDateException;
import no.stelar7.api.r4j.basic.utils.LazyList;
import no.stelar7.api.r4j.impl.R4J;
import no.stelar7.api.r4j.impl.lol.builders.matchv5.match.MatchBuilder;
import no.stelar7.api.r4j.impl.lol.builders.matchv5.match.MatchListBuilder;
import no.stelar7.api.r4j.impl.lol.builders.matchv5.match.TimelineBuilder;
import no.stelar7.api.r4j.pojo.lol.match.v5.*;
import no.stelar7.api.r4j.pojo.lol.summoner.Summoner;

import java.util.ArrayList;
import java.util.List;


/**
 * Match History
 *
 * In this class, match data can be fetched via inputting a Summoner object
 * Additionally, two methods for testing the fetched data by printing in the console are also included
 */
public class MatchHistory {

    public R4J r4j;

    public MatchHistory(R4J r4j) {
        this.r4j = r4j;
    }

    /**
     * @params Summoner representing an existing player or lol
     * @return a list of LOL-Matches
     */
    public ArrayList<LOLMatch> getMatchHistory(Summoner sum) {
        ArrayList<LOLMatch> matches = new ArrayList<LOLMatch>();

        try {
            LazyList<String> all = sum.getLeagueGames().getLazy();
            MatchBuilder mb = new MatchBuilder(sum.getPlatform());

            for (String matchid : all) {
                try {
                    mb = mb.withId(matchid);

                    LOLMatch match = mb.getMatch();

                    matches.add(match);
                } catch (APIEnumNotUpToDateException e) {
                    System.out.println("Oh not, an Error occured!");
                    continue;
                }

            }
        } catch (NullPointerException e) {
            System.out.println("Match History could not be Fetched");
        }

        return matches;
    }

    /**
     * @params Summoner representing an existing player or lol
     * @return a list of LOL-Timelines
     * Note: a match-list is likely more useful than a timeline-list
     */
    public ArrayList<LOLTimeline> getMatchTimelines(Summoner sum) {
        ArrayList<LOLTimeline> timelines = new ArrayList<LOLTimeline>();

        LazyList<String> all = sum.getLeagueGames().getLazy();
        TimelineBuilder tb = new TimelineBuilder(sum.getPlatform());

        for (String matchid : all) {
            tb = tb.withId(matchid);

            LOLTimeline timeline = tb.getTimeline();

            timelines.add(timeline);
        }

        return timelines;
    }

    /**
     * Only for testing, is not used in backend
     * @params LOLMatch-List of a player
     * @return nothing!
     * PRINTS a players whole match history in the CONSOLE output
     */
    public void printMatchHistoryWithParticipants(ArrayList<LOLMatch> matches) {

        int index = 0;

        for(LOLMatch match: matches) {
            System.out.println("Index: " + index);
            System.out.println("Match-ID: " + match.getGameId());
            System.out.println("Game Type: " + match.getGameMode().prettyName());
            System.out.println("Date: " +  match.getGameStartAsDate().getDayOfMonth() + "." + match.getGameStartAsDate().getMonthValue() + "." + match.getGameStartAsDate().getYear() + " (" + match.getGameStartAsDate().getDayOfWeek() + ")");
            String winner = "";
            if (match.getTeams().get(0).didWin()) {
                winner = match.getTeams().get(0).getTeamId().prettyName();
            } else {winner = match.getTeams().get(1).getTeamId().prettyName();}
            System.out.println("Winner: " + winner);
            System.out.println("Participants: ");
            List<MatchParticipant> participants = match.getParticipants();

            for(MatchParticipant participant : participants) {
                if(participant.getParticipantId() <= 5 ) {
                    System.out.println("Blue " + participant.getParticipantId() + ": " + participant.getChampionName() + " (" + participant.getKills() + "/" + participant.getDeaths() + "/" + participant.getAssists() + ", Level " + participant.getChampionLevel() + ", " + participant.getGameDeterminedPosition() + ") " + "was played by " + participant.getSummonerName());
                } else {
                    System.out.println("Red " + participant.getParticipantId() + ": " + participant.getChampionName() + " (" + participant.getKills() + "/" + participant.getDeaths() + "/" + participant.getAssists() + ", Level " + participant.getChampionLevel() + ", " + participant.getGameDeterminedPosition() + ") " + "was played by " + participant.getSummonerName());
                }
            }
            index++;
            System.out.println();
            System.out.println();
        }
    }

    /**
     * Obsolete method for testing, is not used in backend
     * @params LOLTimeline-List of a player
     * @return nothing!
     * PRINTS some data of one game of a player
     */
    public void printTimelineData(ArrayList<LOLTimeline> timelines) {
        LOLTimeline timeline = timelines.get(1);
        System.out.println("GameID: " +  timeline.getGameId());
        List<TimelineParticipantIdentity> participants = timeline.getParticipants();
        ArrayList<Summoner> summoners = new ArrayList<Summoner>();
        for (TimelineParticipantIdentity participant: participants) {
            Summoner s = Summoner.byPUUID(LeagueShard.EUW1, participant.getPuuid());
            summoners.add(s);
            System.out.println("Participant " + participant.getParticipantId() + ": " + s.getName());
        }
        System.out.println("Participants: " + timeline.getParticipants());
        List<TimelineFrame> frames = timeline.getFrames();
        for(TimelineFrame frame: frames) {
            List<TimelineFrameEvent> events = frame.getEvents();
            for(TimelineFrameEvent event: events) {
                if (event.getType() == EventType.CHAMPION_KILL) {
                    System.out.println("Position: " + event.getPosition());
                    if(event.getKillerId() == 0) {
                        System.out.println("No Killer");
                    } else {
                        System.out.println("Killer: " + summoners.get(event.getKillerId()-1).getName() + " (" + event.getKillerId() + ")");
                    }
                    System.out.println("Victim: " + summoners.get(event.getVictimId()-1).getName() + " (" + event.getVictimId() + ")");
                    System.out.println();
                }
            }
        }

    }

}
