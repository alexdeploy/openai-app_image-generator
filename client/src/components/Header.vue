<template>
  <header>
    <GithubCorner url="https://github.com/alexdeploy/openai-app_image-generator" />
    <nav class="w-full h-14 flex justify-between p-3 shadow-sm">
        <div class="logo">
          <a href="">Logo</a>
        </div>
        <div class="nav-links">
            <a href="">Docs</a>
        </div>
    </nav>
  </header>
</template>

<script>
import GithubCorner from './GithubCorner.vue'

export default {
    name: 'Header',
    components: {
        GithubCorner
    }
}
</script>

<style>

</style>