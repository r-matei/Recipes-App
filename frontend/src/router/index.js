import Vue from 'vue'
import Router from 'vue-router'
import Recipes from '@/components/Recipes.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recipes',
      component: Recipes
    }
  ]
})
