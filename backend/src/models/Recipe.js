module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    type: DataTypes.STRING,
    directions: DataTypes.TEXT
  })

  return Recipe
}
