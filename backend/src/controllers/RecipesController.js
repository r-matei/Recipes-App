const {Recipe} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const recipes = await Recipe.findAll()
      res.send(recipes)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the recipes'
      })
    }
  },
  async post (req, res) {
    try {
      const recipe = await Recipe.create(req.body)
      res.send(recipe)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the recipe'
      })
    }
  },
  async put (req, res) {
    try {
      await Recipe.update(req.body, {
        where: {
          id: req.params.recipeId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the recipe'
      })
    }
  },
  async remove (req, res) {
    try {
      const {recipeId} = req.params
      const recipe = await Recipe.findOne({
        where: {
          id: recipeId
        }
      })

      await recipe.destroy()
      res.send(recipe)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to delete the recipe'
      })
    }
  }
}