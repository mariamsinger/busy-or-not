<script setup lang="ts">
import { ref } from "vue";
import GoogleAddressAutocomplete from "./components/GooglePlacesAutocomplete.vue";
import ThemeController from "./components/ThemeController.vue";
import SelectTime from "./components/SelectTime.vue";
import { GooglePlace } from "./interfaces/GooglePlace";
import { DayTime } from "./interfaces/DayTime";

const apiKey = "AIzaSyCEMuCbz0M1BBy6axO42nV5PkBhvB6gvjU";
const query = ref<string>("");
const selectedTime = ref<DayTime | undefined>(undefined);
const queryCallback = (place: GooglePlace) => {
    console.log(place);
};
</script>

<template>
    <header class="flex items-center p-4">
        <ThemeController class="ml-auto"></ThemeController>
    </header>
    <main class="flex items-center w-full p-4 gap-2">
        <GoogleAddressAutocomplete
            @callback="queryCallback"
            :apiKey="apiKey"
            class="grow"
            placeholder="Search for a place..."
            v-model="query"
        ></GoogleAddressAutocomplete>
        <SelectTime @callback="" v-model="selectedTime"></SelectTime>
    </main>
</template>
