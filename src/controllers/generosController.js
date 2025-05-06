const generosModel = require('../models/generosModel');

const getAllGeneros = async (req, res) => {
    try {
        const generos = await generosModel.getAllGeneros();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar gêneros' });
    }
};

const getGeneroById = async (req, res) => {
    try {
        const genero = await generosModel.getGeneroById(req.params.id);
        if (!genero) {
            return res.status(404).json({ error: 'Gênero não encontrado.' });
        }
        res.json(genero);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar gênero' });
    }
};

const createGenero = async (req, res) => {
    const { genero, subgenero, descricao } = req.body;
    try {
        const novoGenero = await generosModel.createGenero(genero, subgenero, descricao);
        res.status(201).json(novoGenero);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar gênero' });
    }
};

const updateGenero = async (req, res) => {
    const { id } = req.params;
    const { genero, subgenero, descricao } = req.body;
    try {
        const generoAtualizado = await generosModel.updateGenero(id, {genero, subgenero, descricao});
        if (!generoAtualizado) {
            return res.status(404).json({ error: 'Gênero não encontrado' });
        }
        res.json(generoAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar gênero' });
    }
};

const deleteGenero = async (req, res) => {
    try {
        const result = await generosModel.deleteGenero(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Gênero' });
    }
};

module.exports = {
    getAllGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
}