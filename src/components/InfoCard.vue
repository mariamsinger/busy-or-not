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

const emit = defineEmits<{
    (e: "showToast", message: string): void;
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
const hourAnalysis = computed(() => {
    if (dayAnalysis.value) {
        return dayAnalysis.value.hour_analysis[hourToIndex(props.dayTime.hour)];
    }
});
const placeHours = computed(() => {
    return props.place.opening_hours.weekday_text;
});

const getReadableTime = (time: number) => {
    return `${((time + 11) % 12) + 1}${time >= 12 ? "PM" : "AM"}`;
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
                if (data.status === "Error") {
                    loading.value = false;
                    emit("showToast", data.message);
                } else {
                    initialized.value = true;
                    loading.value = false;
                    footTraffic.value = data;
                }
            });
    }, 500);
};

const hourToIndex = (hour: number) => {
    return hour >= 6 && hour <= 23 ? hour - 6 : hour + 18;
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
                <h2 class="card-title mb-4">
                    Day Forecast: {{ dayAnalysis.day_info.day_text }} @ {{ readableTime }}
                </h2>
                <div v-if="hourAnalysis" class="flex flex-row">
                    <div
                        class="badge badge-primary p-6 gap-2"
                        v-if="hourAnalysis.intensity_nr === 999"
                    >
                        <span class="text-transform: uppercase font-bold"
                            >No info available...</span
                        >
                        <span class="material-symbols-outlined text-[40px]">
                            sentiment_dissatisfied
                        </span>
                    </div>
                    <div v-else class="badge badge-primary p-6 gap-2">
                        <span class="text-transform: uppercase font-bold">{{
                            hourAnalysis.intensity_txt
                        }}</span>

                        <span
                            v-for="_ in hourAnalysis.intensity_nr! + 3"
                            class="material-symbols-outlined text-[40px]"
                            >boy
                        </span>
                    </div>
                </div>
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
                <p>{{ placeHours ? placeHours[selectedDay] : "No info available..." }}</p>
            </div>
            <Heatmap :footTraffic="footTraffic!"></Heatmap>
        </div>
    </div>
</template>
