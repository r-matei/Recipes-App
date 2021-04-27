<template>
  <!-- the form to edit a recipe -->
  <v-overlay
    :z-index="zIndex"
    :value="tab">
    <v-card
      height="60vh"
      width="60vh"
      color="white"
      class="scrollable"
      >
      <v-btn
        fab
        @click="tab = false"
        icon
        absolute
        right>
          <v-icon color="grey">mdi-close-circle-outline</v-icon>
        </v-btn>
        <v-card-title class="pa-10 grey--text text-subtitle">Edit the recipe details</v-card-title>
        <v-text-field
          class="mt-3 grey--text px-10"
          v-model="recipe.name"
          label="Name"
          required
          light
          :rules="[required]">
        </v-text-field>
        <v-combobox
          v-model="selectedCategories"
          :items="categories"
          label="Category"
          multiple
          dense
          class="px-10 py-5"
          outlined
          light
        ></v-combobox>
        <v-combobox
          v-model="selectedIngredients"
          :items="selectedIngredients"
          label="Edit ingredients (press enter to add an ingredient)"
          multiple
          chips
          deletable-chips
          outlined
          light
          no-filter
          class="px-10 py-5"
        ></v-combobox>
        <v-textarea
          class="px-10"
          label="Directions (please add one direction per line)"
          v-model="recipe.directions"
          light>
        </v-textarea>
        <div class="text-error px-10" v-html="error"/>
        <v-btn
          color="rgba(25,32,72,0.7)"
          dark
          align-center
          class="mx-4 mb-4"
          @click="updateRecipe">
          <v-icon>mdi-plus</v-icon>
          Update
        </v-btn>
    </v-card>
  </v-overlay>
</template>

<script>
import RecipeService from '../services/RecipeService'

export default {
  data () {
    return {
      recipe: {}, // the recipe we want to edit
      categories: ['Dinner', 'Breakfast', 'Healthy', 'Dessert', 'Pasta'], // all the categories
      selectedCategories: [], // the edited recipe categories
      selectedIngredients: [], // the edited recipe ingredients
      error: null,
      required: (value) => !!value || 'Required.',
      tab: 'true'
    }
  },
  async mounted () {
    // take from the local storage the selected recipe
    if (localStorage.getItem('selectedRecipe')) {
      this.recipe = JSON.parse(localStorage.getItem('selectedRecipe'))
    }
    this.selectedCategories = this.recipe.category.split(',')
    this.selectedIngredients = this.recipe.ingredients.split('#')
  },
  methods: {
    async updateRecipe () {
      try {
        // check if all the fields are completed and update the recipe in database
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

        await RecipeService.put(this.recipe)
        this.tab = false
        // update the local storage selected recipe
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
