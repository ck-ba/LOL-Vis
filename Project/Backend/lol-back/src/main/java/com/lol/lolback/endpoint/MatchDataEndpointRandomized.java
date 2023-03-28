package com.lol.lolback.endpoint;

import com.lol.lolback.dto.Mapper;
import com.lol.lolback.dto.MatchDataDto;
import com.lol.lolback.global.Globals;
import com.lol.lolback.matches.PlayerDeathAnalysis;
import no.stelar7.api.r4j.basic.APICredentials;
import no.stelar7.api.r4j.basic.calling.DataCall;
import no.stelar7.api.r4j.basic.constants.api.regions.LeagueShard;
import no.stelar7.api.r4j.basic.exceptions.APIEnumNotUpToDateException;
import no.stelar7.api.r4j.impl.R4J;
import no.stelar7.api.r4j.pojo.lol.summoner.Summoner;
import com.lol.lolback.matches.MatchHistory;
import com.lol.lolback.matches.MatchData;
import no.stelar7.api.r4j.basic.cache.impl.FileSystemCacheProvider;
import no.stelar7.api.r4j.pojo.lol.match.v5.LOLMatch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.lol.lolback.util.ValidationException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Match Data Endpoint
 *
 * Input point for frontend regarding match data
 *
 * In this class, Match Data Objects matching certain search terms are returned to the frontend
 */
@RestController
@RequestMapping(MatchDataEndpointRandomized.BASE_URL)
public class MatchDataEndpointRandomized {

    static final String BASE_URL = "/randomatch";
    static final String apiKey = Globals.getApiKey();
    static final String region = Globals.getRegion();
    public final R4J r4J;
    public final MatchHistory matchHistory;
    public final PlayerDeathAnalysis playerDeathAnalysis;
    public final MatchData matchData;
    public final Mapper mapper;

    @Autowired
    public MatchDataEndpointRandomized() {
        this.r4J = new R4J(new APICredentials(apiKey));
        DataCall.setCacheProvider(new FileSystemCacheProvider());

        this.matchHistory = new MatchHistory(r4J);
        this.playerDeathAnalysis = new PlayerDeathAnalysis(r4J);
        this.matchData = new MatchData(r4J);
        this.mapper = new Mapper(r4J);

    }

    /**
     * @params      String type
     *              String team (red/blue/both)
     *              String result (win/lose/both)
     * @return Match Data Dto List matching team and result
     * called up by GET method
     * @throws ValidationException will be thrown if ??
     */
    @GetMapping(value = "/{type}/{team}/{result}/{length}")
    public List<MatchDataDto> getAllMatchesWith(@PathVariable("type") String type,
                                                @PathVariable("team") String team, @PathVariable("result") String result,
                                                @PathVariable("length") String length){
        if (team.equals("both")) {
            System.out.println("Received Request to get Matchdetails of " + length + " random matches");
        } else if (result.equals("both")) {
            System.out.println("Received Request to get Matchdetails of " + length + " random matches in team " + team + " (But whyyyy do that?) ");
        } else {
            System.out.println("Received Request to get Matchdetails of " + length + " random matches where team " + team + " had a " + result);
        }
        ArrayList<String> summonersEU = new ArrayList<>();
        ArrayList<String> summonersUS = new ArrayList<>();

        //Users taken from different tiers to create a balanced picture
        summonersEU.add("Darksmol");
        summonersEU.add("RogerRdbS");
        summonersEU.add("MadeOfStraw");
        summonersEU.add("SES MADS");
        summonersEU.add("d i");
        summonersEU.add("Nouyu");
        summonersUS.add("Willeum");
        summonersUS.add("Forbidnzz");
        summonersUS.add("RuGu");
        summonersUS.add("Xonflare");
        summonersUS.add("live4musicc");
        summonersUS.add("StarRized");


        /*
        A special version of this endpoint featuring some of the best players of the EUW and NA servers
        summonersEU.add("Noah7");
        summonersEU.add("ViV NEXT ADKING");
        summonersEU.add("BDS xMatty");
        summonersUS.add("DouyinTonyTop");
        summonersUS.add("C9 Lost");
        summonersUS.add("6K OnFleek");
         */


        ArrayList<MatchDataDto> list = new ArrayList<>();
        ArrayList<MatchDataDto> part = new ArrayList<>();

        try {
            for (String player : summonersEU) {
                Summoner summoner = setSummoner("EUW", player);
                try {
                    ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
                    if (team.equals("both")) {
                        part = matchData.generateAllMatchDataDtoList(matches, type, player);
                    } else if (result.equals("both")) {
                        part = matchData.generateAllMatchDataDtoList(matches, type, player, team);
                    } else {
                        part = matchData.generateAllMatchDataDtoList(matches, type, player, team, result);
                    }
                    list.addAll(part);
                } catch (APIEnumNotUpToDateException e) {
                    continue;
                }
            }
            for (String player : summonersUS) {
                Summoner summoner = setSummoner("US", player);
                try {
                    ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
                    if (team.equals("both")) {
                        part = matchData.generateAllMatchDataDtoList(matches, type, player);
                    } else if (result.equals("both")) {
                        part = matchData.generateAllMatchDataDtoList(matches, type, player, team);
                    } else {
                        part = matchData.generateAllMatchDataDtoList(matches, type, player, team, result);
                    }
                    list.addAll(part);
                } catch (APIEnumNotUpToDateException e) {
                    continue;
                }
            }
            Collections.shuffle(list);
            System.out.println("Found " + list.size() + " Matches");
            if (list.size() > Integer.parseInt(length)) {
                System.out.println("Only Forwarding " + length + " Random Matches");
                return list.subList(0, Integer.parseInt(length));
            } else {
                System.out.println("Sample Size too Large, Forwarding all Matches");
                return list;
            }
        } catch (ValidationException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid champion/player name(s)!", e);
        }
    }

    public Summoner setSummoner(String sumRegion, String player) {
        Summoner summoner;
        switch (sumRegion) {
            case "EUW":
                summoner = Summoner.byName(LeagueShard.EUW1, player);
                break;
            case "Brazil":
                summoner = Summoner.byName(LeagueShard.BR1, player);
                break;
            case "US":
                summoner = Summoner.byName(LeagueShard.NA1, player);
                break;
            case "EUNE":
                summoner = Summoner.byName(LeagueShard.EUN1, player);
                break;
            case "Korea":
                summoner = Summoner.byName(LeagueShard.KR, player);
                break;
            default:
                summoner = Summoner.byName(LeagueShard.EUW1, player);
                break;
        }
        return summoner;
    }

}
