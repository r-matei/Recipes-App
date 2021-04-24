<template>
  <div>
    <v-toolbar
      class="ma-0 pa-0"
      color="rgba(25,32,72,0)"
      align="center">
      <v-row justify="center" align="center">
        <v-toolbar-title class="white--text text-h5 font-weight-bold">{{ recipe.name }}</v-toolbar-title>
        <v-btn icon>
          <v-icon color="white">mdi-square-edit-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="white">mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-row>
    </v-toolbar>
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
export default {
  props: ['recipe'],
  computed: {
    ingredientsArray: function () {
      return this.recipe.ingredients.split('#')
    },
    directionsArray: function () {
      return this.recipe.directions.split('#')
    }
  }
}
</script>

<style>
.block {
  display: block;
}

</style>
