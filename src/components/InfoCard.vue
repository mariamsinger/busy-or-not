<script setup lang="ts">
import { computed, ref } from "vue";
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

const footTraffic = ref<FootTraffic | undefined>(undefined);
const initialized = ref<boolean>(false);
const loading = ref<boolean>(false);

const readableTime = computed(() => {
    return getReadableTime(props.dayTime.hour);
});
const selectedDay = computed(() => {
    return props.dayTime.day;
});
const dayAnalysis = computed(() => {
    if (footTraffic.value) {
        return footTraffic.value.analysis[selectedDay.value];
    }
});
const placeHours = computed(() => {
    return props.place.opening_hours.weekday_text;
});

const getReadableTime = (time: number) => {
    return `${((time + 11) % 12) + 1}${props.dayTime.meridien}`;
};

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
                footTraffic.value = data;
            });
    }, 500);
};

defineExpose({ getFootTrafficData });
</script>

<template>
    <div class="card bg-base-100 shadow-xl p-4 rounded-lg w-full">
        <div v-if="!initialized && loading" class="flex items-center justify-center">
            <span class="loading loading-spinner text-primary"></span>
        </div>
        <div
            v-else-if="initialized && !loading && dayAnalysis"
            class="flex flex-row justify-between items-center gap-4"
        >
            <div class="card-body">
                <h2 class="card-title">
                    Day Forecast: {{ dayAnalysis.day_info.day_text }} @ {{ readableTime }}
                </h2>
                <p>
                    Busy hours:
                    <template v-if="dayAnalysis.busy_hours.length">
                        <span v-for="(hour, index) in dayAnalysis.busy_hours" :key="index">{{
                            index !== 0 ? `, ${getReadableTime(hour)}` : getReadableTime(hour)
                        }}</span>
                    </template>
                    <span v-else>No info available...</span>
                </p>
                <p>
                    Quiet hours:
                    <template v-if="dayAnalysis.quiet_hours.length">
                        <span v-for="(hour, index) in dayAnalysis.quiet_hours" :key="index">{{
                            index !== 0 ? `, ${getReadableTime(hour)}` : getReadableTime(hour)
                        }}</span>
                    </template>
                    <span v-else>No info available...</span>
                </p>
                <p>
                    Open/Close: {{ placeHours ? placeHours[selectedDay] : "No info available..." }}
                </p>
            </div>
            <Heatmap></Heatmap>
        </div>
    </div>
</template>
