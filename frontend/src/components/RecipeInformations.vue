<template>
  <div>
    <!-- show the form to edit a recipe when the edit button is clicked -->
    <edit-recipe v-if="recipeTab"/>
    <!-- show all the informations about the selected recipe -->
    <v-row class="mt-4 pa-0" justify="center" align="center">
      <v-text class="white--text text-h5 font-weight-bold">{{ recipe.name }}</v-text>
      <v-btn icon @click="recipeTab = !recipeTab">
        <v-icon color="white">mdi-square-edit-outline</v-icon>
      </v-btn>
      <v-btn icon @click="remove">
        <v-icon color="white">mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row class="ml-10 mt-7">
      <v-col align="start" cols="12">
        <v-text class="white--text text-h6">Ingredients:</v-text>
        <div
          v-for="ingredient in ingredientsArray"
          :key="ingredient"
          class="block">
          <v-icon color="white">mdi-circle-small</v-icon>
          <v-text class="white--text"> {{ ingredient }}</v-text>
        </div>
        <br>
        <v-text class="white--text text-h6">Categories:</v-text>
        <v-text class="white--text">{{ recipe.category }}</v-text>
        <br>
        <v-text class="white--text text-h6">Directions:</v-text>
        <div
          v-for="direction in directionsArray"
          :key="direction"
          class="block">
          <v-icon color="white">mdi-circle-small</v-icon>
          <v-text class="white--text"> {{ direction }}</v-text>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EditRecipe from './EditRecipe'
import RecipeService from '../services/RecipeService'

export default {
  data () {
    return {
      recipeTab: false
    }
  },
  components: {
    EditRecipe
  },
  props: ['recipe'], // the selected recipe from parent component
  computed: {
    id: function () {
      return this.recipe.id
    },
    ingredientsArray: function () {
      return this.recipe.ingredients.split('#')
    },
    directionsArray: function () {
      return this.recipe.directions.split('\n')
    }
  },
  methods: {
    // remove recipe
    async remove () {
      try {
        await RecipeService.delete(this.recipe.id)
        // delete the selected recipe from local storage
        this.recipe = null
        localStorage.setItem('selectedRecipe', JSON.stringify(this.recipe))
        this.$router.go()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
.block {
  display: block;
}

</style>
