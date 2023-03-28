package com.lol.lolback.players;

import com.merakianalytics.orianna.types.dto.champion.ChampionInfo;
import no.stelar7.api.r4j.basic.constants.api.regions.LeagueShard;
import no.stelar7.api.r4j.impl.R4J;
import no.stelar7.api.r4j.impl.lol.builders.championmastery.ChampionMasteryBuilder;
import no.stelar7.api.r4j.pojo.lol.championmastery.ChampionMastery;
import no.stelar7.api.r4j.pojo.lol.summoner.Summoner;

public class SummonerData {

    public Summoner summoner;
    public R4J r4J;

    public SummonerData(String playerName, R4J r4j) {
        this.summoner = Summoner.byName(LeagueShard.EUW1, playerName);
        this.r4J = r4j;
    }

    public void championMastery(String championName) {
        ChampionMastery mastery;
        ChampionMasteryBuilder bu = new ChampionMasteryBuilder().withPlatform(summoner.getPlatform()).withSummonerId(summoner.getSummonerId());

        mastery = bu.withChampionId(1).getChampionMastery();
        assert mastery != null;

        mastery = bu.withChampionId(2).getChampionMastery();
        assert mastery != null;

    }

    public int getChampionId(String championName) {
        ChampionInfo champion;
        return 1;
    }





}
