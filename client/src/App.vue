<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import GithubCorner from './components/GithubCorner.vue'
</script>

<template>
  <div>
    <Header />
    <GithubCorner url="https://github.com/alexdeploy" />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
</style>
