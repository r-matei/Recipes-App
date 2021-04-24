const RecipesController = require('./controllers/RecipesController')

module.exports = (app) => {
  app.get('/recipes',
    RecipesController.index)

  app.post('/recipes',
    RecipesController.post)
  
  app.delete('/recipes/:recipeId',
    RecipesController.remove)
  
  app.put('/recipes/:recipeid',
    RecipesController.put)
}