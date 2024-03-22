<script setup>
import { ref, onMounted } from 'vue'
import axios from "axios";

// modèle accessible via mon template
// pour créer des variables de mon modèle, 
// j'ai JUSTE à créer des variables javascript qui prennent une valeur ref(valeur_initiale)
// qensuite, je peux accéder à cette valeur dans le template via {{nom_variable}}
const listeGenres = ref([])
const genre = ref({titre:''})

/**
 * function creer()
 * c'est ici que je vais appeler l'API (via la librairie axios) pour creer un Genre
 * si on utilise await dans notre fonction, il faut la prefixer avec : async
 */
async function  creer() {
  // j'appelle l'API avec le genre de mon modèle mis à jour via mon formulaire
  // note : on utilise await afin d'attendre la réponse de la requête avant d'executer la ligne suivante
  await axios.post('http://localhost:8080/api/genres', genre.value)

  // une fois que j'ai créé un genre
  // je vide le formulaire
  genre.value = {titre:''}
  // je recharge la liste
  init()
}

/**
 * function supprimer()
 * c'est ici que je vais appeler l'API (via la librairie axios) pour supprimer un Genre
 * si on utilise await dans notre fonction, il faut la prefixer avec : async
 */
async function  supprimer(genreId) {
  // j'appelle l'API avec l'id du genre a supprimer
  // note : on utilise await afin d'attendre la réponse de la requête avant d'executer la ligne suivante
  await axios.delete('http://localhost:8080/api/genres/' + genreId)

  // une fois que j'ai supprimé le genre => je recharge la liste
  init()
}

/**
 * function init()
 * c'est ici que je vais appeler l'API (via la librairie axios) pour aller chercher la liste des genres
 * si on utilise await dans notre fonction, il faut la prefixer avec : async
 */
async function init(){
  // j'appelle l'API
  // note : on utilise await afin d'attendre la réponse de la requête avant d'executer la ligne suivante
  const reponse = await axios.get('http://localhost:8080/api/genres')

  // je met à jour mon modèle listeGenres avec les données de l'api
  // note2 : on doit faire .value pour mettre à jour une variable de notre modèle
  listeGenres.value = reponse.data;
}

// lifecycle hooks
onMounted(() => {
  init()
})
</script>

<template>
  <h1>Gestion des genres</h1>

<!--  je garde juste la balise form pour des raisons sémantiques-->
  <form>
    <div class="form-element">
      <label>Titre</label>
      <!-- au lieu de  th:field="*{titre}", on va mettre v-model="genre.titre"-->
      <input type="text" v-model="genre.titre">
    </div>
    <div class="form-element">
      <!--  quand on clique sur le bouton, ca appelle une méthode "créer"-->
      <button type="button" @click="creer">Valider</button>
    </div>

  </form>

  <!--
      On affiche la section des genres de l'ENI
      que si celle-ci est non-vide (th:if="${!listeGenres.isEmpty()}")
  -->
  <h2 v-if="listeGenres.length == 0">Aucun genre pour le moment...</h2>
  <section v-if="listeGenres.length > 0">
    <h1>Liste des Genres</h1>

    <table>
      <thead>
      <!-- ligne d'entête de ma table -->
      <tr>
        <th>Id</th>
        <th>Titre</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <!--
          à la place de th:each, on utilise v-for
          https://vuejs.org/guide/essentials/list.html
      -->
      <tr v-for="genre in listeGenres">
        <td>{{genre.id}}</td>
        <td>{{genre.titre}} </td>
        <!-- bouton de suppression vers la page /genres/{id} -->
        <td>
          <button @click="supprimer(genre.id)" class="delete-button">✗</button>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>