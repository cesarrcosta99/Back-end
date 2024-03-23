import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import User from '../app/models/User.js'
import Product from '../app/models/Product.js'
import Category from '../app/models/Category.js'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:bfmvCEeaFdtlcoGvcujaGXbCEzeQXIyX@viaduct.proxy.rlwy.net:28541/railway',
    )
    models
      .map((models) => models.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:hQlBACSEsGRQCHCUzEqopJdTWvMRSvgV@monorail.proxy.rlwy.net:35161',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
  }
}

export default new Database()
