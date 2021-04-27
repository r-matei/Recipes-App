<template>
  <div>
    <!-- show the form for a new recipe when the add button is clicked -->
    <add-recipe v-if="recipeTab"/>
    <!-- toolbar with the list title and add button for a new recipe -->
    <v-toolbar
      class="ma-0 pa-0"
      color="rgba(25,32,72,0.7)"
      align="center">
      <v-row justify="center" align="center">
        <v-toolbar-title class="white--text text-h5 font-weight-bold">Recipes</v-toolbar-title>
        <v-btn icon @click="recipeTab = !recipeTab">
          <v-icon color="white">mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-row>
    </v-toolbar>
    <!-- list with all recipes -->
    <v-list height="35vh" dense two-line class="ma-0 pa-0 scrollable">
      <v-list-item-group
        color="rgba(25,32,72,.7)"
      >
        <v-list-item
          v-for="(recipe, i) in recipes"
          :key="i"
          @click="selectRecipe(recipe)"
        >
          <v-list-item-content>
            <v-list-item-title
              v-text="recipe.name"
              class="text-subtitle-1"
              ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import AddRecipe from './AddRecipe'

export default {
  components: {
    AddRecipe
  },
  data () {
    return {
      newRecipe: {}, // store the new recipe informations
      recipeTab: false
    }
  },
  props: ['recipes'], // the recipes from Recipes.vue component
  methods: {
    selectRecipe (recipe) {
      this.$emit('selectedRecipe', recipe) // send to the main component when we select a recipe
    }
  }
}
</script>

<style>
.scrollable {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

::-webkit-scrollbar {
  display: none;
}
</style>
