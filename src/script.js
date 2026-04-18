    const DEFAULT_LANGUAGE = 'pt';
    const SETTINGS_KEY = 'mm_settings_v2';
    const CONTENT_KEY = 'mm_content_v1';
    const LEGACY_WORDS_KEY = 'mm_words_v2';
    const AVAILABLE_THEMES = ['cosmic', 'liquid-glass', 'material3'];
    const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'];
    const LANGUAGE_HTML_MAP = { pt: 'pt-BR', en: 'en', es: 'es' };
    const DIFFICULTY_KEYS = ['easy', 'normal', 'hard'];
    const CATEGORY_KEYS = ['objects', 'actions', 'animals', 'movies', 'professions', 'celebrities'];
    const CATEGORY_ICONS = { objects: '🧸', actions: '🏃', animals: '🐾', movies: '🎬', professions: '👔', celebrities: '⭐' };
    const DIFFICULTY_ICONS = { easy: '🌱', normal: '⚡', hard: '🔥' };
    const CORE_PACK_ID = 'core-default';
    let currentLanguage = DEFAULT_LANGUAGE;

    function clone(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function getNestedValue(obj, path) {
      return path.split('.').reduce((acc, key) => acc && acc[key], obj);
    }

    const TRANSLATIONS = {
      pt: {
        meta: { documentTitle: 'MimiMania 🎭' },
        common: {
          back: '← Voltar',
          add: '+ Adicionar',
          continue: '▶️ Continuar',
          restart: '🔄 Reiniciar',
          home: '🏠 Início',
          pointsShort: 'pts'
        },
        language: {
          pt: 'Português',
          en: 'English',
          es: 'Español'
        },
        dev: {
          mode: 'Modo de desenvolvimento',
          description: 'Teste rapidamente o layout em mobile, tablet e desktop.',
          previewLabel: 'Prévia de layout',
          preview: {
            auto: 'Auto',
            mobile: 'Mobile',
            tablet: 'Tablet',
            desktop: 'Desktop'
          }
        },
        home: {
          subtitle: '🎭 O jogo da mímica',
          newGame: '🎮 Nova Partida',
          wordBank: '📝 Banco de Palavras',
          settings: '⚙️ Configurações',
          howToTitle: '🏆 Como jogar',
          howTo: {
            mimeTitle: 'O Mimo',
            mimeDesc: 'Vê a palavra e faz a mímica sem falar nada!',
            timeTitle: 'O Tempo',
            timeDesc: 'Tentem adivinhar antes do timer acabar!',
            pointsTitle: 'Os Pontos',
            pointsDesc: 'Cada acerto vale 10 pontos. Quem tiver mais pontos vence!'
          }
        },
        setup: {
          title: 'Nova Partida',
          modeTitle: '1️⃣ Modo de Jogo',
          modeTeamsName: 'Dois Times',
          modeTeamsDesc: 'Equipes competem',
          modeFfaName: 'Cada um por si',
          modeFfaDesc: 'Todos contra todos',
          teamPlayersTitle: '2️⃣ Jogadores por Time',
          playersTitle: '2️⃣ Jogadores',
          teamAPlaceholder: 'Nome do Time A',
          teamBPlaceholder: 'Nome do Time B',
          playerNamePlaceholder: 'Nome do jogador...',
          teamHelper: '💡 Mínimo 1 por time, máximo 3 por time (até 6 jogadores)',
          ffaHelper: '💡 Mínimo 3, máximo 6 jogadores',
          difficultyTitle: '3️⃣ Dificuldade',
          difficultyEasyDesc: 'Ótimo para crianças e iniciantes',
          difficultyNormalDesc: 'Desafio equilibrado para a família',
          difficultyHardDesc: 'Palavras complexas, para os corajosos!',
          optionsTitle: '4️⃣ Opções de Jogo',
          randomChallengeLabel: 'Desafio Aleatório',
          randomChallengeSub: 'Adiciona modificadores à mímica',
          categoriesLabel: 'Categorias Disponíveis',
          matchTitle: '5️⃣ Configurar Partida',
          roundsLabel: 'Número de Rodadas',
          roundsSub: 'Quantas rodadas por jogador',
          startGame: '🎭 Começar o Jogo!'
        },
        difficulty: {
          easy: 'Fácil',
          normal: 'Normal',
          hard: 'Difícil'
        },
        category: {
          objects: { plural: 'Objetos', singular: 'Objeto', tab: '🧸 Objetos', option: '🧸 Objetos' },
          actions: { plural: 'Ações', singular: 'Ação', tab: '🏃 Ações', option: '🏃 Ações' },
          animals: { plural: 'Animais', singular: 'Animal', tab: '🐾 Animais', option: '🐾 Animais' },
          movies: { plural: 'Filmes', singular: 'Filme', tab: '🎬 Filmes', option: '🎬 Filmes' },
          professions: { plural: 'Profissões', singular: 'Profissão', tab: '👔 Profissões', option: '👔 Profissões' },
          celebrities: { plural: 'Celebridades', singular: 'Celebridade', tab: '⭐ Celebridades', option: '⭐ Celebridades' }
        },
        game: {
          currentPlayerLabel: 'Vez de fazer a mímica:',
          readyTitle: 'Prontos para ver a palavra?',
          readySub: 'Só o mimo deve ver! Os outros fechem os olhos! 👀',
          revealWord: '🎲 Revelar Palavra',
          memorizeTitle: '⚡ Memorize a palavra!',
          startsIn: 'O jogo começa em...',
          onlyMimeCanSee: 'Só o mimo pode ver!',
          secondsLabel: 'SEGUNDOS',
          hiddenWord: 'Palavra oculta',
          hintTitle: '💡 Dica',
          showWord: '👁️ Mostrar palavra',
          hideWord: '🙈 Ocultar palavra',
          correct: '✅ Acertou!',
          wrong: '❌ Errou / Skip',
          challengePrefix: '🎯 Desafio:'
        },
        result: {
          correctTitle: 'Acertou!',
          wrongTitle: 'Errou!',
          timeUpTitle: 'Tempo esgotado!',
          nextTurn: '➡️ Próximo turno'
        },
        score: {
          title: '🏆 Placar',
          nextRoundTitle: '🎊 Próxima Rodada'
        },
        final: {
          winnerLabel: 'VENCEDOR!',
          resultTitle: '📊 Resultado Final',
          playAgain: '🎮 Jogar de Novo',
          tie: 'EMPATE!'
        },
        wordbank: {
          title: 'Banco de Palavras',
          addTitle: '➕ Adicionar Palavra',
          newWordPlaceholder: 'Digite a palavra...',
          addToDifficulty: 'Será adicionada à dificuldade:',
          addButton: '➕ Adicionar Palavra',
          listTitle: '📋 Palavras',
          resetButton: '↺ Restaurar'
        },
        settings: {
          title: 'Configurações',
          timerTitle: '⏱️ Timer',
          roundTimeLabel: 'Tempo por Rodada',
          roundTimeSub: 'Segundos para adivinhar',
          penaltyLabel: 'Penalidade por Skip',
          penaltySub: '−10 pontos ao pular',
          generalTitle: '⚙️ Configurações Gerais',
          languageLabel: 'Idioma',
          languageSub: 'Altera a interface e o conteúdo disponível no jogo',
          alertSoundLabel: 'Som de Alerta',
          alertSoundSub: 'Beep nos últimos 10 segundos',
          navigationSoundLabel: 'Som de Navegação',
          navigationSoundSub: 'Som ao clicar nos botões da interface',
          wordsTitle: '🎲 Palavras',
          shuffleWordsLabel: 'Embaralhar Palavras',
          shuffleWordsSub: 'Ordem aleatória a cada jogo',
          appearanceTitle: '🎨 Aparência',
          themeLabel: 'Tema visual',
          themeSub: 'Troque cores, transparências e tipografia da interface'
        },
        theme: {
          cosmic: 'Cósmico',
          'liquid-glass': 'Outono',
          material3: 'Primavera'
        },
        footer: {
          copyPrefix: '© 2025 MimiMania v3.0 · Flavio Matiello · Publicado no ',
          githubPages: 'GitHub Pages'
        },
        teams: {
          defaultA: 'Time A',
          defaultB: 'Time B'
        },
        dynamic: {
          roundDisplay: ({ current, total }) => `Rodada ${current} de ${total}`,
          diffCount: ({ difficulty, count }) => `${difficulty} · ${count} palavras disponíveis`,
          correctTeamPoints: ({ teamName }) => `+10 pontos para ${teamName}!`,
          correctPlayerPoints: ({ playerName }) => `+10 pontos para ${playerName}!`,
          penaltySkip: '-10 pontos (penalidade por skip)',
          timeUpNoPoints: 'O tempo acabou! Sem pontos.',
          skippedNoPoints: 'Palavra pulada. Sem pontos.',
          roundSummary: ({ roundDone, remaining }) => `Fim da Rodada ${roundDone} — ${remaining} rodada${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}!`,
          wordAdded: ({ word, difficulty }) => `✅ "${word}" adicionada (${difficulty})!`,
          teamAdded: ({ name, teamName }) => `✅ ${name} em ${teamName}!`,
          playerAdded: ({ name }) => `✅ ${name} entrou!`
        },
        notifications: {
          duplicateWord: '⚠️ Palavra já existe!',
          bankRestored: '✅ Banco restaurado!',
          maxPlayers: '❌ Máximo 6 jogadores!',
          maxTeamPlayers: '❌ Máximo 3 por time!',
          minTeamPlayers: '❌ Mínimo 1 por time!',
          minFfaPlayers: '❌ Mínimo 3 jogadores!'
        },
        confirmations: {
          resetWords: 'Restaurar o banco de palavras padrão? Palavras customizadas serão perdidas.',
          restartGame: 'Reiniciar o jogo? Todo o progresso será perdido.'
        }
      },
      en: {
        meta: { documentTitle: 'MimiMania 🎭' },
        common: {
          back: '← Back',
          add: '+ Add',
          continue: '▶️ Continue',
          restart: '🔄 Restart',
          home: '🏠 Home',
          pointsShort: 'pts'
        },
        language: {
          pt: 'Portuguese',
          en: 'English',
          es: 'Spanish'
        },
        dev: {
          mode: 'Development mode',
          description: 'Quickly preview the layout on mobile, tablet, and desktop.',
          previewLabel: 'Layout preview',
          preview: {
            auto: 'Auto',
            mobile: 'Mobile',
            tablet: 'Tablet',
            desktop: 'Desktop'
          }
        },
        home: {
          subtitle: '🎭 The charades game',
          newGame: '🎮 New Game',
          wordBank: '📝 Word Bank',
          settings: '⚙️ Settings',
          howToTitle: '🏆 How to play',
          howTo: {
            mimeTitle: 'The Mime',
            mimeDesc: 'Sees the word and acts it out without saying anything!',
            timeTitle: 'The Time',
            timeDesc: 'Try to guess it before the timer runs out!',
            pointsTitle: 'The Points',
            pointsDesc: 'Each correct answer is worth 10 points. Whoever has the most points wins!'
          }
        },
        setup: {
          title: 'New Game',
          modeTitle: '1️⃣ Game Mode',
          modeTeamsName: 'Two Teams',
          modeTeamsDesc: 'Teams compete',
          modeFfaName: 'Free for All',
          modeFfaDesc: 'Everyone versus everyone',
          teamPlayersTitle: '2️⃣ Players per Team',
          playersTitle: '2️⃣ Players',
          teamAPlaceholder: 'Team A name',
          teamBPlaceholder: 'Team B name',
          playerNamePlaceholder: 'Player name...',
          teamHelper: '💡 Minimum 1 per team, maximum 3 per team (up to 6 players)',
          ffaHelper: '💡 Minimum 3, maximum 6 players',
          difficultyTitle: '3️⃣ Difficulty',
          difficultyEasyDesc: 'Great for kids and beginners',
          difficultyNormalDesc: 'Balanced fun for the whole family',
          difficultyHardDesc: 'Complex words for the brave!',
          optionsTitle: '4️⃣ Game Options',
          randomChallengeLabel: 'Random Challenge',
          randomChallengeSub: 'Adds modifiers to the mime',
          categoriesLabel: 'Available Categories',
          matchTitle: '5️⃣ Match Setup',
          roundsLabel: 'Number of Rounds',
          roundsSub: 'How many rounds per player',
          startGame: '🎭 Start Game!'
        },
        difficulty: {
          easy: 'Easy',
          normal: 'Normal',
          hard: 'Hard'
        },
        category: {
          objects: { plural: 'Objects', singular: 'Object', tab: '🧸 Objects', option: '🧸 Objects' },
          actions: { plural: 'Actions', singular: 'Action', tab: '🏃 Actions', option: '🏃 Actions' },
          animals: { plural: 'Animals', singular: 'Animal', tab: '🐾 Animals', option: '🐾 Animals' },
          movies: { plural: 'Movies', singular: 'Movie', tab: '🎬 Movies', option: '🎬 Movies' },
          professions: { plural: 'Professions', singular: 'Profession', tab: '👔 Professions', option: '👔 Professions' },
          celebrities: { plural: 'Celebrities', singular: 'Celebrity', tab: '⭐ Celebrities', option: '⭐ Celebrities' }
        },
        game: {
          currentPlayerLabel: 'Current mime player:',
          readyTitle: 'Ready to see the word?',
          readySub: 'Only the mime should look! Everyone else close your eyes! 👀',
          revealWord: '🎲 Reveal Word',
          memorizeTitle: '⚡ Memorize the word!',
          startsIn: 'The game starts in...',
          onlyMimeCanSee: 'Only the mime can see it!',
          secondsLabel: 'SECONDS',
          hiddenWord: 'Hidden word',
          hintTitle: '💡 Hint',
          showWord: '👁️ Show word',
          hideWord: '🙈 Hide word',
          correct: '✅ Correct!',
          wrong: '❌ Wrong / Skip',
          challengePrefix: '🎯 Challenge:'
        },
        result: {
          correctTitle: 'Correct!',
          wrongTitle: 'Wrong!',
          timeUpTitle: 'Time is up!',
          nextTurn: '➡️ Next turn'
        },
        score: {
          title: '🏆 Scoreboard',
          nextRoundTitle: '🎊 Next Round'
        },
        final: {
          winnerLabel: 'WINNER!',
          resultTitle: '📊 Final Result',
          playAgain: '🎮 Play Again',
          tie: 'TIE!'
        },
        wordbank: {
          title: 'Word Bank',
          addTitle: '➕ Add Word',
          newWordPlaceholder: 'Type the word...',
          addToDifficulty: 'It will be added to difficulty:',
          addButton: '➕ Add Word',
          listTitle: '📋 Words',
          resetButton: '↺ Restore'
        },
        settings: {
          title: 'Settings',
          timerTitle: '⏱️ Timer',
          roundTimeLabel: 'Round Time',
          roundTimeSub: 'Seconds to guess',
          penaltyLabel: 'Skip Penalty',
          penaltySub: '−10 points when skipping',
          generalTitle: '⚙️ General Settings',
          languageLabel: 'Language',
          languageSub: 'Changes the interface and the content available in the game',
          alertSoundLabel: 'Alert Sound',
          alertSoundSub: 'Beep during the last 10 seconds',
          navigationSoundLabel: 'Navigation Sound',
          navigationSoundSub: 'Sound when clicking interface buttons',
          wordsTitle: '🎲 Words',
          shuffleWordsLabel: 'Shuffle Words',
          shuffleWordsSub: 'Random order every game',
          appearanceTitle: '🎨 Appearance',
          themeLabel: 'Visual theme',
          themeSub: 'Change colors, transparencies, and interface typography'
        },
        theme: {
          cosmic: 'Cosmic',
          'liquid-glass': 'Autumn',
          material3: 'Spring'
        },
        footer: {
          copyPrefix: '© 2025 MimiMania v3.0 · Flavio Matiello · Published on ',
          githubPages: 'GitHub Pages'
        },
        teams: {
          defaultA: 'Team A',
          defaultB: 'Team B'
        },
        dynamic: {
          roundDisplay: ({ current, total }) => `Round ${current} of ${total}`,
          diffCount: ({ difficulty, count }) => `${difficulty} · ${count} available words`,
          correctTeamPoints: ({ teamName }) => `+10 points for ${teamName}!`,
          correctPlayerPoints: ({ playerName }) => `+10 points for ${playerName}!`,
          penaltySkip: '-10 points (skip penalty)',
          timeUpNoPoints: 'Time is up! No points.',
          skippedNoPoints: 'Word skipped. No points.',
          roundSummary: ({ roundDone, remaining }) => `End of Round ${roundDone} — ${remaining} round${remaining !== 1 ? 's' : ''} remaining!`,
          wordAdded: ({ word, difficulty }) => `✅ "${word}" added (${difficulty})!`,
          teamAdded: ({ name, teamName }) => `✅ ${name} joined ${teamName}!`,
          playerAdded: ({ name }) => `✅ ${name} joined!`
        },
        notifications: {
          duplicateWord: '⚠️ Word already exists!',
          bankRestored: '✅ Word bank restored!',
          maxPlayers: '❌ Maximum 6 players!',
          maxTeamPlayers: '❌ Maximum 3 per team!',
          minTeamPlayers: '❌ At least 1 per team!',
          minFfaPlayers: '❌ At least 3 players!'
        },
        confirmations: {
          resetWords: 'Restore the default word bank? Custom words will be lost.',
          restartGame: 'Restart the game? All progress will be lost.'
        }
      },
      es: {
        meta: { documentTitle: 'MimiMania 🎭' },
        common: {
          back: '← Volver',
          add: '+ Añadir',
          continue: '▶️ Continuar',
          restart: '🔄 Reiniciar',
          home: '🏠 Inicio',
          pointsShort: 'pts'
        },
        language: {
          pt: 'Portugués',
          en: 'Inglés',
          es: 'Español'
        },
        dev: {
          mode: 'Modo de desarrollo',
          description: 'Prueba rápidamente el diseño en móvil, tableta y escritorio.',
          previewLabel: 'Vista del diseño',
          preview: {
            auto: 'Auto',
            mobile: 'Móvil',
            tablet: 'Tableta',
            desktop: 'Escritorio'
          }
        },
        home: {
          subtitle: '🎭 El juego de la mímica',
          newGame: '🎮 Nueva Partida',
          wordBank: '📝 Banco de Palabras',
          settings: '⚙️ Configuración',
          howToTitle: '🏆 Cómo jugar',
          howTo: {
            mimeTitle: 'El mimo',
            mimeDesc: 'Ve la palabra y la representa sin hablar.',
            timeTitle: 'El tiempo',
            timeDesc: 'Intenten adivinar antes de que termine el temporizador.',
            pointsTitle: 'Los puntos',
            pointsDesc: 'Cada acierto vale 10 puntos. ¡Quien tenga más puntos gana!'
          }
        },
        setup: {
          title: 'Nueva Partida',
          modeTitle: '1️⃣ Modo de Juego',
          modeTeamsName: 'Dos Equipos',
          modeTeamsDesc: 'Compiten por equipos',
          modeFfaName: 'Todos contra todos',
          modeFfaDesc: 'Cada quien por su cuenta',
          teamPlayersTitle: '2️⃣ Jugadores por Equipo',
          playersTitle: '2️⃣ Jugadores',
          teamAPlaceholder: 'Nombre del Equipo A',
          teamBPlaceholder: 'Nombre del Equipo B',
          playerNamePlaceholder: 'Nombre del jugador...',
          teamHelper: '💡 Mínimo 1 por equipo, máximo 3 por equipo (hasta 6 jugadores)',
          ffaHelper: '💡 Mínimo 3, máximo 6 jugadores',
          difficultyTitle: '3️⃣ Dificultad',
          difficultyEasyDesc: 'Ideal para niños y principiantes',
          difficultyNormalDesc: 'Desafío equilibrado para la familia',
          difficultyHardDesc: 'Palabras complejas para los valientes',
          optionsTitle: '4️⃣ Opciones de Juego',
          randomChallengeLabel: 'Desafío Aleatorio',
          randomChallengeSub: 'Añade modificadores a la mímica',
          categoriesLabel: 'Categorías Disponibles',
          matchTitle: '5️⃣ Configurar Partida',
          roundsLabel: 'Número de Rondas',
          roundsSub: 'Cuántas rondas por jugador',
          startGame: '🎭 ¡Empezar Juego!'
        },
        difficulty: {
          easy: 'Fácil',
          normal: 'Normal',
          hard: 'Difícil'
        },
        category: {
          objects: { plural: 'Objetos', singular: 'Objeto', tab: '🧸 Objetos', option: '🧸 Objetos' },
          actions: { plural: 'Acciones', singular: 'Acción', tab: '🏃 Acciones', option: '🏃 Acciones' },
          animals: { plural: 'Animales', singular: 'Animal', tab: '🐾 Animales', option: '🐾 Animales' },
          movies: { plural: 'Películas', singular: 'Película', tab: '🎬 Películas', option: '🎬 Películas' },
          professions: { plural: 'Profesiones', singular: 'Profesión', tab: '👔 Profesiones', option: '👔 Profesiones' },
          celebrities: { plural: 'Celebridades', singular: 'Celebridad', tab: '⭐ Celebridades', option: '⭐ Celebridades' }
        },
        game: {
          currentPlayerLabel: 'Turno de hacer la mímica:',
          readyTitle: '¿Listos para ver la palabra?',
          readySub: '¡Solo el mimo debe mirar! ¡Los demás cierren los ojos! 👀',
          revealWord: '🎲 Mostrar Palabra',
          memorizeTitle: '⚡ ¡Memoriza la palabra!',
          startsIn: 'El juego empieza en...',
          onlyMimeCanSee: '¡Solo el mimo puede verla!',
          secondsLabel: 'SEGUNDOS',
          hiddenWord: 'Palabra oculta',
          hintTitle: '💡 Pista',
          showWord: '👁️ Mostrar palabra',
          hideWord: '🙈 Ocultar palabra',
          correct: '✅ ¡Acertó!',
          wrong: '❌ Error / Skip',
          challengePrefix: '🎯 Desafío:'
        },
        result: {
          correctTitle: '¡Acertó!',
          wrongTitle: '¡Falló!',
          timeUpTitle: '¡Tiempo agotado!',
          nextTurn: '➡️ Siguiente turno'
        },
        score: {
          title: '🏆 Marcador',
          nextRoundTitle: '🎊 Próxima Ronda'
        },
        final: {
          winnerLabel: '¡GANADOR!',
          resultTitle: '📊 Resultado Final',
          playAgain: '🎮 Jugar de Nuevo',
          tie: '¡EMPATE!'
        },
        wordbank: {
          title: 'Banco de Palabras',
          addTitle: '➕ Añadir Palabra',
          newWordPlaceholder: 'Escribe la palabra...',
          addToDifficulty: 'Se añadirá a la dificultad:',
          addButton: '➕ Añadir Palabra',
          listTitle: '📋 Palabras',
          resetButton: '↺ Restaurar'
        },
        settings: {
          title: 'Configuración',
          timerTitle: '⏱️ Temporizador',
          roundTimeLabel: 'Tiempo por Ronda',
          roundTimeSub: 'Segundos para adivinar',
          penaltyLabel: 'Penalización por Skip',
          penaltySub: '−10 puntos al saltar',
          generalTitle: '⚙️ Configuración General',
          languageLabel: 'Idioma',
          languageSub: 'Cambia la interfaz y el contenido disponible en el juego',
          alertSoundLabel: 'Sonido de Alerta',
          alertSoundSub: 'Beep en los últimos 10 segundos',
          navigationSoundLabel: 'Sonido de Navegación',
          navigationSoundSub: 'Sonido al hacer clic en los botones',
          wordsTitle: '🎲 Palabras',
          shuffleWordsLabel: 'Mezclar Palabras',
          shuffleWordsSub: 'Orden aleatorio en cada partida',
          appearanceTitle: '🎨 Apariencia',
          themeLabel: 'Tema visual',
          themeSub: 'Cambia colores, transparencias y tipografía de la interfaz'
        },
        theme: {
          cosmic: 'Cósmico',
          'liquid-glass': 'Otoño',
          material3: 'Primavera'
        },
        footer: {
          copyPrefix: '© 2025 MimiMania v3.0 · Flavio Matiello · Publicado en ',
          githubPages: 'GitHub Pages'
        },
        teams: {
          defaultA: 'Equipo A',
          defaultB: 'Equipo B'
        },
        dynamic: {
          roundDisplay: ({ current, total }) => `Ronda ${current} de ${total}`,
          diffCount: ({ difficulty, count }) => `${difficulty} · ${count} palabras disponibles`,
          correctTeamPoints: ({ teamName }) => `+10 puntos para ${teamName}!`,
          correctPlayerPoints: ({ playerName }) => `+10 puntos para ${playerName}!`,
          penaltySkip: '-10 puntos (penalización por skip)',
          timeUpNoPoints: '¡Se acabó el tiempo! Sin puntos.',
          skippedNoPoints: 'Palabra saltada. Sin puntos.',
          roundSummary: ({ roundDone, remaining }) => `Fin de la Ronda ${roundDone} — ${remaining} ronda${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}!`,
          wordAdded: ({ word, difficulty }) => `✅ "${word}" añadida (${difficulty})!`,
          teamAdded: ({ name, teamName }) => `✅ ${name} entró en ${teamName}!`,
          playerAdded: ({ name }) => `✅ ${name} se unió!`
        },
        notifications: {
          duplicateWord: '⚠️ ¡La palabra ya existe!',
          bankRestored: '✅ ¡Banco restaurado!',
          maxPlayers: '❌ ¡Máximo 6 jugadores!',
          maxTeamPlayers: '❌ ¡Máximo 3 por equipo!',
          minTeamPlayers: '❌ ¡Mínimo 1 por equipo!',
          minFfaPlayers: '❌ ¡Mínimo 3 jugadores!'
        },
        confirmations: {
          resetWords: '¿Restaurar el banco de palabras predeterminado? Las palabras personalizadas se perderán.',
          restartGame: '¿Reiniciar el juego? Todo el progreso se perderá.'
        }
      }
    };

    function t(key, params = {}, language = currentLanguage) {
      const value =
        getNestedValue(TRANSLATIONS[language], key)
        ?? getNestedValue(TRANSLATIONS[DEFAULT_LANGUAGE], key)
        ?? key;
      if (typeof value === 'function') return value(params);
      return String(value).replace(/\{(\w+)\}/g, (_, token) => params[token] ?? `{${token}}`);
    }

    function createEmptyWordBank() {
      return DIFFICULTY_KEYS.reduce((acc, diff) => {
        acc[diff] = CATEGORY_KEYS.reduce((catAcc, cat) => {
          catAcc[cat] = [];
          return catAcc;
        }, {});
        return acc;
      }, {});
    }

    function normalizeWordBank(bank) {
      const normalized = createEmptyWordBank();
      DIFFICULTY_KEYS.forEach(diff => {
        CATEGORY_KEYS.forEach(cat => {
          const words = bank?.[diff]?.[cat];
          normalized[diff][cat] = Array.isArray(words)
            ? words.map(word => String(word).trim()).filter(Boolean)
            : [];
        });
      });
      return normalized;
    }

    function normalizeChallenges(list) {
      return Array.isArray(list)
        ? list.map(item => String(item).trim()).filter(Boolean)
        : [];
    }

    // ============================================================
    // DEFAULT WORD BANK — core content pack (Portuguese full list)
    // ============================================================
    const DEFAULT_WORDS_PT = {
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
          'Pelicano', 'Canguru', 'Koala', 'Panda', 'Golfinho', 'Baleia', 'Polvo', 'Caranguejo', 'Camarão', 'Estrela-do-mar'
        ],
        movies: [
          'Titanic', 'Avatar', 'O Rei Leão', 'Toy Story', 'Frozen', 'Shrek', 'Harry Potter', 'Homem-Aranha', 'Batman', 'Superman',
          'Jurassic Park', 'Vingadores', 'Star Wars', 'Minions', 'Carros', 'Procurando Nemo', 'Divertida Mente', 'Aladdin',
          'Cinderela', 'Branca de Neve', 'Matrix', 'Gladiador', 'E.T.', 'King Kong', 'Godzilla', 'Pantera Negra', 'Homem de Ferro',
          'Capitão América', 'Thor', 'Hulk', 'Deadpool', 'Venom', 'Transformers', 'Piratas do Caribe', 'Jumanji',
          'Missão Impossível', '007', 'Rocky', 'Rambo', 'Karate Kid', 'Gremlins', 'Ghostbusters', 'Scooby-Doo', 'Madagascar',
          'Kung Fu Panda', 'Monstros S.A.', 'Up', 'Encanto', 'Moana', 'Zootopia'
        ],
        professions: [
          'Médico', 'Dentista', 'Professor', 'Policial', 'Bombeiro', 'Motorista', 'Cozinheiro', 'Garçom', 'Padeiro', 'Carteiro',
          'Mecânico', 'Engenheiro', 'Advogado', 'Enfermeiro', 'Veterinário', 'Piloto', 'Cabeleireiro', 'Barbeiro', 'Ator', 'Cantor',
          'Dançarino', 'Faxineiro', 'Segurança', 'Agricultor', 'Pescador', 'Eletricista', 'Pedreiro', 'Pintor', 'Jardineiro',
          'Taxista', 'Entregador', 'Vendedor', 'Caixa', 'Secretária', 'Recepcionista', 'Treinador', 'Personal Trainer', 'Babá',
          'Cuidador', 'Zelador', 'Lixeiro', 'Frentista', 'Motorista de ônibus', 'Motorista de caminhão', 'Guia turístico', 'Fotógrafo',
          'Repórter', 'Radialista', 'Operador de caixa', 'Instrutor'
        ],
        celebrities: [
          'Neymar', 'Messi', 'Cristiano Ronaldo', 'Pelé', 'Anitta', 'Taylor Swift', 'Beyoncé', 'Lady Gaga', 'Justin Bieber', 'Rihanna',
          'Shakira', 'Madonna', 'Elvis Presley', 'Michael Jackson', 'The Rock', 'Vin Diesel', 'Will Smith', 'Tom Cruise',
          'Leonardo DiCaprio', 'Brad Pitt', 'Angelina Jolie', 'Scarlett Johansson', 'Jennifer Lopez', 'Selena Gomez', 'Zendaya',
          'Miley Cyrus', 'Ariana Grande', 'Ed Sheeran', 'Drake', 'Kanye West', 'Billie Eilish', 'Harry Styles', 'Daniel Radcliffe',
          'Emma Watson', 'Robert Downey Jr', 'Chris Hemsworth', 'Chris Evans', 'Gal Gadot', 'Margot Robbie', 'Ryan Reynolds',
          'Keanu Reeves', 'Jackie Chan', 'Bruce Lee', 'Sylvester Stallone', 'Arnold Schwarzenegger', 'Oprah Winfrey', 'Kim Kardashian',
          'MrBeast', 'Mark Zuckerberg', 'Elon Musk'
        ]
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
          'Limpar janela', 'Passar roupa', 'Dobrar roupa', 'Fazer cama', 'Lavar louça', 'Secar louça', 'Descascar fruta', 'Ralar queijo',
          'Amassar pão', 'Remar', 'Surfar', 'Esquiar', 'Patinar', 'Driblar', 'Arremessar', 'Defender gol', 'Servir tênis',
          'Fazer ginástica', 'Aplaudir', 'Discursar', 'Entrevistar', 'Escalar parede', 'Fazer mágica', 'Equilibrar', 'Malabarismo',
          'Digitar', 'Telefonar', 'Tirar selfie', 'Pagar conta', 'Fazer fila'
        ],
        animals: [
          'Águia', 'Falcão', 'Coruja', 'Morcego', 'Camelo', 'Lhama', 'Alpaca', 'Bisão', 'Alce', 'Coyote',
          'Guepardo', 'Leopardo', 'Jaguar', 'Puma', 'Rinoceronte', 'Anaconda', 'Ornitorrinco', 'Dingo', 'Cacatua', 'Emu',
          'Orca', 'Tubarão', 'Arraia', 'Lula', 'Cavalo-marinho', 'Ouriço-do-mar', 'Arara', 'Pavão', 'Avestruz', 'Casuar',
          'Albatroz', 'Cegonha', 'Pelicano', 'Íbis', 'Garça', 'Lontra', 'Foca', 'Morsa', 'Leão-marinho', 'Dugongo',
          'Cabra-da-montanha', 'Íbex', 'Antílope', 'Gnu', 'Búfalo', 'Javali', 'Texugo', 'Guaxinim', 'Furão', 'Musaranho'
        ],
        movies: [
          'Interestelar', 'A Origem', 'Duna', 'Clube da Luta', 'Pulp Fiction', 'O Lobo de Wall Street', 'Coringa', 'Parasita',
          'O Grande Gatsby', 'Django Livre', 'Bastardos Inglórios', 'Whiplash', 'La La Land', 'Cisne Negro', 'O Iluminado',
          'Doutor Estranho', 'Guardiões da Galáxia', 'Capitã Marvel', 'Logan', 'John Wick', 'Matrix Reloaded', 'Matrix Revolutions',
          'O Regresso', 'Gravidade', 'Mad Max Estrada da Fúria', 'Blade Runner 2049', 'O Exterminador do Futuro', 'De Volta para o Futuro',
          'O Sexto Sentido', 'O Show de Truman', 'A Múmia', 'O Código Da Vinci', 'Anjos e Demônios', 'Os Jogos Vorazes', 'Crepúsculo',
          'It A Coisa', 'Invocação do Mal', 'Annabelle', 'A Freira', 'Jogos Mortais', 'Corra', 'Nós', 'Fragmentado', 'Glass',
          'Velozes e Furiosos', 'Top Gun', 'Missão Impossível Fallout', 'Kingsman', 'Sherlock Holmes', 'O Homem de Aço'
        ],
        professions: [
          'Programador', 'Designer', 'Arquiteto', 'Nutricionista', 'Psicólogo', 'Psiquiatra', 'Fisioterapeuta', 'Farmacêutico',
          'Biólogo', 'Químico', 'Físico', 'Geólogo', 'Astrônomo', 'Tradutor', 'Intérprete', 'Editor de vídeo', 'Diretor de cinema',
          'Produtor musical', 'DJ', 'Youtuber', 'Influenciador', 'Streamer', 'Publicitário', 'Redator', 'Analista de sistemas',
          'Administrador', 'Contador', 'Economista', 'Corretor de imóveis', 'Corretor de seguros', 'Investigador', 'Detetive',
          'Perito criminal', 'Auditor', 'Consultor', 'Coach', 'Treinador esportivo', 'Atleta profissional', 'Surfista',
          'Jogador de futebol', 'Lutador', 'Coreógrafo', 'Maquiador', 'Esteticista', 'Tatuador', 'Ilustrador', 'Animador',
          'Game designer', 'Roteirista', 'Dublador'
        ],
        celebrities: [
          'Timothée Chalamet', 'Florence Pugh', 'Pedro Pascal', 'Jenna Ortega', 'Tom Holland', 'Andrew Garfield', 'Tobey Maguire',
          'Benedict Cumberbatch', 'Martin Scorsese', 'Quentin Tarantino', 'Christopher Nolan', 'Denis Villeneuve', 'Greta Gerwig',
          'Jordan Peele', 'Dwayne Johnson', 'Jason Statham', 'Idris Elba', 'Henry Cavill', 'Millie Bobby Brown', 'Noah Schnapp',
          'Finn Wolfhard', 'Sadie Sink', 'Travis Scott', 'Post Malone', 'The Weeknd', 'Dua Lipa', 'Olivia Rodrigo', 'Doja Cat',
          'Bad Bunny', 'Karol G', 'Peso Pluma', 'Lizzo', 'Snoop Dogg', 'Eminem', '50 Cent', 'Jay-Z', 'Kendrick Lamar',
          'J Balvin', 'Maluma', 'Gisele Bündchen', 'Adriana Lima', 'Lewis Hamilton', 'Usain Bolt', 'Michael Jordan',
          'Serena Williams', 'Roger Federer', 'Novak Djokovic', 'Simone Biles', 'Tony Hawk'
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
          'O Farol', 'Hereditário', 'Midsommar', 'A Bruxa', 'O Sacrifício do Cervo Sagrado', 'O Lagosta', 'Dogville', 'Anticristo',
          'Melancolia', 'A Árvore da Vida', 'Sinédoque Nova York', 'Donnie Darko', 'O Homem Duplicado', 'Enemy', 'Ex Machina', 'Aniquilação',
          'Coerência', 'Primer', 'A Chegada', 'Moon', 'Solaris', 'Stalker', 'O Espelho', 'Persona', 'O Sétimo Selo', 'Amnésia',
          'Cidade dos Sonhos', 'Veludo Azul', 'Eraserhead', 'A Fonte da Vida', 'O Poço', 'A Plataforma', 'Climax', 'Irreversível',
          'Enter the Void', 'O Hospedeiro', 'Oldboy', 'Memórias de um Assassino', 'A Criada', 'Drive', 'Only God Forgives', 'O Mestre',
          'Magnólia', 'There Will Be Blood', 'A Caça', 'O Som ao Redor', 'Bacurau', 'O Lobo Atrás da Porta', 'Que Horas Ela Volta'
        ],
        professions: [
          'Neurocirurgião', 'Oncologista', 'Anestesista', 'Cardiologista', 'Ortopedista', 'Endocrinologista', 'Ginecologista', 'Urologista',
          'Radiologista', 'Patologista', 'Epidemiologista', 'Bioinformata', 'Engenheiro de dados', 'Cientista de dados', 'Engenheiro aeroespacial',
          'Engenheiro nuclear', 'Engenheiro de petróleo', 'Especialista em cibersegurança', 'Arquiteto de software', 'DevOps', 'Product Manager',
          'Scrum Master', 'UX Researcher', 'UX Designer', 'UI Designer', 'Especialista em SEO', 'Trader', 'Analista financeiro',
          'Gestor de investimentos', 'Atuário', 'Diplomata', 'Cônsul', 'Embaixador', 'Curador de museu', 'Restaurador de arte', 'Arqueólogo',
          'Paleontólogo', 'Oceanógrafo', 'Meteorologista', 'Piloto de caça', 'Controlador de voo', 'Capitão de navio', 'Sommelier',
          'Mestre cervejeiro', 'Chef executivo', 'Perfumista', 'Designer automotivo', 'Engenheiro robótico', 'Especialista em IA'
        ],
        celebrities: [
          'Saoirse Ronan', 'Paul Mescal', 'Barry Keoghan', 'Cillian Murphy', 'Rami Malek', 'Mahershala Ali', 'Dev Patel', 'Riz Ahmed',
          'Lakeith Stanfield', 'Oscar Isaac', 'Pedro Almodóvar', 'Wong Kar-wai', 'Bong Joon-ho', 'Park Chan-wook', 'Gaspar Noé', 'Lars von Trier',
          'Yorgos Lanthimos', 'Ari Aster', 'Robert Eggers', 'Noah Baumbach', 'Charlie Kaufman', 'Tilda Swinton', 'Anya Taylor-Joy', 'Tim Burton',
          'Guillermo del Toro', 'Alejandro Iñárritu', 'Alfonso Cuarón', 'Spike Lee', 'Wes Anderson', 'Taika Waititi', 'Hideo Kojima',
          'Shigeru Miyamoto', 'Gabe Newell', 'Satya Nadella', 'Sundar Pichai', 'Tim Cook', 'Sam Altman', 'Demis Hassabis', 'Naval Ravikant',
          'Gary Vaynerchuk', 'Ray Dalio', 'Warren Buffett', 'Charlie Munger', 'Howard Schultz', 'Reed Hastings', 'Susan Wojcicki',
          'Kevin Feige', 'Kathleen Kennedy', 'Fei-Fei Li', 'Andrew Ng'
        ]
      }
    };

    const CHALLENGES_PT = [
      'Faça a mímica sentado', 'Faça a mímica agachado', 'Faça a mímica pulando', 'Faça a mímica andando no lugar',
      'Faça a mímica com uma mão nas costas', 'Faça a mímica usando só uma mão', 'Faça a mímica com braços esticados',
      'Faça a mímica girando lentamente', 'Faça a mímica como se estivesse em câmera lenta', 'Faça a mímica como se estivesse acelerado (super rápido)',
      'Faça a mímica exagerando MUITO', 'Faça a mímica quase sem se mexer', 'Faça a mímica como se estivesse com medo',
      'Faça a mímica como se estivesse muito feliz', 'Faça a mímica como se estivesse bravo', 'Faça a mímica como se estivesse cansado',
      'Faça a mímica como se estivesse confuso', 'Faça a mímica como se estivesse em pânico', 'Faça a mímica como um robô',
      'Faça a mímica como um personagem de desenho animado', 'Faça a mímica como um idoso', 'Faça a mímica como uma criança',
      'Faça a mímica como um super-herói', 'Faça a mímica como um vilão', 'Faça a mímica como um animal',
      'Faça a mímica como se estivesse na lua (gravidade baixa)', 'Faça a mímica como se estivesse na água', 'Faça a mímica como se estivesse invisível',
      'Faça a mímica como se estivesse gigante', 'Faça a mímica como se estivesse muito pequeno', 'Não pode usar as mãos',
      'Não pode usar os braços', 'Não pode sair do lugar', 'Não pode repetir o mesmo gesto', 'Não pode apontar para nada',
      'Não pode usar o rosto (sem expressão facial)', 'Só pode usar o rosto (sem corpo)', 'Tem que começar pelo final da ação',
      'Tem que fazer tudo ao contrário (de trás pra frente)', 'Tem que parar completamente a cada 3 segundos',
      'Faça a mímica como se estivesse em um filme de ação', 'Faça a mímica como se fosse uma comédia',
      'Faça a mímica como se estivesse em câmera lenta dramática', 'Faça a mímica como se estivesse em um sonho',
      'Faça a mímica como se estivesse com muito frio', 'Faça a mímica como se estivesse com muito calor',
      'Faça a mímica como se estivesse no escuro', 'Faça a mímica como se estivesse em um palco',
      'Faça a mímica como se estivesse sendo observado por uma plateia gigante', 'Faça a mímica como se fosse a última chance de ganhar o jogo'
    ];

    const SAMPLE_WORDS_EN = {
      easy: {
        objects: ['Ball', 'Cup', 'Book'],
        actions: ['Run', 'Jump', 'Sleep'],
        animals: ['Dog', 'Cat', 'Fish'],
        movies: ['Titanic', 'Frozen', 'Shrek'],
        professions: ['Doctor', 'Teacher', 'Pilot'],
        celebrities: ['Taylor Swift', 'Messi', 'Beyonce']
      },
      normal: {
        objects: ['Computer', 'Camera', 'Backpack'],
        actions: ['Cook', 'Drive', 'Paint'],
        animals: ['Eagle', 'Shark', 'Panda'],
        movies: ['Inception', 'Interstellar', 'Joker'],
        professions: ['Designer', 'Chef', 'Lawyer'],
        celebrities: ['Zendaya', 'Keanu Reeves', 'Dua Lipa']
      },
      hard: {
        objects: ['Microscope', 'Compass', 'Telescope'],
        actions: ['Juggle', 'Skydive', 'Meditate'],
        animals: ['Axolotl', 'Narwhal', 'Tarantula'],
        movies: ['Memento', 'Parasite', 'Whiplash'],
        professions: ['Neurosurgeon', 'Astronomer', 'Architect'],
        celebrities: ['Cillian Murphy', 'Pedro Almodovar', 'Fei-Fei Li']
      }
    };

    const SAMPLE_WORDS_ES = {
      easy: {
        objects: ['Pelota', 'Taza', 'Libro'],
        actions: ['Correr', 'Saltar', 'Dormir'],
        animals: ['Perro', 'Gato', 'Pez'],
        movies: ['Titanic', 'Frozen', 'Shrek'],
        professions: ['Doctor', 'Profesor', 'Piloto'],
        celebrities: ['Taylor Swift', 'Messi', 'Shakira']
      },
      normal: {
        objects: ['Computadora', 'Camara', 'Mochila'],
        actions: ['Cocinar', 'Conducir', 'Pintar'],
        animals: ['Aguila', 'Tiburon', 'Panda'],
        movies: ['Origen', 'Interestelar', 'Joker'],
        professions: ['Disenador', 'Chef', 'Abogado'],
        celebrities: ['Zendaya', 'Keanu Reeves', 'Dua Lipa']
      },
      hard: {
        objects: ['Microscopio', 'Brujula', 'Telescopio'],
        actions: ['Malabarear', 'Paracaidismo', 'Meditar'],
        animals: ['Ajolote', 'Narval', 'Tarantula'],
        movies: ['Memento', 'Parasitos', 'Whiplash'],
        professions: ['Neurocirujano', 'Astronomo', 'Arquitecto'],
        celebrities: ['Cillian Murphy', 'Pedro Almodovar', 'Fei-Fei Li']
      }
    };

    const SAMPLE_CHALLENGES_EN = [
      'Act it out while sitting down',
      'Act it out using only one hand',
      'Act it out in slow motion'
    ];

    const SAMPLE_CHALLENGES_ES = [
      'Haz la mímica sentado',
      'Haz la mímica usando solo una mano',
      'Haz la mímica en cámara lenta'
    ];

    // Content pack schema used by the app and by future downloadable packs:
    // {
    //   id,
    //   name,
    //   source: 'builtin' | 'custom' | 'downloaded',
    //   editable: boolean,
    //   enabled: boolean,
    //   words: { [locale]: { [difficulty]: { [category]: string[] } } },
    //   challenges: { [locale]: string[] }
    // }
    function createCorePack() {
      return {
        id: CORE_PACK_ID,
        name: 'Core Default Pack',
        source: 'builtin',
        editable: true,
        enabled: true,
        words: {
          pt: clone(DEFAULT_WORDS_PT),
          en: clone(SAMPLE_WORDS_EN),
          es: clone(SAMPLE_WORDS_ES)
        },
        challenges: {
          pt: clone(CHALLENGES_PT),
          en: clone(SAMPLE_CHALLENGES_EN),
          es: clone(SAMPLE_CHALLENGES_ES)
        }
      };
    }

    function normalizePack(pack) {
      const normalizedWords = {};
      const normalizedChallenges = {};
      Object.keys(pack?.words || {}).forEach(locale => {
        normalizedWords[locale] = normalizeWordBank(pack.words[locale]);
      });
      Object.keys(pack?.challenges || {}).forEach(locale => {
        normalizedChallenges[locale] = normalizeChallenges(pack.challenges[locale]);
      });
      return {
        id: pack?.id || `pack-${Date.now()}`,
        name: pack?.name || 'Pack',
        source: pack?.source || 'local',
        editable: pack?.editable !== false,
        enabled: pack?.enabled !== false,
        words: normalizedWords,
        challenges: normalizedChallenges
      };
    }

    function createDefaultContentModel() {
      return {
        version: 1,
        packs: [normalizePack(createCorePack())]
      };
    }

    function loadContentModel() {
      try {
        const saved = JSON.parse(localStorage.getItem(CONTENT_KEY) || 'null');
        if (saved?.packs?.length) {
          return {
            version: 1,
            packs: saved.packs.map(normalizePack)
          };
        }
      } catch (e) { }

      const model = createDefaultContentModel();
      try {
        const legacyWords = JSON.parse(localStorage.getItem(LEGACY_WORDS_KEY) || 'null');
        if (legacyWords) {
          model.packs[0].words.pt = normalizeWordBank(legacyWords);
        }
      } catch (e) { }
      return model;
    }

    let contentModel = loadContentModel();

    function saveContentModel() {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(contentModel));
    }

    function getEnabledPacks() {
      return (contentModel.packs || []).filter(pack => pack.enabled !== false);
    }

    function ensureUniqueWords(words) {
      return [...new Set(words)];
    }

    function getLocalizedWordBank(locale = currentLanguage) {
      const bank = createEmptyWordBank();
      getEnabledPacks().forEach(pack => {
        const localizedBank = normalizeWordBank(pack.words?.[locale] || {});
        DIFFICULTY_KEYS.forEach(diff => {
          CATEGORY_KEYS.forEach(cat => {
            bank[diff][cat] = ensureUniqueWords([...bank[diff][cat], ...localizedBank[diff][cat]]);
          });
        });
      });
      return bank;
    }

    function getLocalizedChallenges(locale = currentLanguage) {
      let list = [];
      getEnabledPacks().forEach(pack => {
        list = ensureUniqueWords([...list, ...normalizeChallenges(pack.challenges?.[locale] || [])]);
      });
      return list;
    }

    function getEditablePack() {
      let pack = contentModel.packs.find(item => item.editable !== false);
      if (!pack) {
        pack = normalizePack({
          id: `custom-${Date.now()}`,
          name: 'Custom Local Pack',
          source: 'custom',
          editable: true,
          enabled: true,
          words: {},
          challenges: {}
        });
        contentModel.packs.push(pack);
      }
      return pack;
    }

    function ensurePackLocale(pack, locale = currentLanguage) {
      if (!pack.words[locale]) {
        pack.words[locale] = createEmptyWordBank();
      } else {
        pack.words[locale] = normalizeWordBank(pack.words[locale]);
      }
      if (!pack.challenges[locale]) {
        pack.challenges[locale] = [];
      } else {
        pack.challenges[locale] = normalizeChallenges(pack.challenges[locale]);
      }
    }

    function getCategoryLabel(category, options = {}) {
      const { singular = false, withIcon = false } = options;
      const label = t(`category.${category}.${singular ? 'singular' : 'plural'}`);
      return withIcon ? `${CATEGORY_ICONS[category] || ''} ${label}`.trim() : label;
    }

    function getDifficultyLabel(diff, withIcon = false) {
      const label = t(`difficulty.${diff}`);
      return withIcon ? `${DIFFICULTY_ICONS[diff] || ''} ${label}`.trim() : label;
    }

    function getDefaultTeamName(team, language = currentLanguage) {
      return t(`teams.default${team}`, {}, language);
    }

    function isDefaultTeamName(name, team) {
      return SUPPORTED_LANGUAGES.some(language => name === getDefaultTeamName(team, language));
    }

    function syncTeamNamesForLanguage(previousLanguage, nextLanguage) {
      ['A', 'B'].forEach(team => {
        const previousDefault = getDefaultTeamName(team, previousLanguage);
        const nextDefault = getDefaultTeamName(team, nextLanguage);
        if (!gameState.teamNames[team] || gameState.teamNames[team] === previousDefault || isDefaultTeamName(gameState.teamNames[team], team)) {
          gameState.teamNames[team] = nextDefault;
        }
      });
    }

    let gameState = {
      mode: 'teams',
      difficulty: 'easy',
      teams: { A: [], B: [] },
      players: [],
      teamNames: { A: getDefaultTeamName('A'), B: getDefaultTeamName('B') },
      scores: {},
      currentPlayerIdx: 0,
      currentRound: 1,
      totalRounds: 3,
      currentWord: null,
      currentChallenge: null,
      usedWords: [],
      timerDur: 60,
      timerInterval: null,
      memInterval: null,
      timerLeft: 60,
      hintShown: false,
      wordVisible: false,
      phase: 'preparing',
      totalTurns: 0,
      turnsDone: 0,
      randomChallenge: false,
      selectedCategories: ['objects', 'actions', 'animals']
    };

    let wbDiff = 'easy';
    let wbCat = 'objects';

    // ============================================================
    // STARS
    // ============================================================
    (function () {
      const c = document.getElementById('stars');
      for (let i = 0; i < 60; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const sz = Math.random() * 2.5 + 0.5;
        s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;--d:${(Math.random() * 4 + 2).toFixed(1)}s;--del:${(Math.random() * 4).toFixed(1)}s;--op:${(Math.random() * 0.5 + 0.3).toFixed(2)}`;
        c.appendChild(s);
      }
    })();

    // ============================================================
    // I18N
    // ============================================================
    function applyTranslations() {
      document.documentElement.lang = LANGUAGE_HTML_MAP[currentLanguage] || LANGUAGE_HTML_MAP[DEFAULT_LANGUAGE];
      document.title = t('meta.documentTitle');

      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
      });

      const languageSelect = document.getElementById('language-select');
      if (languageSelect) languageSelect.value = currentLanguage;
    }

    function refreshLocalizedUI() {
      applyTranslations();
      updateTeamLabels();
      renderCategorySelection();
      renderSetupPlayers();
      updateDiffWordCount();
      syncWBDiffUI();
      syncWBCatUI();
      renderWordBank();
      refreshCurrentTurnCopy();
      refreshScoreScreenCopy();
      refreshFinalScreenCopy();
      renderScoreMini();
      updateTimerLabel(document.getElementById('timer-slider').value);
    }

    function setLanguage(language, options = {}) {
      const { save = false } = options;
      const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
      const previousLanguage = currentLanguage;
      currentLanguage = nextLanguage;
      syncTeamNamesForLanguage(previousLanguage, nextLanguage);
      refreshLocalizedUI();
      if (save) saveSettings();
    }

    // ============================================================
    // NAVIGATION
    // ============================================================
    function goTo(screen) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('screen-' + screen).classList.add('active');
      if (screen === 'wordbank') {
        wbDiff = 'easy';
        wbCat = 'objects';
        syncWBDiffUI();
        syncWBCatUI();
        renderWordBank();
      }
      if (screen === 'setup') {
        renderSetupPlayers();
        updateDiffWordCount();
        renderCategorySelection();
      }
    }

    function getThemeVar(name) {
      return getComputedStyle(document.body).getPropertyValue(name).trim();
    }

    // ============================================================
    // NOTIFICATIONS
    // ============================================================
    function showNotif(msg, color = 'var(--accent3)', textColor = 'var(--notif-text)') {
      const el = document.getElementById('notif');
      el.textContent = msg;
      el.style.background = color;
      el.style.color = textColor;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 2400);
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
        navigationSoundEnabled: document.getElementById('toggle-navigation-sound').checked,
        penaltyEnabled: document.getElementById('toggle-penalty').checked,
        shuffleEnabled: document.getElementById('toggle-shuffle').checked,
        theme: document.getElementById('theme-select').value || 'cosmic',
        language: document.getElementById('language-select').value || DEFAULT_LANGUAGE
      };
    }

    function saveSettings() {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(collectSettings()));
    }

    function initializeSettings() {
      const defaults = {
        timerDur: 60,
        soundEnabled: true,
        navigationSoundEnabled: true,
        penaltyEnabled: false,
        shuffleEnabled: true,
        theme: 'cosmic',
        language: DEFAULT_LANGUAGE
      };

      let saved = defaults;
      try {
        saved = { ...defaults, ...(JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null') || {}) };
      } catch (e) { }

      document.getElementById('timer-slider').value = saved.timerDur;
      document.getElementById('toggle-sound').checked = Boolean(saved.soundEnabled);
      document.getElementById('toggle-navigation-sound').checked = Boolean(saved.navigationSoundEnabled);
      document.getElementById('toggle-penalty').checked = Boolean(saved.penaltyEnabled);
      document.getElementById('toggle-shuffle').checked = Boolean(saved.shuffleEnabled);
      document.getElementById('theme-select').value = applyTheme(saved.theme);
      document.getElementById('language-select').value = SUPPORTED_LANGUAGES.includes(saved.language) ? saved.language : DEFAULT_LANGUAGE;
      updateTimerLabel(saved.timerDur);
      setLanguage(saved.language || DEFAULT_LANGUAGE);
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
          gameState.teams = clone(data.teams);
          if (data.teamNames) gameState.teamNames = { ...data.teamNames };
        } else if (mode === 'ffa' && data.players) {
          gameState.players = [...data.players];
        }
      } catch (e) { }
    }

    function updateTeamName(team, name) {
      gameState.teamNames[team] = name.trim() || getDefaultTeamName(team);
      updateTeamLabels();
    }

    function updateTeamLabels() {
      try {
        ['A', 'B'].forEach(team => {
          if (!gameState.teamNames[team] || isDefaultTeamName(gameState.teamNames[team], team)) {
            gameState.teamNames[team] = getDefaultTeamName(team);
          }
        });
        document.getElementById('team-label-a').innerHTML = `🔴 ${gameState.teamNames.A}`;
        document.getElementById('team-label-b').innerHTML = `🔵 ${gameState.teamNames.B}`;
        document.getElementById('team-name-a').value = gameState.teamNames.A;
        document.getElementById('team-name-b').value = gameState.teamNames.B;
      } catch (e) { }
    }

    // ============================================================
    // SETUP
    // ============================================================
    function updateDiffWordCount() {
      const bank = getLocalizedWordBank();
      let total = 0;
      Object.values(bank[gameState.difficulty] || {}).forEach(arr => { total += arr.length; });
      document.getElementById('diff-word-count').textContent = t('dynamic.diffCount', {
        difficulty: getDifficultyLabel(gameState.difficulty, true),
        count: total
      });
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
      container.innerHTML = CATEGORY_KEYS.map(category => `
        <div class="category-card ${gameState.selectedCategories.includes(category) ? 'selected' : ''}" data-category="${category}">
          ${CATEGORY_ICONS[category]} ${getCategoryLabel(category)}
        </div>
      `).join('');
    }

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

    function selectDifficulty(diff) {
      gameState.difficulty = diff;
      DIFFICULTY_KEYS.forEach(d =>
        document.getElementById('diff-' + d).classList.toggle('selected', d === diff)
      );
      updateDiffWordCount();
    }

    // ============================================================
    // PLAYERS
    // ============================================================
    function renderSetupPlayers() {
      renderTeamPlayers();
      renderFFAPlayers();
    }

    function renderTeamPlayers() {
      ['A', 'B'].forEach(team => {
        const cont = document.getElementById('team-' + team.toLowerCase() + '-players');
        cont.innerHTML = '';
        (gameState.teams[team] || []).forEach((player, index) => {
          const color = team === 'A' ? 'var(--team1)' : 'var(--team2)';
          const el = document.createElement('div');
          el.className = 'player-row';
          el.innerHTML = `<div class="player-avatar" style="background:${color}22;color:${color}">${player[0].toUpperCase()}</div><div class="player-name">${player}</div><button class="btn btn-ghost btn-sm" data-action="remove-team-player" data-team="${team}" data-index="${index}">✕</button>`;
          cont.appendChild(el);
        });
      });
    }

    function addTeamPlayer(team) {
      const inp = document.getElementById('inp-team-' + team.toLowerCase());
      const name = inp.value.trim();
      if (!name) return;
      const total = (gameState.teams.A || []).length + (gameState.teams.B || []).length;
      if (total >= 6) {
        showNotif(t('notifications.maxPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
        return;
      }
      if ((gameState.teams[team] || []).length >= 3) {
        showNotif(t('notifications.maxTeamPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
        return;
      }
      if (!gameState.teams[team]) gameState.teams[team] = [];
      gameState.teams[team].push(name);
      inp.value = '';
      renderTeamPlayers();
      showNotif(t('dynamic.teamAdded', { name, teamName: gameState.teamNames[team] || getDefaultTeamName(team) }));
    }

    function removeTeamPlayer(team, idx) {
      gameState.teams[team].splice(idx, 1);
      renderTeamPlayers();
    }

    function renderFFAPlayers() {
      const cont = document.getElementById('ffa-players');
      cont.innerHTML = '';
      (gameState.players || []).forEach((player, index) => {
        const name = player.name || player;
        const el = document.createElement('div');
        el.className = 'player-row';
        el.innerHTML = `<div class="player-avatar" style="background:var(--player-avatar-bg);color:var(--player-avatar-text)">${name[0].toUpperCase()}</div><div class="player-name">${name}</div><button class="btn btn-ghost btn-sm" data-action="remove-ffa-player" data-index="${index}">✕</button>`;
        cont.appendChild(el);
      });
    }

    function addFFAPlayer() {
      const inp = document.getElementById('inp-ffa');
      const name = inp.value.trim();
      if (!name) return;
      if (!gameState.players) gameState.players = [];
      if (gameState.players.length >= 6) {
        showNotif(t('notifications.maxPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
        return;
      }
      gameState.players.push(name);
      inp.value = '';
      renderFFAPlayers();
      showNotif(t('dynamic.playerAdded', { name }));
    }

    function removeFFAPlayer(idx) {
      gameState.players.splice(idx, 1);
      renderFFAPlayers();
    }

    // ============================================================
    // START GAME
    // ============================================================
    function startGame() {
      const rounds = parseInt(document.getElementById('rounds-slider').value, 10);
      gameState.totalRounds = rounds;
      gameState.timerDur = parseInt(document.getElementById('timer-slider').value, 10) || 60;

      if (gameState.mode === 'teams') {
        const teamA = gameState.teams.A || [];
        const teamB = gameState.teams.B || [];
        if (teamA.length < 1 || teamB.length < 1) {
          showNotif(t('notifications.minTeamPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
          return;
        }
        gameState.players = [];
        const maxLen = Math.max(teamA.length, teamB.length);
        for (let i = 0; i < maxLen; i++) {
          if (i < teamA.length) gameState.players.push({ name: teamA[i], team: 'A' });
          if (i < teamB.length) gameState.players.push({ name: teamB[i], team: 'B' });
        }
        gameState.scores = { teamA: 0, teamB: 0 };
        teamA.forEach(player => { gameState.scores[player] = 0; });
        teamB.forEach(player => { gameState.scores[player] = 0; });
      } else {
        if (!gameState.players || gameState.players.length < 3) {
          showNotif(t('notifications.minFfaPlayers'), 'var(--accent1)', 'var(--btn-danger-text)');
          return;
        }
        const players = [...gameState.players];
        gameState.players = players.map(player => ({ name: player.name || player, team: null }));
        gameState.scores = {};
        players.forEach(player => { gameState.scores[player.name || player] = 0; });
      }

      gameState.currentPlayerIdx = 0;
      gameState.currentRound = 1;
      gameState.usedWords = [];
      gameState.turnsDone = 0;
      gameState.totalTurns = gameState.players.length * rounds;

      const key = gameState.mode === 'teams' ? 'mm_last_teams' : 'mm_last_ffa';
      const toSave = gameState.mode === 'teams'
        ? { teams: gameState.teams, teamNames: gameState.teamNames }
        : { players: gameState.players.map(player => player.name || player) };
      localStorage.setItem(key, JSON.stringify(toSave));

      initTurn();
      goTo('game');
    }

    // ============================================================
    // TURN
    // ============================================================
    function renderCurrentPlayerInfo() {
      const player = gameState.players[gameState.currentPlayerIdx];
      if (!player) return;
      document.getElementById('current-player-name').textContent = player.name || player;
      const badge = document.getElementById('current-team-badge');
      if (player.team) {
        const color = player.team === 'A' ? 'var(--team1)' : 'var(--team2)';
        const label = gameState.teamNames[player.team] || getDefaultTeamName(player.team);
        badge.innerHTML = `<span class="team-badge" style="background:${color}22;color:${color}">${label}</span>`;
      } else {
        badge.innerHTML = '';
      }
    }

    function refreshCurrentTurnCopy() {
      if (gameState.players.length) {
        document.getElementById('round-display').textContent = t('dynamic.roundDisplay', {
          current: gameState.currentRound,
          total: gameState.totalRounds
        });
        renderCurrentPlayerInfo();
      }
      if (gameState.currentWord) {
        document.getElementById('hint-text').textContent = getCategoryLabel(gameState.currentWord.cat, { singular: true, withIcon: true });
        document.getElementById('mem-word-display').textContent = gameState.currentWord.word;
        document.getElementById('word-display').textContent = gameState.currentWord.word;
      }
      document.getElementById('btn-toggle-word').textContent = gameState.wordVisible ? t('game.hideWord') : t('game.showWord');
    }

    function initTurn() {
      gameState.phase = 'preparing';
      gameState.currentWord = null;
      gameState.currentChallenge = null;
      gameState.hintShown = false;
      gameState.wordVisible = false;
      document.getElementById('round-display').textContent = t('dynamic.roundDisplay', {
        current: gameState.currentRound,
        total: gameState.totalRounds
      });
      renderCurrentPlayerInfo();
      document.getElementById('preparing-state').classList.remove('hidden');
      document.getElementById('memorize-state').classList.add('hidden');
      document.getElementById('playing-state').classList.add('hidden');
      document.getElementById('hint-banner').classList.add('hidden');
      document.getElementById('word-hidden-placeholder').classList.remove('hidden');
      document.getElementById('word-visible-content').classList.add('hidden');
      document.getElementById('btn-toggle-word').textContent = t('game.showWord');
      renderScoreMini();
    }

    // ============================================================
    // REVEAL + MEMORIZE
    // ============================================================
    function revealWord() {
      gameState.phase = 'memorizing';
      gameState.currentWord = pickWord();
      document.getElementById('mem-word-display').textContent = gameState.currentWord.word;
      document.getElementById('hint-text').textContent = getCategoryLabel(gameState.currentWord.cat, { singular: true, withIcon: true });
      document.getElementById('hint-banner').classList.add('hidden');
      document.getElementById('word-display').textContent = gameState.currentWord.word;
      document.getElementById('word-hidden-placeholder').classList.remove('hidden');
      document.getElementById('word-visible-content').classList.add('hidden');
      document.getElementById('btn-toggle-word').textContent = t('game.showWord');
      gameState.wordVisible = false;

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
      const mc = document.getElementById('memCircle');
      const mn = document.getElementById('mem-num');
      updateMemCircle(memLeft, 5, mc, mn, 213.6);
      playAlertBeep(600);
      clearInterval(gameState.memInterval);
      gameState.memInterval = setInterval(() => {
        memLeft--;
        updateMemCircle(memLeft, 5, mc, mn, 213.6);
        if (memLeft > 0) playAlertBeep(memLeft <= 2 ? 700 : 500);
        if (memLeft <= 0) {
          clearInterval(gameState.memInterval);
          challengeEl.classList.add('hidden');
          document.getElementById('memorize-state').classList.add('hidden');
          document.getElementById('playing-state').classList.remove('hidden');
          gameState.phase = 'playing';
          playAlertBeep(880);
          startTimer();
        }
      }, 1000);
    }

    function updateMemCircle(left, total, circ, numEl, circumference) {
      numEl.textContent = left;
      circ.style.strokeDashoffset = circumference - (left / total) * circumference;
    }

    function toggleWordVisibility() {
      const placeholder = document.getElementById('word-hidden-placeholder');
      const visibleContent = document.getElementById('word-visible-content');
      const button = document.getElementById('btn-toggle-word');
      gameState.wordVisible = !gameState.wordVisible;
      if (gameState.wordVisible) {
        placeholder.classList.add('hidden');
        visibleContent.classList.remove('hidden');
        button.textContent = t('game.hideWord');
        const challengeEl = document.getElementById('game-challenge-display');
        const challengeTextEl = document.getElementById('game-challenge-text');
        if (gameState.currentChallenge) {
          challengeTextEl.textContent = gameState.currentChallenge;
          challengeEl.classList.remove('hidden');
        } else {
          challengeEl.classList.add('hidden');
        }
      } else {
        placeholder.classList.remove('hidden');
        visibleContent.classList.add('hidden');
        button.textContent = t('game.showWord');
      }
    }

    // ============================================================
    // PICK WORD / CHALLENGES
    // ============================================================
    function pickWord() {
      const shuffle = document.getElementById('toggle-shuffle').checked;
      const bank = getLocalizedWordBank();
      const allWords = [];

      gameState.selectedCategories.forEach(category => {
        (bank[gameState.difficulty]?.[category] || []).forEach(word => {
          allWords.push({ word, cat: category });
        });
      });

      let available = allWords.filter(item => !gameState.usedWords.includes(item.word));
      if (available.length === 0) {
        gameState.usedWords = [];
        available = allWords;
      }
      if (available.length === 0) return { word: '???', cat: 'objects' };

      const picked = shuffle
        ? available[Math.floor(Math.random() * available.length)]
        : available[0];
      gameState.usedWords.push(picked.word);

      gameState.currentChallenge = null;
      if (gameState.randomChallenge) {
        const challenges = getLocalizedChallenges();
        if (challenges.length) {
          gameState.currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        }
      }

      return picked;
    }

    // ============================================================
    // TIMER / SOUND
    // ============================================================
    function startTimer() {
      const dur = gameState.timerDur;
      gameState.timerLeft = dur;
      gameState.hintShown = false;
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
          playAlertBeep(523);
        }
        if (gameState.timerLeft <= 10 && gameState.timerLeft > 0) {
          playAlertBeep(gameState.timerLeft <= 3 ? 880 : 440);
        }
        if (gameState.timerLeft <= 0) {
          clearInterval(gameState.timerInterval);
          markResult(false, true);
        }
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
      document.getElementById('timer-val').textContent = `${val}s`;
      gameState.timerDur = parseInt(val, 10);
    }

    function isAlertSoundEnabled() {
      const toggle = document.getElementById('toggle-sound');
      return toggle ? toggle.checked : true;
    }

    function playBeep(freq = 440) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch (e) { }
    }

    function playAlertBeep(freq = 440) {
      if (!isAlertSoundEnabled()) return;
      playBeep(freq);
    }

    function isNavigationSoundEnabled() {
      const toggle = document.getElementById('toggle-navigation-sound');
      return toggle ? toggle.checked : true;
    }

    function playClickSound() {
      playBeep(800);
    }

    function playNavigationSound() {
      if (!isNavigationSoundEnabled()) return;
      playClickSound();
    }

    function playCorrectSound() {
      if (!isNavigationSoundEnabled()) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) { }
    }

    function playWrongSound() {
      if (!isNavigationSoundEnabled()) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.setValueAtTime(300, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
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
      setTimeout(() => { button.style.transform = 'translateX(5px)'; }, 50);
      setTimeout(() => { button.style.transform = 'translateX(-5px)'; }, 100);
      setTimeout(() => { button.style.transform = 'translateX(5px)'; }, 150);
      setTimeout(() => { button.style.transform = ''; }, 200);
    }

    // ============================================================
    // RESULT
    // ============================================================
    function markResult(correct, timeUp = false) {
      clearInterval(gameState.timerInterval);
      clearInterval(gameState.memInterval);
      document.getElementById('memorize-state').classList.add('hidden');
      const player = gameState.players[gameState.currentPlayerIdx];
      const playerName = player.name || player;
      const emoji = document.getElementById('resultEmoji');
      const title = document.getElementById('resultTitle');
      const sub = document.getElementById('resultSub');

      if (correct) {
        if (gameState.mode === 'teams') {
          gameState.scores['team' + player.team] = (gameState.scores['team' + player.team] || 0) + 10;
          gameState.scores[playerName] = (gameState.scores[playerName] || 0) + 10;
        } else {
          gameState.scores[playerName] = (gameState.scores[playerName] || 0) + 10;
        }

        emoji.textContent = '🎉';
        title.textContent = t('result.correctTitle');
        title.style.color = 'var(--accent3)';
        sub.textContent = gameState.mode === 'teams'
          ? t('dynamic.correctTeamPoints', { teamName: gameState.teamNames[player.team] || getDefaultTeamName(player.team) })
          : t('dynamic.correctPlayerPoints', { playerName });
        launchConfetti();
      } else {
        if (document.getElementById('toggle-penalty').checked && !timeUp) {
          if (gameState.mode === 'teams') {
            gameState.scores['team' + player.team] = Math.max(0, (gameState.scores['team' + player.team] || 0) - 10);
            gameState.scores[playerName] = Math.max(0, (gameState.scores[playerName] || 0) - 10);
          } else {
            gameState.scores[playerName] = Math.max(0, (gameState.scores[playerName] || 0) - 10);
          }
          sub.textContent = t('dynamic.penaltySkip');
        } else {
          sub.textContent = timeUp ? t('dynamic.timeUpNoPoints') : t('dynamic.skippedNoPoints');
        }
        emoji.textContent = timeUp ? '⏰' : '😅';
        title.textContent = timeUp ? t('result.timeUpTitle') : t('result.wrongTitle');
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
      const cont = document.getElementById('score-mini');
      if (!cont) return;
      cont.innerHTML = '';
      if (!gameState.players.length) return;
      if (gameState.mode === 'teams') {
        ['A', 'B'].forEach(team => {
          const color = team === 'A' ? 'var(--team1)' : 'var(--team2)';
          const el = document.createElement('div');
          el.style.cssText = `background:${color}22;border:1px solid ${color}44;border-radius:12px;padding:8px 14px;display:flex;align-items:center;gap:8px;white-space:nowrap`;
          const label = gameState.teamNames[team] || getDefaultTeamName(team);
          el.innerHTML = `<span style="font-weight:800;color:${color}">${label}</span><span style="font-family:var(--font-display);font-size:1.2rem;color:${color}">${gameState.scores['team' + team] || 0}</span>`;
          cont.appendChild(el);
        });
      } else {
        gameState.players.forEach(player => {
          const name = player.name || player;
          const el = document.createElement('div');
          el.style.cssText = 'background:var(--surface-bg);border:1px solid var(--surface-border);border-radius:12px;padding:8px 14px;display:flex;align-items:center;gap:8px;white-space:nowrap';
          el.innerHTML = `<span style="font-weight:800;font-size:0.85rem">${name}</span><span style="font-family:var(--font-display);font-size:1.2rem;color:var(--accent2)">${gameState.scores[name] || 0}</span>`;
          cont.appendChild(el);
        });
      }
    }

    function renderFullScoreboard(isFinal = false) {
      const cont = document.getElementById(isFinal ? 'final-scoreboard' : 'scoreboard-list');
      cont.innerHTML = '';
      let entries = [];
      if (gameState.mode === 'teams') {
        entries = [
          { name: `🔴 ${gameState.teamNames.A || getDefaultTeamName('A')}`, pts: gameState.scores.teamA || 0, team: 'A' },
          { name: `🔵 ${gameState.teamNames.B || getDefaultTeamName('B')}`, pts: gameState.scores.teamB || 0, team: 'B' }
        ];
      } else {
        entries = gameState.players.map(player => ({
          name: player.name || player,
          pts: gameState.scores[player.name || player] || 0
        }));
      }
      entries.sort((a, b) => b.pts - a.pts);
      const ranks = ['🥇', '🥈', '🥉'];
      entries.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'score-row' + (index === 0 ? ' first' : index === 1 ? ' second' : index === 2 ? ' third' : '');
        const color = entry.team === 'A' ? 'var(--team1)' : entry.team === 'B' ? 'var(--team2)' : '';
        div.innerHTML = `<div class="rank-badge">${ranks[index] || (index + 1)}</div><div class="score-name" style="flex:1;${color ? 'color:' + color : ''}">${entry.name}</div><div class="score-pts">${entry.pts} <span style="font-size:0.8rem;color:var(--text3)">${t('common.pointsShort')}</span></div>`;
        cont.appendChild(div);
      });
    }

    function refreshScoreScreenCopy() {
      if (!gameState.players.length || !document.getElementById('screen-score').classList.contains('active')) return;
      const roundDone = gameState.currentRound - 1;
      const remaining = gameState.totalRounds - roundDone;
      document.getElementById('score-subtitle').textContent = t('dynamic.roundSummary', { roundDone, remaining });
      document.getElementById('next-round-info').textContent = t('dynamic.roundDisplay', {
        current: gameState.currentRound,
        total: gameState.totalRounds
      });
      renderFullScoreboard(false);
    }

    function showMidScore() {
      goTo('score');
      renderFullScoreboard(false);
      refreshScoreScreenCopy();
    }

    function continueGame() {
      goTo('game');
      initTurn();
    }

    function getFinalWinnerData() {
      if (gameState.mode === 'teams') {
        const a = gameState.scores.teamA || 0;
        const b = gameState.scores.teamB || 0;
        if (a > b) return { winner: `🔴 ${gameState.teamNames.A || getDefaultTeamName('A')}`, tie: false };
        if (b > a) return { winner: `🔵 ${gameState.teamNames.B || getDefaultTeamName('B')}`, tie: false };
        return { winner: t('final.tie'), tie: true };
      }
      const sorted = gameState.players
        .map(player => ({ name: player.name || player, pts: gameState.scores[player.name || player] || 0 }))
        .sort((a, b) => b.pts - a.pts);
      if (!sorted.length) return { winner: '--', tie: false };
      const isTie = sorted.length > 1 && sorted[0].pts === sorted[1].pts;
      return { winner: isTie ? t('final.tie') : sorted[0].name, tie: isTie };
    }

    function refreshFinalScreenCopy() {
      if (!gameState.players.length || !document.getElementById('screen-final').classList.contains('active')) return;
      const { winner, tie } = getFinalWinnerData();
      document.getElementById('final-trophy').textContent = tie ? '🤝' : '🏆';
      document.getElementById('final-winner').textContent = winner;
      renderFullScoreboard(true);
    }

    function showFinalScore() {
      goTo('final');
      renderFullScoreboard(true);
      refreshFinalScreenCopy();
      launchConfetti(80);
    }

    // ============================================================
    // WORD BANK
    // ============================================================
    function syncWBDiffUI() {
      DIFFICULTY_KEYS.forEach(diff =>
        document.getElementById('wb-diff-' + diff).classList.toggle('selected', diff === wbDiff)
      );
      document.getElementById('wb-diff-label').textContent = getDifficultyLabel(wbDiff, true);
    }

    function syncWBCatUI() {
      CATEGORY_KEYS.forEach(category =>
        document.getElementById('tab-' + category)?.classList.toggle('active', category === wbCat)
      );
    }

    function switchWBDiff(diff) {
      wbDiff = diff;
      syncWBDiffUI();
      renderWordBank();
    }

    function switchWordTab(tab) {
      wbCat = tab;
      syncWBCatUI();
      renderWordBank();
    }

    function getWordEntriesForWordBank(locale = currentLanguage, diff = wbDiff, category = wbCat) {
      const entries = [];
      getEnabledPacks().forEach(pack => {
        const localizedBank = normalizeWordBank(pack.words?.[locale] || {});
        (localizedBank[diff]?.[category] || []).forEach((word, index) => {
          entries.push({
            packId: pack.id,
            word,
            index,
            diff,
            category,
            editable: pack.editable !== false
          });
        });
      });
      return entries;
    }

    function renderWordBank() {
      const cont = document.getElementById('words-list');
      cont.innerHTML = '';
      const entries = getWordEntriesForWordBank(currentLanguage, wbDiff, wbCat);
      entries.forEach(entry => {
        const tag = document.createElement('span');
        tag.className = 'word-tag';
        const removeBtn = entry.editable
          ? ` <span class="del-btn" data-action="remove-word" data-word-category="${entry.category}" data-word-diff="${entry.diff}" data-word-pack="${entry.packId}" data-index="${entry.index}">✕</span>`
          : '';
        tag.innerHTML = `${CATEGORY_ICONS[entry.category] || ''} ${entry.word}${removeBtn}`;
        cont.appendChild(tag);
      });
      document.getElementById('word-count').textContent = entries.length;
    }

    function addWord() {
      const inp = document.getElementById('inp-new-word');
      const category = document.getElementById('inp-word-cat').value;
      const word = inp.value.trim();
      if (!word) return;
      const currentBank = getLocalizedWordBank();
      if (currentBank[wbDiff][category].includes(word)) {
        showNotif(t('notifications.duplicateWord'), 'var(--accent2)', 'var(--text)');
        return;
      }

      const editablePack = getEditablePack();
      ensurePackLocale(editablePack, currentLanguage);
      editablePack.words[currentLanguage][wbDiff][category].push(word);
      editablePack.words[currentLanguage][wbDiff][category] = ensureUniqueWords(editablePack.words[currentLanguage][wbDiff][category]);
      saveContentModel();
      inp.value = '';
      renderWordBank();
      updateDiffWordCount();
      showNotif(t('dynamic.wordAdded', { word, difficulty: getDifficultyLabel(wbDiff, true) }));
    }

    function removeWord(category, diff, packId, idx) {
      const pack = contentModel.packs.find(item => item.id === packId);
      if (!pack || pack.editable === false) return;
      ensurePackLocale(pack, currentLanguage);
      pack.words[currentLanguage][diff][category].splice(idx, 1);
      saveContentModel();
      renderWordBank();
      updateDiffWordCount();
    }

    function resetWords() {
      if (confirm(t('confirmations.resetWords'))) {
        const defaultCore = normalizePack(createCorePack());
        const extraPacks = contentModel.packs.filter(pack => pack.id !== CORE_PACK_ID && pack.source !== 'builtin');
        contentModel = {
          version: 1,
          packs: [defaultCore, ...extraPacks.map(normalizePack)]
        };
        saveContentModel();
        renderWordBank();
        updateDiffWordCount();
        showNotif(t('notifications.bankRestored'));
      }
    }

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
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.cssText = `left:${Math.random() * 100}vw;top:-10px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};--dur:${(Math.random() * 1.5 + 1.5).toFixed(1)}s;--del2:${(Math.random() * 1).toFixed(2)}s;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4000);
      }
    }

    // ============================================================
    // RESTART
    // ============================================================
    function confirmRestart() {
      if (confirm(t('confirmations.restartGame'))) {
        clearInterval(gameState.timerInterval);
        clearInterval(gameState.memInterval);
        document.getElementById('resultOverlay').classList.remove('show');
        const prevDiff = gameState.difficulty;
        gameState = {
          mode: 'teams',
          difficulty: prevDiff,
          teams: { A: [], B: [] },
          players: [],
          teamNames: { A: getDefaultTeamName('A'), B: getDefaultTeamName('B') },
          scores: {},
          currentPlayerIdx: 0,
          currentRound: 1,
          totalRounds: 3,
          currentWord: null,
          currentChallenge: null,
          usedWords: [],
          timerDur: parseInt(document.getElementById('timer-slider').value, 10) || 60,
          timerInterval: null,
          memInterval: null,
          timerLeft: 60,
          hintShown: false,
          wordVisible: false,
          phase: 'preparing',
          totalTurns: 0,
          turnsDone: 0,
          randomChallenge: false,
          selectedCategories: ['objects', 'actions', 'animals']
        };
        selectMode('teams');
        selectDifficulty(prevDiff);
        goTo('setup');
        renderSetupPlayers();
      }
    }

    function handleNavigation(button) {
      animateButtonClick(button);
      playNavigationSound();
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

    function shouldPlayNavigationSoundForAction(action) {
      return action !== 'mark-correct' && action !== 'mark-wrong';
    }

    function handleAction(button) {
      const { action, team, index, wordCategory, wordDiff, wordPack } = button.dataset;

      if (shouldPlayNavigationSoundForAction(action)) {
        playNavigationSound();
      }

      if (action === 'next-turn') return nextTurn();
      if (action === 'add-team-player') return addTeamPlayer(team);
      if (action === 'add-ffa-player') return addFFAPlayer();
      if (action === 'start-game') {
        animateButtonClick(button);
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
      if (action === 'remove-word') return removeWord(wordCategory, wordDiff, wordPack, Number(index));
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
          playNavigationSound();
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
      document.getElementById('toggle-navigation-sound').addEventListener('change', saveSettings);
      document.getElementById('toggle-penalty').addEventListener('change', saveSettings);
      document.getElementById('toggle-shuffle').addEventListener('change', saveSettings);
      document.getElementById('language-select').addEventListener('change', event => {
        setLanguage(event.target.value, { save: true });
      });
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
