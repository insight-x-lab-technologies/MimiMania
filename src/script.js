    // ============================================================
    // DEFAULT WORD BANK — keyed by difficulty → category
    // ============================================================
    const DEFAULT_WORDS = {
      easy: {
        objects: [
          'Bola', 'Copo', 'Chapéu', 'Sapato', 'Livro', 'Cadeira', 'Mesa', 'Cama', 'Porta', 'Janela',
          'Lápis', 'Borracha', 'Mochila', 'Óculos', 'Guarda-chuva', 'Telefone', 'Espelho', 'Escova', 'Pente', 'Tesoura',
          'Chave', 'Garfo', 'Colher', 'Prato', 'Garrafa', 'Almofada', 'Cobertor', 'Toalha', 'Sabão', 'Balão',
          'Boneca', 'Carrinho', 'Pipoca', 'Sorvete', 'Bolo', 'Maçã', 'Banana', 'Uva', 'Flor', 'Árvore',
          'Sol', 'Lua', 'Estrela', 'Nuvem', 'Chuva', 'Guarda-roupa', 'Armário', 'Geladeira', 'Fogão', 'Televisão'
        ],
        actions: [
          'Correr', 'Pular', 'Dormir', 'Comer', 'Beber', 'Rir', 'Chorar', 'Dançar', 'Cantar', 'Nadar',
          'Voar', 'Andar', 'Sentar', 'Levantar', 'Abraçar', 'Brincar', 'Desenhar', 'Pintar', 'Ler', 'Escrever',
          'Ouvir', 'Gritar', 'Soprar', 'Respirar', 'Tossir', 'Espirrar', 'Bocejar', 'Aplaudir', 'Acenar', 'Apontar',
          'Pegar', 'Jogar', 'Chutar', 'Empurrar', 'Puxar', 'Abrir', 'Fechar', 'Lavar mãos', 'Escovar dentes', 'Pentear',
          'Calçar sapato', 'Tirar sapato', 'Ligar TV', 'Apagar luz', 'Bater palma', 'Girar', 'Rolar', 'Beijar', 'Sorrir', 'Pensar'
        ],
        animals: [
          'Cachorro', 'Gato', 'Peixe', 'Passarinho', 'Coelho', 'Galinha', 'Vaca', 'Cavalo', 'Porco', 'Ovelha',
          'Pato', 'Sapo', 'Borboleta', 'Formiga', 'Abelha', 'Aranha', 'Minhoca', 'Lesma', 'Caracol', 'Lagarta',
          'Elefante', 'Leão', 'Girafa', 'Macaco', 'Zebra', 'Hipopótamo', 'Crocodilo', 'Tartaruga', 'Pinguim', 'Urso',
          'Lobo', 'Raposa', 'Veado', 'Esquilo', 'Rato', 'Hamster', 'Iguana', 'Papagaio', 'Tucano', 'Flamingo',
          'Pelicano', 'Canguru', 'Koala', 'Panda', 'Golfinho', 'Baleia', 'Polvo', 'Caranguejo', 'Camarão', 'Estrela-do-mar'        ],
        movies: [
          'Titanic', 'Avatar', 'O Rei Leão', 'Toy Story', 'Frozen', 'Shrek', 'Harry Potter', 'Homem-Aranha', 'Batman', 'Superman', 'Jurassic Park', 'Vingadores', 'Star Wars', 'Minions', 'Carros', 'Procurando Nemo', 'Divertida Mente', 'Aladdin', 'Cinderela', 'Branca de Neve', 'Matrix', 'Gladiador', 'E.T.', 'King Kong', 'Godzilla', 'Pantera Negra', 'Homem de Ferro', 'Capitão América', 'Thor', 'Hulk', 'Deadpool', 'Venom', 'Transformers', 'Piratas do Caribe', 'Jumanji', 'Missão Impossível', '007', 'Rocky', 'Rambo', 'Karate Kid', 'Gremlins', 'Ghostbusters', 'Scooby-Doo', 'Madagascar', 'Kung Fu Panda', 'Monstros S.A.', 'Up', 'Encanto', 'Moana', 'Zootopia'
        ],
        professions: [
          'Médico', 'Dentista', 'Professor', 'Policial', 'Bombeiro', 'Motorista', 'Cozinheiro', 'Garçom', 'Padeiro', 'Carteiro', 'Mecânico', 'Engenheiro', 'Advogado', 'Enfermeiro', 'Veterinário', 'Piloto', 'Cabeleireiro', 'Barbeiro', 'Ator', 'Cantor', 'Dançarino', 'Faxineiro', 'Segurança', 'Agricultor', 'Pescador', 'Eletricista', 'Pedreiro', 'Pintor', 'Jardineiro', 'Taxista', 'Entregador', 'Vendedor', 'Caixa', 'Secretária', 'Recepcionista', 'Treinador', 'Personal Trainer', 'Babá', 'Cuidador', 'Zelador', 'Lixeiro', 'Frentista', 'Motorista de ônibus', 'Motorista de caminhão', 'Guia turístico', 'Fotógrafo', 'Repórter', 'Radialista', 'Operador de caixa', 'Instrutor'
        ],
        celebrities: [
          'Neymar', 'Messi', 'Cristiano Ronaldo', 'Pelé', 'Anitta', 'Taylor Swift', 'Beyoncé', 'Lady Gaga', 'Justin Bieber', 'Rihanna', 'Shakira', 'Madonna', 'Elvis Presley', 'Michael Jackson', 'The Rock', 'Vin Diesel', 'Will Smith', 'Tom Cruise', 'Leonardo DiCaprio', 'Brad Pitt', 'Angelina Jolie', 'Scarlett Johansson', 'Jennifer Lopez', 'Selena Gomez', 'Zendaya', 'Miley Cyrus', 'Ariana Grande', 'Ed Sheeran', 'Drake', 'Kanye West', 'Billie Eilish', 'Harry Styles', 'Daniel Radcliffe', 'Emma Watson', 'Robert Downey Jr', 'Chris Hemsworth', 'Chris Evans', 'Gal Gadot', 'Margot Robbie', 'Ryan Reynolds', 'Keanu Reeves', 'Jackie Chan', 'Bruce Lee', 'Sylvester Stallone', 'Arnold Schwarzenegger', 'Oprah Winfrey', 'Kim Kardashian', 'MrBeast', 'Mark Zuckerberg', 'Elon Musk'        ]
      },
      normal: {
        objects: [
          'Computador', 'Teclado', 'Rádio', 'Máquina de lavar', 'Aspirador', 'Liquidificador', 'Batedeira', 'Cafeteira', 'Sofá', 'Estante',
          'Ventilador', 'Ar-condicionado', 'Micro-ondas', 'Forno', 'Pia', 'Banheira', 'Chuveiro', 'Mala', 'Lanterna', 'Binóculo',
          'Câmera', 'Relógio', 'Calculadora', 'Termômetro', 'Balança', 'Bússola', 'Violão', 'Piano', 'Tambor', 'Flauta',
          'Sanfona', 'Trompete', 'Violino', 'Gaita', 'Xilofone', 'Raquete', 'Skate', 'Patins', 'Luva de boxe', 'Capacete',
          'Colete', 'Cinto', 'Gravata', 'Bolsa', 'Guarda-chuva', 'Bengala', 'Muleta', 'Cadeira de rodas', 'Óculos de sol', 'Boné'
        ],
        actions: [
          'Cozinhar', 'Dirigir', 'Pedalar', 'Pescar', 'Mergulhar', 'Escalar', 'Acampar', 'Fazer ioga', 'Meditar', 'Fotografar',
          'Filmar', 'Pintar quadro', 'Esculpir', 'Tricotar', 'Costurar', 'Bordar', 'Jardinagem', 'Regar planta', 'Podar árvore', 'Varrer',
          'Limpar janela', 'Passar roupa', 'Dobrar roupa', 'Fazer cama', 'Lavar louça', 'Secar louça', 'Descascar fruta', 'Ralar queijo', 'Amassar pão', 'Remar',
          'Surfar', 'Esquiar', 'Patinar', 'Driblar', 'Arremessar', 'Defender gol', 'Servir tênis', 'Fazer ginástica', 'Aplaudir', 'Discursar',
          'Entrevistar', 'Escalar parede', 'Fazer mágica', 'Equilibrar', 'Malabarismo', 'Digitar', 'Telefonar', 'Tirar selfie', 'Pagar conta', 'Fazer fila'
        ],
        animals: [
          'Águia', 'Falcão', 'Coruja', 'Morcego', 'Camelo', 'Lhama', 'Alpaca', 'Bisão', 'Alce', 'Coyote',
          'Guepardo', 'Leopardo', 'Jaguar', 'Puma', 'Rinoceronte', 'Anaconda', 'Ornitorrinco', 'Dingo', 'Cacatua', 'Emu',
          'Orca', 'Tubarão', 'Arraia', 'Lula', 'Cavalo-marinho', 'Ouriço-do-mar', 'Arara', 'Pavão', 'Avestruz', 'Casuar',
          'Albatroz', 'Cegonha', 'Pelicano', 'Íbis', 'Garça', 'Lontra', 'Foca', 'Morsa', 'Leão-marinho', 'Dugongo',
          'Cabra-da-montanha', 'Íbex', 'Antílope', 'Gnu', 'Búfalo', 'Javali', 'Texugo', 'Guaxinim', 'Furão', 'Musaranho'
        ],
        movies: [
          'Interestelar', 'A Origem', 'Duna', 'Clube da Luta', 'Pulp Fiction', 'O Lobo de Wall Street', 'Coringa', 'Parasita', 'O Grande Gatsby', 'Django Livre', 'Bastardos Inglórios', 'Whiplash', 'La La Land', 'Cisne Negro', 'O Iluminado', 'Doutor Estranho', 'Guardiões da Galáxia', 'Capitã Marvel', 'Logan', 'John Wick', 'Matrix Reloaded', 'Matrix Revolutions', 'O Regresso', 'Gravidade', 'Mad Max Estrada da Fúria', 'Blade Runner 2049', 'O Exterminador do Futuro', 'De Volta para o Futuro', 'O Sexto Sentido', 'O Show de Truman', 'A Múmia', 'O Código Da Vinci', 'Anjos e Demônios', 'Os Jogos Vorazes', 'Crepúsculo', 'It A Coisa', 'Invocação do Mal', 'Annabelle', 'A Freira', 'Jogos Mortais', 'Corra', 'Nós', 'Fragmentado', 'Glass', 'Velozes e Furiosos', 'Top Gun', 'Missão Impossível Fallout', 'Kingsman', 'Sherlock Holmes', 'O Homem de Aço'
        ],
        professions: [
          'Programador', 'Designer', 'Arquiteto', 'Nutricionista', 'Psicólogo', 'Psiquiatra', 'Fisioterapeuta', 'Farmacêutico', 'Biólogo', 'Químico', 'Físico', 'Geólogo', 'Astrônomo', 'Tradutor', 'Intérprete', 'Editor de vídeo', 'Diretor de cinema', 'Produtor musical', 'DJ', 'Youtuber', 'Influenciador', 'Streamer', 'Publicitário', 'Redator', 'Analista de sistemas', 'Administrador', 'Contador', 'Economista', 'Corretor de imóveis', 'Corretor de seguros', 'Investigador', 'Detetive', 'Perito criminal', 'Auditor', 'Consultor', 'Coach', 'Treinador esportivo', 'Atleta profissional', 'Surfista', 'Jogador de futebol', 'Lutador', 'Coreógrafo', 'Maquiador', 'Esteticista', 'Tatuador', 'Ilustrador', 'Animador', 'Game designer', 'Roteirista', 'Dublador'
        ],
        celebrities: [
          'Timothée Chalamet', 'Florence Pugh', 'Pedro Pascal', 'Jenna Ortega', 'Tom Holland', 'Andrew Garfield', 'Tobey Maguire', 'Benedict Cumberbatch', 'Martin Scorsese', 'Quentin Tarantino', 'Christopher Nolan', 'Denis Villeneuve', 'Greta Gerwig', 'Jordan Peele', 'Dwayne Johnson', 'Jason Statham', 'Idris Elba', 'Henry Cavill', 'Millie Bobby Brown', 'Noah Schnapp', 'Finn Wolfhard', 'Sadie Sink', 'Travis Scott', 'Post Malone', 'The Weeknd', 'Dua Lipa', 'Olivia Rodrigo', 'Doja Cat', 'Bad Bunny', 'Karol G', 'Peso Pluma', 'Lizzo', 'Snoop Dogg', 'Eminem', '50 Cent', 'Jay-Z', 'Kendrick Lamar', 'J Balvin', 'Maluma', 'Gisele Bündchen', 'Adriana Lima', 'Lewis Hamilton', 'Usain Bolt', 'Michael Jordan', 'Serena Williams', 'Roger Federer', 'Novak Djokovic', 'Simone Biles', 'Tony Hawk'
        ]
      },
      hard: {
        objects: [
          'Estetoscópio', 'Bisturi', 'Microscópio', 'Telescópio', 'Sextante', 'Astrolábio', 'Cronômetro', 'Metrônomo', 'Afinador', 'Desfibrilador',
          'Catapulta', 'Periscópio', 'Destilador', 'Centrífuga', 'Incubadora', 'Autoclave', 'Espectrômetro', 'Cromatógrafo', 'Calorômetro', 'Potenciômetro',
          'Fisga', 'Arpão', 'Bumerangue', 'Arco e flecha', 'Besta', 'Lança', 'Maça', 'Machado', 'Foice', 'Tridente',
          'Sanduicheira', 'Desidratador', 'Fermentador', 'Slow cooker', 'Wok', 'Tagine', 'Fondue', 'Churrasqueira', 'Defumador', 'Alambique',
          'Teodolito', 'Altímetro', 'Barômetro', 'Higrômetro', 'Anemômetro', 'Pluviômetro', 'Sismógrafo', 'Gerador', 'Transformador', 'Osciloscópio'
        ],
        actions: [
          'Equilibrar na corda bamba', 'Engolir fogo', 'Escapar de camisa de força', 'Quebrar tijolos com a mão',
          'Andar sobre brasas', 'Ler braille', 'Fazer sinalização de mergulho', 'Comunicar em libras', 'Código morse', 'Tocar instrumento com os pés',
          'Extrair dente', 'Fazer cirurgia', 'Ressuscitar', 'Imobilizar fratura', 'Aplicar torniquete',
          'Fazer esgrima', 'Praticar tai chi', 'Golpe de caratê', 'Arremesso de martelo', 'Lançamento de dardo olímpico',
          'Arar terra', 'Ordenhar vaca', 'Tosquiar ovelha', 'Ferrar cavalo', 'Domar boi',
          'Tecer no tear', 'Soprar vidro', 'Forjar metal', 'Moldar cerâmica no torno', 'Restaurar quadro',
          'Decolar avião', 'Pousar helicóptero', 'Navegar barco a vela', 'Operar guindaste', 'Conduzir trem',
          'Fazer rapel', 'Alpinismo em rocha', 'Tirolesa', 'Escalada livre', 'Slackline',
          'Desativar bomba', 'Negociar reféns', 'Paraquedismo', 'Corrida de obstáculos', 'Levantamento de peso olímpico'
        ],
        animals: [
          'Axolote', 'Tarsídeo', 'Fossa', 'Quokka', 'Numbat', 'Kakapo', 'Tuátara', 'Okapi', 'Takin', 'Saiga',
          'Dugongo', 'Manatim', 'Narval', 'Beluga', 'Cachalote', 'Rorcual', 'Jubarte', 'Boto', 'Toninha', 'Franciscana',
          'Escorpião', 'Tarântula', 'Mamba-negra', 'Taipan', 'Cobra-de-coral', 'Viperão', 'Cascavel', 'Boomslang', 'Lula-gigante', 'Polvo-de-anéis-azuis',
          'Baiacu', 'Peixe-pedra', 'Peixe-leão', 'Cone-do-mar', 'Medusa-da-caixa', 'Vespa-asiática', 'Besouro-bombardeiro', 'Mosquito-tigre', 'Formiga-bala', 'Lagarta-de-fogo',
          'Pangolim', 'Aye-aye', 'Loris-lento', 'Tatu-bola', 'Tatu-gigante', 'Tamanduá-bandeira', 'Preguiça-de-três-dedos', 'Ouriço-pigmeu', 'Musaranho-elefante', 'Marta-pinheira'
        ],
        movies: [
          'O Farol', 'Hereditário', 'Midsommar', 'A Bruxa', 'O Sacrifício do Cervo Sagrado', 'O Lagosta', 'Dogville', 'Anticristo', 'Melancolia', 'A Árvore da Vida', 'Sinédoque Nova York', 'Donnie Darko', 'O Homem Duplicado', 'Enemy', 'Ex Machina', 'Aniquilação', 'Coerência', 'Primer', 'A Chegada', 'Moon', 'Solaris', 'Stalker', 'O Espelho', 'Persona', 'O Sétimo Selo', 'Amnésia', 'Cidade dos Sonhos', 'Veludo Azul', 'Eraserhead', 'A Fonte da Vida', 'O Poço', 'A Plataforma', 'Climax', 'Irreversível', 'Enter the Void', 'O Hospedeiro', 'Oldboy', 'Memórias de um Assassino', 'A Criada', 'Drive', 'Only God Forgives', 'O Mestre', 'Magnólia', 'There Will Be Blood', 'A Caça', 'O Som ao Redor', 'Bacurau', 'O Lobo Atrás da Porta', 'Que Horas Ela Volta'
        ],
        professions: [
          'Neurocirurgião', 'Oncologista', 'Anestesista', 'Cardiologista', 'Ortopedista', 'Endocrinologista', 'Ginecologista', 'Urologista', 'Radiologista', 'Patologista', 'Epidemiologista', 'Bioinformata', 'Engenheiro de dados', 'Cientista de dados', 'Engenheiro aeroespacial', 'Engenheiro nuclear', 'Engenheiro de petróleo', 'Especialista em cibersegurança', 'Arquiteto de software', 'DevOps', 'Product Manager', 'Scrum Master', 'UX Researcher', 'UX Designer', 'UI Designer', 'Especialista em SEO', 'Trader', 'Analista financeiro', 'Gestor de investimentos', 'Atuário', 'Diplomata', 'Cônsul', 'Embaixador', 'Curador de museu', 'Restaurador de arte', 'Arqueólogo', 'Paleontólogo', 'Oceanógrafo', 'Meteorologista', 'Piloto de caça', 'Controlador de voo', 'Capitão de navio', 'Sommelier', 'Mestre cervejeiro', 'Chef executivo', 'Perfumista', 'Designer automotivo', 'Engenheiro robótico', 'Especialista em IA'
        ],
        celebrities: [
          'Saoirse Ronan', 'Paul Mescal', 'Barry Keoghan', 'Cillian Murphy', 'Rami Malek', 'Mahershala Ali', 'Dev Patel', 'Riz Ahmed', 'Lakeith Stanfield', 'Oscar Isaac', 'Pedro Almodóvar', 'Wong Kar-wai', 'Bong Joon-ho', 'Park Chan-wook', 'Gaspar Noé', 'Lars von Trier', 'Yorgos Lanthimos', 'Ari Aster', 'Robert Eggers', 'Noah Baumbach', 'Charlie Kaufman', 'Tilda Swinton', 'Anya Taylor-Joy', 'Tim Burton', 'Guillermo del Toro', 'Alejandro Iñárritu', 'Alfonso Cuarón', 'Spike Lee', 'Wes Anderson', 'Taika Waititi', 'Hideo Kojima', 'Shigeru Miyamoto', 'Gabe Newell', 'Satya Nadella', 'Sundar Pichai', 'Tim Cook', 'Sam Altman', 'Demis Hassabis', 'Naval Ravikant', 'Gary Vaynerchuk', 'Ray Dalio', 'Warren Buffett', 'Charlie Munger', 'Howard Schultz', 'Reed Hastings', 'Susan Wojcicki', 'Kevin Feige', 'Kathleen Kennedy', 'Fei-Fei Li', 'Andrew Ng'
        ]
      }
    };

    // ============================================================
    // CHALLENGES
    // ============================================================
    const CHALLENGES = [
        'Faça a mímica sentado', 'Faça a mímica agachado', 'Faça a mímica pulando', 'Faça a mímica andando no lugar', 'Faça a mímica com uma mão nas costas', 'Faça a mímica usando só uma mão', 'Faça a mímica com braços esticados', 'Faça a mímica girando lentamente', 'Faça a mímica como se estivesse em câmera lenta', 'Faça a mímica como se estivesse acelerado (super rápido)', 'Faça a mímica exagerando MUITO', 'Faça a mímica quase sem se mexer', 'Faça a mímica como se estivesse com medo', 'Faça a mímica como se estivesse muito feliz', 'Faça a mímica como se estivesse bravo', 'Faça a mímica como se estivesse cansado', 'Faça a mímica como se estivesse confuso', 'Faça a mímica como se estivesse em pânico', 'Faça a mímica como um robô', 'Faça a mímica como um personagem de desenho animado', 'Faça a mímica como um idoso', 'Faça a mímica como uma criança', 'Faça a mímica como um super-herói', 'Faça a mímica como um vilão', 'Faça a mímica como um animal', 'Faça a mímica como se estivesse na lua (gravidade baixa)', 'Faça a mímica como se estivesse na água', 'Faça a mímica como se estivesse invisível', 'Faça a mímica como se estivesse gigante', 'Faça a mímica como se estivesse muito pequeno', 'Não pode usar as mãos', 'Não pode usar os braços', 'Não pode sair do lugar', 'Não pode repetir o mesmo gesto', 'Não pode apontar para nada', 'Não pode usar o rosto (sem expressão facial)', 'Só pode usar o rosto (sem corpo)', 'Tem que começar pelo final da ação', 'Tem que fazer tudo ao contrário (de trás pra frente)', 'Tem que parar completamente a cada 3 segundos', 'Faça a mímica como se estivesse em um filme de ação', 'Faça a mímica como se fosse uma comédia', 'Faça a mímica como se estivesse em câmera lenta dramática', 'Faça a mímica como se estivesse em um sonho', 'Faça a mímica como se estivesse com muito frio', 'Faça a mímica como se estivesse com muito calor', 'Faça a mímica como se estivesse no escuro', 'Faça a mímica como se estivesse em um palco', 'Faça a mímica como se estivesse sendo observado por uma plateia gigante', 'Faça a mímica como se fosse a última chance de ganhar o jogo'
    ];

    let wordBank = JSON.parse(localStorage.getItem('mm_words_v2') || 'null') || JSON.parse(JSON.stringify(DEFAULT_WORDS));
    const SETTINGS_KEY = 'mm_settings_v2';
    const AVAILABLE_THEMES = ['cosmic', 'liquid-glass', 'material3'];

    let gameState = {
      mode: 'teams', difficulty: 'easy',
      teams: { A: [], B: [] }, players: [],
      teamNames: { A: 'Time A', B: 'Time B' },
      scores: {}, currentPlayerIdx: 0,
      currentRound: 1, totalRounds: 3,
      currentWord: null, currentChallenge: null, usedWords: [],
      timerDur: 60, timerInterval: null, memInterval: null,
      timerLeft: 60, hintShown: false, wordVisible: false,
      phase: 'preparing', totalTurns: 0, turnsDone: 0,
      randomChallenge: false, selectedCategories: ['objects', 'actions', 'animals']
    };

    // ============================================================
    // STARS
    // ============================================================
    (function () {
      const c = document.getElementById('stars');
      for (let i = 0; i < 60; i++) {
        const s = document.createElement('div'); s.className = 'star';
        const sz = Math.random() * 2.5 + 0.5;
        s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${(Math.random() * 4 + 2).toFixed(1)}s;--del:${(Math.random() * 4).toFixed(1)}s;--op:${(Math.random() * 0.5 + 0.3).toFixed(2)}`;
        c.appendChild(s);
      }
    })();

    // ============================================================
    // NAVIGATION
    // ============================================================
    function goTo(screen) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('screen-' + screen).classList.add('active');
      if (screen === 'wordbank') { wbDiff = 'easy'; wbCat = 'objects'; syncWBDiffUI(); syncWBCatUI(); renderWordBank(); }
      if (screen === 'setup') { renderSetupPlayers(); updateDiffWordCount(); renderCategorySelection(); }
    }

    function getThemeVar(name) {
      return getComputedStyle(document.body).getPropertyValue(name).trim();
    }

    // ============================================================
    // NOTIFICATIONS
    // ============================================================
    function showNotif(msg, color = 'var(--accent3)', textColor = 'var(--notif-text)') {
      const el = document.getElementById('notif');
      el.textContent = msg; el.style.background = color; el.style.color = textColor;
      el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2400);
    }

    function applyTheme(theme = 'cosmic') {
      const nextTheme = AVAILABLE_THEMES.includes(theme) ? theme : 'cosmic';
      document.body.classList.remove(...AVAILABLE_THEMES.map(item => `theme-${item}`));
      document.body.classList.add(`theme-${nextTheme}`);
      const select = document.getElementById('theme-select');
      if (select && select.value !== nextTheme) select.value = nextTheme;
      return nextTheme;
    }

    function collectSettings() {
      return {
        timerDur: parseInt(document.getElementById('timer-slider').value, 10) || 60,
        soundEnabled: document.getElementById('toggle-sound').checked,
        penaltyEnabled: document.getElementById('toggle-penalty').checked,
        shuffleEnabled: document.getElementById('toggle-shuffle').checked,
        theme: document.getElementById('theme-select').value || 'cosmic'
      };
    }

    function saveSettings() {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(collectSettings()));
    }

    function initializeSettings() {
      const defaults = {
        timerDur: 60,
        soundEnabled: true,
        penaltyEnabled: false,
        shuffleEnabled: true,
        theme: 'cosmic'
      };

      let saved = defaults;
      try {
        saved = { ...defaults, ...(JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null') || {}) };
      } catch (e) { }

      document.getElementById('timer-slider').value = saved.timerDur;
      document.getElementById('toggle-sound').checked = Boolean(saved.soundEnabled);
      document.getElementById('toggle-penalty').checked = Boolean(saved.penaltyEnabled);
      document.getElementById('toggle-shuffle').checked = Boolean(saved.shuffleEnabled);
      document.getElementById('theme-select').value = applyTheme(saved.theme);
      updateTimerLabel(saved.timerDur);
    }

    // ============================================================
    // LOAD LAST PLAYERS
    // ============================================================
    function loadPlayersForMode(mode) {
      const key = mode === 'teams' ? 'mm_last_teams' : 'mm_last_ffa';
      const saved = localStorage.getItem(key);
      if (!saved) return;
      try {
        const data = JSON.parse(saved);
        if (mode === 'teams' && data.teams) {
          gameState.teams = JSON.parse(JSON.stringify(data.teams));
          if (data.teamNames) gameState.teamNames = { ...data.teamNames };
        } else if (mode === 'ffa' && data.players) {
          gameState.players = [...data.players];
        }
      } catch (e) { }
    }

    function updateTeamName(team, name) {
      gameState.teamNames[team] = name.trim() || `Time ${team}`;
      updateTeamLabels();
    }

    function updateTeamLabels() {
      try {
        document.getElementById('team-label-a').innerHTML = `🔴 ${gameState.teamNames.A}`;
        document.getElementById('team-label-b').innerHTML = `🔵 ${gameState.teamNames.B}`;
        document.getElementById('team-name-a').value = gameState.teamNames.A;
        document.getElementById('team-name-b').value = gameState.teamNames.B;
      } catch (e) { }
    }

    // ============================================================
    // UPDATE TEAM NAMES
    // ============================================================
    const DIFF_META = {
      easy: { label: '🌱 Fácil', color: 'var(--diff-easy)' },
      normal: { label: '⚡ Normal', color: 'var(--diff-normal)' },
      hard: { label: '🔥 Difícil', color: 'var(--diff-hard)' }
    };

    function selectDifficulty(diff) {
      gameState.difficulty = diff;
      ['easy', 'normal', 'hard'].forEach(d =>
        document.getElementById('diff-' + d).classList.toggle('selected', d === diff)
      );
      updateDiffWordCount();
    }

    function updateDiffWordCount() {
      const bank = wordBank[gameState.difficulty] || {};
      let total = 0; Object.values(bank).forEach(arr => total += arr.length);
      document.getElementById('diff-word-count').textContent =
        `${DIFF_META[gameState.difficulty].label} · ${total} palavras disponíveis`;
    }

    function toggleRandomChallenge(enabled) {
      gameState.randomChallenge = enabled;
    }

    function toggleCategory(category) {
      if (gameState.selectedCategories.includes(category)) {
        gameState.selectedCategories = gameState.selectedCategories.filter(c => c !== category);
      } else {
        gameState.selectedCategories.push(category);
      }
      renderCategorySelection();
    }

    function renderCategorySelection() {
      const container = document.getElementById('category-selection');
      const categories = [
        { key: 'objects', label: 'Objetos', icon: '📦' },
        { key: 'actions', label: 'Ações', icon: '🏃' },
        { key: 'animals', label: 'Animais', icon: '🐾' },
        { key: 'movies', label: 'Filmes', icon: '🎬' },
        { key: 'professions', label: 'Profissões', icon: '👔' },
        { key: 'celebrities', label: 'Celebridades', icon: '⭐' }
      ];
      container.innerHTML = categories.map(cat => `
        <div class="category-card ${gameState.selectedCategories.includes(cat.key) ? 'selected' : ''}" data-category="${cat.key}">
          ${cat.icon} ${cat.label}
        </div>
      `).join('');
    }

    // ============================================================
    // MODE
    // ============================================================
    function selectMode(mode) {
      gameState.mode = mode;
      document.getElementById('mode-teams').classList.toggle('selected', mode === 'teams');
      document.getElementById('mode-ffa').classList.toggle('selected', mode === 'ffa');
      document.getElementById('step-teams').classList.toggle('hidden', mode !== 'teams');
      document.getElementById('step-ffa').classList.toggle('hidden', mode !== 'ffa');
      loadPlayersForMode(mode);
      updateTeamLabels();
      renderSetupPlayers();
    }

    // ============================================================
    // PLAYERS
    // ============================================================
    function renderSetupPlayers() { renderTeamPlayers(); renderFFAPlayers(); }

    function renderTeamPlayers() {
      ['A', 'B'].forEach(t => {
        const cont = document.getElementById('team-' + t.toLowerCase() + '-players'); cont.innerHTML = '';
        (gameState.teams[t] || []).forEach((p, i) => {
          const color = t === 'A' ? 'var(--team1)' : 'var(--team2)';
          const el = document.createElement('div'); el.className = 'player-row';
          el.innerHTML = `<div class="player-avatar" style="background:${color}22;color:${color}">${p[0].toUpperCase()}</div><div class="player-name">${p}</div><button class="btn btn-ghost btn-sm" data-action="remove-team-player" data-team="${t}" data-index="${i}">✕</button>`;
          cont.appendChild(el);
        });
      });
    }

    function addTeamPlayer(team) {
      const inp = document.getElementById('inp-team-' + team.toLowerCase());
      const name = inp.value.trim(); if (!name) return;
      const total = (gameState.teams.A || []).length + (gameState.teams.B || []).length;
      if (total >= 6) { showNotif('❌ Máximo 6 jogadores!', 'var(--accent1)', 'var(--btn-danger-text)'); return; }
      if ((gameState.teams[team] || []).length >= 3) { showNotif('❌ Máximo 3 por time!', 'var(--accent1)', 'var(--btn-danger-text)'); return; }
      if (!gameState.teams[team]) gameState.teams[team] = [];
      gameState.teams[team].push(name); inp.value = ''; renderTeamPlayers();
      showNotif(`✅ ${name} no Time ${team}!`);
    }

    function removeTeamPlayer(team, idx) { gameState.teams[team].splice(idx, 1); renderTeamPlayers(); }

    function renderFFAPlayers() {
      const cont = document.getElementById('ffa-players'); cont.innerHTML = '';
      (gameState.players || []).forEach((p, i) => {
        const n = p.name || p;
        const el = document.createElement('div'); el.className = 'player-row';
        el.innerHTML = `<div class="player-avatar" style="background:var(--player-avatar-bg);color:var(--player-avatar-text)">${n[0].toUpperCase()}</div><div class="player-name">${n}</div><button class="btn btn-ghost btn-sm" data-action="remove-ffa-player" data-index="${i}">✕</button>`;
        cont.appendChild(el);
      });
    }

    function addFFAPlayer() {
      const inp = document.getElementById('inp-ffa');
      const name = inp.value.trim(); if (!name) return;
      if (!gameState.players) gameState.players = [];
      if (gameState.players.length >= 6) { showNotif('❌ Máximo 6 jogadores!', 'var(--accent1)', 'var(--btn-danger-text)'); return; }
      gameState.players.push(name); inp.value = ''; renderFFAPlayers();
      showNotif(`✅ ${name} entrou!`);
    }

    function removeFFAPlayer(idx) { gameState.players.splice(idx, 1); renderFFAPlayers(); }

    // ============================================================
    // START GAME
    // ============================================================
    function startGame() {
      const rounds = parseInt(document.getElementById('rounds-slider').value);
      gameState.totalRounds = rounds;
      gameState.timerDur = parseInt(document.getElementById('timer-slider').value) || 60;

      if (gameState.mode === 'teams') {
        const a = gameState.teams.A || [], b = gameState.teams.B || [];
        if (a.length < 1 || b.length < 1) { showNotif('❌ Mínimo 1 por time!', 'var(--accent1)', 'var(--btn-danger-text)'); return; }
        gameState.players = [];
        const maxLen = Math.max(a.length, b.length);
        for (let i = 0; i < maxLen; i++) {
          if (i < a.length) gameState.players.push({ name: a[i], team: 'A' });
          if (i < b.length) gameState.players.push({ name: b[i], team: 'B' });
        }
        gameState.scores = { teamA: 0, teamB: 0 };
        a.forEach(p => gameState.scores[p] = 0);
        b.forEach(p => gameState.scores[p] = 0);
      } else {
        if (!gameState.players || gameState.players.length < 3) { showNotif('❌ Mínimo 3 jogadores!', 'var(--accent1)', 'var(--btn-danger-text)'); return; }
        const players = [...gameState.players];
        gameState.players = players.map(p => ({ name: p.name || p, team: null }));
        gameState.scores = {};
        players.forEach(p => gameState.scores[p.name || p] = 0);
      }

      gameState.currentPlayerIdx = 0; gameState.currentRound = 1;
      gameState.usedWords = []; gameState.turnsDone = 0;
      gameState.totalTurns = gameState.players.length * rounds;

      // Save last players
      const key = gameState.mode === 'teams' ? 'mm_last_teams' : 'mm_last_ffa';
      const toSave = gameState.mode === 'teams'
        ? { teams: gameState.teams, teamNames: gameState.teamNames }
        : { players: gameState.players.map(p => p.name || p) };
      localStorage.setItem(key, JSON.stringify(toSave));

      initTurn(); goTo('game');
    }

    // ============================================================
    // TURN
    // ============================================================
    function initTurn() {
      gameState.phase = 'preparing';
      const player = gameState.players[gameState.currentPlayerIdx];
      const roundNum = Math.floor(gameState.turnsDone / gameState.players.length) + 1;
      document.getElementById('round-display').textContent = `Rodada ${roundNum} de ${gameState.totalRounds}`;
      document.getElementById('current-player-name').textContent = player.name || player;
      const badge = document.getElementById('current-team-badge');
      if (player.team) {
        const color = player.team === 'A' ? 'var(--team1)' : 'var(--team2)';
        const label = gameState.teamNames[player.team] || `Time ${player.team}`;
        badge.innerHTML = `<span class="team-badge" style="background:${color}22;color:${color}">${label}</span>`;
      } else badge.innerHTML = '';
      document.getElementById('preparing-state').classList.remove('hidden');
      document.getElementById('memorize-state').classList.add('hidden');
      document.getElementById('playing-state').classList.add('hidden');
      renderScoreMini();
    }

    // ============================================================
    // REVEAL + MEMORIZE
    // ============================================================
    function revealWord() {
      gameState.phase = 'memorizing';
      gameState.currentWord = pickWord();
      const catLabels = { objects: '🧸 Objeto', actions: '🏃 Ação', animals: '🐾 Animal', movies: '🎬 Filme', professions: '👔 Profissão', celebrities: '⭐ Celebridade' };
      document.getElementById('mem-word-display').textContent = gameState.currentWord.word;
      document.getElementById('hint-text').textContent = catLabels[gameState.currentWord.cat] || 'Palavra';
      document.getElementById('hint-banner').classList.add('hidden');
      document.getElementById('word-display').textContent = gameState.currentWord.word;
      document.getElementById('word-hidden-placeholder').classList.remove('hidden');
      document.getElementById('word-visible-content').classList.add('hidden');
      document.getElementById('btn-toggle-word').textContent = '👁️ Mostrar palavra';
      gameState.wordVisible = false;

      // Show challenge if enabled
      const challengeEl = document.getElementById('mem-challenge-display');
      const challengeTextEl = document.getElementById('mem-challenge-text');
      if (gameState.currentChallenge) {
        challengeTextEl.textContent = gameState.currentChallenge;
        challengeEl.classList.remove('hidden');
      } else {
        challengeEl.classList.add('hidden');
      }

      document.getElementById('preparing-state').classList.add('hidden');
      document.getElementById('memorize-state').classList.remove('hidden');
      document.getElementById('playing-state').classList.add('hidden');

      let memLeft = 5;
      const mc = document.getElementById('memCircle'), mn = document.getElementById('mem-num');
      updateMemCircle(memLeft, 5, mc, mn, 213.6); playBeep(600);
      gameState.memInterval = setInterval(() => {
        memLeft--;
        updateMemCircle(memLeft, 5, mc, mn, 213.6);
        if (memLeft > 0) playBeep(memLeft <= 2 ? 700 : 500);
        if (memLeft <= 0) {
          clearInterval(gameState.memInterval);
          // Hide challenge after memorization
          challengeEl.classList.add('hidden');
          document.getElementById('memorize-state').classList.add('hidden');
          document.getElementById('playing-state').classList.remove('hidden');
          gameState.phase = 'playing'; playBeep(880); startTimer();
        }
      }, 1000);
    }

    function updateMemCircle(left, total, circ, numEl, circumference) {
      numEl.textContent = left;
      circ.style.strokeDashoffset = circumference - (left / total) * circumference;
    }

    function toggleWordVisibility() {
      const ph = document.getElementById('word-hidden-placeholder');
      const vc = document.getElementById('word-visible-content');
      const btn = document.getElementById('btn-toggle-word');
      gameState.wordVisible = !gameState.wordVisible;
      if (gameState.wordVisible) {
        ph.classList.add('hidden'); vc.classList.remove('hidden'); btn.textContent = '🙈 Ocultar palavra';
        // Show challenge when revealing word
        const challengeEl = document.getElementById('game-challenge-display');
        const challengeTextEl = document.getElementById('game-challenge-text');
        if (gameState.currentChallenge) {
          challengeTextEl.textContent = gameState.currentChallenge;
          challengeEl.classList.remove('hidden');
        } else {
          challengeEl.classList.add('hidden');
        }
      } else {
        ph.classList.remove('hidden'); vc.classList.add('hidden'); btn.textContent = '👁️ Mostrar palavra';
      }
    }

    // ============================================================
    // PICK WORD
    // ============================================================
    function pickWord() {
      const shuffle = document.getElementById('toggle-shuffle').checked;
      const bank = wordBank[gameState.difficulty] || {};
      const allWords = [];
      gameState.selectedCategories.forEach(cat => {
        (bank[cat] || []).forEach(w => allWords.push({ word: w, cat }));
      });
      let available = allWords.filter(w => !gameState.usedWords.includes(w.word));
      if (available.length === 0) { gameState.usedWords = []; available = allWords; }
      if (available.length === 0) return { word: '???', cat: 'objects' };
      const picked = shuffle ? available[Math.floor(Math.random() * available.length)] : available[0];
      gameState.usedWords.push(picked.word);

      // Pick challenge if enabled
      gameState.currentChallenge = null;
      if (gameState.randomChallenge) {
        gameState.currentChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
      }

      return picked;
    }

    // ============================================================
    // TIMER
    // ============================================================
    function startTimer() {
      const dur = gameState.timerDur;
      gameState.timerLeft = dur; gameState.hintShown = false;
      updateTimerDisplay(dur, dur);
      clearInterval(gameState.timerInterval);
      gameState.timerInterval = setInterval(() => {
        gameState.timerLeft--;
        updateTimerDisplay(gameState.timerLeft, dur);
        const elapsed = dur - gameState.timerLeft;
        if (!gameState.hintShown && elapsed >= Math.floor(dur * 0.75)) {
          gameState.hintShown = true;
          const hint = document.getElementById('hint-banner');
          hint.classList.remove('hidden');
          hint.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 400, fill: 'forwards' });
          playBeep(523);
        }
        if (document.getElementById('toggle-sound').checked && gameState.timerLeft <= 10 && gameState.timerLeft > 0)
          playBeep(gameState.timerLeft <= 3 ? 880 : 440);
        if (gameState.timerLeft <= 0) { clearInterval(gameState.timerInterval); markResult(false, true); }
      }, 1000);
    }

    function updateTimerDisplay(left, total) {
      document.getElementById('timer-num').textContent = left;
      const circ = document.getElementById('timerCircle');
      circ.style.strokeDashoffset = 427.3 - (left / total) * 427.3;
      circ.style.stroke = left > total * 0.5
        ? getThemeVar('--timer-color-safe')
        : left > total * 0.25
          ? getThemeVar('--timer-color-warning')
          : getThemeVar('--timer-color-danger');
    }

    function updateTimerLabel(val) {
      document.getElementById('timer-val').textContent = val + 's';
      gameState.timerDur = parseInt(val);
    }

    function playBeep(freq = 440) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start(); osc.stop(ctx.currentTime + 0.2);
      } catch (e) { }
    }

    function playClickSound() {
      playBeep(800);
    }

    function playCorrectSound() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
      } catch (e) { }
    }

    function playWrongSound() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.setValueAtTime(300, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start(); osc.stop(ctx.currentTime + 0.2);
      } catch (e) { }
    }

    function animateButtonClick(button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 100);
    }

    function animateWrongButton(button) {
      button.style.transform = 'translateX(-5px)';
      setTimeout(() => {
        button.style.transform = 'translateX(5px)';
      }, 50);
      setTimeout(() => {
        button.style.transform = 'translateX(-5px)';
      }, 100);
      setTimeout(() => {
        button.style.transform = 'translateX(5px)';
      }, 150);
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
    }

    // ============================================================
    // RESULT
    // ============================================================
    function markResult(correct, timeUp = false) {
      clearInterval(gameState.timerInterval);
      clearInterval(gameState.memInterval);
      document.getElementById('memorize-state').classList.add('hidden');
      const player = gameState.players[gameState.currentPlayerIdx];
      const pName = player.name || player;
      const emoji = document.getElementById('resultEmoji');
      const title = document.getElementById('resultTitle');
      const sub = document.getElementById('resultSub');

      if (correct) {
        if (gameState.mode === 'teams') {
          gameState.scores['team' + player.team] = (gameState.scores['team' + player.team] || 0) + 10;
          gameState.scores[pName] = (gameState.scores[pName] || 0) + 10;
        } else {
          gameState.scores[pName] = (gameState.scores[pName] || 0) + 10;
        }

        emoji.textContent = '🎉';
        title.textContent = 'Acertou!';
        title.style.color = 'var(--accent3)';
        sub.textContent = gameState.mode === 'teams'
          ? `+10 pontos para o Time ${player.team === 'A' ? 'A 🔴' : 'B 🔵'}`
          : `+10 pontos para ${pName}!`;
        launchConfetti();
        playBeep(523);
      } else {
        if (document.getElementById('toggle-penalty').checked && !timeUp) {
          if (gameState.mode === 'teams') {
            gameState.scores['team' + player.team] = Math.max(0, (gameState.scores['team' + player.team] || 0) - 10);
            gameState.scores[pName] = Math.max(0, (gameState.scores[pName] || 0) - 10);
          } else {
            gameState.scores[pName] = Math.max(0, (gameState.scores[pName] || 0) - 10);
          }
          sub.textContent = '-10 pontos (penalidade por skip)';
        } else {
          sub.textContent = timeUp ? 'O tempo acabou! Sem pontos.' : 'Palavra pulada. Sem pontos.';
        }
        emoji.textContent = timeUp ? '⏰' : '😅';
        title.textContent = timeUp ? 'Tempo esgotado!' : 'Errou!';
        title.style.color = 'var(--accent1)';
      }

      document.getElementById('resultOverlay').classList.add('show');
    }

    function nextTurn() {
      document.getElementById('resultOverlay').classList.remove('show');
      gameState.turnsDone++;
      if (gameState.turnsDone >= gameState.totalTurns) {
        showFinalScore();
        return;
      }
      gameState.currentPlayerIdx = (gameState.currentPlayerIdx + 1) % gameState.players.length;
      if (gameState.currentPlayerIdx === 0) {
        gameState.currentRound++;
        showMidScore();
      } else {
        initTurn();
      }
    }

    // ============================================================
    // SCOREBOARDS
    // ============================================================
    function renderScoreMini() {
      const cont = document.getElementById('score-mini'); cont.innerHTML = '';
      if (gameState.mode === 'teams') {
        ['A', 'B'].forEach(t => {
          const color = t === 'A' ? 'var(--team1)' : 'var(--team2)';
          const el = document.createElement('div');
          el.style.cssText = `background:${color}22;border:1px solid ${color}44;border-radius:12px;padding:8px 14px;display:flex;align-items:center;gap:8px;white-space:nowrap`;
          const label = gameState.teamNames[t] || `Time ${t}`;
          el.innerHTML = `<span style="font-weight:800;color:${color}">${label}</span><span style="font-family:var(--font-display);font-size:1.2rem;color:${color}">${gameState.scores['team' + t] || 0}</span>`;
          cont.appendChild(el);
        });
      } else {
        gameState.players.forEach(p => {
          const n = p.name || p;
          const el = document.createElement('div');
          el.style.cssText = `background:var(--surface-bg);border:1px solid var(--surface-border);border-radius:12px;padding:8px 14px;display:flex;align-items:center;gap:8px;white-space:nowrap`;
          el.innerHTML = `<span style="font-weight:800;font-size:0.85rem">${n}</span><span style="font-family:var(--font-display);font-size:1.2rem;color:var(--accent2)">${gameState.scores[n] || 0}</span>`;
          cont.appendChild(el);
        });
      }
    }

    function renderFullScoreboard(isFinal = false) {
      const cont = document.getElementById(isFinal ? 'final-scoreboard' : 'scoreboard-list'); cont.innerHTML = '';
      let entries = [];
      if (gameState.mode === 'teams') {
        entries = [{ name: `🔴 ${gameState.teamNames.A || 'Time A'}`, pts: gameState.scores.teamA || 0, team: 'A' }, { name: `🔵 ${gameState.teamNames.B || 'Time B'}`, pts: gameState.scores.teamB || 0, team: 'B' }];
      } else {
        entries = gameState.players.map(p => ({ name: p.name || p, pts: gameState.scores[p.name || p] || 0 }));
      }
      entries.sort((a, b) => b.pts - a.pts);
      const ranks = ['🥇', '🥈', '🥉'];
      entries.forEach((e, i) => {
        const div = document.createElement('div');
        div.className = 'score-row' + (i === 0 ? ' first' : i === 1 ? ' second' : i === 2 ? ' third' : '');
        const color = e.team === 'A' ? 'var(--team1)' : e.team === 'B' ? 'var(--team2)' : '';
        div.innerHTML = `<div class="rank-badge">${ranks[i] || (i + 1)}</div><div class="score-name" style="flex:1;${color ? 'color:' + color : ''}">${e.name}</div><div class="score-pts">${e.pts} <span style="font-size:0.8rem;color:var(--text3)">pts</span></div>`;
        cont.appendChild(div);
      });
    }

    function showMidScore() {
      goTo('score'); renderFullScoreboard(false);
      const roundDone = gameState.currentRound - 1;
      const remaining = gameState.totalRounds - roundDone;
      document.getElementById('score-subtitle').textContent = `Fim da Rodada ${roundDone} — ${remaining} rodada${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}!`;
      document.getElementById('next-round-info').textContent = `Rodada ${gameState.currentRound} de ${gameState.totalRounds}`;
    }

    function continueGame() { goTo('game'); initTurn(); }

    function showFinalScore() {
      goTo('final'); renderFullScoreboard(true);
      let winner = '';
      if (gameState.mode === 'teams') {
        const a = gameState.scores.teamA || 0, b = gameState.scores.teamB || 0;
        if (a > b) winner = `🔴 ${gameState.teamNames.A || 'Time A'}`;
        else if (b > a) winner = `🔵 ${gameState.teamNames.B || 'Time B'}`;
        else winner = 'EMPATE!';
        document.getElementById('final-trophy').textContent = (a === b) ? '🤝' : '🏆';
      } else {
        const sorted = gameState.players.map(p => ({ name: p.name || p, pts: gameState.scores[p.name || p] || 0 })).sort((a, b) => b.pts - a.pts);
        winner = sorted[0].name;
        const isTie = sorted.length > 1 && sorted[0].pts === sorted[1].pts;
        if (isTie) { winner = 'EMPATE!'; document.getElementById('final-trophy').textContent = '🤝'; }
        else document.getElementById('final-trophy').textContent = '🏆';
      }
      document.getElementById('final-winner').textContent = winner;
      launchConfetti(80);
    }

    // ============================================================
    // WORD BANK
    // ============================================================
    let wbDiff = 'easy';
    let wbCat = 'objects';

    function syncWBDiffUI() {
      ['easy', 'normal', 'hard'].forEach(d =>
        document.getElementById('wb-diff-' + d).classList.toggle('selected', d === wbDiff)
      );
      const labels = { easy: '🌱 Fácil', normal: '⚡ Normal', hard: '🔥 Difícil' };
      document.getElementById('wb-diff-label').textContent = labels[wbDiff];
    }

    function syncWBCatUI() {
      ['objects', 'actions', 'animals', 'movies', 'professions', 'celebrities'].forEach(t =>
        document.getElementById('tab-' + t)?.classList.toggle('active', t === wbCat)
      );
    }

    function switchWBDiff(diff) { wbDiff = diff; syncWBDiffUI(); renderWordBank(); }

    function switchWordTab(tab) { wbCat = tab; syncWBCatUI(); renderWordBank(); }

    function renderWordBank() {
      const cont = document.getElementById('words-list'); cont.innerHTML = '';
      let count = 0;
      const bank = wordBank[wbDiff] || {};
      const cats = [wbCat];
      const catIcon = { objects: '🧸', actions: '🏃', animals: '🐾', movies: '🎬', professions: '👔', celebrities: '⭐' };
      cats.forEach(cat => {
        (bank[cat] || []).forEach(word => {
          count++;
          const tag = document.createElement('span'); tag.className = 'word-tag';
          const idx = (wordBank[wbDiff][cat] || []).indexOf(word);
          tag.innerHTML = `${catIcon[cat] || ''} ${word} <span class="del-btn" data-action="remove-word" data-word-category="${cat}" data-index="${idx}">✕</span>`;
          cont.appendChild(tag);
        });
      });
      document.getElementById('word-count').textContent = count;
    }

    function addWord() {
      const inp = document.getElementById('inp-new-word');
      const cat = document.getElementById('inp-word-cat').value;
      const word = inp.value.trim(); if (!word) return;
      if (!wordBank[wbDiff]) wordBank[wbDiff] = {};
      if (!wordBank[wbDiff][cat]) wordBank[wbDiff][cat] = [];
      if (wordBank[wbDiff][cat].includes(word)) { showNotif('⚠️ Palavra já existe!', 'var(--accent2)', 'var(--text)'); return; }
      wordBank[wbDiff][cat].push(word);
      saveWords(); inp.value = ''; renderWordBank();
      const labels = { easy: '🌱 Fácil', normal: '⚡ Normal', hard: '🔥 Difícil' };
      showNotif(`✅ "${word}" adicionada (${labels[wbDiff]})!`);
    }

    function removeWord(cat, idx) {
      if (!wordBank[wbDiff]?.[cat]) return;
      wordBank[wbDiff][cat].splice(idx, 1);
      saveWords(); renderWordBank();
    }

    function resetWords() {
      if (confirm('Restaurar o banco de palavras padrão? Palavras customizadas serão perdidas.')) {
        wordBank = JSON.parse(JSON.stringify(DEFAULT_WORDS));
        saveWords(); renderWordBank(); showNotif('✅ Banco restaurado!');
      }
    }

    function saveWords() { localStorage.setItem('mm_words_v2', JSON.stringify(wordBank)); }

    // ============================================================
    // CONFETTI
    // ============================================================
    function launchConfetti(count = 40) {
      const colors = [
        getThemeVar('--accent1'),
        getThemeVar('--accent2'),
        getThemeVar('--accent3'),
        getThemeVar('--accent4'),
        getThemeVar('--accent5'),
        getThemeVar('--timer-color-warning')
      ];
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div'); el.className = 'confetti-piece';
        el.style.cssText = `left:${Math.random() * 100}vw;top:-10px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};--dur:${(Math.random() * 1.5 + 1.5).toFixed(1)}s;--del2:${(Math.random() * 1).toFixed(2)}s;`;
        document.body.appendChild(el); setTimeout(() => el.remove(), 4000);
      }
    }

    // ============================================================
    // RESTART
    // ============================================================
    function confirmRestart() {
      if (confirm('Reiniciar o jogo? Todo o progresso será perdido.')) {
        clearInterval(gameState.timerInterval); clearInterval(gameState.memInterval);
        document.getElementById('resultOverlay').classList.remove('show');
        const prevDiff = gameState.difficulty;
        gameState = {
          mode: 'teams', difficulty: prevDiff,
          teams: { A: [], B: [] }, players: [],
          teamNames: { A: 'Time A', B: 'Time B' },
          scores: {}, currentPlayerIdx: 0, currentRound: 1, totalRounds: 3,
          currentWord: null, currentChallenge: null, usedWords: [],
          timerDur: parseInt(document.getElementById('timer-slider').value) || 60,
          timerInterval: null, memInterval: null,
          timerLeft: 60, hintShown: false, wordVisible: false,
          phase: 'preparing', totalTurns: 0, turnsDone: 0,
          randomChallenge: false, selectedCategories: ['objects', 'actions', 'animals']
        };
        selectMode('teams'); selectDifficulty(prevDiff);
        goTo('setup'); renderSetupPlayers();
      }
    }

    function handleNavigation(button) {
      animateButtonClick(button);
      playClickSound();
      goTo(button.dataset.nav);
    }

    function handleEnterSubmit(key) {
      if (key === 'team-A') addTeamPlayer('A');
      if (key === 'team-B') addTeamPlayer('B');
      if (key === 'ffa') addFFAPlayer();
      if (key === 'add-word') addWord();
    }

    function applyLayoutPreview(mode = 'auto') {
      document.body.dataset.previewMode = mode;
      localStorage.setItem('mm_layout_preview', mode);
      const select = document.getElementById('dev-layout-preview');
      if (select && select.value !== mode) select.value = mode;
    }

    function initializeLayoutPreview() {
      const saved = localStorage.getItem('mm_layout_preview') || 'auto';
      applyLayoutPreview(saved);
    }

    function handleAction(button) {
      const { action, team, index, wordCategory } = button.dataset;

      if (action === 'next-turn') return nextTurn();
      if (action === 'add-team-player') return addTeamPlayer(team);
      if (action === 'add-ffa-player') return addFFAPlayer();
      if (action === 'start-game') {
        animateButtonClick(button);
        playClickSound();
        return startGame();
      }
      if (action === 'confirm-restart') return confirmRestart();
      if (action === 'reveal-word') return revealWord();
      if (action === 'toggle-word') return toggleWordVisibility();
      if (action === 'mark-correct') {
        animateButtonClick(button);
        playCorrectSound();
        return markResult(true);
      }
      if (action === 'mark-wrong') {
        animateWrongButton(button);
        playWrongSound();
        return markResult(false);
      }
      if (action === 'continue-game') return continueGame();
      if (action === 'add-word') return addWord();
      if (action === 'reset-words') return resetWords();
      if (action === 'remove-word') return removeWord(wordCategory, Number(index));
      if (action === 'remove-team-player') return removeTeamPlayer(team, Number(index));
      if (action === 'remove-ffa-player') return removeFFAPlayer(Number(index));
    }

    function registerEventListeners() {
      document.addEventListener('click', event => {
        const navButton = event.target.closest('[data-nav]');
        if (navButton) {
          handleNavigation(navButton);
          return;
        }

        const modeCard = event.target.closest('[data-mode]');
        if (modeCard) {
          selectMode(modeCard.dataset.mode);
          return;
        }

        const difficultyCard = event.target.closest('[data-difficulty]');
        if (difficultyCard) {
          selectDifficulty(difficultyCard.dataset.difficulty);
          return;
        }

        const categoryCard = event.target.closest('.category-card[data-category]');
        if (categoryCard) {
          toggleCategory(categoryCard.dataset.category);
          return;
        }

        const wbDifficultyCard = event.target.closest('[data-wb-difficulty]');
        if (wbDifficultyCard) {
          switchWBDiff(wbDifficultyCard.dataset.wbDifficulty);
          return;
        }

        const wbTabButton = event.target.closest('[data-wb-tab]');
        if (wbTabButton) {
          switchWordTab(wbTabButton.dataset.wbTab);
          return;
        }

        const actionButton = event.target.closest('[data-action]');
        if (actionButton) {
          handleAction(actionButton);
        }
      });

      document.querySelectorAll('[data-team-name]').forEach(input => {
        input.addEventListener('change', () => updateTeamName(input.dataset.teamName, input.value));
      });

      document.querySelectorAll('[data-enter-submit]').forEach(input => {
        input.addEventListener('keydown', event => {
          if (event.key === 'Enter') handleEnterSubmit(input.dataset.enterSubmit);
        });
      });

      document.getElementById('rounds-slider').addEventListener('input', event => {
        document.getElementById('rounds-val').textContent = event.target.value;
      });

      document.getElementById('timer-slider').addEventListener('input', event => {
        updateTimerLabel(event.target.value);
        saveSettings();
      });

      document.getElementById('random-challenge-toggle').addEventListener('change', event => {
        toggleRandomChallenge(event.target.checked);
      });

      document.getElementById('toggle-sound').addEventListener('change', saveSettings);
      document.getElementById('toggle-penalty').addEventListener('change', saveSettings);
      document.getElementById('toggle-shuffle').addEventListener('change', saveSettings);
      document.getElementById('theme-select').addEventListener('change', event => {
        applyTheme(event.target.value);
        saveSettings();
      });

      const previewSelect = document.getElementById('dev-layout-preview');
      if (previewSelect) {
        previewSelect.addEventListener('change', event => {
          applyLayoutPreview(event.target.value);
        });
      }
    }

    // ============================================================
    // INIT
    // ============================================================
    initializeLayoutPreview();
    initializeSettings();
    registerEventListeners();
    selectMode('teams');
    selectDifficulty('easy');
