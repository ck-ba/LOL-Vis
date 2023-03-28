package com.lol.lolback.endpoint;

import com.lol.lolback.dto.Mapper;
import com.lol.lolback.dto.MatchDataDto;
import com.lol.lolback.global.Globals;
import com.lol.lolback.matches.PlayerDeathAnalysis;
import no.stelar7.api.r4j.basic.APICredentials;
import no.stelar7.api.r4j.basic.calling.DataCall;
import no.stelar7.api.r4j.basic.constants.api.regions.LeagueShard;
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

/**
 * Match Data Endpoint
 *
 * Input point for frontend regarding match data
 *
 * In this class, Match Data Objects matching certain search terms are returned to the frontend
 */
@RestController
@RequestMapping(MatchDataEndpoint.BASE_URL)
public class MatchDataEndpoint {

    static final String BASE_URL = "/match";
    static final String apiKey = Globals.getApiKey();
    static final String region = Globals.getRegion();
    public final R4J r4J;
    public final MatchHistory matchHistory;
    public final PlayerDeathAnalysis playerDeathAnalysis;
    public final MatchData matchData;
    public final Mapper mapper;

    @Autowired
    public MatchDataEndpoint() {
        this.r4J = new R4J(new APICredentials(apiKey));
        DataCall.setCacheProvider(new FileSystemCacheProvider());
        this.matchHistory = new MatchHistory(r4J);
        this.playerDeathAnalysis = new PlayerDeathAnalysis(r4J);
        this.matchData = new MatchData(r4J);
        this.mapper = new Mapper(r4J);

    }

    /**
     * @params      String player (must be valid name of a Lol player)
     *              String champion (must be valid Lol champion name)
     * @return Match Data Dto of the first match found matching input params
     * called up by GET method
     * @throws ValidationException will be thrown if ??
     */
    @GetMapping(params = {"player", "champion"})
    public MatchDataDto getOneMatchWith(@RequestParam("player") String player, @RequestParam("champion") String champion){
        System.out.println("Received Request to get Matchdetails of a match by player " + player + " with " + champion);
        try {
            Summoner summoner = setSummoner(region, player);
            ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
            System.out.println("Sending Dto");
            return matchData.generateMatchDataDto(matches, player, champion);
        } catch (ValidationException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid champion/player name(s)!", e);
        }
    }

    /**
     * @params      String player (must be valid name of a Lol player)
     *              String champion (must be valid Lol champion name)
     * @return Match Data Dto List matching player and champion
     * called up by GET method
     * @throws ValidationException will be thrown if ??
     */
    @GetMapping(value = "/{player}/{champion}")
    public ArrayList<MatchDataDto> getAllMatchesWith(@PathVariable("player") String player, @PathVariable("champion") String champion){
        if (champion.equals("all")) {
            System.out.println("Received Request to get Matchdetails of all matches by player " + player);
            try {
                Summoner summoner = setSummoner(region, player);
                ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
                //System.out.println("Sending Dto");
                return matchData.generateAllMatchDataDtoList(matches, "Classic", player);
            } catch (ValidationException e) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid champion/player name(s)!", e);
            }
        } else {
            System.out.println("Received Request to get Matchdetails of matches by player " + player + " with " + champion);
            try {
                Summoner summoner = setSummoner(region, player);
                ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
                //System.out.println("Sending Dto");
                return matchData.generateMatchDataDtoList(matches, player, champion);
            } catch (ValidationException e) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid champion/player name(s)!", e);
            }
        }

    }

    /**
     * @params      String player (must be valid name of a Lol player)
     *              String champion (must be valid Lol champion name)
     *              String team (red/blue)
     * @return Match Data Dto List matching player and champion
     * called up by GET method
     * @throws ValidationException will be thrown if ??
     */
    @GetMapping(value = "/{player}/{champion}/{team}")
    public ArrayList<MatchDataDto> getAllMatchesWith(@PathVariable("player") String player, @PathVariable("champion") String champion,
                                                     @PathVariable("team") String team){
        if (champion.equals("all")) {
            System.out.println("Received Request to get Matchdetails of all matches by player " + player + " in team " + team );
            try {
                Summoner summoner = setSummoner(region, player);
                ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
                //System.out.println("Sending Dto");
                return matchData.generateAllMatchDataDtoList(matches, "Classic", player, team);
            } catch (ValidationException e) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid champion/player name(s)!", e);
            }
        } else {
            System.out.println("Received Request to get Matchdetails of matches by player " + player + " with " + champion + " in team " + team );
            try {
                Summoner summoner = setSummoner(region, player);
                ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
                //System.out.println("Sending Dto");
                return matchData.generateMatchDataDtoList(matches, player, champion, team);
            } catch (ValidationException e) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid champion/player name(s)!", e);
            }
        }
    }

    /**
     * @params      String player (must be valid name of a Lol player)
     *              String champion (must be valid Lol champion name)
     *              String team (red/blue)
     *              String result (win/lose)
     * @return Match Data Dto List matching player and champion
     * called up by GET method
     * @throws ValidationException will be thrown if ??
     */
    @GetMapping(value = "/{player}/{champion}/{team}/{result}")
    public ArrayList<MatchDataDto> getAllMatchesWith(@PathVariable("player") String player, @PathVariable("champion") String champion,
                                                     @PathVariable("team") String team, @PathVariable("result") String result){
        if (champion.equals("all")) {
            System.out.println("Received Request to get Matchdetails of all matches by player " + player + " in team " + team + " with a " + result);
            try {
                Summoner summoner = setSummoner(region, player);
                ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
                //System.out.println("Sending Dto");
                return matchData.generateAllMatchDataDtoList(matches, "Classic", player, team, result);
            } catch (ValidationException e) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid champion/player name(s)!", e);
            }
        } else {
            System.out.println("Received Request to get Matchdetails of matches by player " + player + " with " + champion + " in team " + team + " with a " + result);
            try {
                Summoner summoner = setSummoner(region, player);
                ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
                //System.out.println("Sending Dto");
                return matchData.generateMatchDataDtoList(matches, player, champion, team, result);
            } catch (ValidationException e) {
                throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid champion/player name(s)!", e);
            }
        }

    }

    /**
     * @params      String player (must be valid name of a Lol player)
     *              String "pool"
     *              String position (top/mid/jgl/sup/adc)
     *              String team (red/blue)
     *              String result (win/lose)
     * @return Match Data Dto List matching player and champion
     * called up by GET method
     * @throws ValidationException will be thrown if ??
     */
    @GetMapping(value = "/{player}/{pool}/{position}/{team}/{result}")
    public ArrayList<MatchDataDto> getAllMatchesWith(@PathVariable("player") String player, @PathVariable("pool") String pool, @PathVariable("position") String position,
                                                     @PathVariable("team") String team, @PathVariable("result") String result){
        System.out.println("Received Request to get Matchdetails of matches by player " + player + " as " + position + " in team " + team + " with a " + result);
        try {
            Summoner summoner = setSummoner(region, player);
            ArrayList<LOLMatch> matches = matchHistory.getMatchHistory(summoner);
            //System.out.println("Sending Dto");
            return matchData.generateMatchDataDtoList(matches, player, pool, position, team, result);
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
