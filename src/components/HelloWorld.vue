<script setup lang="ts">
const props = defineProps({ msg: String });
</script>
<template>
    <div class="card bg-neutral text-neutral-content w-96">
        <div class="card-body items-center text-center">
            <h2 class="card-title">Busy or not!?</h2>
            <p>{{ props.msg }}</p>
        </div>
    </div>
</template>
