<script setup lang="ts">
import { ref } from "vue";
import GoogleAddressAutocomplete from "./components/GooglePlacesAutocomplete.vue";
import { GooglePlace } from "./interfaces/GooglePlace";

const apiKey = "";
const query = ref<string>("");
const queryCallback = (place: GooglePlace) => {
    console.log(place);
};
</script>

<template>
    <label class="input input-bordered flex items-center gap-2">
        <GoogleAddressAutocomplete
            @callback="queryCallback"
            :apiKey="apiKey"
            class="grow"
            placeholder="Search for a place..."
            v-model="query"
        ></GoogleAddressAutocomplete>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
        >
            <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
            />
        </svg>
    </label>
</template>
