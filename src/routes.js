import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../src/config/multer.js'
import middlewaresAuth from './app/middlewares/auth.js'
import UserController from './app/controllers/UserController.js'
import SessionController from './app/controllers/SessionController.js'
import ProductController from './app/controllers/ProductController.js'
import CategoryController from './app/controllers/CategoryController.js'
import OrderController from './app/controllers/OrderController.js'

const routes = new Router()

const uploads = multer(multerConfig)

routes.get('/',(request,response)=>{
    return response.json({message:'Hello to my first API'})
})
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
