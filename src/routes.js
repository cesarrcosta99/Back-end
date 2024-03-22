import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../src/config/multer'
import middlewaresAuth from './app/middlewares/auth'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

const routes = new Router()

const uploads = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(middlewaresAuth)

routes.post('/products', uploads.single('file'), ProductController.store)
routes.put('/products/:id', uploads.single('file'), ProductController.update)
routes.get('/products', ProductController.index)
routes.post('/categories', uploads.single('file'), CategoryController.store)
routes.put('/categories/:id', uploads.single('file'), CategoryController.update)
routes.get('/categories', CategoryController.index)
routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

export default routes
