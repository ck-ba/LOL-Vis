package com.lol.lolback.dto;

import java.util.ArrayList;

/**
 * Team Match Details (part of Match Data Dto)
 *
 * Is contained 2 times in the Match Data Dto (1 for team blue, 1 for team red)
 *
 * 1 Team Match Dto will then contain 5 Champion Match Details Objects (empty objects are created in the constructor)
 */
public class TeamMatchDetails {

    public boolean winner;

    public ArrayList<ChampionMatchDetails> champions;

    public TeamMatchDetails(boolean winner, ArrayList<ChampionMatchDetails> champions) {
        this.winner = winner;
        this.champions = champions;
    }
    public TeamMatchDetails() {
        this.champions = new ArrayList<>();
    }

    public boolean isWinner() {
        return winner;
    }

    public void setWinner(boolean winner) {
        this.winner = winner;
    }

    public ArrayList<ChampionMatchDetails> getChampions() {
        return champions;
    }

    public void setChampions(ArrayList<ChampionMatchDetails> champions) {
        this.champions = champions;
    }

}
