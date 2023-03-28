package com.lol.lolback.matches;

import com.lol.lolback.dto.ChampionPositionDto;
import com.lol.lolback.dto.MatchDataDto;
import no.stelar7.api.r4j.basic.constants.api.regions.LeagueShard;
import no.stelar7.api.r4j.basic.constants.types.lol.EventType;
import no.stelar7.api.r4j.basic.exceptions.APIEnumNotUpToDateException;
import no.stelar7.api.r4j.impl.R4J;
import no.stelar7.api.r4j.pojo.lol.match.v5.*;
import no.stelar7.api.r4j.pojo.lol.summoner.Summoner;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Match Data
 *
 * In this class, a players match-history is given as input, as well as other params such as e.g. the name of a champion, similarly to Multi Match Data
 *
 * The class returns Match Data Dtos (see dto package) matching the input params
 *
 */
public class MatchData {

    public R4J r4j;

    public MatchData(R4J r4j) {
        this.r4j = r4j;
    }

    /**
     * @params  list of LOL-Matches of player
     *          String with the desired Player (the player whose matches are analyzed)
     *          Champion name (champion of which data should be analyzed)
     * @return one Match Data Dto (the first matching match that is found)
     */
    public MatchDataDto generateMatchDataDto(ArrayList<LOLMatch> matches, String playerName, String champion){
        System.out.println("Looking for a Match with Champion " + champion + " of Player " + playerName);
        //container for return data
        MatchDataDto matchData = new MatchDataDto();
        String currentChampion = "";
        //lookup specified player in each match
        for (LOLMatch match : matches) {

                System.out.println("Next match up for lookup");
                List<MatchParticipant> participants = match.getParticipants();
                for (MatchParticipant participant : participants) {
                    if (participant.getSummonerName().equals(playerName)) {
                        currentChampion = participant.getChampionName();
                        System.out.println(currentChampion);
                        System.out.println("Checking Champion");
                        break;
                    }
                }
                //first match found where champion was played by player
            //check match type!
                if (currentChampion.equals(champion) && match.getGameMode().prettyName().equals("Classic")) {
                    System.out.println("Found Match");
                    //set base match data
                    matchData.setId(match.getGameId());
                    matchData.setDate(match.getGameStartAsDate());
                    //set winner data
                    if (match.getTeams().get(0).didWin()) {
                        matchData.setWinner("Blue");
                        matchData.getTeamBlue().setWinner(true);
                        matchData.getTeamRed().setWinner(false);
                    } else {
                        matchData.setWinner("Red");
                        matchData.getTeamBlue().setWinner(false);
                        matchData.getTeamRed().setWinner(true);
                    }
                    //set base participant data for all 10 participants in both teams
                    for (MatchParticipant participant : participants) {
                        //team blue are participants 1-5
                        if (participant.getParticipantId() <= 5) {
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setName(participant.getChampionName());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setPlayer(participant.getSummonerName());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setKillCount(participant.getKills());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setDeathCount(participant.getDeaths());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setAssistCount(participant.getAssists());
                            //team red are participants 6-10
                        } else {
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setName(participant.getChampionName());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setPlayer(participant.getSummonerName());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setKillCount(participant.getKills());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setDeathCount(participant.getDeaths());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setAssistCount(participant.getAssists());
                        }
                    }
                    //now it is time for the location data of the match

                    List<TimelineFrame> frames = match.getTimeline().getFrames();
                    for (TimelineFrame frame : frames) {
                        //special events, like kills
                        List<TimelineFrameEvent> events = frame.getEvents();
                        for (TimelineFrameEvent event : events) {
                            if (event.getType() == EventType.CHAMPION_KILL) {
                                //victim death location data
                                if (event.getVictimId() <= 5) {
                                    matchData.teamBlue.champions.get(event.getVictimId() - 1).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                } else {
                                    matchData.teamRed.champions.get(event.getVictimId() - 6).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                }
                                //general location data
                            }
                        }
                        //participantframes for regular location data
                        Map<String, TimelineParticipantFrame> participantFrameMap = frame.getParticipantFrames();
                        for (TimelineParticipantFrame timelineParticipantFrame: participantFrameMap.values()) {
                            if(timelineParticipantFrame.getParticipantId() <= 5) {
                                matchData.teamBlue.champions.get(timelineParticipantFrame.getParticipantId()-1).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                            } else {
                                matchData.teamRed.champions.get(timelineParticipantFrame.getParticipantId()-6).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                            }

                        }
                    }
                    return matchData;
                } else {
                    System.out.println("No match");
                }
            }
        return matchData;
    }

    /**
     * @params  list of LOL-Matches of player
     *          String with the desired Player (the player whose matches are analyzed)
     *          Champion name (champion of which data should be analyzed)
     * @return list of Match Data Dtos matching the params
     */
    public ArrayList<MatchDataDto> generateMatchDataDtoList(ArrayList<LOLMatch> matches, String playerName, String champion){
        System.out.println("Looking for a Matches with Champion " + champion + " of Player " + playerName);
        //container for return data
        ArrayList<MatchDataDto> matchDataList = new ArrayList<>();
        MatchDataDto matchData = new MatchDataDto();
        boolean found = false;

        int currentParticipantID = 0;
        String currentChampion = "";
        //lookup specified player in each match
        for (LOLMatch match : matches) {

            //System.out.println("Next match up for lookup");
            List<MatchParticipant> participants = match.getParticipants();
            for (MatchParticipant participant : participants) {
                if (participant.getSummonerName().equals(playerName)) {
                    currentParticipantID = participant.getParticipantId();
                    currentChampion = participant.getChampionName();
                    //System.out.println(currentChampion);
                    //System.out.println("Checking Champion");
                    break;
                }
            }

            if (currentChampion.equals(champion) && match.getGameMode().prettyName().equals("Classic")) {
                //if goes on, a classic match was found where champion was played by player, this match will be analyzed further

                matchData = new MatchDataDto();
                //System.out.println("Found Match");
                //set base match data
                matchData.setId(match.getGameId());
                matchData.setDate(match.getGameStartAsDate());
                //set winner data
                if (match.getTeams().get(0).didWin()) {
                    matchData.setWinner("Blue");
                    matchData.getTeamBlue().setWinner(true);
                    matchData.getTeamRed().setWinner(false);
                } else {
                    matchData.setWinner("Red");
                    matchData.getTeamBlue().setWinner(false);
                    matchData.getTeamRed().setWinner(true);
                }
                //set base participant data for all 10 participants in both teams
                for (MatchParticipant participant : participants) {
                    //team blue are participants 1-5
                    if (participant.getParticipantId() <= 5) {
                        matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setName(participant.getChampionName());
                        matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setPlayer(participant.getSummonerName());
                        matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setKillCount(participant.getKills());
                        matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setDeathCount(participant.getDeaths());
                        matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setAssistCount(participant.getAssists());
                        //team red are participants 6-10
                    } else {
                        matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setName(participant.getChampionName());
                        matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setPlayer(participant.getSummonerName());
                        matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setKillCount(participant.getKills());
                        matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setDeathCount(participant.getDeaths());
                        matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setAssistCount(participant.getAssists());
                    }
                }
                //now it is time for the location data of the match

                List<TimelineFrame> frames = match.getTimeline().getFrames();
                for (TimelineFrame frame : frames) {
                    //special events, like kills
                    List<TimelineFrameEvent> events = frame.getEvents();
                    for (TimelineFrameEvent event : events) {
                        if (event.getType() == EventType.CHAMPION_KILL) {
                            //victim death location data
                            if (event.getVictimId() <= 5) {
                                matchData.teamBlue.champions.get(event.getVictimId() - 1).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                            } else {
                                matchData.teamRed.champions.get(event.getVictimId() - 6).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                            }
                            //general location data
                        }
                    }
                    //participantframes for regular location data
                    Map<String, TimelineParticipantFrame> participantFrameMap = frame.getParticipantFrames();
                    for (TimelineParticipantFrame timelineParticipantFrame: participantFrameMap.values()) {
                        if(timelineParticipantFrame.getParticipantId() <= 5) {
                            matchData.teamBlue.champions.get(timelineParticipantFrame.getParticipantId()-1).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                        } else {
                            matchData.teamRed.champions.get(timelineParticipantFrame.getParticipantId()-6).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                        }

                    }
                }
                matchDataList.add(matchData);
            } else {
                //System.out.println("No match");
            }
        }
        System.out.println("Sending Dto of " + playerName + " matches with " + champion);
        return matchDataList;
    }

    /**
     * Overloaded method (additional params for more filtering options)
     * @params  list of LOL-Matches
     *          String with the desired Player: the player whose matches are analyzed
     *          String with Champion name: champion of which data should be analyzed
     *          String with team (red or blue): only matches in which player is in specified team are included
     *          String with desired result (win or lose): only matches that the player won/lost are included
     * @return a list of all Timeline-Frame-Events in which the champion given in the params dies, only matches with specified team with win/lose
     */
    public ArrayList<MatchDataDto> generateMatchDataDtoList(ArrayList<LOLMatch> matches, String playerName, String champion, String team){
        System.out.println("Looking for a Matches with Champion " + champion + " of Player " + playerName + " where player was in team " + team );
        //container for return data
        ArrayList<MatchDataDto> matchDataList = new ArrayList<>();
        MatchDataDto matchData = new MatchDataDto();
        boolean found = false;

        int currentParticipantID = 0;
        String currentChampion = "";
        String currentTeam = "";

        //lookup specified player in each match
        for (LOLMatch match : matches) {

            //System.out.println("Next match up for lookup");
            List<MatchParticipant> participants = match.getParticipants();
            for (MatchParticipant participant : participants) {
                if (participant.getSummonerName().equals(playerName)) {
                    currentParticipantID = participant.getParticipantId();
                    currentChampion = participant.getChampionName();
                    //System.out.println(currentChampion);
                    //System.out.println("Checking Champion");
                    break;
                }
            }


            if (currentChampion.equals(champion) && match.getGameMode().prettyName().equals("Classic")) {
                //if continues a classic match was found where champion was played by player, this match will be analyzed further
                //additional filters can be checked at this point

                //set current team of this player
                if (currentParticipantID <= 5) {
                    currentTeam = "blue";} else {currentTeam = "red";
                }

                //now only continue if match matches query
                if (currentTeam.equals(team)) {
                    //if continues, matches query

                    matchData = new MatchDataDto();
                    //System.out.println("Found Match with" + champion);
                    //set base match data
                    matchData.setId(match.getGameId());
                    matchData.setDate(match.getGameStartAsDate());
                    //set winner data
                    if (match.getTeams().get(0).didWin()) {
                        matchData.setWinner("Blue");
                        matchData.getTeamBlue().setWinner(true);
                        matchData.getTeamRed().setWinner(false);
                    } else {
                        matchData.setWinner("Red");
                        matchData.getTeamBlue().setWinner(false);
                        matchData.getTeamRed().setWinner(true);
                    }
                    //set base participant data for all 10 participants in both teams
                    for (MatchParticipant participant : participants) {
                        //team blue are participants 1-5
                        if (participant.getParticipantId() <= 5) {
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setName(participant.getChampionName());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setPlayer(participant.getSummonerName());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setKillCount(participant.getKills());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setDeathCount(participant.getDeaths());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setAssistCount(participant.getAssists());
                            //team red are participants 6-10
                        } else {
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setName(participant.getChampionName());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setPlayer(participant.getSummonerName());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setKillCount(participant.getKills());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setDeathCount(participant.getDeaths());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setAssistCount(participant.getAssists());
                        }
                    }

                    //now it is time for the location data of the match
                    List<TimelineFrame> frames = match.getTimeline().getFrames();
                    for (TimelineFrame frame : frames) {
                        //special events, like kills
                        List<TimelineFrameEvent> events = frame.getEvents();
                        for (TimelineFrameEvent event : events) {
                            if (event.getType() == EventType.CHAMPION_KILL) {
                                //victim death location data
                                if (event.getVictimId() <= 5) {
                                    matchData.teamBlue.champions.get(event.getVictimId() - 1).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                } else {
                                    matchData.teamRed.champions.get(event.getVictimId() - 6).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                }
                                //general location data
                            }
                        }
                        //participantframes for regular location data
                        Map<String, TimelineParticipantFrame> participantFrameMap = frame.getParticipantFrames();
                        for (TimelineParticipantFrame timelineParticipantFrame: participantFrameMap.values()) {
                            if(timelineParticipantFrame.getParticipantId() <= 5) {
                                matchData.teamBlue.champions.get(timelineParticipantFrame.getParticipantId()-1).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                            } else {
                                matchData.teamRed.champions.get(timelineParticipantFrame.getParticipantId()-6).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                            }

                        }
                    }
                    matchDataList.add(matchData);



                } else {
                    //System.out.println("No match");
                }
            } else {
                //System.out.println("No match");
            }
        }

        System.out.println("Sending Dto of " + playerName + " matches with " + champion + " in team " + team);
        return matchDataList;
    }


    /**
     * Overloaded method (additional params for more filtering options)
     * @params  list of LOL-Matches
     *          String with the desired Player: the player whose matches are analyzed
     *          String with position: role of which data should be analyzed
     *          String with team (red or blue): only matches in which player is in specified team are included
     *          String with desired result (win or lose): only matches that the player won/lost are included
     * @return a list of all Timeline-Frame-Events in which the champion given in the params dies, only matches with specified team with win/lose
     */
    public ArrayList<MatchDataDto> generateMatchDataDtoList(ArrayList<LOLMatch> matches, String playerName, String pool, String position, String team, String result){
        System.out.println("Looking for a Matches with position " + position + " of Player " + playerName + " where player was in team " + team + " with a " + result);
        //container for return data
        ArrayList<String> champions = new ArrayList<>();
        switch(position) {
            case "top":
                champions.add("Illaoi");
                champions.add("Kayle");
                champions.add("Singed");
                break;
            case "mid":
                champions.add("Ahri");
                champions.add("Neeko");
                champions.add("Vex");
                break;
            case "sup":
                champions.add("Nami");
                champions.add("Morgana");
                champions.add("Sona");
                break;
            case "adc":
                champions.add("Sivir");
                champions.add("Caitlyn");
                champions.add("Miss Fortune");
                break;
            default:
                champions.add("Evelynn");
                champions.add("Diana");
                champions.add("Xin Zhao");
        }

        ArrayList<MatchDataDto> matchDataList = new ArrayList<>();
        MatchDataDto matchData = new MatchDataDto();
        boolean found = false;

        int currentParticipantID = 0;
        String currentChampion = "";
        String currentTeam = "";
        String currentResult = "";

        //lookup specified player in each match
        for (LOLMatch match : matches) {

            //System.out.println("Next match up for lookup");
            List<MatchParticipant> participants = match.getParticipants();
            for (MatchParticipant participant : participants) {
                if (participant.getSummonerName().equals(playerName)) {
                    currentParticipantID = participant.getParticipantId();
                    currentChampion = participant.getChampionName();
                    //System.out.println(currentChampion);
                    //System.out.println("Checking Champion");
                    break;
                }
            }


            if ((currentChampion.equals(champions.get(0)) || currentChampion.equals(champions.get(1)) || currentChampion.equals(champions.get(2)))
                    && match.getGameMode().prettyName().equals("Classic")) {
                //if continues a classic match was found where champion was played by player, this match will be analyzed further
                //additional filters can be checked at this point

                //set current team of this player
                if (currentParticipantID <= 5) {
                    currentTeam = "blue";} else {currentTeam = "red";
                }

                //set if player won or lost match
                if (match.getTeams().get(0).didWin()) { //team blue won
                    if (currentTeam.equals("blue")) {  //was player in winning team blue?
                        currentResult = "win";  //player was in team blue that won, so player won
                    } else {
                        currentResult = "lose"; //player was not in winning team, so player lost
                    }
                } else { //team red won
                    if (currentTeam.equals("red")) {  //was player in winning team red?
                        currentResult = "win"; //player was in team red that won, so player won
                    } else {
                        currentResult = "lose"; //player was not in winning team, so player lost
                    }
                }

                //now only continue if match and win/lose status matches query
                if (currentTeam.equals(team) && currentResult.equals(result)) {
                    //if continues, matches query

                    matchData = new MatchDataDto();
                    //System.out.println("Found Match with" + champion);
                    //set base match data
                    matchData.setId(match.getGameId());
                    matchData.setDate(match.getGameStartAsDate());
                    //set winner data
                    if (match.getTeams().get(0).didWin()) {
                        matchData.setWinner("Blue");
                        matchData.getTeamBlue().setWinner(true);
                        matchData.getTeamRed().setWinner(false);
                    } else {
                        matchData.setWinner("Red");
                        matchData.getTeamBlue().setWinner(false);
                        matchData.getTeamRed().setWinner(true);
                    }
                    //set base participant data for all 10 participants in both teams
                    for (MatchParticipant participant : participants) {
                        //team blue are participants 1-5
                        if (participant.getParticipantId() <= 5) {
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setName(participant.getChampionName());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setPlayer(participant.getSummonerName());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setKillCount(participant.getKills());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setDeathCount(participant.getDeaths());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setAssistCount(participant.getAssists());
                            //team red are participants 6-10
                        } else {
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setName(participant.getChampionName());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setPlayer(participant.getSummonerName());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setKillCount(participant.getKills());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setDeathCount(participant.getDeaths());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setAssistCount(participant.getAssists());
                        }
                    }

                    //now it is time for the location data of the match
                    List<TimelineFrame> frames = match.getTimeline().getFrames();
                    for (TimelineFrame frame : frames) {
                        //special events, like kills
                        List<TimelineFrameEvent> events = frame.getEvents();
                        for (TimelineFrameEvent event : events) {
                            if (event.getType() == EventType.CHAMPION_KILL) {
                                //victim death location data
                                if (event.getVictimId() <= 5) {
                                    matchData.teamBlue.champions.get(event.getVictimId() - 1).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                } else {
                                    matchData.teamRed.champions.get(event.getVictimId() - 6).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                }
                                //general location data
                            }
                        }
                        //participantframes for regular location data
                        Map<String, TimelineParticipantFrame> participantFrameMap = frame.getParticipantFrames();
                        for (TimelineParticipantFrame timelineParticipantFrame: participantFrameMap.values()) {
                            if(timelineParticipantFrame.getParticipantId() <= 5) {
                                matchData.teamBlue.champions.get(timelineParticipantFrame.getParticipantId()-1).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                            } else {
                                matchData.teamRed.champions.get(timelineParticipantFrame.getParticipantId()-6).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                            }

                        }
                    }
                    matchDataList.add(matchData);



                } else {
                    //System.out.println("No match");
                }
            } else {
                //System.out.println("No match");
            }
        }
        System.out.println("Sending Dto of " + playerName + " matches as " + position + " (" + champions + ")" + " in team " + team + " with a " + result);
        return matchDataList;
    }

    /**
     * Overloaded method (additional params for more filtering options)
     * @params  list of LOL-Matches
     *          String with the desired Player: the player whose matches are analyzed
     *          String with Champion name: champion of which data should be analyzed
     *          String with team (red or blue): only matches in which player is in specified team are included
     *          String with desired result (win or lose): only matches that the player won/lost are included
     * @return a list of all Timeline-Frame-Events in which the champion given in the params dies, only matches with specified team with win/lose
     */
    public ArrayList<MatchDataDto> generateMatchDataDtoList(ArrayList<LOLMatch> matches, String playerName, String champion, String team, String result){
        System.out.println("Looking for a Matches with Champion " + champion + " of Player " + playerName + " where player was in team " + team + " with a " + result);
        //container for return data
        ArrayList<MatchDataDto> matchDataList = new ArrayList<>();
        MatchDataDto matchData = new MatchDataDto();
        boolean found = false;

        int currentParticipantID = 0;
        String currentChampion = "";
        String currentTeam = "";
        String currentResult = "";

        //lookup specified player in each match
        for (LOLMatch match : matches) {

            //System.out.println("Next match up for lookup");
            List<MatchParticipant> participants = match.getParticipants();
            for (MatchParticipant participant : participants) {
                if (participant.getSummonerName().equals(playerName)) {
                    currentParticipantID = participant.getParticipantId();
                    currentChampion = participant.getChampionName();
                    //System.out.println(currentChampion);
                    //System.out.println("Checking Champion");
                    break;
                }
            }


            if (currentChampion.equals(champion) && match.getGameMode().prettyName().equals("Classic")) {
                //if continues a classic match was found where champion was played by player, this match will be analyzed further
                //additional filters can be checked at this point

                //set current team of this player
                if (currentParticipantID <= 5) {
                    currentTeam = "blue";} else {currentTeam = "red";
                }

                //set if player won or lost match
                if (match.getTeams().get(0).didWin()) { //team blue won
                    if (currentTeam.equals("blue")) {  //was player in winning team blue?
                        currentResult = "win";  //player was in team blue that won, so player won
                    } else {
                        currentResult = "lose"; //player was not in winning team, so player lost
                    }
                } else { //team red won
                    if (currentTeam.equals("red")) {  //was player in winning team red?
                        currentResult = "win"; //player was in team red that won, so player won
                    } else {
                        currentResult = "lose"; //player was not in winning team, so player lost
                    }
                }

                //now only continue if match and win/lose status matches query
                if (currentTeam.equals(team) && currentResult.equals(result)) {
                    //if continues, matches query

                    matchData = new MatchDataDto();
                    //System.out.println("Found Match with" + champion);
                    //set base match data
                    matchData.setId(match.getGameId());
                    matchData.setDate(match.getGameStartAsDate());
                    //set winner data
                    if (match.getTeams().get(0).didWin()) {
                        matchData.setWinner("Blue");
                        matchData.getTeamBlue().setWinner(true);
                        matchData.getTeamRed().setWinner(false);
                    } else {
                        matchData.setWinner("Red");
                        matchData.getTeamBlue().setWinner(false);
                        matchData.getTeamRed().setWinner(true);
                    }
                    //set base participant data for all 10 participants in both teams
                    for (MatchParticipant participant : participants) {
                        //team blue are participants 1-5
                        if (participant.getParticipantId() <= 5) {
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setName(participant.getChampionName());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setPlayer(participant.getSummonerName());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setKillCount(participant.getKills());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setDeathCount(participant.getDeaths());
                            matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setAssistCount(participant.getAssists());
                            //team red are participants 6-10
                        } else {
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setName(participant.getChampionName());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setPlayer(participant.getSummonerName());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setKillCount(participant.getKills());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setDeathCount(participant.getDeaths());
                            matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setAssistCount(participant.getAssists());
                        }
                    }

                    //now it is time for the location data of the match
                    List<TimelineFrame> frames = match.getTimeline().getFrames();
                    for (TimelineFrame frame : frames) {
                        //special events, like kills
                        List<TimelineFrameEvent> events = frame.getEvents();
                        for (TimelineFrameEvent event : events) {
                            if (event.getType() == EventType.CHAMPION_KILL) {
                                //victim death location data
                                if (event.getVictimId() <= 5) {
                                    matchData.teamBlue.champions.get(event.getVictimId() - 1).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                } else {
                                    matchData.teamRed.champions.get(event.getVictimId() - 6).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                }
                                //general location data
                            }
                        }
                        //participantframes for regular location data
                        Map<String, TimelineParticipantFrame> participantFrameMap = frame.getParticipantFrames();
                        for (TimelineParticipantFrame timelineParticipantFrame: participantFrameMap.values()) {
                            if(timelineParticipantFrame.getParticipantId() <= 5) {
                                matchData.teamBlue.champions.get(timelineParticipantFrame.getParticipantId()-1).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                            } else {
                                matchData.teamRed.champions.get(timelineParticipantFrame.getParticipantId()-6).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                            }

                        }
                    }
                    matchDataList.add(matchData);



                } else {
                    //System.out.println("No match");
                }
            } else {
                //System.out.println("No match");
            }
        }
        System.out.println("Sending Dto of " + playerName + " matches with " + champion + " in team " + team + " with a " + result);
        return matchDataList;
    }


    /**
     * Overloaded method (additional params for more filtering options)
     * @params  list of LOL-Matches
     *          String with the desired game type: Classic, ARAM, One for All, URF
     *          String with the desired Player: the player whose matches are analyzed
     *          String with team (red or blue): only matches in which player is in specified team are included
     *          String with desired result (win or lose): only matches that the player won/lost are included
     * @return a list of all Timeline-Frame-Events in which the champion given in the params dies, only matches with specified team with win/lose
     */
    public ArrayList<MatchDataDto> generateAllMatchDataDtoList(ArrayList<LOLMatch> matches, String gameType, String playerName, String team, String result){
        System.out.println("Fetching all " + gameType + " matches " + " where player " + playerName + " was in team " + team + " with a " + result);
        //container for return data
        ArrayList<MatchDataDto> matchDataList = new ArrayList<>();
        MatchDataDto matchData = new MatchDataDto();

        int currentParticipantID = 0;
        String currentTeam = "";
        String currentResult = "";

        //lookup specified player in each match
        for (LOLMatch match : matches) {
            try {
                //System.out.println("Next match up for lookup");
                List<MatchParticipant> participants = match.getParticipants();
                for (MatchParticipant participant : participants) {
                    if (participant.getSummonerName().equals(playerName)) {
                        currentParticipantID = participant.getParticipantId();
                        break;
                    }
                }

                if (match.getGameMode().prettyName().equals(gameType) && match.getGameDurationAsDuration().toMinutes() > 25 && match.getGameDurationAsDuration().toMinutes() < 55) {
                    //additional filters can be checked at this point

                    //set current team of this player
                    if (currentParticipantID <= 5) {
                        currentTeam = "blue";} else {currentTeam = "red";
                    }

                    //set if player won or lost match
                    if (match.getTeams().get(0).didWin()) { //team blue won
                        if (currentTeam.equals("blue")) {  //was player in winning team blue?
                            currentResult = "win";  //player was in team blue that won, so player won
                        } else {
                            currentResult = "lose"; //player was not in winning team, so player lost
                        }
                    } else { //team red won
                        if (currentTeam.equals("red")) {  //was player in winning team red?
                            currentResult = "win"; //player was in team red that won, so player won
                        } else {
                            currentResult = "lose"; //player was not in winning team, so player lost
                        }
                    }

                    //now only continue if match and win/lose status matches query
                    if (currentTeam.equals(team) && currentResult.equals(result)) {
                        //if continues, matches query

                        matchData = new MatchDataDto();
                        //set base match data
                        matchData.setId(match.getGameId());
                        matchData.setDate(match.getGameStartAsDate());
                        //set winner data
                        if (match.getTeams().get(0).didWin()) {
                            matchData.setWinner("Blue");
                            matchData.getTeamBlue().setWinner(true);
                            matchData.getTeamRed().setWinner(false);
                        } else {
                            matchData.setWinner("Red");
                            matchData.getTeamBlue().setWinner(false);
                            matchData.getTeamRed().setWinner(true);
                        }
                        //set base participant data for all 10 participants in both teams
                        for (MatchParticipant participant : participants) {
                            //team blue are participants 1-5
                            if (participant.getParticipantId() <= 5) {
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setName(participant.getChampionName());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setPlayer(participant.getSummonerName());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setKillCount(participant.getKills());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setDeathCount(participant.getDeaths());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setAssistCount(participant.getAssists());
                                //team red are participants 6-10
                            } else {
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setName(participant.getChampionName());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setPlayer(participant.getSummonerName());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setKillCount(participant.getKills());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setDeathCount(participant.getDeaths());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setAssistCount(participant.getAssists());
                            }
                        }

                        //now it is time for the location data of the match
                        List<TimelineFrame> frames = match.getTimeline().getFrames();
                        for (TimelineFrame frame : frames) {
                            //special events, like kills
                            List<TimelineFrameEvent> events = frame.getEvents();
                            for (TimelineFrameEvent event : events) {
                                if (event.getType() == EventType.CHAMPION_KILL) {
                                    //victim death location data
                                    if (event.getVictimId() <= 5) {
                                        matchData.teamBlue.champions.get(event.getVictimId() - 1).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                    } else {
                                        matchData.teamRed.champions.get(event.getVictimId() - 6).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                    }
                                    //general location data
                                }
                            }
                            //participantframes for regular location data
                            Map<String, TimelineParticipantFrame> participantFrameMap = frame.getParticipantFrames();
                            for (TimelineParticipantFrame timelineParticipantFrame: participantFrameMap.values()) {
                                if(timelineParticipantFrame.getParticipantId() <= 5) {
                                    matchData.teamBlue.champions.get(timelineParticipantFrame.getParticipantId()-1).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                                } else {
                                    matchData.teamRed.champions.get(timelineParticipantFrame.getParticipantId()-6).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                                }

                            }
                        }
                        matchDataList.add(matchData);


                    } else {
                        //System.out.println("No match");
                    }
                } else {
                    //System.out.println("No match");
                }
            } catch (NullPointerException e) {
                System.out.println("A weird error occurred when fetching Match Details");
                continue;
            }

        }
        System.out.println("Sending Dto of " + playerName + " matches in team " + team + " with a " + result);
        return matchDataList;
    }

    /**
     * Overloaded method (additional params for more filtering options)
     * @params  list of LOL-Matches
     *          String with the desired game type: Classic, ARAM, One for All, URF
     *          String with the desired Player: the player whose matches are analyzed
     *          String with team (red or blue): only matches in which player is in specified team are included
     *
     * @return a list of all Timeline-Frame-Events in which the champion given in the params dies, only matches with specified team with win/lose
     */
    public ArrayList<MatchDataDto> generateAllMatchDataDtoList(ArrayList<LOLMatch> matches, String gameType, String playerName, String team){
        System.out.println("Fetching all " + gameType + " matches " + " where player " + playerName + " was in team " + team);
        //container for return data
        ArrayList<MatchDataDto> matchDataList = new ArrayList<>();
        MatchDataDto matchData = new MatchDataDto();

        int currentParticipantID = 0;
        String currentTeam = "";
        String currentResult = "";

        //lookup specified player in each match
        for (LOLMatch match : matches) {
            try {
                //System.out.println("Next match up for lookup");
                List<MatchParticipant> participants = match.getParticipants();
                for (MatchParticipant participant : participants) {
                    if (participant.getSummonerName().equals(playerName)) {
                        currentParticipantID = participant.getParticipantId();
                        break;
                    }
                }

                if (match.getGameMode().prettyName().equals(gameType) && match.getGameDurationAsDuration().toMinutes() > 25 && match.getGameDurationAsDuration().toMinutes() < 55) {
                    //additional filters can be checked at this point

                    //set current team of this player
                    if (currentParticipantID <= 5) {
                        currentTeam = "blue";} else {currentTeam = "red";
                    }

                    //now only continue if match matches query
                    if (currentTeam.equals(team)) {
                        //if continues, matches query

                        matchData = new MatchDataDto();
                        //set base match data
                        matchData.setId(match.getGameId());
                        matchData.setDate(match.getGameStartAsDate());
                        //set winner data
                        if (match.getTeams().get(0).didWin()) {
                            matchData.setWinner("Blue");
                            matchData.getTeamBlue().setWinner(true);
                            matchData.getTeamRed().setWinner(false);
                        } else {
                            matchData.setWinner("Red");
                            matchData.getTeamBlue().setWinner(false);
                            matchData.getTeamRed().setWinner(true);
                        }
                        //set base participant data for all 10 participants in both teams
                        for (MatchParticipant participant : participants) {
                            //team blue are participants 1-5
                            if (participant.getParticipantId() <= 5) {
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setName(participant.getChampionName());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setPlayer(participant.getSummonerName());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setKillCount(participant.getKills());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setDeathCount(participant.getDeaths());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setAssistCount(participant.getAssists());
                                //team red are participants 6-10
                            } else {
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setName(participant.getChampionName());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setPlayer(participant.getSummonerName());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setKillCount(participant.getKills());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setDeathCount(participant.getDeaths());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setAssistCount(participant.getAssists());
                            }
                        }

                        //now it is time for the location data of the match
                        List<TimelineFrame> frames = match.getTimeline().getFrames();
                        for (TimelineFrame frame : frames) {
                            //special events, like kills
                            List<TimelineFrameEvent> events = frame.getEvents();
                            for (TimelineFrameEvent event : events) {
                                if (event.getType() == EventType.CHAMPION_KILL) {
                                    //victim death location data
                                    if (event.getVictimId() <= 5) {
                                        matchData.teamBlue.champions.get(event.getVictimId() - 1).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                    } else {
                                        matchData.teamRed.champions.get(event.getVictimId() - 6).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                    }
                                    //general location data
                                }
                            }
                            //participantframes for regular location data
                            Map<String, TimelineParticipantFrame> participantFrameMap = frame.getParticipantFrames();
                            for (TimelineParticipantFrame timelineParticipantFrame: participantFrameMap.values()) {
                                if(timelineParticipantFrame.getParticipantId() <= 5) {
                                    matchData.teamBlue.champions.get(timelineParticipantFrame.getParticipantId()-1).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                                } else {
                                    matchData.teamRed.champions.get(timelineParticipantFrame.getParticipantId()-6).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                                }

                            }
                        }
                        matchDataList.add(matchData);


                    } else {
                        //System.out.println("No match");
                    }
                } else {
                    //System.out.println("No match");
                }
            } catch (NullPointerException e) {
                System.out.println("A weird error occurred when fetching Match Details");
                continue;
            }

        }
        System.out.println("Sending Dto of " + playerName + " matches in team " + team);
        return matchDataList;
    }

    /**
     * Overloaded method (additional params for more filtering options)
     * @params  list of LOL-Matches
     *          String with the desired game type: Classic, ARAM, One for All, URF
     *          String with the desired Player: the player whose matches are analyzed
     *          String with team (red or blue): only matches in which player is in specified team are included
     *
     * @return a list of all Timeline-Frame-Events in which the champion given in the params dies, only matches with specified team with win/lose
     */
    public ArrayList<MatchDataDto> generateAllMatchDataDtoList(ArrayList<LOLMatch> matches, String gameType, String playerName){
        System.out.println("Fetching all " + gameType + " matches " + " of player " + playerName);
        //container for return data
        ArrayList<MatchDataDto> matchDataList = new ArrayList<>();
        MatchDataDto matchData = new MatchDataDto();

        int currentParticipantID = 0;

        //lookup specified player in each match
        for (LOLMatch match : matches) {
            try {
                //System.out.println("Next match up for lookup");
                List<MatchParticipant> participants = match.getParticipants();
                for (MatchParticipant participant : participants) {
                    if (participant.getSummonerName().equals(playerName)) {
                        currentParticipantID = participant.getParticipantId();
                        break;
                    }
                }

                if (match.getGameMode().prettyName().equals(gameType) && match.getGameDurationAsDuration().toMinutes() > 25 && match.getGameDurationAsDuration().toMinutes() < 55) {
                    //additional filters can be checked at this point

                        matchData = new MatchDataDto();
                        //set base match data
                        matchData.setId(match.getGameId());
                        matchData.setDate(match.getGameStartAsDate());
                        //set winner data
                        if (match.getTeams().get(0).didWin()) {
                            matchData.setWinner("Blue");
                            matchData.getTeamBlue().setWinner(true);
                            matchData.getTeamRed().setWinner(false);
                        } else {
                            matchData.setWinner("Red");
                            matchData.getTeamBlue().setWinner(false);
                            matchData.getTeamRed().setWinner(true);
                        }
                        //set base participant data for all 10 participants in both teams
                        for (MatchParticipant participant : participants) {
                            //team blue are participants 1-5
                            if (participant.getParticipantId() <= 5) {
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setName(participant.getChampionName());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setPlayer(participant.getSummonerName());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setKillCount(participant.getKills());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setDeathCount(participant.getDeaths());
                                matchData.getTeamBlue().getChampions().get(participant.getParticipantId() - 1).setAssistCount(participant.getAssists());
                                //team red are participants 6-10
                            } else {
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setName(participant.getChampionName());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setPlayer(participant.getSummonerName());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setKillCount(participant.getKills());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setDeathCount(participant.getDeaths());
                                matchData.getTeamRed().getChampions().get(participant.getParticipantId() - 6).setAssistCount(participant.getAssists());
                            }
                        }

                        //now it is time for the location data of the match
                        List<TimelineFrame> frames = match.getTimeline().getFrames();
                        for (TimelineFrame frame : frames) {
                            //special events, like kills
                            List<TimelineFrameEvent> events = frame.getEvents();
                            for (TimelineFrameEvent event : events) {
                                if (event.getType() == EventType.CHAMPION_KILL) {
                                    //victim death location data
                                    if (event.getVictimId() <= 5) {
                                        matchData.teamBlue.champions.get(event.getVictimId() - 1).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                    } else {
                                        matchData.teamRed.champions.get(event.getVictimId() - 6).deaths.add(new ChampionPositionDto(event.getPosition().getX(), event.getPosition().getY(), event.getTimestamp()));
                                    }
                                    //general location data
                                }
                            }
                            //participantframes for regular location data
                            Map<String, TimelineParticipantFrame> participantFrameMap = frame.getParticipantFrames();
                            for (TimelineParticipantFrame timelineParticipantFrame: participantFrameMap.values()) {
                                if(timelineParticipantFrame.getParticipantId() <= 5) {
                                    matchData.teamBlue.champions.get(timelineParticipantFrame.getParticipantId()-1).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                                } else {
                                    matchData.teamRed.champions.get(timelineParticipantFrame.getParticipantId()-6).positions.add(new ChampionPositionDto(timelineParticipantFrame.getPosition().getX(), timelineParticipantFrame.getPosition().getY(),frame.getTimestamp()));
                                }

                            }
                        }
                        matchDataList.add(matchData);
                } else {
                    //System.out.println("No match");
                }
            } catch (NullPointerException e) {
                System.out.println("A weird error occurred when fetching Match Details");
                continue;
            }

        }
        System.out.println("Sending Dto of " + playerName + " matches");
        return matchDataList;
    }


    /**
     * Only for testing, is not used in backend
     * @params Lol-Timeline of a match
     * @return nothing!
     * PRINTS match data of the timeline
     */
    public void printMatchKillData(LOLTimeline timeline) {
        System.out.println("GameID: " +  timeline.getGameId());
        List<TimelineParticipantIdentity> participants = timeline.getParticipants();
        ArrayList<Summoner> summoners = new ArrayList<>();

        System.out.println("Participants:");
        for (TimelineParticipantIdentity participant: participants) {
            Summoner s = Summoner.byPUUID(LeagueShard.EUW1, participant.getPuuid());
            summoners.add(s);
            System.out.println("Participant " + participant.getParticipantId() + ": " + s.getName());
        }

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
                    if(event.getAssistingParticipantIds() == null) {
                        System.out.println("No Assist");
                    } else {
                        for (int i: event.getAssistingParticipantIds()) {
                            System.out.println("Assist: " + summoners.get(i-1).getName() + " (" + i + ")");
                        }
                    }
                    System.out.println("Victim: " + summoners.get(event.getVictimId()-1).getName() + " (" + event.getVictimId() + ")");
                    System.out.println();
                }
            }
        }

    }

}
