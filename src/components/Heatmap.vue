<script setup lang="ts">
import { computed } from "vue";
import { FootTraffic } from "../interfaces/FootTraffic";

const props = defineProps<{
    footTraffic: FootTraffic;
}>();

const busyCategories = {
    notBusy: {
        min: 1,
        max: 39,
        name: "Not busy",
        color: "#FFAFD2",
    },
    littleBusy: {
        min: 40,
        max: 69,
        name: "Little busy",
        color: "#FF50AA",
    },
    Busy: {
        min: 70,
        max: 500,
        name: "Busy",
        color: "#B40059",
    },
};

const hours = computed<{ open: number; close: number }>(() => {
    // Find longest opening hours of the week
    const openIx: number[] = [];
    const closeIx: number[] = [];

    props.footTraffic.analysis.forEach(function (item, _) {
        const venueOpen = item.day_info.venue_open;
        const venueClosed = item.day_info.venue_closed;

        if (`${venueOpen}` !== "Closed") {
            openIx.push(hourToIndex(venueOpen));
            closeIx.push(hourToIndex(venueClosed));
        }
    });

    let openIxMin = Math.min(...openIx);
    let closeIxMax = Math.max(...closeIx);

    if (openIxMin > closeIxMax || openIxMin == closeIxMax) {
        // Do not slice if open hour has greater index value than close (e.g. close and opens midnight)
        openIxMin = 0;
        closeIxMax = 23;
    } else {
        // Adjust
        // open_ix_min = 0;
        closeIxMax = closeIxMax;
    }

    return { open: openIxMin, close: closeIxMax };
});

const series = computed(() => {
    return [
        {
            name: "Sun",
            data: props.footTraffic.analysis[6].day_raw.slice(hours.value.open, hours.value.close),
        },
        {
            name: "Sat",
            data: props.footTraffic.analysis[5].day_raw.slice(hours.value.open, hours.value.close),
        },
        {
            name: "Fri",
            data: props.footTraffic.analysis[4].day_raw.slice(hours.value.open, hours.value.close),
        },
        {
            name: "Thu",
            data: props.footTraffic.analysis[3].day_raw.slice(hours.value.open, hours.value.close),
        },
        {
            name: "Wed",
            data: props.footTraffic.analysis[2].day_raw.slice(hours.value.open, hours.value.close),
        },
        {
            name: "Tue",
            data: props.footTraffic.analysis[1].day_raw.slice(hours.value.open, hours.value.close),
        },
        {
            name: "Mon",
            data: props.footTraffic.analysis[0].day_raw.slice(hours.value.open, hours.value.close),
        },
    ];
});

const options = computed(() => {
    return {
        chart: {
            height: 350,
            type: "heatmap",
        },
        legend: {
            labels: {
                colors: "#D7DDE4",
            },
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                // radius: 10,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [
                        {
                            from: busyCategories.notBusy.min,
                            to: busyCategories.notBusy.max,
                            name: busyCategories.notBusy.name,
                            color: busyCategories.notBusy.color,
                        },
                        {
                            from: busyCategories.littleBusy.min,
                            to: busyCategories.littleBusy.max,
                            name: busyCategories.littleBusy.name,
                            color: busyCategories.littleBusy.color,
                        },
                        {
                            from: busyCategories.Busy.min,
                            to: busyCategories.Busy.max,
                            name: busyCategories.Busy.name,
                            color: busyCategories.Busy.color,
                        },
                    ],
                },
            },
        },
        dataLabels: {
            enabled: false,
            formatter: function (val: any) {
                return val + "%";
            },
        },
        xaxis: {
            labels: {
                rotate: 90,
                rotateAlways: true,
                trim: false,
                hideOverlappingLabels: true,
                //min: 4, //clip x-axis based on category index
                //max: 10,
                offsetY: 25,
                style: {
                    colors: "#D7DDE4",
                },
            },
            categories: [
                "6AM",
                "7AM",
                "8AM",
                "9AM",
                "10AM",
                "11AM",
                "12PM",
                "1PM",
                "2PM",
                "3PM",
                "4PM",
                "5PM",
                "6PM",
                "7PM",
                "8PM",
                "9PM",
                "10PM",
                "11PM",
                "12AM",
                "1AM",
                "2AM",
                "3AM",
                "4AM",
                "5AM",
            ].slice(hours.value.open, hours.value.close),
            tickPlacement: "between", // 'on'
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#D7DDE4",
                },
            },
        },
        axisTicks: {
            show: true,
            borderType: "solid",
            color: "#D7DDE4",
            height: 6,
            offsetX: 0,
            offsetY: 0,
        },
        stroke: {
            width: 1,
        },
        title: {
            text: `Traffic Forecast for ${props.footTraffic.venue_info.venue_name}`,
            style: {
                color: "#D7DDE4",
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
            y: {
                //@ts-ignore
                formatter: function (value: string, { series, seriesIndex, dataPointIndex, w }) {
                    return `${value}%`;
                },
            },
            fixed: {
                enabled: false,
                position: "topLeft",
                offsetX: 0,
                offsetY: 0,
            },
        },
    };
});

const hourToIndex = (hour: number) => {
    return hour >= 6 && hour <= 23 ? hour - 6 : hour + 18;
};
</script>

<template>
    <div class="flex-[0.6]">
        <apexchart
            height="600"
            width="800"
            type="heatmap"
            :options="options"
            :series="series"
        ></apexchart>
    </div>
</template>
