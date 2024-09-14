<script setup lang="ts">
import { ref } from "vue";
import GoogleAddressAutocomplete from "vue3-google-address-autocomplete";

const query = ref("");

const queryCallback = (place: any) => {
    console.log(place);
};
</script>
<template>
    <div class="input input-bordered flex items-center gap-2">
        <GoogleAddressAutocomplete
            @callback="queryCallback"
            apiKey="API_KEY"
            class="grow"
            placeholder="Search for a place..."
            v-model="query"
        ></GoogleAddressAutocomplete>
    </div>
</template>
