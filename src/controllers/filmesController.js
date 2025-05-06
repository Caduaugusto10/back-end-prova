const filmesModel = require('../models/filmesModel');

const getAllFilmes = async (req, res) => {
    const { name, genero  } = req.query;
    try {
        const filmes = await filmesModel.getAllFilmes(name, genero);
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
};

const getFilmeById = async (req, res) => {
    const { id } = req.params;
    try {
        const filme = await filmesModel.getFilmeById(id);
        if (!filme) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filme' });
    }
};

const createFilme = async (req, res) => {
    const { name, genero, photo, classificacaoIndicativa } = req.body;
    try {
        const novoFilme = await filmesModel.createFilme(name, genero, photo, classificacaoIndicativa);
        res.status(201).json(novoFilme);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar filme' });
    }
};

const updateFilme = async (req, res) => {
    const { id } = req.params;
    const { name, genero, photo, classificacaoIndicativa } = req.body;
    try {
        const filmeAtualizado = await filmesModel.updateFilme(id, name, genero, photo, classificacaoIndicativa);
        if (!filmeAtualizado) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }
        res.json(filmeAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
};

const deleteFilme = async (req, res) => {
    const { id } = req.params;
    try {
        const filmeDeletado = await filmesModel.deleteFilme(id);
        if (!filmeDeletado) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar filme' });
    }
};

module.exports = {
    getAllFilmes,
    getFilmeById,
    createFilme,
    updateFilme,
    deleteFilme
};