<script setup lang="ts">
import { ref } from "vue";
import GoogleAddressAutocomplete from "./components/GooglePlacesAutocomplete.vue";
import SelectTime from "./components/SelectTime.vue";
import ThemeController from "./components/ThemeController.vue";
import InfoCard from "./components/InfoCard.vue";
import { DayTime } from "./interfaces/DayTime";
import { Place } from "./interfaces/Place";

const apiKey = "AIzaSyCEMuCbz0M1BBy6axO42nV5PkBhvB6gvjU";
const query = ref<string>("");
const selectedPlace = ref<Place | undefined>(undefined);
const selectedDayTime = ref<DayTime | undefined>(undefined);

const placeCallback = (place: Place) => {
    selectedPlace.value = place;
};

const dayTimeCallback = (dayTime: DayTime) => {
    selectedDayTime.value = dayTime;
};

const handleClick = () => {
    if (selectedDayTime.value && selectedPlace.value) {
        console.log("selected time:", { ...selectedDayTime.value });
        console.log("selected place:", { ...selectedPlace.value });
    }
};
</script>

<template>
    <header class="flex items-center p-4">
        <ThemeController class="ml-auto"></ThemeController>
    </header>
    <main class="flex items-center w-full p-4 gap-2">
        <GoogleAddressAutocomplete
            @callback="placeCallback"
            :apiKey="apiKey"
            class="grow"
            placeholder="Search for a place..."
            v-model="query"
        ></GoogleAddressAutocomplete>
        <SelectTime @callback="dayTimeCallback"></SelectTime>
        <button @click="handleClick()" class="btn">Get Traffic</button>
    </main>
    <div class="flex flex-row justify-center items-center p-4 gap-2 rounded-lg">
        <InfoCard></InfoCard>
    </div>
</template>
