import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import { resolve, dirname } from 'path'; // Importando dirname
import { fileURLToPath } from 'url'; // Importando fileURLToPath para usar com import.meta.url

import './database/index.js';

// Criando __dirname equivalente em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions={
  origin:'https://code-burguer-front-end-react.vercel.app',
  credentials:true,
}

class App {
  constructor() {
    this.app = express();
    this.app.use(cors(corsOptions));
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    );
    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    );

    app.use('/product-file', (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
  }, express.static('caminho/para/seu/diretório/de/uploads'));
  
  app.use('/category-file', (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
  }, express.static('caminho/para/seu/diretório/de/uploads'));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
