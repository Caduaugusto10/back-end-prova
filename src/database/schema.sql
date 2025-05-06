CREATE DATABASE cinema;
\c cinema

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    autor VARCHAR(200) NOT NULL,
    photo VARCHAR(500)
);

CREATE TABLE generos (
    id SERIAL PRIMARY KEY,
    genero VARCHAR(200) NOT NULL,
    subgenero VARCHAR(200),
    descricao TEXT
);

INSERT INTO filmes (name, autor, photo) VALUES 
('Hellboy', 'Mike Mignola', 'https://upload.wikimedia.org/wikipedia/pt/thumb/0/08/Hellboy_%282019%29.jpg/250px-Hellboy_%282019%29.jpg'),
('Rambo', 'David Morrell', 'https://br.web.img3.acsta.net/medias/nmedia/18/97/40/18/20527154.jpg'),
('Intocáveis', 'Philippe Pozzo di Borgo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUkfQb28gNUmcIQFvyvbANLiPIVkunypxV8w&s'),
('Vizinhos', 'Paulo Cursino', 'https://i.ytimg.com/vi/r5ZIRVz734Y/maxresdefault.jpg'),
('A proposta', 'Anne Fletcher', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ClZe3lSEeEgIGPYNNO2DLOWHCLHKXsperg&s');

INSERT INTO generos (genero, subgenero, decricao) VALUES 
('Ação', 'Aventura', 'Filmes de ação são caracterizados por sequências de ação intensas e emocionantes.'),
('Terror', 'Suspense', 'Filmes de terror são projetados para provocar medo e tensão no público.'),
('Drama', 'Romance', 'Filmes de drama geralmente exploram temas emocionais e relacionamentos humanos.'),
('Comédia', 'Romântica', 'Filmes de comédia romântica combinam romance e humor.'),
('Aventura', 'Fantasia', 'Filmes de aventura muitas vezes envolvem jornadas épicas e mundos imaginários.');