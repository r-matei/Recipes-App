<template>
  <v-row>
    <v-col cols="12" align="center">
      <!-- top banner -->
      <v-img
        :src="banner.url"
        :alt="banner.alt"
        height="25vh"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"></v-img>
        <p class="banner-title">Recipes for all your family</p>
        <!-- search bar -->
        <div class="search-bar">
          <v-text-field
            label="Search by ingredients"
            v-model="search"
            solo
          ></v-text-field>
        </div>
        <!-- categories buttons -->
        <v-btn
          v-for="category in categories"
          :key="category"
          class="mx-4 style-btn"
          depressed
          rounded
          height="100px"
          width="100px"
          v-text="category"
          @click="selectedCategory = category">
        </v-btn>
        <!-- card with all the informations about recipes -->
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
      recipes: [], // all the recipes
      search: '', // search bar content
      selectedRecipe: '', // the recipe we show more informations about
      categories: ['Dinner', 'Breakfast', 'Healthy', 'Dessert', 'Pasta', 'All'], // categories the user can choose
      selectedCategory: '' // the category choosed by user
    }
  },
  async mounted () {
    // request all the recipes from database
    this.recipes = (await RecipeService.index()).data

    // if has already been selected a recipe we take it from local storage
    if (!localStorage.getItem('selectedRecipe')) {
      localStorage.setItem('selectedRecipe', JSON.stringify(this.recipes[0]))
    } else {
      this.selectedRecipe = JSON.parse(localStorage.getItem('selectedRecipe'))
    }
  },
  computed: {
    // filter recipes by ingredients
    filteredRecipes: function () {
      var self = this
      if (self.search !== '') {
        return this.categoryRecipes.filter((recipe) => {
          var searchedIngredients = self.search.split(/[ ,]+/)
          for (let i = 0; i < searchedIngredients.length; i++) {
            if (recipe.ingredients.indexOf(searchedIngredients[i].toLowerCase()) === -1) {
              return false
            }
          }
          return true
        })
      } else return this.categoryRecipes
    },

    // filter recipes by categories
    categoryRecipes: function () {
      var self = this
      if (self.selectedCategory !== '' && self.selectedCategory !== 'All') {
        return this.recipes.filter((recipe) => {
          if (recipe.category.indexOf(self.selectedCategory) === -1) {
            return false
          }
          return true
        })
      } else return this.recipes
    }
  },
  methods: {
    // mark the recipe that is selected from the recipes list
    selectRecipe (recipe) {
      this.selectedRecipe = recipe
    }
  },
  watch: {
    // when the selected recipe changes, store it in the local storage
    selectedRecipe (newRecipe) {
      localStorage.setItem('selectedRecipe', JSON.stringify(newRecipe))
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

.style-btn:focus {
  background-color: rgba(25,32,72,.7);
  color: white;
}

.style-btn:hover {
  background-color: rgba(25,32,72,.7);
  color: white;
}
</style>
