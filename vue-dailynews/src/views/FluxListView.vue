<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Flux} from "@/models/flux.ts";
import FormulaireFluxView from "@/views/FormulaireFluxView.vue";

const fluxList = ref<Flux[]>([])
const fluxToEdit = ref<Flux | null>(null)
const editIndex = ref<number | null>(null)

//Charger la liste des flux
const loadFluxList = () => {
  fluxList.value = JSON.parse(localStorage.getItem("fluxList") || "[]");
}

// Ajouter ou modifier un flux
const saveFlux = (flux: Flux) => {
  if (editIndex.value !== null) {
    // Modifier un flux existant
    fluxList.value[editIndex.value] = flux;
    editIndex.value = null;
  } else {
    // Ajouter un nouveau flux
    fluxList.value.push(flux);
  }

  // Enregistrer la liste mise à jour dans le localStorage
  localStorage.setItem("fluxList", JSON.stringify(fluxList.value));

  // Réinitialiser la sélection
  fluxToEdit.value = null;
};

// Sélectionner le flux à modifier
const editFlux = (index: number) => {
  fluxToEdit.value = { ...fluxList.value[index] };
  editIndex.value = index;
};

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
  <FormulaireFluxView :fluxToEdit="fluxToEdit" @flux-updated="saveFlux"/>
  <ul v-if="fluxList.length > 0">
    <li v-for="(item, index) in fluxList" :key="index">
      <a :href="item.url" target="_blank">
        <h4>{{item.title}}</h4>
      </a>
      <button @click="editFlux(index)">Modifier</button>
      <button @click="deleteFlux(index)">Suprimer</button>
    </li>
  </ul>
</div>
</template>

<style scoped>

</style>
