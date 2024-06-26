import * as Yup from 'yup'
import Category from '../models/Category.js'
import User from '../models/User.js'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
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

    const { name } = request.body
    const { filename: path } = request.file

    const categoryExist = await Category.findOne({
      where: { name },
    })

    if (categoryExist) {
      return response.status(400).json({ error: 'category already exists' })
    }

    const { id } = await Category.create({
      name,
      path,
    })

    return response.status(200).json({ id, name })
  }

  async index(request, response) {
    const categories = await Category.findAll()

    return response.status(200).json(categories)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin } = await User.findByPk(request.userId)

    if (!admin) {
      return response.status(401).json()
    }

    const { id } = request.params

    const category = await Category.findByPk(id)

    if (!category) {
      return response.status(401).json()
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const { name } = request.body

    await Category.update(
      {
        name,
        path,
      },
      {
        where: { id },
      },
    )

    return response.status(200).json()
  }
}

export default new CategoryController()
