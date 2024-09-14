<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        apiKey: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: "",
        },
        class: {
            type: String,
            default: "",
        },
    },
    emits: ["update:modelValue", "callback"],
    setup(props, { emit }) {
        const autocompleteInput = ref<HTMLElement | null>(null);
        let scriptLoaded = false;

        function loadGoogleMapsScript() {
            return new Promise<void>((resolve, reject) => {
                if (window.google && window.google.maps && window.google.maps.places) {
                    resolve();
                } else {
                    if (!scriptLoaded) {
                        scriptLoaded = true;
                        const googleMapsScript = document.createElement("script");
                        googleMapsScript.setAttribute(
                            "src",
                            `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places&callback=initMap`
                        );

                        window.initMap = () => {
                            resolve();
                        };

                        googleMapsScript.onerror = (error) => {
                            reject(error);
                        };

                        document.head.appendChild(googleMapsScript);
                    }
                }
            });
        }

        onMounted(async () => {
            try {
                await loadGoogleMapsScript();
                // Ensuring DOM has been updated before setupAutocomplete is called
                await nextTick();
                setupAutocomplete();
            } catch (error) {
                console.error("Failed to load Google Maps API", error);
            }
        });

        onBeforeUnmount(() => {
            delete window.initMap;
        });

        function setupAutocomplete() {
            if (autocompleteInput.value) {
                const options = {
                    fields: ["name", "formatted_address", "opening_hours"],
                };
                const autocomplete = new google.maps.places.Autocomplete(
                    autocompleteInput.value,
                    options
                );

                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();

                    emit("update:modelValue", place.formatted_address);
                    emit("callback", place);
                });
            }
        }

        return { autocompleteInput };
    },
});
</script>

<template>
    <label class="input input-bordered flex items-center gap-2 w-full">
        <input
            :class="class"
            :placeholder="placeholder"
            autocomplete="off"
            ref="autocompleteInput"
            type="text"
        />
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
