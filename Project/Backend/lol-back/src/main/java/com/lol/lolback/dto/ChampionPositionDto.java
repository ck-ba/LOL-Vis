package com.lol.lolback.dto;

/**
 * Champion Position Dto
 *
 * A slim dto that contains X and Y coordinates as int plus the location's timestamp as long
 * Intended for analyzing champion location data, thus timestamp is also included
 *
 */
public class ChampionPositionDto {

    public int x;
    public int y;

    public long time;

    public ChampionPositionDto(int x, int y, long time) {
        this.x = x;
        this.y = y;
        this.time = time;
    }

    public ChampionPositionDto() {
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

    public void setTime(long time) {
        this.time = time;
    }

    public long getTime() {
        return time;
    }
}
