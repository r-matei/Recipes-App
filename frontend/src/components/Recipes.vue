<template>
  <v-row>
    <v-col cols="12" align="center">
      <v-img
        :src="banner.url"
        :alt="banner.alt"
        height="30vh"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"></v-img>
        <p class="banner-title">Recipes for all your family</p>
        <div class="search-bar">
          <v-text-field
            label="Search by ingredients"
            v-model="search"
            solo
          ></v-text-field>
        </div>
        <v-card
          width="150vh"
          height="45vh"
          class="mt-10">
          <v-row class="ma-0">
            <v-col cols=4 class="pa-0">
              <recipes-list :recipes="filteredRecipes" @selectedRecipe="selectRecipe"/>
            </v-col>
            <v-divider></v-divider>
            <v-col cols=8 class="pa-0 recipe-info">
              <recipe-informations :recipe="selectedRecipe"/>
            </v-col>
          </v-row>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RecipesList from './RecipesList.vue'
import RecipeService from '../services/RecipeService'
import RecipeInformations from './RecipeInformations.vue'

export default {
  name: 'Recipes',
  components: {
    RecipesList,
    RecipeInformations
  },
  data () {
    return {
      banner: {
        url: 'https://www.uofmhealth.org/sites/default/files/culinary-medicine.jpg',
        alt: 'Banner'
      },
      recipes: [],
      search: '',
      selectedRecipe: {}
    }
  },
  async mounted () {
    this.recipes = (await RecipeService.index()).data
    this.selectedRecipe = this.recipes[0]
  },
  computed: {
    filteredRecipes: function () {
      var self = this
      if (self.search !== '') {
        return this.recipes.filter((recipe) => {
          var searchedIngredients = self.search.split(/[ ,]+/)
          for (let i = 0; i < searchedIngredients.length; i++) {
            if (recipe.ingredients.indexOf(searchedIngredients[i].toLowerCase()) === -1) {
              return false
            }
          }
          return true
        })
      } else return this.recipes
    }
  },
  methods: {
    selectRecipe (recipe) {
      this.selectedRecipe = recipe
    }
  }
}
</script>

<style scoped>
.banner-title {
  color: rgb(97, 97, 97);
  font-size: 4vh;
  margin: 0.7%;
}

.search-bar {
  width: 80vh;
}

.recipe-info {
  height: 45vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background-color: rgba(25,32,72,.7);
}

::-webkit-scrollbar {
  display: none;
}
</style>
