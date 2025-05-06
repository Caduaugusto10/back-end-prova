const PDFDocument = require("pdfkit");
const filmesModel = require("../models/filmesModel");
const generosModel = require("../models/generosModel");
const axios = require("axios");
const fs = require("fs");

const exportFilmesPDF = async (req, res) => {
    try {

        const filmes = await filmesModel.getAllFilmes();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=filmes.pdf");

        const doc = new PDFDocument({ margin: 30 });
        doc.pipe(res);

        doc.fontSize(24).text("Relatório de Filmes", { align: "center", underline: false });
        doc.moveDown(1);


        doc.fontSize(16).text("Lista de Filmes", { align: "center", underline: false });
        doc.moveDown(0.5);


        for (const filme of filmes) {

            doc.text(` ${filme.name}`);
            doc.moveDown(0.5);

            if (filme.photo) {
                try {
                    const response = await axios({
                        url: filme.photo,
                        method: "GET",
                        responseType: "arraybuffer",
                    });

                    const tempImagePath = `./temp_${filme.id}.jpg`;
                    fs.writeFileSync(tempImagePath, response.data);

                    doc.image(tempImagePath, {
                        width: 350,
                        height: 200,
                        align: "center",
                        valign: "center",
                    })

                    fs.unlinkSync(tempImagePath); 
                } catch (error) {
                    doc.fontSize(12).fillColor("red").text("Imagem não encontrada.");
                }
            } else {
                doc.fontSize(12).fillColor("red").text("Sem imagem disponível.");
            }

            doc.moveDown(1); 
        }


        doc.end();
    } catch (error) {
        console.error("Erro ao gerar o PDF de filmes:", error);
        res.status(500).json({ error: "Erro ao gerar o PDF de filmes." });
    }
};

// Gera relatório de generos em PDF
const exportGenerosPDF = async (req, res) => {
    try {
        const generos = await generosModel.getAllGeneros();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=generos.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(30).text("Relatório de generos", { align: "center" });
        doc.moveDown();

        // Cabeçalho
        doc.fontSize(18).text("Id | Genero | SubGenero | Descrição", { underline: true });
        doc.moveDown(0.5);

        // Adiciona os dados dos generos
        generos.forEach((genero) => {
            doc.text(`${genero.id} | ${genero.genero} | ${genero.subgenero} | ${genero.descricao}`);
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF de generos" });
    }
};

module.exports = {
    exportFilmesPDF,
    exportGenerosPDF,
};