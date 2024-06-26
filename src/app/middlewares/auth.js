import jwt from 'jsonwebtoken'
import auth from '../../config/auth.js'
export default (request, response, next) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'no token access' })
  }

  const token = authToken.split(' ')[1]

  try {
    jwt.verify(token, auth.secret, (err, decoded) => {
      if (err) {
        throw new Error()
      }

      request.userId = decoded.id
      request.userName = decoded.name

      return next()
    })
  } catch (err) {
    return response.status(401).json({ error: 'token not invalid' })
  }
}
