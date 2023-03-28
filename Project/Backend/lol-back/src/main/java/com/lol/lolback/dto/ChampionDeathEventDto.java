package com.lol.lolback.dto;

/**
 * Champion Death Event Dto
 *
 * A slim dto that only contains X and Y coordinates as int
 * Intended for analyzing champion death locations
 *
 */
public class ChampionDeathEventDto {

    public int x;
    public int y;

    public ChampionDeathEventDto(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public ChampionDeathEventDto() {
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }


}
