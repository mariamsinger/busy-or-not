<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import GooglePlacesAutocomplete from "./components/GooglePlacesAutocomplete.vue";
import InfoCard from "./components/InfoCard.vue";
import PersonalInfoFooter from "./components/PersonalInfoFooter.vue";
import SelectTime from "./components/SelectTime.vue";
import ThemeController from "./components/ThemeController.vue";
import { DayTime } from "./interfaces/DayTime";
import { Place } from "./interfaces/Place";

const gpApiKey = "";
const btApiKey = "";

const selectedPlace = ref<Place | undefined>(undefined);
const selectedDayTime = ref<DayTime | undefined>(undefined);
const query = ref<string>("");
const showToast = ref<boolean>(false);
const toastMessage = ref<string>("");

const infoCard = useTemplateRef("info-card");

const placeCallback = (place: Place) => {
    selectedPlace.value = place;
};

const dayTimeCallback = (dayTime: DayTime) => {
    selectedDayTime.value = dayTime;
};

const handleClick = () => {
    infoCard.value?.getFootTrafficData();
};

const handleShowToast = (message: string) => {
    showToast.value = true;
    toastMessage.value = message;
    setTimeout(() => {
        showToast.value = false;
        toastMessage.value = "";
    }, 3000);
};
</script>

<template>
    <header class="flex items-center justify-center p-4">
        <h1 class="text-primary font-bold text-[20px]">Busy or Not?</h1>
        <ThemeController class="fixed right-4"></ThemeController>
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
        <button
            :disabled="!selectedPlace || !selectedDayTime"
            @click="handleClick()"
            class="btn btn-primary"
        >
            Get Traffic
        </button>
    </main>
    <div class="flex flex-row justify-center items-center p-4 gap-2 rounded-lg">
        <InfoCard
            v-if="selectedDayTime && selectedPlace"
            @showToast="handleShowToast"
            :btApiKey="btApiKey"
            :dayTime="selectedDayTime"
            :gpApiKey="gpApiKey"
            :place="selectedPlace"
            ref="info-card"
        ></InfoCard>
    </div>
    <PersonalInfoFooter class="fixed bottom-0"></PersonalInfoFooter>
    <div v-if="showToast && toastMessage" class="toast toast-top toast-end">
        <div class="alert alert-error">
            <span>{{ toastMessage }}</span>
        </div>
    </div>
</template>
