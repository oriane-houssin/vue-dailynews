<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, type Ref, ref, watch} from "vue";
import type {Flux} from "@/models/flux.ts";

const route = useRoute();
const fluxList = JSON.parse(localStorage.getItem("fluxList") || "[]");
const flux = ref<Flux | null>(null);
const articles = ref<{title: string, description: string, image: string, link: string, favorite: boolean}[]>([]);
const limit = ref("10"); //valeur par défaut

const loadFavorites = () => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (!Array.isArray(savedFavorites)) return;

  // Marquer les articles correspondants comme favoris
  articles.value.forEach((article) => {
    article.favorite = savedFavorites.some((fav) => fav.link === article.link);
  });
};

const toggleFavorite = (article) => {
  article.favorite = !article.favorite;

  let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!Array.isArray(savedFavorites)) {
    savedFavorites = [];
  }

  if (article.favorite) {
    savedFavorites.push(article); // Ajouter l'article
  } else {
    savedFavorites = savedFavorites.filter((fav) => fav.link !== article.link); // Supprimer
  }

  localStorage.setItem("favorites", JSON.stringify(savedFavorites));
};

onMounted(async () => {
  const fluxIndex = Number(route.params.id);
  if (!fluxList[fluxIndex]) return;

  flux.value = fluxList[fluxIndex];

  try {
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(flux.value.url)}`);
    const data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const items = xml.querySelectorAll("item, entry");

    const allArticles = Array.from(items).map((item) =>{
      let imageUrl =
        item.querySelector("enclosure")?.getAttribute("url") ||
        item.querySelector("media\\:content")?.getAttribute("url") ||
        item.querySelector("image url")?.textContent ||
      "no image";

      return{
        title: item.querySelector("title")?.textContent || "",
        description: item.querySelector("description")?.textContent || "",
        image: imageUrl,
        link: item.querySelector("link")?.textContent || "#",
        favorite: false,
      }
    })
    articles.value = allArticles;
  } catch (error) {
    console.error("Erreur lors du chargement du Flux RSS :", error);
  }
  loadFavorites();
})

//Filtre de limite de résultats
const filteredArticles = () => {
  const max = limit.value === "all" ? articles.value.length : parseInt(limit.value);
  return articles.value.slice(0, max);
}
watch(articles, () => {
  const favorites = articles.value.filter((article) => article.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
});


</script>

<template>
  <div v-if="flux">
    <h2>{{flux.title}}</h2>
    <label for="limit">Afficher :</label>
    <select id="limit" v-model="limit">
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="all">all</option>
    </select>

    <ul v-if="filteredArticles().length>0">
      <li v-for="(article, index) in filteredArticles()" :key="index">
        <h3>{{article.title}}</h3>
        <a :href="article.link" target="_blank">Voir</a>
        <img :src="article.image" alt="Thumbnail de l'article" width="150"/>
        <p v-html="article.description"></p>
        <button @click="toggleFavorite(article)">
          {{ article.favorite ? "★ Retirer des favoris" : "☆ Ajouter aux favoris" }}
        </button>
      </li>
    </ul>
    <p v-else>Aucune news.</p>
  </div>
</template>

<style scoped>

</style>
