<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Flux} from "@/models/flux.ts";

const fluxList = ref<Flux[]>([])

//Charger la liste des flux
const loadFluxList = () => {
  const savedFluxList = JSON.parse(localStorage.getItem("fluxList") || "[]");
  fluxList.value = savedFluxList;
}

//Supprimer un flux
const deleteFlux = (index: number) => {
  fluxList.value.splice(index, 1);
  localStorage.setItem("fluxList", JSON.stringify(fluxList.value));
}

onMounted(() => {
  loadFluxList();
})
</script>

<template>
<div>
  <h2>Liste des Flux RSS</h2>
  <ul v-if="fluxList.length > 0">
    <li v-for="(item, index) in fluxList" :key="index">
      <a :href="item.url" target="_blank">
        <h4>{{item.title}}</h4>
      </a>
      <button @click="deleteFlux(index)">Suprimer</button>
    </li>
  </ul>
</div>
</template>

<style scoped>

</style>
