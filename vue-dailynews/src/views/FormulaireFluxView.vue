<script setup lang="ts">

import type {Flux} from "@/models/flux.ts";
import {reactive} from "vue";

const flux:Flux = reactive({
  title: '',
  url: ''
});

const onSubmit = ()=>{
  console.log(flux)
}
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
