package com.lol.lolback.global;

import com.lol.lolback.util.ValidationException;

public class Globals {

    //needs a valid Riot Games API Key!
    //add as text or as global here
    static final String apiKey = "RIOT GAMES API KEY";
    /**
     * Regions
     *
     * EUW: EU West
     * EUNE: EU North East
     * Brazil: Brazil1
     * US: North America
     * Korea: South Korea
     * others: see Riot Games API Description!
     *
     * Default: EUW
     *
     */
    static String region = "EUW";

    public Globals(){};

    public static String getApiKey() {
        return apiKey;
    }

    public static String getRegion() {
        return region;
    }
}
