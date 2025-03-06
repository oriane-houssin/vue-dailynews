<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import type {Flux} from "@/models/flux.ts";

const fluxList = ref<Flux[]>([]);

//Chargement des flux
const loadFluxList = () => {
  fluxList.value = JSON.parse(localStorage.getItem("fluxList") || "[]").filter((flux: Flux) => flux.favorite);
}

onMounted(() => {
  loadFluxList();
})

//MAJ si modifié ailleurs
watch(() => localStorage.getItem("fluxList"), () => {loadFluxList()})
</script>

<template>
  <div>
    <h2>Vos favoris</h2>
    <ul v-if="fluxList.length>0">
      <li v-for="(item, index) in fluxList" :key="index">
        <a :href="item.url" target="_blank">
          <h4>{{item.title}}</h4>
        </a>
      </li>
    </ul>
    <h4 v-else>Aucun favoris</h4>
  </div>
</template>

<style scoped>

</style>
