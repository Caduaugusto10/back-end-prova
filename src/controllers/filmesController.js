const filmesModel = require('../models/filmesModel');

const getAllFilmes = async (req, res) => {
    try {
        const {classificacaoIndicativa} = req.query
        const filmes = await filmesModel.getAllFilmes(classificacaoIndicativa);
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
};

const getFilmeById = async (req, res) => {
    try {
        const filme = await filmesModel.getFilmeById(req.params.id);
        if (!filme) {
            return res.status(404).json({ error: 'Filme não encontrado.' });
        }
        res.json(filme);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filme.' });
    }
}

const createFilme = async (req, res) => {
    try {
        const { name, autor, classificacaoIndicativa } = req.body;
        const photo = req.file ? req.file.filename : null;
        const novoFilme = await filmesModel.createFilme(name, autor, photo, classificacaoIndicativa);
        res.status(201).json(novoFilme);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar filme' });
    }
};

const updateFilme = async (req, res) => {
    const { id } = req.params;
    const { name, autor, photo, classificacaoIndicativa } = req.body;
    try {
        const filmeAtualizado = await filmesModel.updateFilme(id, name, autor, photo, classificacaoIndicativa);
        if (!filmeAtualizado) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }
        res.json(filmeAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
};

const deleteFilme = async (req, res) => {
    try {
        const result = await filmesModel.deleteFilme(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        console.error("Erro ao deletar filme:", error);
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