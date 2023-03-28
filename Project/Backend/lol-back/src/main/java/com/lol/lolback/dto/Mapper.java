package com.lol.lolback.dto;

import no.stelar7.api.r4j.impl.R4J;
import no.stelar7.api.r4j.pojo.lol.match.v5.TimelineFrameEvent;

import java.util.ArrayList;

/**
 * Mapper
 *
 * As the data objects provided by R4J contain a large amount of informations, the mapper is used to strip some of
 * the relavant information and pack it into specifically designed, much slimmer data objects
 *
 */
public class Mapper {

    public R4J r4j;

    public Mapper(R4J r4j){
        this.r4j = r4j;
    }

    /**
     * @params List of timeline frame events containing champion deaths that was obtained by previous methods
     * @return a list of all the locations (x-y coordinates) where the deaths happened, nothing else
     */
    public ArrayList<ChampionDeathEventDto> mapChampionDeathEvent (ArrayList<TimelineFrameEvent> specialEventSet){
        System.out.println("Mapping Champion Death Locations");
        ArrayList<ChampionDeathEventDto> mappedEventSet = new ArrayList<>();
        for (TimelineFrameEvent event: specialEventSet) {
            System.out.println(event.getTimestamp());
            mappedEventSet.add(new ChampionDeathEventDto(event.getPosition().getX(), event.getPosition().getY()));
        }
        return mappedEventSet;
    }

}
