<script setup lang="ts"></script>

<template>
    <div class="card bg-base-100 shadow-xl p-4 rounded-lg w-full">
        <div class="flex flex-row justify-between items-center gap-4">
            <div class="flex-1">
                <h2 class="card-title">Day Forecast</h2>
                <p>Display the specific time information</p>
            </div>
            <div class="flex-[0.6]">
                <h2 class="text-lg font-semibold">Week Forecast</h2>
                <div class="h-24 w-full border-2 border-gray-400 flex justify-center items-center">
                    <p>Heat Graph</p>
                </div>
            </div>
        </div>
    </div>
</template>
