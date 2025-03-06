<script setup lang="ts">

import type {Flux} from "@/models/flux.ts";
import {reactive} from "vue";

const flux:Flux = reactive({
  title: '',
  url: ''
});

const onSubmit = ()=>{
  console.log(flux)
  console.log(testUrl(flux.url))

  //Vérification de l'url, si non validé => message d'erreur
  if (!testUrl(flux.url)) {
    alert("L'URL saisie n'est pas valide !");
    return;
  }

  // Enregistrement des données dans le local storage
  localStorage.setItem("fluxData", JSON.stringify(flux));
  console.log("Données enregistrées :", flux);
};

//Système de vérification de l'url avec une Regex
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
const testUrl = (url: string) => urlRegex.test(url);

</script>

<template>
  <form @submit.prevent="onSubmit">
    <label for="title">Titre</label>
    <input type="text" id="title" name="title" placeholder="Entrez le titre..." v-model="flux.title" required />
    <label for="url">Lien</label>
    <input type="url" id="url" name="url" placeholder="Entrez l'URL..." v-model="flux.url" required />
    <button type="submit">Enregistrer le flux</button>
  </form>
</template>

<style scoped>

</style>
