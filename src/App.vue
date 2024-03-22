<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <section id="titre">
      <!-- titre (lien vers la page d'accueil) -->
      <h1><RouterLink to="/">Filmothèque</RouterLink></h1>
    </section>
    <!-- navigation -->
    <nav>
      <!-- pour la liste de liens on utilise des : <RouterLink> (balise VueJS qui va générer des balises <a> -->
      <ul>
        <li><RouterLink to="/films">Films</RouterLink></li>
        <li><RouterLink to="/genres">Genres</RouterLink></li>
        <li><RouterLink to="/participants">Participants</RouterLink></li>
      </ul>
    </nav>
  </header>
  <main>
    <!--  <RouterView /> va être remplacé avec le template du composant VueJS
      correspondant à l'url
    -->
    <RouterView />
  </main>
</template>
