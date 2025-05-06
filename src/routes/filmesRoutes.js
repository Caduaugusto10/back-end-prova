const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController.js');
const upload = require("../config/upload.js");
const apiKeyMiddleware = require('../config/apiKey.js');

// Middleware para validação da API Key
//router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: Gerenciamento de filmes
 */

/**
 * @swagger
 * /api/filmes:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes
 */
router.get('/', filmesController.getAllFilmes);

/**
 * @swagger
 * /api/filmes/{id}:
 *   get:
 *     summary: Busca um filme por ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme encontrado
 *       404:
 *         description: Filme não encontrado
 */
router.get('/:id', filmesController.getFilmeById);

/**
 * @swagger
 * /api/filmes:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Filmes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filme criado
 */
router.post('/', upload.single("photo"),filmesController.createFilme);

/**
 * @swagger
 * /api/filmes/{id}:
 *   put:
 *     summary: Atualiza um filme
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filme atualizado
 */
router.put('/:id', filmesController.updateFilme);

/**
 * @swagger
 * /api/filmes/{id}:
 *   delete:
 *     summary: Deleta um filme
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme deletado
 */
router.delete('/:id', filmesController.deleteFilme);

module.exports = router;