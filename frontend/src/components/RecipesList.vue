<template>
  <div>
    <v-toolbar
      class="ma-0 pa-0"
      color="rgba(25,32,72,0.7)"
      align="center">
      <v-row justify="center" align="center">
        <v-toolbar-title class="white--text text-h5 font-weight-bold">Recipes</v-toolbar-title>
        <v-btn icon>
          <v-icon color="white">mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-row>
    </v-toolbar>
    <v-list dense two-line class="ma-0 pa-0 scrollable">
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

export default {
  props: ['recipes'],
  methods: {
    selectRecipe (recipe) {
      this.$emit('selectedRecipe', recipe)
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
