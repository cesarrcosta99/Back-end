import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schemas/Order'
import User from '../models/User'

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const idProduct = request.body.products.map((product) => product.id)

    const produtos = await Product.findAll({
      where: { id: idProduct },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    })

    const updateProduct = produtos.map((item) => {
      const quantityCertain = request.body.products.findIndex(
        (quantidade) => quantidade.id === item.id,
      )

      return {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category.name,
        url: item.url,
        quantity: request.body.products[quantityCertain].quantity,
      }
    })

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: updateProduct,
      status: 'Pedido Realizado',
    }

    const orderResponse = await Order.create(order)

    return response.status(201).json(orderResponse)
  }

  async index(request, response) {
    const Orders = await Order.find()

    return response.status(200).json(Orders)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    })

    try {
      schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin } = await User.findByPk(request.userId)

    if (!admin) {
      return response.status(401).json()
    }

    const { id } = request.params
    const { status } = request.body

    try {
      await Order.updateOne({ _id: id }, { status })
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }

    return response.json({ message: 'status updated sucessfully' })
  }
}

export default new OrderController()
