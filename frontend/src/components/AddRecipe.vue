<template>
  <!-- the form to add a new recipe -->
  <v-overlay
  :z-index="zIndex"
  :value="recipeTab">
    <v-card
      height="60vh"
      width="60vh"
      color="white"
      class="scrollable"
      >
      <v-btn
        fab
        @click="recipeTab = false"
        icon
        absolute
        right>
          <v-icon color="grey">mdi-close-circle-outline</v-icon>
      </v-btn>
      <v-card-title class="pa-10 grey--text text-subtitle">Complete the recipe details</v-card-title>
      <v-text-field
        class="mt-3 grey--text px-10"
        v-model="recipe.name"
        label="Name"
        required
        light
        :rules="[required]"
      ></v-text-field>
      <v-combobox
        v-model="selectedCategories"
        :items="categories"
        label="Category"
        multiple
        dense
        class="px-10"
        outlined
        light
        required
        :rules="[required]"
      ></v-combobox>
      <v-combobox
        v-model="selectedIngredients"
        label="Add ingredients (press enter to add an ingredient)"
        multiple
        chips
        append-icon=""
        deletable-chips
        outlined
        light
        no-filter
        class="px-10"
        required
        :rules="[required]"
      ></v-combobox>
      <v-textarea
        class="px-10"
        label="Directions (please add one direction per line)"
        v-model="recipe.directions"
        light
        required
        :rules="[required]"
      ></v-textarea>
      <div class="text-error px-10" v-html="error"/>
      <v-btn
        color="rgba(25,32,72,0.7)"
        dark
        align-center
        class="mx-4 mb-4"
        @click="addRecipe">
        <v-icon>mdi-plus</v-icon>
        Add
      </v-btn>
    </v-card>
  </v-overlay>
</template>

<script>
import RecipeService from '../services/RecipeService'

export default {
  data () {
    return {
      recipe: {
        name: '',
        ingredients: '',
        category: '',
        directions: ''
      }, // empty recipe where we will store the new recipe informations
      categories: ['Dinner', 'Breakfast', 'Healthy', 'Dessert', 'Pasta'], // all the categories
      selectedCategories: [], // the new recipe categories
      selectedIngredients: [], // the new recipe ingredients
      recipeTab: true,
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async addRecipe () {
      try {
        // check if all the fields are completed and add the new recipe in database
        this.recipe.category = this.selectedCategories.join()
        this.recipe.ingredients = this.selectedIngredients.join('#')
        this.error = null

        const areAllFieldsFilledIn = Object
          .keys(this.recipe)
          .every(key => !!this.recipe[key])

        if (!areAllFieldsFilledIn) {
          this.error = 'Please fill in all the required fields.'
          return
        }

        await RecipeService.post(this.recipe)
        this.recipeTab = false
        this.$router.go()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
.scrollable {
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

::-webkit-scrollbar {
  display: none;
}

.text-error {
  color: red;
}
</style>
