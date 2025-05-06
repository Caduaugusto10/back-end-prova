const pool = require('../config/database.js');

const getAllGeneros = async () => {
    const result = await pool.query(`
        SELECT * FROM generos
    `);
    return result.rows;
};

const getGeneroById = async (id) => {
    try {
        const result = await pool.query(`
            SELECT * FROM generos WHERE id = $1
        `, [id]);

        return result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar gênero por ID:', error);
        throw error;
    }
};

const createGenero = async (genero, subgenero, descricao) => {
    const result = await pool.query(`
        INSERT INTO generos (genero, subgenero, descricao)
        VALUES ($1, $2, $3) RETURNING *
    `, [genero, subgenero, descricao]);

    return result.rows[0];
};

const updateGenero = async (id, {genero, subgenero, descricao}) => {
    const result = await pool.query(`
        UPDATE generos SET genero = $1, subgenero = $2, descricao = $3
        WHERE id = $4 RETURNING *
    `, [genero, subgenero, descricao, id]);

    return result.rows[0];
};

const deleteGenero = async (id) => {
    const result = await pool.query(`
        DELETE FROM generos WHERE id = $1 RETURNING *
    `, [id]);
    if (result.rowCount === 0) {
        return { error: 'Gênero não encontrado' };
    }
    return { message: 'Gênero deletado com sucesso' };
};

module.exports = {
    getAllGeneros,
    getGeneroById,
    createGenero,
    updateGenero,
    deleteGenero
}