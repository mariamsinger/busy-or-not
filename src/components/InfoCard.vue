<script setup lang="ts">
import { ref } from "vue";
import { DayTime } from "../interfaces/DayTime";
import { FootTraffic } from "../interfaces/FootTraffic";
import { Place } from "../interfaces/Place";
import Heatmap from "./Heatmap.vue";

const props = defineProps<{
    gpApiKey: string;
    btApiKey: string;
    place: Place;
    dayTime: DayTime;
}>();

const initialized = ref<boolean>(false);
const loading = ref<boolean>(false);

const getFootTrafficData = () => {
    const params = new URLSearchParams({
        api_key_private: props.btApiKey,
        venue_name: props.place.name,
        venue_address: props.place.formatted_address,
    });

    loading.value = true;
    setTimeout(() => {
        fetch(`https://besttime.app/api/v1/forecasts?${params}`, {
            method: "POST",
        })
            .then((response) => response.json())
            .then((data: FootTraffic) => {
                initialized.value = true;
                loading.value = false;
            });
    }, 500);
};

defineExpose({ getFootTrafficData });
</script>

<template>
    <div class="card bg-base-100 shadow-xl p-4 rounded-lg w-full">
        <div v-if="!initialized && loading" class="flex items-center justify-center">
            <span class="loading loading-spinner text-primary"> </span>
        </div>
        <div
            v-else-if="initialized && !loading"
            class="flex flex-row justify-between items-center gap-4"
        >
            <div class="flex-1">
                <h2 class="card-title">Day Forecast</h2>
                <p>Display the specific time information</p>
            </div>
            <Heatmap></Heatmap>
        </div>
    </div>
</template>
