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
    const { id } = req.params;
    try {
        const genero = await generosModel.getGeneroById(id);
        if (!genero) {
            return res.status(404).json({ error: 'Gênero não encontrado' });
        }

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
    const { id } = req.params;
    try {
        const result = await generosModel.deleteGenero(id);
        if (!result.error) {
            return res.status(404).json({ error: result.error });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar gênero' });
    }
};

module.exports = {
    getAllGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
}