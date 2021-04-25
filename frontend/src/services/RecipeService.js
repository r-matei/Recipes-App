import Api from '@/services/Api'

export default {
  // request to get all the recipes
  index () {
    return Api().get('recipes')
  },

  // request to add a new recipe
  post (recipe) {
    return Api().post('recipes', recipe)
  },

  // request to add a new recipe
  delete (recipeId) {
    return Api().delete(`recipes/${recipeId}`)
  },

  // request to update a recipe
  put (recipe) {
    return Api().put('recipes', recipe)
  }
}
