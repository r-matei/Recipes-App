<template>
  <v-overlay
    :z-index="zIndex"
    :value="tab">
    <v-card
      height="60vh"
      width="60vh"
      color="white"
      >
      <v-btn
        fab
        @click="tab = false"
        icon
        absolute
        right>
          <v-icon color="grey">mdi-close-circle-outline</v-icon>
        </v-btn>
        <v-card-title class="pa-10 grey--text text-subtitle">Complete the report details</v-card-title>
        <v-text-field
          class="mt-3 grey--text px-10"
          v-model="recipe.name"
          label="Name"
          required
          light
          :rules="[required]">
        </v-text-field>
        <v-text-field
          class="mt-3 grey--text px-10"
          v-model="recipe.ingredients"
          label="Ingredients"
          required
          light
          :rules="[required]">
        </v-text-field>
        <v-text-field
          class="mt-3 grey--text px-10"
          v-model="recipe.type"
          label="Type"
          required
          light
          :rules="[required]">
        </v-text-field>
        <v-text-field
          class="mt-3 grey--text px-10"
          v-model="recipe.directions"
          label="Directions"
          required
          light
          :rules="[required]">
        </v-text-field>
        <div class="text-error px-10" v-html="error"/>
        <v-btn
          color="rgba(25,32,72,0.7)"
          dark
          absolute
          right
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
      recipe: {},
      recipes: [],
      error: null,
      required: (value) => !!value || 'Required.',
      tab: 'true'
    }
  },
  props: ['id'],
  async mounted () {
    this.recipes = (await RecipeService.index()).data
    this.recipe = this.recipes[this.id - 1]
  },
  methods: {
    async updateRecipe () {
      try {
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
        localStorage.setItem('selectedRecipe', JSON.stringify(this.recipe))
        this.$router.go()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
