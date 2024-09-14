<script setup lang="ts">
import { ref, watchPostEffect } from "vue";

const emit = defineEmits(["callback"]);

const day = ref<string>("Monday");
const hour = ref<number>(1);
const meridien = ref<string>("PM");
watchPostEffect(() => {
    const standardizedHour = (hour.value % 12) + (meridien.value === "PM" ? 12 : 0);
    emit("callback", {
        day: days.indexOf(day.value),
        hour: standardizedHour,
    });
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
</script>

<template>
    <label class="form-control w-fit max-w-xs">
        <select v-model="day" class="select select-bordered">
            <template v-for="day in days">
                <option>{{ day }}</option>
            </template>
        </select>
    </label>

    <label class="form-control max-w-xs">
        <select v-model="hour" class="select select-bordered">
            <template v-for="i in 12">
                <option :value="i">{{ i }}</option>
            </template>
        </select>
    </label>

    <label class="form-control max-w-xs">
        <select v-model="meridien" class="select select-bordered">
            <option>AM</option>
            <option>PM</option>
        </select>
    </label>
</template>
