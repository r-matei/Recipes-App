const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'recipes-app',
    user: process.env.DB_USER || 'recipes-app',
    password: process.env.DB_PASS || 'recipes-app',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../recipes-app.sqlite')
    }
  }
}
