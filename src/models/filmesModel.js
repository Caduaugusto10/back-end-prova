const pool = require('../config/database.js');

const getAllFilmes = async (classificacaoIndicativa) => {
    if (!classificacaoIndicativa) {
        const result = await pool.query(`
            SELECT * FROM filmes
    `);
        return result.rows;
    } else {
        const result = await pool.query(`
            SELECT * FROM filmes WHERE classificacaoIndicativa ILIKE $1
            `, [`%${classificacaoIndicativa}%`]);
        return result.rows;
    }
};

const getFilmeById = async (id) => {
    const result = await pool.query(`
        SELECT * FROM filmes WHERE id = $1
    `, [id]);

    return result.rows[0];
};

const createFilme = async (name, genero, photo, classificacaoIndicativa) => {
    const result = await pool.query(`
        INSERT INTO filmes (name, genero, photo, classificacaoIndicativa)
        VALUES ($1, $2, $3, $4) RETURNING *
    `, [name, genero, photo, classificacaoIndicativa]);

    return result.rows[0];
};

const updateFilme = async (id, name, genero, photo, classificacaoIndicativa) => {
    const result = await pool.query(`
        UPDATE filmes SET name = $1, genero = $2, photo = $3, classificacaoIndicativa = $4
        WHERE id = $5 RETURNING *
    `, [name, genero, photo, classificacaoIndicativa, id]);

    return result.rows[0];
};

const deleteFilme = async (id) => {
    const result = await pool.query(`
        DELETE FROM filmes WHERE id = $1 RETURNING *
    `, [id]);
    if (result.rowCount === 0) {
        return { error: 'Filme não encontrado' };
    }
    return { message: 'Filme deletado com sucesso' };
};

module.exports = {
    getAllFilmes,
    getFilmeById,
    createFilme,
    updateFilme,
    deleteFilme
}
