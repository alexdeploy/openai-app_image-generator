<template>
    <section class="hero flex flex-col">
        <ImageGenerator />
        <Examples />
    </section>
</template>

<script>
import ImageGenerator from '../ImageGenerator.vue';
import Examples from '../Examples.vue';

export default {
    name: 'Hero',
    components: {
        ImageGenerator,
        Examples
    }
}
</script>

<style>

</style>