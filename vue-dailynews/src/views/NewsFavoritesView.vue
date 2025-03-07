<script setup lang="ts">

import {onMounted, ref} from "vue";

const favorites = ref([]);

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem("favorites")) || [];
})

</script>

<template>
  <div>
    <h2>Articles Favoris</h2>
    <ul v-if="favorites.length>0">
      <li v-for="(article, index) in favorites" :key="index">
        <h3>{{article.title}}</h3>
        <a :href="article.link" target="_blank">Voir</a>
        <img :src="article.image" alt="Thumbnail de l'article" width="150"/>
        <p v-html="article.description"></p>
      </li>
    </ul>
    <p v-else>Aucun favoris</p>
  </div>
</template>

<style scoped>

</style>
