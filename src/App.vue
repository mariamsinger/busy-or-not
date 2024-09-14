<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
import GooglePlacesAutocomplete from "./components/GooglePlacesAutocomplete.vue";
import InfoCard from "./components/InfoCard.vue";
import SelectTime from "./components/SelectTime.vue";
import ThemeController from "./components/ThemeController.vue";
import { DayTime } from "./interfaces/DayTime";
import { Place } from "./interfaces/Place";

const gpApiKey = "";
const btApiKey = "";

const selectedPlace = ref<Place | undefined>(undefined);
const selectedDayTime = ref<DayTime | undefined>(undefined);
const query = ref<string>("");

const infoCard = useTemplateRef("info-card");

onMounted(() => {});

const placeCallback = (place: Place) => {
    selectedPlace.value = place;
};

const dayTimeCallback = (dayTime: DayTime) => {
    selectedDayTime.value = dayTime;
};

const handleClick = () => {
    infoCard.value?.getFootTrafficData();
};
</script>

<template>
    <header class="flex items-center p-4">
        <ThemeController class="ml-auto"></ThemeController>
    </header>
    <main class="flex items-center w-full p-4 gap-2">
        <GooglePlacesAutocomplete
            @callback="placeCallback"
            :apiKey="gpApiKey"
            class="grow"
            placeholder="Search for a place..."
            v-model="query"
        ></GooglePlacesAutocomplete>
        <SelectTime @callback="dayTimeCallback"></SelectTime>
        <button @click="handleClick()" class="btn">Get Traffic</button>
    </main>
    <div class="flex flex-row justify-center items-center p-4 gap-2 rounded-lg">
        <InfoCard
            v-if="selectedDayTime && selectedPlace"
            :btApiKey="btApiKey"
            :dayTime="selectedDayTime"
            :gpApiKey="gpApiKey"
            :place="selectedPlace"
            ref="info-card"
        ></InfoCard>
    </div>
</template>
