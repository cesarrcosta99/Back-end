import multer from 'multer'
import { v4 } from 'uuid'
import { extname, resolve, dirname } from 'path' // Importe dirname junto com as outras funções do módulo path
import { fileURLToPath } from 'url'

// Obtendo __filename e __dirname equivalentes em módulo ES
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // O uso de __dirname aqui está correto graças ao código acima que define __dirname
      const uploadFolder = resolve(__dirname, '..', '..', 'uploads')
      cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
      // Garantindo que o arquivo terá um nome único
      cb(null, v4() + extname(file.originalname))
    },
  }),
}
