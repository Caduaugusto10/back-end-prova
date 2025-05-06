const express = require('express');
const router = express.Router();
const generosController = require('../controllers/generosController.js');
const apiKeyMiddleware = require('../config/apiKey.js');

router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Generos
 *   description: Gerenciamento de gêneros
 */

/**
 * @swagger
 * /api/generos:
 *   get:
 *     summary: Lista todas os gêneros
 *     tags: [Generos]
 *     responses:
 *       200:
 *         description: Lista de gêneros
 */
router.get('/', generosController.getAllGeneros);

/**
 * @swagger
 * /api/generos/{id}:
 *   get:
 *     summary: Busca um genero por ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gênero encontrado
 *       404:
 *         description: Gênero não encontrado
 */
router.get('/:id', generosController.getGeneroById);

/**
 * @swagger
 * /api/generos:
 *   post:
 *     summary: Cria um novo gênero
 *     tags: [Generos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               founder:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gênero criado
 */
router.post('/', generosController.createGenero);

/**
 * @swagger
 * /api/generos/{id}:
 *   put:
 *     summary: Atualiza um gênero
 *     tags: [Generos]
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
 *               founder:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gênero atualizado
 */
router.put('/:id', generosController.updateGenero);

/**
 * @swagger
 * /api/generos/{id}:
 *   delete:
 *     summary: Deleta um gênero
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gênero deletado
 */
router.delete('/:id', generosController.deleteGenero);

module.exports = router;