<script setup lang="ts">
import { ref } from "vue";
import GoogleAddressAutocomplete from "./components/GooglePlacesAutocomplete.vue";
import ThemeController from "./components/ThemeController.vue";
import { GooglePlace } from "./interfaces/GooglePlace";

const apiKey = "";
const query = ref<string>("");
const queryCallback = (place: GooglePlace) => {
    console.log(place);
};
</script>

<template>
    <header class="flex items-center p-4">
        <ThemeController class="ml-auto"></ThemeController>
    </header>
    <main class="flex flex-col items-center w-full p-4">
        <GoogleAddressAutocomplete
            @callback="queryCallback"
            :apiKey="apiKey"
            class="grow"
            placeholder="Search for a place..."
            v-model="query"
        ></GoogleAddressAutocomplete>
    </main>
</template>
