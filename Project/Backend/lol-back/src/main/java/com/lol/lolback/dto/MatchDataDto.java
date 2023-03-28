package com.lol.lolback.dto;

import java.time.ZonedDateTime;
import java.util.ArrayList;

/**
 * Match Data Dto
 *
 * A DTO designed to hold all the data necessary for analyzing lol matches in one DTO
 *
 * 1 Match Data Dto holds the relevant information for 1 existing LOL match
 *
 * Contains: 2xTeam Match Details objects (each with 5 Champion Match Details - thus 10 Champion Match Details objects altogether)
 */
public class MatchDataDto {

    public String winner;
    public ZonedDateTime date;
    public long id;
    public TeamMatchDetails teamBlue;
    public TeamMatchDetails teamRed;

    public MatchDataDto(String winner, ZonedDateTime date, long id, TeamMatchDetails teamBlue, TeamMatchDetails teamRed) {
        this.winner = winner;
        this.date = date;
        this.id = id;
        this.teamBlue = teamBlue;
        this.teamRed = teamRed;
    }

    //upon building a new dto, placeholders for the relevant information is created, such as 2 teams of 5 champions each
    public MatchDataDto() {
        this.teamBlue = new TeamMatchDetails();
        this.teamRed = new TeamMatchDetails();
        for (int i = 0; i < 5; i++) {
            ChampionMatchDetails championB = new ChampionMatchDetails();
            ChampionMatchDetails championR = new ChampionMatchDetails();
            this.teamBlue.champions.add(championB);
            this.teamRed.champions.add(championR);
        }


    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TeamMatchDetails getTeamBlue() {
        return teamBlue;
    }

    public void setTeamBlue(TeamMatchDetails teamBlue) {
        this.teamBlue = teamBlue;
    }

    public TeamMatchDetails getTeamRed() {
        return teamRed;
    }

    public void setTeamRed(TeamMatchDetails teamRed) {
        this.teamRed = teamRed;
    }
}
