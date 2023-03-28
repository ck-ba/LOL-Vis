package com.lol.lolback.dto;

import java.util.ArrayList;

/**
 * Champion Match Details (part of Team Match Details which is part of Match Data Dto)
 *
 * 1 Match Data Dto contains 10 Champion Match Details objects (5 per Team Match Details Objects)
 *
 * Contains information of the participant and their performance in the match, as well as
 * list of their positions (x-y-coordinates plus timestamps) in roughly each minute of the game
 * list of their death locations (x-y)
 *
 */
public class ChampionMatchDetails {

    public String name;
    public String player;
    public int killCount;
    public int deathCount;
    public int assistCount;

    public ArrayList<ChampionPositionDto> positions;
    public ArrayList<ChampionPositionDto> deaths;

    public ChampionMatchDetails(String name, String player, int killCount, int deathCount, int assistCount, ArrayList<ChampionPositionDto> positions, ArrayList<ChampionPositionDto> deaths) {
        this.name = name;
        this.player = player;
        this.killCount = killCount;
        this.deathCount = deathCount;
        this.assistCount = assistCount;
        this.positions = positions;
        this.deaths = deaths;
    }

    //upon object creation, empty lists for the location data are created
    public ChampionMatchDetails(){
        this.positions = new ArrayList<>();
        this.deaths = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public int getKillCount() {
        return killCount;
    }

    public void setKillCount(int killCount) {
        this.killCount = killCount;
    }

    public int getDeathCount() {
        return deathCount;
    }

    public void setDeathCount(int deathCount) {
        this.deathCount = deathCount;
    }

    public int getAssistCount() {
        return assistCount;
    }

    public void setAssistCount(int assistCount) {
        this.assistCount = assistCount;
    }

    public ArrayList<ChampionPositionDto> getPositions() {
        return positions;
    }

    public void setPositions(ArrayList<ChampionPositionDto> positions) {
        this.positions = positions;
    }

    public ArrayList<ChampionPositionDto> getDeaths() {
        return deaths;
    }

    public void setDeaths(ArrayList<ChampionPositionDto> deaths) {
        this.deaths = deaths;
    }

}
