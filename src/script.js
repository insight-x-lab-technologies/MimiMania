    const DEFAULT_LANGUAGE = 'en';
    const SETTINGS_KEY = 'mm_settings_v2';
    const CONTENT_KEY = 'mm_content_v1';
    const LEGACY_WORDS_KEY = 'mm_words_v2';
    const QUICK_GAME_KEY = 'mm_quick_game_v1';
    const USER_ID_KEY = 'mm_user_id_v1';
    const APP_STORAGE_PREFIX = 'mm_';
    const AVAILABLE_THEMES = ['cosmic', 'liquid-glass', 'material3'];
    const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'];
    const LANGUAGE_HTML_MAP = { pt: 'pt-BR', en: 'en', es: 'es' };
    const GAME_TYPES = ['mime', 'drawing'];
    const DIFFICULTY_KEYS = ['easy', 'normal', 'hard'];
    const CATEGORY_KEYS = ['objects', 'actions', 'animals', 'movies', 'professions', 'celebrities'];
    const CATEGORY_ICONS = { objects: '🧸', actions: '🏃', animals: '🐾', movies: '🎬', professions: '👔', celebrities: '⭐' };
    const DIFFICULTY_ICONS = { easy: '🌱', normal: '⚡', hard: '🔥' };
    const CORE_PACK_ID = 'core-default';
    const WORD_PACK_SCHEMA = 'mimimania.wordpack.v1';
    const PACK_SIGNATURE_ALGORITHM = 'ECDSA_P256_SHA256';
    const PACK_SIGNATURE_CONTEXT = 'mimimania-word-pack:v1';
    // The app validates purchased packs with a public key only. Replace this
    // development key with your production ECDSA P-256 public JWK before sales.
    const PACK_SIGNING_PUBLIC_KEY = {
      kty: 'EC',
      crv: 'P-256',
      x: 'HKO3JBbIQkmtHzIr_lpVgwrr3PuoVAjpZ_1ett_2MbQ',
      y: '2B-F3Nim2D13Ym49dh-RRpDj_Z2rsUBqyyWty6LS2Vk',
      ext: true
    };
    const KO_FI_WIDGET_SCRIPT_URL = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    const KO_FI_SLUG = 'insightxlabgamestudio';
    const APP_PUBLIC_URL = 'https://insight-x-lab-technologies.github.io/MimiMania/';
    const SOCIAL_WEB_FALLBACKS = {
      instagram: 'https://www.instagram.com/',
      tiktok: 'https://www.tiktok.com/'
    };
    const DONATION_LINKS = {
      buyMeCoffee: 'https://buymeacoffee.com/insight.x.lab.game.studio',
      koFi: `https://ko-fi.com/${KO_FI_SLUG}`
    };
    let currentLanguage = DEFAULT_LANGUAGE;

    function clone(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function generateUserId() {
      if (crypto?.randomUUID) return `mmu_${crypto.randomUUID()}`;
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return `mmu_${Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')}`;
    }

    function getOrCreateUserId() {
      const saved = localStorage.getItem(USER_ID_KEY);
      if (saved) return saved;
      const nextUserId = generateUserId();
      localStorage.setItem(USER_ID_KEY, nextUserId);
      return nextUserId;
    }

    const appUserId = getOrCreateUserId();

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
          pointsShort: 'pts',
          playerSingular: 'jogador',
          playerPlural: 'jogadores',
          roundSingular: 'rodada',
          roundPlural: 'rodadas'
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
          subtitle: '🎭 Mímica e desenho em família',
          newGame: '🎮 Nova Partida',
          quickGame: '⚡ Jogo Rápido',
          wordBank: '🧩 Conteúdo e Expansões',
          donate: '❤️ Doar',
          settings: '⚙️ Configurações',
          howToTitle: '🏆 Como jogar',
          howTo: {
            setupTitle: 'Monte a partida',
            setupDesc: 'Escolha entre times ou todos contra todos, defina rodadas, dificuldade e categorias.',
            turnTitle: 'Veja e atue',
            turnDesc: 'Um jogador vê a palavra, memoriza e faz mímica ou desenha enquanto o resto tenta adivinhar.',
            timerTitle: 'Corra contra o tempo',
            timerDesc: 'O cronômetro, as dicas e os sons de alerta ajudam a manter cada turno rápido e divertido.',
            winTitle: 'Marque pontos e vença',
            winDesc: 'Cada acerto vale 10 pontos. No fim das rodadas, o placar decide o vencedor.'
          }
        },
        setup: {
          title: 'Nova Partida',
          gameTypeTitle: 'Tipo do Jogo',
          gameTypeMimeName: 'Mímica',
          gameTypeMimeDesc: 'Atue sem falar',
          gameTypeDrawingName: 'Desenho',
          gameTypeDrawingDesc: 'Desenhe a palavra',
          modeTitle: 'Modo de Jogo',
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
          randomChallengeDisabledSub: 'Indisponível no modo desenho',
          categoriesLabel: 'Categorias Disponíveis',
          coreCategoriesLabel: 'Categorias Core',
          premiumCategoriesLabel: 'Categorias Premium',
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
          currentPlayerDrawingLabel: 'Vez de desenhar:',
          readyTitle: 'Prontos para ver a palavra?',
          readyDrawingTitle: 'Prontos para ver o que desenhar?',
          readySub: 'Só o mimo deve ver! Os outros fechem os olhos! 👀',
          readyDrawingSub: 'Só quem vai desenhar deve ver! Os outros fechem os olhos! 👀',
          revealWord: '🎲 Revelar Palavra',
          memorizeTitle: '⚡ Memorize a palavra!',
          startsIn: 'O jogo começa em...',
          onlyMimeCanSee: 'Só o mimo pode ver!',
          onlyDrawerCanSee: 'Só quem desenha pode ver!',
          secondsLabel: 'SEGUNDOS',
          hiddenWord: 'Palavra oculta',
          hintTitle: '💡 Dica',
          showWord: '👁️ Mostrar palavra',
          hideWord: '🙈 Ocultar palavra',
          correct: '✅ Acertou!',
          wrong: '❌ Errou / Skip',
          challengePrefix: '🎯 Desafio:'
        },
        drawing: {
          canvasLabel: 'Área de desenho',
          toolbarLabel: 'Ferramentas de desenho',
          penThick: 'Linha grossa',
          penThin: 'Linha fina',
          eraserThick: 'Borracha grossa',
          eraserThin: 'Borracha fina',
          clear: 'Limpar canvas'
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
          title: 'Conteúdo e Expansões',
          addTitle: '➕ Adicionar Palavra',
          newWordPlaceholder: 'Digite a palavra...',
          addToDifficulty: 'Será adicionada à dificuldade:',
          addButton: '➕ Adicionar Palavra',
          listTitle: '📋 Palavras',
          resetButton: '↺ Restaurar',
          challengesTitle: '🎯 Desafios Core',
          addChallengeTitle: '🎯 Adicionar Desafio',
          newChallengePlaceholder: 'Digite o desafio...',
          addChallengeButton: '➕ Adicionar Desafio',
          installPackTitle: '📦 Instalar pack',
          installPackSub: 'Envie o arquivo .json comprado para liberar novas palavras neste dispositivo.',
          selectPackFile: '📁 Escolher arquivo',
          installedPacksTitle: 'Packs instalados',
          noInstalledPacks: 'Nenhum pack extra instalado ainda.',
          packEnabled: 'Ativo',
          packDisabled: 'Inativo',
          removePack: 'Remover',
          packPreviewTitle: '⭐ Conteúdo do pack',
          packPreviewPrompt: 'Clique em um pack instalado para ver palavras e desafios.',
          packPreviewWordsTitle: 'Palavras do pack',
          packPreviewChallengesTitle: 'Challenges do pack',
          packPreviewNoWords: 'Nenhuma palavra neste idioma e dificuldade.',
          packPreviewNoChallenges: 'Nenhum challenge neste idioma.',
          packPreviewSelected: ({ name }) => `Exibindo: ${name}`
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
          userIdTitle: '🪪 ID de compra',
          userIdLabel: 'Seu user_id',
          userIdSub: 'Use este código na compra de packs para que o arquivo seja emitido para este dispositivo.',
          copyUserId: 'Copiar',
          wordsTitle: '🎲 Palavras',
          shuffleWordsLabel: 'Embaralhar Palavras',
          shuffleWordsSub: 'Ordem aleatória a cada jogo',
          appearanceTitle: '🎨 Aparência',
          themeLabel: 'Tema visual',
          themeSub: 'Troque cores, transparências e tipografia da interface',
          resetAllTitle: '🧹 Restaurar aplicação',
          resetAllSub: 'Remove configurações, jogadores salvos, packs instalados e o user_id deste dispositivo.',
          resetAllButton: 'Restaurar tudo'
        },
        donate: {
          title: 'Apoie o MimiMania',
          chooseTitle: '❤️ Escolha como doar',
          subtitle: 'Selecione sua plataforma preferida para apoiar o jogo e ajudar a financiar novos packs de palavras, idiomas e melhorias.',
          buyMeCoffee: 'Buy Me a Coffee',
          buyMeCoffeeSub: 'Apoio rápido e direto com uma doação avulsa.',
          koFi: 'Ko-fi',
          koFiSub: 'Doe via Ko-fi e ajude o projeto a continuar crescendo.',
          whyTitle: '🎭 Por que doar?',
          whyLanguages: 'Seu apoio ajuda a financiar novos idiomas, packs de conteúdo e futuras expansões do banco de palavras.',
          whyUpdates: 'Também ajuda a manter o MimiMania atualizado com polimento, ajustes de balanceamento e novos recursos.'
        },
        share: {
          title: 'MimiMania',
          text: 'Venha jogar MimiMania comigo!'
        },
        theme: {
          cosmic: 'Cósmico',
          'liquid-glass': 'Outono',
          material3: 'Primavera'
        },
        footer: {
          copyPrefix: '© 2025 MimiMania v3.0 · Insight X Lab Technologies · Publicado no ',
          githubPages: 'GitHub Pages'
        },
        teams: {
          defaultA: 'Time A',
          defaultB: 'Time B'
        },
        players: {
          defaultName: 'Jogador {number}'
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
          playerAdded: ({ name }) => `✅ ${name} entrou!`,
          packInstalled: ({ name }) => `✅ Pack "${name}" instalado!`,
          packWordsSummary: ({ count }) => `${count} palavra${count !== 1 ? 's' : ''}`,
          packVersion: ({ version }) => `v${version}`,
          challengeAdded: ({ challenge }) => `✅ Desafio "${challenge}" adicionado!`
        },
        notifications: {
          duplicateWord: '⚠️ Palavra já existe!',
          duplicateChallenge: '⚠️ Desafio já existe!',
          bankRestored: '✅ Banco restaurado!',
          challengeRemoved: 'Desafio removido.',
          challengesRestored: '✅ Desafios restaurados!',
          userIdCopied: '🪪 user_id copiado!',
          packInstallReading: 'Lendo arquivo...',
          packInstallSuccess: '✅ Pack instalado e ativado!',
          packInstallCancelled: 'Instalação cancelada.',
          packRemoved: 'Pack removido.',
          packToggled: 'Status do pack atualizado.',
          maxPlayers: '❌ Máximo 6 jogadores!',
          maxTeamPlayers: '❌ Máximo 3 por time!',
          minTeamPlayers: '❌ Mínimo 1 por time!',
          minFfaPlayers: '❌ Mínimo 3 jogadores!',
          donationLinkUnavailable: '⚠️ Configure o link de doação deste parceiro para ativá-lo.',
          shareCopied: '🔗 Link copiado!',
          shareUnavailable: '🔗 Link copiado para compartilhar.',
          shareCopyFailed: '⚠️ Não foi possível copiar o link.',
          shareInstagramFallback: '🔗 Link copiado. Cole no Instagram.',
          shareTikTokFallback: '🔗 Link copiado. Cole no TikTok.'
        },
        confirmations: {
          resetWords: 'Restaurar o banco de palavras padrão? Palavras customizadas serão perdidas.',
          resetChallenges: 'Restaurar os desafios padrão? Desafios customizados serão perdidos.',
          resetAppDefaults: 'Restaurar toda a aplicação para o padrão? Configurações, jogadores salvos, packs instalados e user_id serão apagados.',
          restartGame: 'Reiniciar o jogo? Todo o progresso será perdido.',
          replacePack: ({ packName }) => `Já existe um pack instalado com este ID (${packName}). Substituir?`,
          removePack: ({ packName }) => `Remover o pack "${packName}" deste dispositivo?`
        },
        packErrors: {
          fileRequired: 'Selecione um arquivo de pack.',
          invalidJson: 'Arquivo inválido. Envie um JSON de pack.',
          invalidSchema: 'Schema do pack inválido.',
          invalidUser: 'Este pack foi emitido para outro user_id.',
          invalidPackId: 'pack_id ausente ou inválido.',
          invalidAlgorithm: 'Algoritmo de assinatura inválido.',
          invalidSignature: 'Assinatura inválida. O pack não foi instalado.',
          invalidContentHash: 'Hash do conteúdo inválido.',
          emptyPack: 'O pack não possui palavras ou desafios válidos.',
          cryptoUnavailable: 'Este navegador não suporta validação segura de packs.',
          reservedPackId: 'Este pack_id é reservado pelo jogo.'
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
          pointsShort: 'pts',
          playerSingular: 'player',
          playerPlural: 'players',
          roundSingular: 'round',
          roundPlural: 'rounds'
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
          subtitle: '🎭 Mime and drawing party game',
          newGame: '🎮 New Game',
          quickGame: '⚡ Quick Game',
          wordBank: '🧩 Content & Expansions',
          donate: '❤️ Donate',
          settings: '⚙️ Settings',
          howToTitle: '🏆 How to play',
          howTo: {
            setupTitle: 'Set up the match',
            setupDesc: 'Choose teams or free for all, then set rounds, difficulty, and categories.',
            turnTitle: 'See it and act it out',
            turnDesc: 'One player sees the word, memorizes it, then acts or draws while everyone else guesses.',
            timerTitle: 'Race against the clock',
            timerDesc: 'The timer, hints, and alert sounds keep every turn fast, clear, and fun.',
            winTitle: 'Score and win',
            winDesc: 'Each correct answer is worth 10 points. At the end of the rounds, the scoreboard decides the winner.'
          }
        },
        setup: {
          title: 'New Game',
          gameTypeTitle: 'Game Type',
          gameTypeMimeName: 'Mime',
          gameTypeMimeDesc: 'Act without speaking',
          gameTypeDrawingName: 'Drawing',
          gameTypeDrawingDesc: 'Draw the word',
          modeTitle: 'Game Mode',
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
          randomChallengeDisabledSub: 'Unavailable in drawing mode',
          categoriesLabel: 'Available Categories',
          coreCategoriesLabel: 'Core Categories',
          premiumCategoriesLabel: 'Premium Categories',
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
          currentPlayerDrawingLabel: 'Current drawing player:',
          readyTitle: 'Ready to see the word?',
          readyDrawingTitle: 'Ready to see what to draw?',
          readySub: 'Only the mime should look! Everyone else close your eyes! 👀',
          readyDrawingSub: 'Only the drawing player should look! Everyone else close your eyes! 👀',
          revealWord: '🎲 Reveal Word',
          memorizeTitle: '⚡ Memorize the word!',
          startsIn: 'The game starts in...',
          onlyMimeCanSee: 'Only the mime can see it!',
          onlyDrawerCanSee: 'Only the drawing player can see it!',
          secondsLabel: 'SECONDS',
          hiddenWord: 'Hidden word',
          hintTitle: '💡 Hint',
          showWord: '👁️ Show word',
          hideWord: '🙈 Hide word',
          correct: '✅ Correct!',
          wrong: '❌ Wrong / Skip',
          challengePrefix: '🎯 Challenge:'
        },
        drawing: {
          canvasLabel: 'Drawing area',
          toolbarLabel: 'Drawing tools',
          penThick: 'Thick line',
          penThin: 'Thin line',
          eraserThick: 'Thick eraser',
          eraserThin: 'Thin eraser',
          clear: 'Clear canvas'
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
          title: 'Content & Expansions',
          addTitle: '➕ Add Word',
          newWordPlaceholder: 'Type the word...',
          addToDifficulty: 'It will be added to difficulty:',
          addButton: '➕ Add Word',
          listTitle: '📋 Words',
          resetButton: '↺ Restore',
          challengesTitle: '🎯 Core Challenges',
          addChallengeTitle: '🎯 Add Challenge',
          newChallengePlaceholder: 'Type the challenge...',
          addChallengeButton: '➕ Add Challenge',
          installPackTitle: '📦 Install pack',
          installPackSub: 'Upload the purchased .json file to unlock new words on this device.',
          selectPackFile: '📁 Choose file',
          installedPacksTitle: 'Installed packs',
          noInstalledPacks: 'No extra packs installed yet.',
          packEnabled: 'Enabled',
          packDisabled: 'Disabled',
          removePack: 'Remove',
          packPreviewTitle: '⭐ Pack content',
          packPreviewPrompt: 'Click an installed pack to see words and challenges.',
          packPreviewWordsTitle: 'Pack words',
          packPreviewChallengesTitle: 'Pack challenges',
          packPreviewNoWords: 'No words in this language and difficulty.',
          packPreviewNoChallenges: 'No challenges in this language.',
          packPreviewSelected: ({ name }) => `Showing: ${name}`
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
          userIdTitle: '🪪 Purchase ID',
          userIdLabel: 'Your user_id',
          userIdSub: 'Use this code when buying packs so the file is issued to this device.',
          copyUserId: 'Copy',
          wordsTitle: '🎲 Words',
          shuffleWordsLabel: 'Shuffle Words',
          shuffleWordsSub: 'Random order every game',
          appearanceTitle: '🎨 Appearance',
          themeLabel: 'Visual theme',
          themeSub: 'Change colors, transparencies, and interface typography',
          resetAllTitle: '🧹 Reset application',
          resetAllSub: 'Removes settings, saved players, installed packs, and this device user_id.',
          resetAllButton: 'Reset everything'
        },
        donate: {
          title: 'Support MimiMania',
          chooseTitle: '❤️ Choose how to donate',
          subtitle: 'Pick your preferred platform to support the game and help fund new word packs, languages, and updates.',
          buyMeCoffee: 'Buy Me a Coffee',
          buyMeCoffeeSub: 'Fast one-time support through Buy Me a Coffee.',
          koFi: 'Ko-fi',
          koFiSub: 'Donate with Ko-fi and keep the project growing.',
          whyTitle: '🎭 Why donate?',
          whyLanguages: 'Your support helps fund new languages, content packs, and future word bank expansions.',
          whyUpdates: 'It also helps keep MimiMania maintained with polish, balance tweaks, and new features.'
        },
        share: {
          title: 'MimiMania',
          text: 'Come play MimiMania with me!'
        },
        theme: {
          cosmic: 'Cosmic',
          'liquid-glass': 'Autumn',
          material3: 'Spring'
        },
        footer: {
          copyPrefix: '© 2025 MimiMania v3.0 · Insight X Lab Technologies · Published on ',
          githubPages: 'GitHub Pages'
        },
        teams: {
          defaultA: 'Team A',
          defaultB: 'Team B'
        },
        players: {
          defaultName: 'Player {number}'
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
          playerAdded: ({ name }) => `✅ ${name} joined!`,
          packInstalled: ({ name }) => `✅ Pack "${name}" installed!`,
          packWordsSummary: ({ count }) => `${count} word${count !== 1 ? 's' : ''}`,
          packVersion: ({ version }) => `v${version}`,
          challengeAdded: ({ challenge }) => `✅ Challenge "${challenge}" added!`
        },
        notifications: {
          duplicateWord: '⚠️ Word already exists!',
          duplicateChallenge: '⚠️ Challenge already exists!',
          bankRestored: '✅ Word bank restored!',
          challengeRemoved: 'Challenge removed.',
          challengesRestored: '✅ Challenges restored!',
          userIdCopied: '🪪 user_id copied!',
          packInstallReading: 'Reading file...',
          packInstallSuccess: '✅ Pack installed and enabled!',
          packInstallCancelled: 'Installation cancelled.',
          packRemoved: 'Pack removed.',
          packToggled: 'Pack status updated.',
          maxPlayers: '❌ Maximum 6 players!',
          maxTeamPlayers: '❌ Maximum 3 per team!',
          minTeamPlayers: '❌ At least 1 per team!',
          minFfaPlayers: '❌ At least 3 players!',
          donationLinkUnavailable: '⚠️ Configure this partner donation link to enable it.',
          shareCopied: '🔗 Link copied!',
          shareUnavailable: '🔗 Link copied for sharing.',
          shareCopyFailed: '⚠️ Could not copy the link.',
          shareInstagramFallback: '🔗 Link copied. Paste it into Instagram.',
          shareTikTokFallback: '🔗 Link copied. Paste it into TikTok.'
        },
        confirmations: {
          resetWords: 'Restore the default word bank? Custom words will be lost.',
          resetChallenges: 'Restore the default challenges? Custom challenges will be lost.',
          resetAppDefaults: 'Reset the entire application to defaults? Settings, saved players, installed packs, and user_id will be erased.',
          restartGame: 'Restart the game? All progress will be lost.',
          replacePack: ({ packName }) => `A pack with this ID is already installed (${packName}). Replace it?`,
          removePack: ({ packName }) => `Remove the pack "${packName}" from this device?`
        },
        packErrors: {
          fileRequired: 'Select a pack file.',
          invalidJson: 'Invalid file. Upload a pack JSON.',
          invalidSchema: 'Invalid pack schema.',
          invalidUser: 'This pack was issued to another user_id.',
          invalidPackId: 'Missing or invalid pack_id.',
          invalidAlgorithm: 'Invalid signature algorithm.',
          invalidSignature: 'Invalid signature. The pack was not installed.',
          invalidContentHash: 'Invalid content hash.',
          emptyPack: 'The pack has no valid words or challenges.',
          cryptoUnavailable: 'This browser does not support secure pack validation.',
          reservedPackId: 'This pack_id is reserved by the game.'
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
          pointsShort: 'pts',
          playerSingular: 'jugador',
          playerPlural: 'jugadores',
          roundSingular: 'ronda',
          roundPlural: 'rondas'
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
          subtitle: '🎭 Mímica y dibujo en familia',
          newGame: '🎮 Nueva Partida',
          quickGame: '⚡ Juego Rápido',
          wordBank: '🧩 Contenido y Expansiones',
          donate: '❤️ Donar',
          settings: '⚙️ Configuración',
          howToTitle: '🏆 Cómo jugar',
          howTo: {
            setupTitle: 'Prepara la partida',
            setupDesc: 'Elige entre equipos o todos contra todos y define rondas, dificultad y categorías.',
            turnTitle: 'Mira y representa',
            turnDesc: 'Un jugador ve la palabra, la memoriza y hace mímica o dibuja mientras los demás intentan adivinar.',
            timerTitle: 'Corre contra el tiempo',
            timerDesc: 'El temporizador, las pistas y los sonidos de alerta hacen que cada turno sea rápido y divertido.',
            winTitle: 'Suma puntos y gana',
            winDesc: 'Cada acierto vale 10 puntos. Al final de las rondas, el marcador define al ganador.'
          }
        },
        setup: {
          title: 'Nueva Partida',
          gameTypeTitle: 'Tipo de Juego',
          gameTypeMimeName: 'Mímica',
          gameTypeMimeDesc: 'Actúa sin hablar',
          gameTypeDrawingName: 'Dibujo',
          gameTypeDrawingDesc: 'Dibuja la palabra',
          modeTitle: 'Modo de Juego',
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
          randomChallengeDisabledSub: 'No disponible en modo dibujo',
          categoriesLabel: 'Categorías Disponibles',
          coreCategoriesLabel: 'Categorías Core',
          premiumCategoriesLabel: 'Categorías Premium',
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
          currentPlayerDrawingLabel: 'Turno de dibujar:',
          readyTitle: '¿Listos para ver la palabra?',
          readyDrawingTitle: '¿Listos para ver qué dibujar?',
          readySub: '¡Solo el mimo debe mirar! ¡Los demás cierren los ojos! 👀',
          readyDrawingSub: '¡Solo quien va a dibujar debe mirar! ¡Los demás cierren los ojos! 👀',
          revealWord: '🎲 Mostrar Palabra',
          memorizeTitle: '⚡ ¡Memoriza la palabra!',
          startsIn: 'El juego empieza en...',
          onlyMimeCanSee: '¡Solo el mimo puede verla!',
          onlyDrawerCanSee: '¡Solo quien dibuja puede verla!',
          secondsLabel: 'SEGUNDOS',
          hiddenWord: 'Palabra oculta',
          hintTitle: '💡 Pista',
          showWord: '👁️ Mostrar palabra',
          hideWord: '🙈 Ocultar palabra',
          correct: '✅ ¡Acertó!',
          wrong: '❌ Error / Skip',
          challengePrefix: '🎯 Desafío:'
        },
        drawing: {
          canvasLabel: 'Área de dibujo',
          toolbarLabel: 'Herramientas de dibujo',
          penThick: 'Línea gruesa',
          penThin: 'Línea fina',
          eraserThick: 'Borrador grueso',
          eraserThin: 'Borrador fino',
          clear: 'Limpiar canvas'
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
          title: 'Contenido y Expansiones',
          addTitle: '➕ Añadir Palabra',
          newWordPlaceholder: 'Escribe la palabra...',
          addToDifficulty: 'Se añadirá a la dificultad:',
          addButton: '➕ Añadir Palabra',
          listTitle: '📋 Palabras',
          resetButton: '↺ Restaurar',
          challengesTitle: '🎯 Desafíos Core',
          addChallengeTitle: '🎯 Añadir Desafío',
          newChallengePlaceholder: 'Escribe el desafío...',
          addChallengeButton: '➕ Añadir Desafío',
          installPackTitle: '📦 Instalar pack',
          installPackSub: 'Sube el archivo .json comprado para desbloquear nuevas palabras en este dispositivo.',
          selectPackFile: '📁 Elegir archivo',
          installedPacksTitle: 'Packs instalados',
          noInstalledPacks: 'Aún no hay packs extra instalados.',
          packEnabled: 'Activo',
          packDisabled: 'Inactivo',
          removePack: 'Eliminar',
          packPreviewTitle: '⭐ Contenido del pack',
          packPreviewPrompt: 'Haz clic en un pack instalado para ver palabras y desafíos.',
          packPreviewWordsTitle: 'Palabras del pack',
          packPreviewChallengesTitle: 'Challenges del pack',
          packPreviewNoWords: 'No hay palabras en este idioma y dificultad.',
          packPreviewNoChallenges: 'No hay challenges en este idioma.',
          packPreviewSelected: ({ name }) => `Mostrando: ${name}`
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
          userIdTitle: '🪪 ID de compra',
          userIdLabel: 'Tu user_id',
          userIdSub: 'Usa este código al comprar packs para que el archivo se emita para este dispositivo.',
          copyUserId: 'Copiar',
          wordsTitle: '🎲 Palabras',
          shuffleWordsLabel: 'Mezclar Palabras',
          shuffleWordsSub: 'Orden aleatorio en cada partida',
          appearanceTitle: '🎨 Apariencia',
          themeLabel: 'Tema visual',
          themeSub: 'Cambia colores, transparencias y tipografía de la interfaz',
          resetAllTitle: '🧹 Restaurar aplicación',
          resetAllSub: 'Elimina configuración, jugadores guardados, packs instalados y el user_id de este dispositivo.',
          resetAllButton: 'Restaurar todo'
        },
        donate: {
          title: 'Apoya a MimiMania',
          chooseTitle: '❤️ Elige cómo donar',
          subtitle: 'Selecciona tu plataforma preferida para apoyar el juego y ayudar a financiar nuevos packs de palabras, idiomas y mejoras.',
          buyMeCoffee: 'Buy Me a Coffee',
          buyMeCoffeeSub: 'Apoyo rápido con una donación puntual a través de Buy Me a Coffee.',
          koFi: 'Ko-fi',
          koFiSub: 'Dona con Ko-fi y ayuda a que el proyecto siga creciendo.',
          whyTitle: '🎭 ¿Por qué donar?',
          whyLanguages: 'Tu apoyo ayuda a financiar nuevos idiomas, packs de contenido y futuras expansiones del banco de palabras.',
          whyUpdates: 'También ayuda a mantener MimiMania con más pulido, ajustes de balance y nuevas funciones.'
        },
        share: {
          title: 'MimiMania',
          text: '¡Ven a jugar MimiMania conmigo!'
        },
        theme: {
          cosmic: 'Cósmico',
          'liquid-glass': 'Otoño',
          material3: 'Primavera'
        },
        footer: {
          copyPrefix: '© 2025 MimiMania v3.0 · Insight X Lab Technologies · Publicado en ',
          githubPages: 'GitHub Pages'
        },
        teams: {
          defaultA: 'Equipo A',
          defaultB: 'Equipo B'
        },
        players: {
          defaultName: 'Jugador {number}'
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
          playerAdded: ({ name }) => `✅ ${name} se unió!`,
          packInstalled: ({ name }) => `✅ Pack "${name}" instalado!`,
          packWordsSummary: ({ count }) => `${count} palabra${count !== 1 ? 's' : ''}`,
          packVersion: ({ version }) => `v${version}`,
          challengeAdded: ({ challenge }) => `✅ Desafío "${challenge}" añadido!`
        },
        notifications: {
          duplicateWord: '⚠️ ¡La palabra ya existe!',
          duplicateChallenge: '⚠️ ¡El desafío ya existe!',
          bankRestored: '✅ ¡Banco restaurado!',
          challengeRemoved: 'Desafío eliminado.',
          challengesRestored: '✅ ¡Desafíos restaurados!',
          userIdCopied: '🪪 ¡user_id copiado!',
          packInstallReading: 'Leyendo archivo...',
          packInstallSuccess: '✅ ¡Pack instalado y activado!',
          packInstallCancelled: 'Instalación cancelada.',
          packRemoved: 'Pack eliminado.',
          packToggled: 'Estado del pack actualizado.',
          maxPlayers: '❌ ¡Máximo 6 jugadores!',
          maxTeamPlayers: '❌ ¡Máximo 3 por equipo!',
          minTeamPlayers: '❌ ¡Mínimo 1 por equipo!',
          minFfaPlayers: '❌ ¡Mínimo 3 jugadores!',
          donationLinkUnavailable: '⚠️ Configura el enlace de donación de este socio para activarlo.',
          shareCopied: '🔗 ¡Enlace copiado!',
          shareUnavailable: '🔗 Enlace copiado para compartir.',
          shareCopyFailed: '⚠️ No se pudo copiar el enlace.',
          shareInstagramFallback: '🔗 Enlace copiado. Pégalo en Instagram.',
          shareTikTokFallback: '🔗 Enlace copiado. Pégalo en TikTok.'
        },
        confirmations: {
          resetWords: '¿Restaurar el banco de palabras predeterminado? Las palabras personalizadas se perderán.',
          resetChallenges: '¿Restaurar los desafíos predeterminados? Los desafíos personalizados se perderán.',
          resetAppDefaults: '¿Restaurar toda la aplicación a los valores predeterminados? Se eliminarán configuración, jugadores guardados, packs instalados y user_id.',
          restartGame: '¿Reiniciar el juego? Todo el progreso se perderá.',
          replacePack: ({ packName }) => `Ya existe un pack instalado con este ID (${packName}). ¿Reemplazarlo?`,
          removePack: ({ packName }) => `¿Eliminar el pack "${packName}" de este dispositivo?`
        },
        packErrors: {
          fileRequired: 'Selecciona un archivo de pack.',
          invalidJson: 'Archivo inválido. Sube un JSON de pack.',
          invalidSchema: 'Schema del pack inválido.',
          invalidUser: 'Este pack fue emitido para otro user_id.',
          invalidPackId: 'pack_id ausente o inválido.',
          invalidAlgorithm: 'Algoritmo de firma inválido.',
          invalidSignature: 'Firma inválida. El pack no fue instalado.',
          invalidContentHash: 'Hash de contenido inválido.',
          emptyPack: 'El pack no tiene palabras o desafíos válidos.',
          cryptoUnavailable: 'Este navegador no soporta validación segura de packs.',
          reservedPackId: 'Este pack_id está reservado por el juego.'
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

    const DEFAULT_WORDS_EN = {
      easy: {
        objects: [
          'Ball', 'Cup', 'Hat', 'Shoe', 'Book', 'Chair', 'Table', 'Bed', 'Door', 'Window',
          'Pencil', 'Eraser', 'Backpack', 'Glasses', 'Umbrella', 'Phone', 'Mirror', 'Brush', 'Comb', 'Scissors',
          'Key', 'Fork', 'Spoon', 'Plate', 'Bottle', 'Pillow', 'Blanket', 'Towel', 'Soap', 'Balloon',
          'Doll', 'Toy car', 'Popcorn', 'Ice cream', 'Cake', 'Apple', 'Banana', 'Grapes', 'Flower', 'Tree',
          'Sun', 'Moon', 'Star', 'Cloud', 'Rain', 'Wardrobe', 'Cabinet', 'Refrigerator', 'Stove', 'Television'
        ],
        actions: [
          'Run', 'Jump', 'Sleep', 'Eat', 'Drink', 'Laugh', 'Cry', 'Dance', 'Sing', 'Swim',
          'Fly', 'Walk', 'Sit', 'Stand up', 'Hug', 'Play', 'Draw', 'Paint', 'Read', 'Write',
          'Listen', 'Shout', 'Blow', 'Breathe', 'Cough', 'Sneeze', 'Yawn', 'Clap', 'Wave', 'Point',
          'Grab', 'Throw', 'Kick', 'Push', 'Pull', 'Open', 'Close', 'Wash hands', 'Brush teeth', 'Comb hair',
          'Put on shoes', 'Take off shoes', 'Turn on TV', 'Turn off the light', 'Clap hands', 'Spin', 'Roll', 'Kiss', 'Smile', 'Think'
        ],
        animals: [
          'Dog', 'Cat', 'Fish', 'Bird', 'Rabbit', 'Chicken', 'Cow', 'Horse', 'Pig', 'Sheep',
          'Duck', 'Frog', 'Butterfly', 'Ant', 'Bee', 'Spider', 'Earthworm', 'Slug', 'Snail', 'Caterpillar',
          'Elephant', 'Lion', 'Giraffe', 'Monkey', 'Zebra', 'Hippopotamus', 'Crocodile', 'Turtle', 'Penguin', 'Bear',
          'Wolf', 'Fox', 'Deer', 'Squirrel', 'Mouse', 'Hamster', 'Iguana', 'Parrot', 'Toucan', 'Flamingo',
          'Pelican', 'Kangaroo', 'Koala', 'Panda', 'Dolphin', 'Whale', 'Octopus', 'Crab', 'Shrimp', 'Starfish'
        ],
        movies: [
          'Titanic', 'Avatar', 'The Lion King', 'Toy Story', 'Frozen', 'Shrek', 'Harry Potter', 'Spider-Man', 'Batman', 'Superman',
          'Jurassic Park', 'The Avengers', 'Star Wars', 'Minions', 'Cars', 'Finding Nemo', 'Inside Out', 'Aladdin',
          'Cinderella', 'Snow White', 'The Matrix', 'Gladiator', 'E.T.', 'King Kong', 'Godzilla', 'Black Panther', 'Iron Man',
          'Captain America', 'Thor', 'Hulk', 'Deadpool', 'Venom', 'Transformers', 'Pirates of the Caribbean', 'Jumanji',
          'Mission: Impossible', '007', 'Rocky', 'Rambo', 'The Karate Kid', 'Gremlins', 'Ghostbusters', 'Scooby-Doo', 'Madagascar',
          'Kung Fu Panda', 'Monsters, Inc.', 'Up', 'Encanto', 'Moana', 'Zootopia'
        ],
        professions: [
          'Doctor', 'Dentist', 'Teacher', 'Police officer', 'Firefighter', 'Driver', 'Cook', 'Waiter', 'Baker', 'Mail carrier',
          'Mechanic', 'Engineer', 'Lawyer', 'Nurse', 'Veterinarian', 'Pilot', 'Hairdresser', 'Barber', 'Actor', 'Singer',
          'Dancer', 'Cleaner', 'Security guard', 'Farmer', 'Fisherman', 'Electrician', 'Bricklayer', 'Painter', 'Gardener',
          'Taxi driver', 'Delivery driver', 'Salesperson', 'Cashier', 'Secretary', 'Receptionist', 'Coach', 'Personal trainer', 'Babysitter',
          'Caregiver', 'Janitor', 'Garbage collector', 'Gas station attendant', 'Bus driver', 'Truck driver', 'Tour guide', 'Photographer',
          'Reporter', 'Radio host', 'Checkout operator', 'Instructor'
        ],
        celebrities: [...DEFAULT_WORDS_PT.easy.celebrities]
      },
      normal: {
        objects: [
          'Computer', 'Keyboard', 'Radio', 'Washing machine', 'Vacuum cleaner', 'Blender', 'Mixer', 'Coffee maker', 'Sofa', 'Shelf',
          'Fan', 'Air conditioner', 'Microwave', 'Oven', 'Sink', 'Bathtub', 'Shower', 'Suitcase', 'Flashlight', 'Binoculars',
          'Camera', 'Clock', 'Calculator', 'Thermometer', 'Scale', 'Compass', 'Acoustic guitar', 'Piano', 'Drum', 'Flute',
          'Accordion', 'Trumpet', 'Violin', 'Harmonica', 'Xylophone', 'Racket', 'Skateboard', 'Roller skates', 'Boxing glove', 'Helmet',
          'Vest', 'Belt', 'Tie', 'Bag', 'Umbrella', 'Cane', 'Crutch', 'Wheelchair', 'Sunglasses', 'Cap'
        ],
        actions: [
          'Cook', 'Drive', 'Ride a bike', 'Fish', 'Dive', 'Climb', 'Camp', 'Do yoga', 'Meditate', 'Take photos',
          'Film', 'Paint a picture', 'Sculpt', 'Knit', 'Sew', 'Embroider', 'Garden', 'Water plants', 'Prune a tree', 'Sweep',
          'Clean a window', 'Iron clothes', 'Fold clothes', 'Make the bed', 'Wash dishes', 'Dry dishes', 'Peel fruit', 'Grate cheese',
          'Knead bread', 'Row', 'Surf', 'Ski', 'Skate', 'Dribble', 'Throw', 'Block a goal', 'Serve in tennis',
          'Exercise', 'Applaud', 'Give a speech', 'Interview', 'Climb a wall', 'Do magic', 'Balance', 'Juggle',
          'Type', 'Make a phone call', 'Take a selfie', 'Pay a bill', 'Wait in line'
        ],
        animals: [
          'Eagle', 'Falcon', 'Owl', 'Bat', 'Camel', 'Llama', 'Alpaca', 'Bison', 'Moose', 'Coyote',
          'Cheetah', 'Leopard', 'Jaguar', 'Puma', 'Rhinoceros', 'Anaconda', 'Platypus', 'Dingo', 'Cockatoo', 'Emu',
          'Orca', 'Shark', 'Stingray', 'Squid', 'Seahorse', 'Sea urchin', 'Macaw', 'Peacock', 'Ostrich', 'Cassowary',
          'Albatross', 'Stork', 'Pelican', 'Ibis', 'Heron', 'Otter', 'Seal', 'Walrus', 'Sea lion', 'Dugong',
          'Mountain goat', 'Ibex', 'Antelope', 'Wildebeest', 'Buffalo', 'Boar', 'Badger', 'Raccoon', 'Ferret', 'Shrew'
        ],
        movies: [
          'Interstellar', 'Inception', 'Dune', 'Fight Club', 'Pulp Fiction', 'The Wolf of Wall Street', 'Joker', 'Parasite',
          'The Great Gatsby', 'Django Unchained', 'Inglourious Basterds', 'Whiplash', 'La La Land', 'Black Swan', 'The Shining',
          'Doctor Strange', 'Guardians of the Galaxy', 'Captain Marvel', 'Logan', 'John Wick', 'The Matrix Reloaded', 'The Matrix Revolutions',
          'The Revenant', 'Gravity', 'Mad Max: Fury Road', 'Blade Runner 2049', 'The Terminator', 'Back to the Future',
          'The Sixth Sense', 'The Truman Show', 'The Mummy', 'The Da Vinci Code', 'Angels & Demons', 'The Hunger Games', 'Twilight',
          'It', 'The Conjuring', 'Annabelle', 'The Nun', 'Saw', 'Get Out', 'Us', 'Split', 'Glass',
          'Fast & Furious', 'Top Gun', 'Mission: Impossible - Fallout', 'Kingsman', 'Sherlock Holmes', 'Man of Steel'
        ],
        professions: [
          'Programmer', 'Designer', 'Architect', 'Nutritionist', 'Psychologist', 'Psychiatrist', 'Physical therapist', 'Pharmacist',
          'Biologist', 'Chemist', 'Physicist', 'Geologist', 'Astronomer', 'Translator', 'Interpreter', 'Video editor', 'Film director',
          'Music producer', 'DJ', 'YouTuber', 'Influencer', 'Streamer', 'Advertiser', 'Copywriter', 'Systems analyst',
          'Administrator', 'Accountant', 'Economist', 'Real estate agent', 'Insurance broker', 'Investigator', 'Detective',
          'Forensic expert', 'Auditor', 'Consultant', 'Coach', 'Sports coach', 'Professional athlete', 'Surfer',
          'Football player', 'Fighter', 'Choreographer', 'Makeup artist', 'Esthetician', 'Tattoo artist', 'Illustrator', 'Animator',
          'Game designer', 'Screenwriter', 'Voice actor'
        ],
        celebrities: [...DEFAULT_WORDS_PT.normal.celebrities]
      },
      hard: {
        objects: [
          'Stethoscope', 'Scalpel', 'Microscope', 'Telescope', 'Sextant', 'Astrolabe', 'Stopwatch', 'Metronome', 'Tuner', 'Defibrillator',
          'Catapult', 'Periscope', 'Distiller', 'Centrifuge', 'Incubator', 'Autoclave', 'Spectrometer', 'Chromatograph', 'Calorimeter', 'Potentiometer',
          'Slingshot', 'Harpoon', 'Boomerang', 'Bow and arrow', 'Crossbow', 'Spear', 'Mace', 'Axe', 'Sickle', 'Trident',
          'Sandwich maker', 'Food dehydrator', 'Fermenter', 'Slow cooker', 'Wok', 'Tagine', 'Fondue set', 'Barbecue grill', 'Smoker', 'Still',
          'Theodolite', 'Altimeter', 'Barometer', 'Hygrometer', 'Anemometer', 'Rain gauge', 'Seismograph', 'Generator', 'Transformer', 'Oscilloscope'
        ],
        actions: [
          'Balance on a tightrope', 'Swallow fire', 'Escape from a straitjacket', 'Break bricks with your hand',
          'Walk on hot coals', 'Read braille', 'Use diving hand signals', 'Communicate in sign language', 'Use Morse code', 'Play an instrument with your feet',
          'Pull a tooth', 'Perform surgery', 'Resuscitate', 'Immobilize a fracture', 'Apply a tourniquet',
          'Fence', 'Practice tai chi', 'Do a karate strike', 'Throw a hammer', 'Olympic javelin throw',
          'Plow the land', 'Milk a cow', 'Shear a sheep', 'Shoe a horse', 'Tame an ox',
          'Weave on a loom', 'Blow glass', 'Forge metal', 'Shape pottery on a wheel', 'Restore a painting',
          'Take off in an airplane', 'Land a helicopter', 'Sail a sailboat', 'Operate a crane', 'Drive a train',
          'Rappel', 'Rock climb', 'Zipline', 'Free climb', 'Slackline',
          'Defuse a bomb', 'Negotiate with hostages', 'Skydive', 'Obstacle race', 'Olympic weightlifting'
        ],
        animals: [
          'Axolotl', 'Tarsier', 'Fossa', 'Quokka', 'Numbat', 'Kakapo', 'Tuatara', 'Okapi', 'Takin', 'Saiga',
          'Dugong', 'Manatee', 'Narwhal', 'Beluga', 'Sperm whale', 'Fin whale', 'Humpback whale', 'River dolphin', 'Porpoise', 'Franciscana',
          'Scorpion', 'Tarantula', 'Black mamba', 'Taipan', 'Coral snake', 'Viper', 'Rattlesnake', 'Boomslang', 'Giant squid', 'Blue-ringed octopus',
          'Pufferfish', 'Stonefish', 'Lionfish', 'Cone snail', 'Box jellyfish', 'Asian giant hornet', 'Bombardier beetle', 'Tiger mosquito', 'Bullet ant', 'Fire caterpillar',
          'Pangolin', 'Aye-aye', 'Slow loris', 'Three-banded armadillo', 'Giant armadillo', 'Giant anteater', 'Three-toed sloth', 'Pygmy hedgehog', 'Elephant shrew', 'Pine marten'
        ],
        movies: [
          'The Lighthouse', 'Hereditary', 'Midsommar', 'The Witch', 'The Killing of a Sacred Deer', 'The Lobster', 'Dogville', 'Antichrist',
          'Melancholia', 'The Tree of Life', 'Synecdoche, New York', 'Donnie Darko', 'The Double', 'Enemy', 'Ex Machina', 'Annihilation',
          'Coherence', 'Primer', 'Arrival', 'Moon', 'Solaris', 'Stalker', 'Mirror', 'Persona', 'The Seventh Seal', 'Memento',
          'Mulholland Drive', 'Blue Velvet', 'Eraserhead', 'The Fountain', 'The Well', 'The Platform', 'Climax', 'Irreversible',
          'Enter the Void', 'The Host', 'Oldboy', 'Memories of Murder', 'The Handmaiden', 'Drive', 'Only God Forgives', 'The Master',
          'Magnolia', 'There Will Be Blood', 'The Hunt', 'Neighbouring Sounds', 'Bacurau', 'The Wolf Behind the Door', 'The Second Mother'
        ],
        professions: [
          'Neurosurgeon', 'Oncologist', 'Anesthesiologist', 'Cardiologist', 'Orthopedist', 'Endocrinologist', 'Gynecologist', 'Urologist',
          'Radiologist', 'Pathologist', 'Epidemiologist', 'Bioinformatician', 'Data engineer', 'Data scientist', 'Aerospace engineer',
          'Nuclear engineer', 'Petroleum engineer', 'Cybersecurity specialist', 'Software architect', 'DevOps engineer', 'Product manager',
          'Scrum master', 'UX researcher', 'UX designer', 'UI designer', 'SEO specialist', 'Trader', 'Financial analyst',
          'Investment manager', 'Actuary', 'Diplomat', 'Consul', 'Ambassador', 'Museum curator', 'Art conservator', 'Archaeologist',
          'Paleontologist', 'Oceanographer', 'Meteorologist', 'Fighter pilot', 'Air traffic controller', 'Ship captain', 'Sommelier',
          'Master brewer', 'Executive chef', 'Perfumer', 'Automotive designer', 'Robotics engineer', 'AI specialist'
        ],
        celebrities: [...DEFAULT_WORDS_PT.hard.celebrities]
      }
    };

    const DEFAULT_WORDS_ES = {
      easy: {
        objects: [
          'Pelota', 'Vaso', 'Sombrero', 'Zapato', 'Libro', 'Silla', 'Mesa', 'Cama', 'Puerta', 'Ventana',
          'Lápiz', 'Borrador', 'Mochila', 'Gafas', 'Paraguas', 'Teléfono', 'Espejo', 'Cepillo', 'Peine', 'Tijeras',
          'Llave', 'Tenedor', 'Cuchara', 'Plato', 'Botella', 'Almohada', 'Manta', 'Toalla', 'Jabón', 'Globo',
          'Muñeca', 'Carrito', 'Palomitas', 'Helado', 'Pastel', 'Manzana', 'Banana', 'Uvas', 'Flor', 'Árbol',
          'Sol', 'Luna', 'Estrella', 'Nube', 'Lluvia', 'Armario', 'Gabinete', 'Refrigerador', 'Estufa', 'Televisión'
        ],
        actions: [
          'Correr', 'Saltar', 'Dormir', 'Comer', 'Beber', 'Reír', 'Llorar', 'Bailar', 'Cantar', 'Nadar',
          'Volar', 'Caminar', 'Sentarse', 'Levantarse', 'Abrazar', 'Jugar', 'Dibujar', 'Pintar', 'Leer', 'Escribir',
          'Escuchar', 'Gritar', 'Soplar', 'Respirar', 'Toser', 'Estornudar', 'Bostezar', 'Aplaudir', 'Saludar', 'Señalar',
          'Agarrar', 'Lanzar', 'Patear', 'Empujar', 'Jalar', 'Abrir', 'Cerrar', 'Lavar las manos', 'Cepillarse los dientes', 'Peinarse',
          'Ponerse los zapatos', 'Quitarse los zapatos', 'Encender la TV', 'Apagar la luz', 'Dar palmadas', 'Girar', 'Rodar', 'Besar', 'Sonreír', 'Pensar'
        ],
        animals: [
          'Perro', 'Gato', 'Pez', 'Pájaro', 'Conejo', 'Gallina', 'Vaca', 'Caballo', 'Cerdo', 'Oveja',
          'Pato', 'Rana', 'Mariposa', 'Hormiga', 'Abeja', 'Araña', 'Lombriz', 'Babosa', 'Caracol', 'Oruga',
          'Elefante', 'León', 'Jirafa', 'Mono', 'Cebra', 'Hipopótamo', 'Cocodrilo', 'Tortuga', 'Pingüino', 'Oso',
          'Lobo', 'Zorro', 'Ciervo', 'Ardilla', 'Ratón', 'Hámster', 'Iguana', 'Loro', 'Tucán', 'Flamenco',
          'Pelícano', 'Canguro', 'Koala', 'Panda', 'Delfín', 'Ballena', 'Pulpo', 'Cangrejo', 'Camarón', 'Estrella de mar'
        ],
        movies: [
          'Titanic', 'Avatar', 'El Rey León', 'Toy Story', 'Frozen', 'Shrek', 'Harry Potter', 'Spider-Man', 'Batman', 'Superman',
          'Jurassic Park', 'Los Vengadores', 'Star Wars', 'Minions', 'Cars', 'Buscando a Nemo', 'Intensamente', 'Aladdín',
          'Cenicienta', 'Blancanieves', 'Matrix', 'Gladiador', 'E.T.', 'King Kong', 'Godzilla', 'Pantera Negra', 'Iron Man',
          'Capitán América', 'Thor', 'Hulk', 'Deadpool', 'Venom', 'Transformers', 'Piratas del Caribe', 'Jumanji',
          'Misión: Imposible', '007', 'Rocky', 'Rambo', 'Karate Kid', 'Gremlins', 'Ghostbusters', 'Scooby-Doo', 'Madagascar',
          'Kung Fu Panda', 'Monsters, Inc.', 'Up', 'Encanto', 'Moana', 'Zootopia'
        ],
        professions: [
          'Médico', 'Dentista', 'Profesor', 'Policía', 'Bombero', 'Conductor', 'Cocinero', 'Mesero', 'Panadero', 'Cartero',
          'Mecánico', 'Ingeniero', 'Abogado', 'Enfermero', 'Veterinario', 'Piloto', 'Peluquero', 'Barbero', 'Actor', 'Cantante',
          'Bailarín', 'Personal de limpieza', 'Guardia de seguridad', 'Agricultor', 'Pescador', 'Electricista', 'Albañil', 'Pintor', 'Jardinero',
          'Taxista', 'Repartidor', 'Vendedor', 'Cajero', 'Secretaria', 'Recepcionista', 'Entrenador', 'Entrenador personal', 'Niñera',
          'Cuidador', 'Conserje', 'Basurero', 'Gasolinero', 'Conductor de autobús', 'Conductor de camión', 'Guía turístico', 'Fotógrafo',
          'Reportero', 'Locutor', 'Operador de caja', 'Instructor'
        ],
        celebrities: [...DEFAULT_WORDS_PT.easy.celebrities]
      },
      normal: {
        objects: [
          'Computadora', 'Teclado', 'Radio', 'Lavadora', 'Aspiradora', 'Licuadora', 'Batidora', 'Cafetera', 'Sofá', 'Estantería',
          'Ventilador', 'Aire acondicionado', 'Microondas', 'Horno', 'Fregadero', 'Bañera', 'Ducha', 'Maleta', 'Linterna', 'Binoculares',
          'Cámara', 'Reloj', 'Calculadora', 'Termómetro', 'Báscula', 'Brújula', 'Guitarra', 'Piano', 'Tambor', 'Flauta',
          'Acordeón', 'Trompeta', 'Violín', 'Armónica', 'Xilófono', 'Raqueta', 'Patineta', 'Patines', 'Guante de boxeo', 'Casco',
          'Chaleco', 'Cinturón', 'Corbata', 'Bolsa', 'Paraguas', 'Bastón', 'Muleta', 'Silla de ruedas', 'Gafas de sol', 'Gorra'
        ],
        actions: [
          'Cocinar', 'Conducir', 'Andar en bicicleta', 'Pescar', 'Bucear', 'Escalar', 'Acampar', 'Hacer yoga', 'Meditar', 'Fotografiar',
          'Filmar', 'Pintar un cuadro', 'Esculpir', 'Tejer', 'Coser', 'Bordar', 'Hacer jardinería', 'Regar plantas', 'Podar un árbol', 'Barrer',
          'Limpiar una ventana', 'Planchar ropa', 'Doblar ropa', 'Hacer la cama', 'Lavar los platos', 'Secar los platos', 'Pelar fruta', 'Rallar queso',
          'Amasar pan', 'Remar', 'Surfear', 'Esquiar', 'Patinar', 'Driblar', 'Lanzar', 'Atajar un gol', 'Sacar en tenis',
          'Hacer ejercicio', 'Aplaudir', 'Dar un discurso', 'Entrevistar', 'Escalar un muro', 'Hacer magia', 'Equilibrarse', 'Hacer malabares',
          'Teclear', 'Llamar por teléfono', 'Tomarse una selfie', 'Pagar una cuenta', 'Hacer fila'
        ],
        animals: [
          'Águila', 'Halcón', 'Búho', 'Murciélago', 'Camello', 'Llama', 'Alpaca', 'Bisonte', 'Alce', 'Coyote',
          'Guepardo', 'Leopardo', 'Jaguar', 'Puma', 'Rinoceronte', 'Anaconda', 'Ornitorrinco', 'Dingo', 'Cacatúa', 'Emú',
          'Orca', 'Tiburón', 'Raya', 'Calamar', 'Caballito de mar', 'Erizo de mar', 'Guacamayo', 'Pavo real', 'Avestruz', 'Casuario',
          'Albatros', 'Cigüeña', 'Pelícano', 'Ibis', 'Garza', 'Nutria', 'Foca', 'Morsa', 'León marino', 'Dugongo',
          'Cabra montés', 'Íbice', 'Antílope', 'Ñu', 'Búfalo', 'Jabalí', 'Tejón', 'Mapache', 'Hurón', 'Musaraña'
        ],
        movies: [
          'Interestelar', 'Origen', 'Duna', 'El club de la pelea', 'Pulp Fiction', 'El lobo de Wall Street', 'Joker', 'Parásitos',
          'El gran Gatsby', 'Django sin cadenas', 'Bastardos sin gloria', 'Whiplash', 'La La Land', 'El cisne negro', 'El resplandor',
          'Doctor Strange', 'Guardianes de la Galaxia', 'Capitana Marvel', 'Logan', 'John Wick', 'Matrix recargado', 'Matrix revoluciones',
          'El renacido', 'Gravedad', 'Mad Max: Furia en el camino', 'Blade Runner 2049', 'Terminator', 'Volver al futuro',
          'El sexto sentido', 'El show de Truman', 'La momia', 'El código Da Vinci', 'Ángeles y demonios', 'Los juegos del hambre', 'Crepúsculo',
          'It', 'El conjuro', 'Annabelle', 'La monja', 'Saw', '¡Huye!', 'Nosotros', 'Fragmentado', 'Glass',
          'Rápidos y furiosos', 'Top Gun', 'Misión: Imposible - Repercusión', 'Kingsman', 'Sherlock Holmes', 'El hombre de acero'
        ],
        professions: [
          'Programador', 'Diseñador', 'Arquitecto', 'Nutricionista', 'Psicólogo', 'Psiquiatra', 'Fisioterapeuta', 'Farmacéutico',
          'Biólogo', 'Químico', 'Físico', 'Geólogo', 'Astrónomo', 'Traductor', 'Intérprete', 'Editor de video', 'Director de cine',
          'Productor musical', 'DJ', 'Youtuber', 'Influencer', 'Streamer', 'Publicista', 'Redactor', 'Analista de sistemas',
          'Administrador', 'Contador', 'Economista', 'Agente inmobiliario', 'Corredor de seguros', 'Investigador', 'Detective',
          'Perito criminal', 'Auditor', 'Consultor', 'Coach', 'Entrenador deportivo', 'Atleta profesional', 'Surfista',
          'Futbolista', 'Luchador', 'Coreógrafo', 'Maquillador', 'Esteticista', 'Tatuador', 'Ilustrador', 'Animador',
          'Diseñador de videojuegos', 'Guionista', 'Actor de doblaje'
        ],
        celebrities: [...DEFAULT_WORDS_PT.normal.celebrities]
      },
      hard: {
        objects: [
          'Estetoscopio', 'Bisturí', 'Microscopio', 'Telescopio', 'Sextante', 'Astrolabio', 'Cronómetro', 'Metrónomo', 'Afinador', 'Desfibrilador',
          'Catapulta', 'Periscopio', 'Destilador', 'Centrífuga', 'Incubadora', 'Autoclave', 'Espectrómetro', 'Cromatógrafo', 'Calorímetro', 'Potenciómetro',
          'Tirachinas', 'Arpón', 'Bumerán', 'Arco y flecha', 'Ballesta', 'Lanza', 'Maza', 'Hacha', 'Hoz', 'Tridente',
          'Sandwichera', 'Deshidratador', 'Fermentador', 'Olla de cocción lenta', 'Wok', 'Tajín', 'Fondue', 'Parrilla', 'Ahumador', 'Alambique',
          'Teodolito', 'Altímetro', 'Barómetro', 'Higrómetro', 'Anemómetro', 'Pluviómetro', 'Sismógrafo', 'Generador', 'Transformador', 'Osciloscopio'
        ],
        actions: [
          'Equilibrarse en la cuerda floja', 'Tragar fuego', 'Escapar de una camisa de fuerza', 'Romper ladrillos con la mano',
          'Caminar sobre brasas', 'Leer braille', 'Hacer señales de buceo', 'Comunicarse en lengua de señas', 'Usar código morse', 'Tocar un instrumento con los pies',
          'Sacar un diente', 'Hacer cirugía', 'Reanimar', 'Inmovilizar una fractura', 'Aplicar un torniquete',
          'Hacer esgrima', 'Practicar tai chi', 'Dar un golpe de karate', 'Lanzamiento de martillo', 'Lanzamiento olímpico de jabalina',
          'Arar la tierra', 'Ordeñar una vaca', 'Esquilar una oveja', 'Herrar un caballo', 'Domar un buey',
          'Tejer en telar', 'Soplar vidrio', 'Forjar metal', 'Moldear cerámica en torno', 'Restaurar una pintura',
          'Despegar un avión', 'Aterrizar un helicóptero', 'Navegar un velero', 'Operar una grúa', 'Conducir un tren',
          'Hacer rápel', 'Escalar roca', 'Tirolesa', 'Escalada libre', 'Hacer slackline',
          'Desactivar una bomba', 'Negociar rehenes', 'Hacer paracaidismo', 'Carrera de obstáculos', 'Levantamiento de pesas olímpico'
        ],
        animals: [
          'Ajolote', 'Tarsero', 'Fosa', 'Quokka', 'Numbat', 'Kakapo', 'Tuátara', 'Okapi', 'Takin', 'Saiga',
          'Dugongo', 'Manatí', 'Narval', 'Beluga', 'Cachalote', 'Rorcual', 'Ballena jorobada', 'Delfín de río', 'Marsopa', 'Franciscana',
          'Escorpión', 'Tarántula', 'Mamba negra', 'Taipán', 'Serpiente coral', 'Víbora', 'Cascabel', 'Boomslang', 'Calamar gigante', 'Pulpo de anillos azules',
          'Pez globo', 'Pez piedra', 'Pez león', 'Caracol cono', 'Medusa de caja', 'Avispón asiático', 'Escarabajo bombardero', 'Mosquito tigre', 'Hormiga bala', 'Oruga de fuego',
          'Pangolín', 'Aye-aye', 'Loris lento', 'Armadillo de tres bandas', 'Armadillo gigante', 'Oso hormiguero gigante', 'Perezoso de tres dedos', 'Erizo pigmeo', 'Musaraña elefante', 'Marta'
        ],
        movies: [
          'El faro', 'Hereditary', 'Midsommar', 'La bruja', 'El sacrificio del ciervo sagrado', 'La langosta', 'Dogville', 'Anticristo',
          'Melancolía', 'El árbol de la vida', 'Sinécdoque, Nueva York', 'Donnie Darko', 'El doble', 'Enemy', 'Ex Machina', 'Aniquilación',
          'Coherence', 'Primer', 'La llegada', 'Moon', 'Solaris', 'Stalker', 'El espejo', 'Persona', 'El séptimo sello', 'Memento',
          'Mulholland Drive', 'Terciopelo azul', 'Eraserhead', 'La fuente de la vida', 'El pozo', 'La plataforma', 'Climax', 'Irreversible',
          'Enter the Void', 'El huésped', 'Oldboy', 'Memorias de un asesino', 'La doncella', 'Drive', 'Only God Forgives', 'The Master',
          'Magnolia', 'Pozos de ambición', 'La cacería', 'Sonidos de barrio', 'Bacurau', 'El lobo detrás de la puerta', 'Una segunda madre'
        ],
        professions: [
          'Neurocirujano', 'Oncólogo', 'Anestesista', 'Cardiólogo', 'Ortopedista', 'Endocrinólogo', 'Ginecólogo', 'Urólogo',
          'Radiólogo', 'Patólogo', 'Epidemiólogo', 'Bioinformático', 'Ingeniero de datos', 'Científico de datos', 'Ingeniero aeroespacial',
          'Ingeniero nuclear', 'Ingeniero petrolero', 'Especialista en ciberseguridad', 'Arquitecto de software', 'Ingeniero DevOps', 'Gerente de producto',
          'Scrum Master', 'Investigador UX', 'Diseñador UX', 'Diseñador UI', 'Especialista en SEO', 'Trader', 'Analista financiero',
          'Gestor de inversiones', 'Actuario', 'Diplomático', 'Cónsul', 'Embajador', 'Curador de museo', 'Restaurador de arte', 'Arqueólogo',
          'Paleontólogo', 'Oceanógrafo', 'Meteorólogo', 'Piloto de combate', 'Controlador aéreo', 'Capitán de barco', 'Sommelier',
          'Maestro cervecero', 'Chef ejecutivo', 'Perfumista', 'Diseñador automotriz', 'Ingeniero robótico', 'Especialista en IA'
        ],
        celebrities: [...DEFAULT_WORDS_PT.hard.celebrities]
      }
    };

    const CHALLENGES_EN = [
      'Act it out while sitting down', 'Act it out while crouching', 'Act it out while jumping', 'Act it out while walking in place',
      'Act it out with one hand behind your back', 'Act it out using only one hand', 'Act it out with your arms stretched out',
      'Act it out while spinning slowly', 'Act it out as if you were in slow motion', 'Act it out as if you were sped up (super fast)',
      'Act it out exaggerating A LOT', 'Act it out barely moving', 'Act it out as if you were scared',
      'Act it out as if you were very happy', 'Act it out as if you were angry', 'Act it out as if you were tired',
      'Act it out as if you were confused', 'Act it out as if you were panicking', 'Act it out like a robot',
      'Act it out like a cartoon character', 'Act it out like an elderly person', 'Act it out like a child',
      'Act it out like a superhero', 'Act it out like a villain', 'Act it out like an animal',
      'Act it out as if you were on the moon (low gravity)', 'Act it out as if you were underwater', 'Act it out as if you were invisible',
      'Act it out as if you were giant', 'Act it out as if you were very tiny', 'You cannot use your hands',
      'You cannot use your arms', 'You cannot move from your spot', 'You cannot repeat the same gesture', 'You cannot point at anything',
      'You cannot use your face (no facial expressions)', 'You can only use your face (no body)', 'You must start from the end of the action',
      'You must do everything backwards (from end to beginning)', 'You must freeze completely every 3 seconds',
      'Act it out as if you were in an action movie', 'Act it out as if it were a comedy',
      'Act it out as if you were in dramatic slow motion', 'Act it out as if you were in a dream',
      'Act it out as if you were very cold', 'Act it out as if you were very hot',
      'Act it out as if you were in the dark', 'Act it out as if you were on a stage',
      'Act it out as if a huge audience were watching you', 'Act it out as if it were your last chance to win the game'
    ];

    const CHALLENGES_ES = [
      'Haz la mímica sentado', 'Haz la mímica agachado', 'Haz la mímica saltando', 'Haz la mímica caminando en el lugar',
      'Haz la mímica con una mano detrás de la espalda', 'Haz la mímica usando solo una mano', 'Haz la mímica con los brazos estirados',
      'Haz la mímica girando lentamente', 'Haz la mímica como si estuvieras en cámara lenta', 'Haz la mímica como si estuvieras acelerado (super rápido)',
      'Haz la mímica exagerando MUCHO', 'Haz la mímica casi sin moverte', 'Haz la mímica como si tuvieras miedo',
      'Haz la mímica como si estuvieras muy feliz', 'Haz la mímica como si estuvieras enojado', 'Haz la mímica como si estuvieras cansado',
      'Haz la mímica como si estuvieras confundido', 'Haz la mímica como si estuvieras en pánico', 'Haz la mímica como un robot',
      'Haz la mímica como un personaje de caricatura', 'Haz la mímica como una persona mayor', 'Haz la mímica como un niño',
      'Haz la mímica como un superhéroe', 'Haz la mímica como un villano', 'Haz la mímica como un animal',
      'Haz la mímica como si estuvieras en la luna (baja gravedad)', 'Haz la mímica como si estuvieras bajo el agua', 'Haz la mímica como si fueras invisible',
      'Haz la mímica como si fueras gigante', 'Haz la mímica como si fueras muy pequeño', 'No puedes usar las manos',
      'No puedes usar los brazos', 'No puedes moverte del lugar', 'No puedes repetir el mismo gesto', 'No puedes señalar nada',
      'No puedes usar la cara (sin expresiones faciales)', 'Solo puedes usar la cara (sin cuerpo)', 'Tienes que empezar por el final de la acción',
      'Tienes que hacer todo al revés (de atrás hacia adelante)', 'Tienes que detenerte por completo cada 3 segundos',
      'Haz la mímica como si estuvieras en una película de acción', 'Haz la mímica como si fuera una comedia',
      'Haz la mímica como si estuvieras en cámara lenta dramática', 'Haz la mímica como si estuvieras en un sueño',
      'Haz la mímica como si tuvieras mucho frío', 'Haz la mímica como si tuvieras mucho calor',
      'Haz la mímica como si estuvieras en la oscuridad', 'Haz la mímica como si estuvieras en un escenario',
      'Haz la mímica como si te estuviera mirando un público enorme', 'Haz la mímica como si fuera la última oportunidad de ganar el juego'
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
          en: clone(DEFAULT_WORDS_EN),
          es: clone(DEFAULT_WORDS_ES)
        },
        challenges: {
          pt: clone(CHALLENGES_PT),
          en: clone(CHALLENGES_EN),
          es: clone(CHALLENGES_ES)
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
        description: pack?.description || '',
        version: pack?.version || '',
        author: pack?.author || '',
        source: pack?.source || 'local',
        editable: pack?.editable !== false,
        enabled: pack?.enabled !== false,
        installedAt: pack?.installedAt || '',
        license: pack?.license || null,
        challengeOverrides: (pack?.challengeOverrides && typeof pack.challengeOverrides === 'object') ? pack.challengeOverrides : {},
        words: normalizedWords,
        challenges: normalizedChallenges
      };
    }

    function getLocalizedText(value, fallback = '') {
      if (!value) return fallback;
      if (typeof value === 'string') return value;
      return value[currentLanguage] || value[DEFAULT_LANGUAGE] || value.pt || Object.values(value)[0] || fallback;
    }

    function getPackDisplayName(pack) {
      return getLocalizedText(pack?.name, 'Pack');
    }

    function getPackWordCount(pack, locale = currentLanguage) {
      const bank = normalizeWordBank(pack?.words?.[locale] || {});
      let count = 0;
      DIFFICULTY_KEYS.forEach(diff => {
        CATEGORY_KEYS.forEach(cat => {
          count += bank[diff][cat].length;
        });
      });
      return count;
    }

    function getPackTotalContentCount(pack) {
      const locales = new Set([
        ...Object.keys(pack?.words || {}),
        ...Object.keys(pack?.challenges || {})
      ]);
      let count = 0;
      locales.forEach(locale => {
        count += getPackWordCount(pack, locale);
        count += normalizeChallenges(pack?.challenges?.[locale] || []).length;
      });
      return count;
    }

    function canonicalize(value) {
      if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
      if (value && typeof value === 'object') {
        return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(',')}}`;
      }
      return JSON.stringify(value);
    }

    function bytesToBase64Url(bytes) {
      const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
      return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    }

    function base64UrlToBytes(value) {
      const normalized = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
      const binary = atob(padded);
      return Uint8Array.from(binary, char => char.charCodeAt(0));
    }

    async function sha256Base64Url(value) {
      if (!crypto?.subtle) throw new Error(t('packErrors.cryptoUnavailable'));
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
      return bytesToBase64Url(new Uint8Array(digest));
    }

    function buildPackSignedPayload(userId, packId, contentHash) {
      return `${PACK_SIGNATURE_CONTEXT}\nuser_id=${userId}\npack_id=${packId}\ncontent_sha256=${contentHash}`;
    }

    async function verifyPackSignature(userId, packId, contentHash, signature) {
      if (!crypto?.subtle) throw new Error(t('packErrors.cryptoUnavailable'));
      const publicKey = await crypto.subtle.importKey(
        'jwk',
        PACK_SIGNING_PUBLIC_KEY,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['verify']
      );
      return crypto.subtle.verify(
        { name: 'ECDSA', hash: 'SHA-256' },
        publicKey,
        base64UrlToBytes(signature),
        new TextEncoder().encode(buildPackSignedPayload(userId, packId, contentHash))
      );
    }

    function mergeUniqueStrings(primary = [], secondary = []) {
      return [...new Set([...(primary || []), ...(secondary || [])].map(item => String(item).trim()).filter(Boolean))];
    }

    function mergeWordBanks(baseBank = {}, savedBank = {}) {
      const normalizedBase = normalizeWordBank(baseBank);
      const normalizedSaved = normalizeWordBank(savedBank);
      const merged = createEmptyWordBank();

      DIFFICULTY_KEYS.forEach(diff => {
        CATEGORY_KEYS.forEach(cat => {
          merged[diff][cat] = mergeUniqueStrings(normalizedBase[diff][cat], normalizedSaved[diff][cat]);
        });
      });

      return merged;
    }

    function mergeCorePack(savedPack = {}) {
      const defaultCore = normalizePack(createCorePack());
      const merged = {
        ...defaultCore,
        ...savedPack,
        id: CORE_PACK_ID,
        source: 'builtin',
        editable: savedPack?.editable !== false,
        enabled: savedPack?.enabled !== false,
        words: {},
        challenges: {}
      };

      const locales = new Set([
        ...Object.keys(defaultCore.words || {}),
        ...Object.keys(savedPack.words || {}),
        ...Object.keys(defaultCore.challenges || {}),
        ...Object.keys(savedPack.challenges || {})
      ]);

      locales.forEach(locale => {
        merged.words[locale] = mergeWordBanks(defaultCore.words?.[locale], savedPack.words?.[locale]);
        merged.challenges[locale] = savedPack.challengeOverrides?.[locale]
          ? normalizeChallenges(savedPack.challenges?.[locale] || [])
          : mergeUniqueStrings(defaultCore.challenges?.[locale], savedPack.challenges?.[locale]);
      });

      return normalizePack(merged);
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
          const normalizedPacks = saved.packs.map(pack => (
            pack?.id === CORE_PACK_ID ? mergeCorePack(pack) : normalizePack(pack)
          ));
          if (!normalizedPacks.some(pack => pack.id === CORE_PACK_ID)) {
            normalizedPacks.unshift(normalizePack(createCorePack()));
          }
          return {
            version: 1,
            packs: normalizedPacks
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

    function getCorePack() {
      return contentModel.packs.find(pack => pack.id === CORE_PACK_ID) || normalizePack(createCorePack());
    }

    function getPremiumPacks(options = {}) {
      const { enabledOnly = true } = options;
      return (contentModel.packs || []).filter(pack => (
        pack.source === 'downloaded' && (!enabledOnly || pack.enabled !== false)
      ));
    }

    function getPremiumCategoryToken(packId) {
      return `pack:${packId}`;
    }

    function getPackIdFromCategoryToken(token) {
      return String(token || '').startsWith('pack:') ? String(token).slice(5) : '';
    }

    function getPremiumPackByToken(token) {
      const packId = getPackIdFromCategoryToken(token);
      if (!packId) return null;
      return getPremiumPacks().find(pack => pack.id === packId) || null;
    }

    function isPremiumCategoryToken(token) {
      return Boolean(getPremiumPackByToken(token));
    }

    function isValidCategoryToken(token) {
      return CATEGORY_KEYS.includes(token) || isPremiumCategoryToken(token);
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
      const corePack = getCorePack();
      let list = normalizeChallenges(corePack.challenges?.[locale] || []);
      if (!list.length && !corePack.challengeOverrides?.[locale]) {
        list = normalizeChallenges(createCorePack().challenges?.[locale] || []);
      }
      getPremiumPacks().forEach(pack => {
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

    async function buildInstalledPackFromEnvelope(envelope) {
      if (!envelope || typeof envelope !== 'object') throw new Error(t('packErrors.invalidJson'));
      if (envelope.schema !== WORD_PACK_SCHEMA) throw new Error(t('packErrors.invalidSchema'));
      if (envelope.user_id !== appUserId) throw new Error(t('packErrors.invalidUser'));
      if (!envelope.pack_id || typeof envelope.pack_id !== 'string') throw new Error(t('packErrors.invalidPackId'));
      if (envelope.pack_id === CORE_PACK_ID) throw new Error(t('packErrors.reservedPackId'));
      if (envelope.signature_algorithm !== PACK_SIGNATURE_ALGORITHM) throw new Error(t('packErrors.invalidAlgorithm'));
      if (!envelope.signature || typeof envelope.signature !== 'string') throw new Error(t('packErrors.invalidSignature'));

      const content = envelope.content || {};
      const contentHash = await sha256Base64Url(canonicalize(content));
      if (envelope.content_sha256 && envelope.content_sha256 !== contentHash) {
        throw new Error(t('packErrors.invalidContentHash'));
      }

      const isSignatureValid = await verifyPackSignature(envelope.user_id, envelope.pack_id, contentHash, envelope.signature);
      if (!isSignatureValid) throw new Error(t('packErrors.invalidSignature'));

      const pack = normalizePack({
        id: envelope.pack_id,
        name: content.name || envelope.pack_id,
        description: content.description || '',
        version: content.version || '',
        author: content.author || '',
        source: 'downloaded',
        editable: false,
        enabled: true,
        installedAt: new Date().toISOString(),
        license: {
          userId: envelope.user_id,
          signature: envelope.signature,
          algorithm: envelope.signature_algorithm,
          contentSha256: contentHash
        },
        words: content.words || {},
        challenges: content.challenges || {}
      });

      if (getPackTotalContentCount(pack) === 0) throw new Error(t('packErrors.emptyPack'));
      return pack;
    }

    async function parsePackFile(file) {
      if (!file) throw new Error(t('packErrors.fileRequired'));
      try {
        return JSON.parse(await file.text());
      } catch (e) {
        throw new Error(t('packErrors.invalidJson'));
      }
    }

    function getCategoryLabel(category, options = {}) {
      const { singular = false, withIcon = false } = options;
      const premiumPack = getPremiumPackByToken(category);
      if (premiumPack) {
        const premiumLabel = getPackDisplayName(premiumPack);
        return withIcon ? `⭐ ${premiumLabel}` : premiumLabel;
      }
      const label = t(`category.${category}.${singular ? 'singular' : 'plural'}`);
      return withIcon ? `${CATEGORY_ICONS[category] || ''} ${label}`.trim() : label;
    }

    function getDifficultyLabel(diff, withIcon = false) {
      const label = t(`difficulty.${diff}`);
      return withIcon ? `${DIFFICULTY_ICONS[diff] || ''} ${label}`.trim() : label;
    }

    function getDefaultCoreChallenges(locale = currentLanguage) {
      return normalizeChallenges(createCorePack().challenges?.[locale] || []);
    }

    function getCoreWordsForCategory(category, diff = 'easy', locale = currentLanguage) {
      const bank = normalizeWordBank(getCorePack().words?.[locale] || {});
      return bank[diff]?.[category] || [];
    }

    function getPremiumWordsForPack(pack, diff = 'easy', locale = currentLanguage) {
      const bank = normalizeWordBank(pack?.words?.[locale] || {});
      let words = [];
      CATEGORY_KEYS.forEach(category => {
        words = ensureUniqueWords([...words, ...(bank[diff]?.[category] || [])]);
      });
      return words;
    }

    function countWordsForCategoryToken(category, diff = 'easy') {
      const premiumPack = getPremiumPackByToken(category);
      if (premiumPack) return getPremiumWordsForPack(premiumPack, diff).length;
      if (CATEGORY_KEYS.includes(category)) return getCoreWordsForCategory(category, diff).length;
      return 0;
    }

    function countWordsForSelectedCategories(categories, diff = 'easy') {
      return (categories || []).reduce((total, category) => total + countWordsForCategoryToken(category, diff), 0);
    }

    function normalizeSelectedCategories(categories = []) {
      const selected = ensureUniqueWords(categories.map(category => String(category))).filter(isValidCategoryToken);
      return selected.length ? selected : getDefaultSelectedCategories();
    }

    function getDefaultTeamName(team, language = currentLanguage) {
      return t(`teams.default${team}`, {}, language);
    }

    function getDefaultPlayerName(number, language = currentLanguage) {
      return t('players.defaultName', { number }, language);
    }

    function isDefaultTeamName(name, team) {
      return SUPPORTED_LANGUAGES.some(language => name === getDefaultTeamName(team, language));
    }

    function getDefaultSelectedCategories() {
      return ['objects', 'actions', 'animals'];
    }

    function formatCount(count, singularKey, pluralKey) {
      return `${count} ${t(count === 1 ? singularKey : pluralKey)}`;
    }

    function getQuickGamePlayerCount(config) {
      return config.mode === 'teams'
        ? (config.teams.A?.length || 0) + (config.teams.B?.length || 0)
        : (config.players?.length || 0);
    }

    function getQuickGameSummary(config) {
      const normalized = normalizeQuickGameConfig(config);
      const gameTypeLabel = t(`setup.${normalized.gameType === 'drawing' ? 'gameTypeDrawingName' : 'gameTypeMimeName'}`);
      const modeLabel = normalized.mode === 'teams' ? t('setup.modeTeamsName') : t('setup.modeFfaName');
      const playerCountLabel = formatCount(getQuickGamePlayerCount(normalized), 'common.playerSingular', 'common.playerPlural');
      const categoriesLabel = normalized.selectedCategories.map(category => getCategoryLabel(category)).join(', ');
      const roundsLabel = formatCount(normalized.rounds, 'common.roundSingular', 'common.roundPlural');
      return [gameTypeLabel, modeLabel, playerCountLabel, categoriesLabel, roundsLabel].join(' | ');
    }

    function renderQuickGameSummary() {
      const summary = document.getElementById('quick-game-summary');
      if (!summary) return;
      summary.textContent = getQuickGameSummary(loadQuickGameConfig());
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
      gameType: 'mime',
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
      selectedCategories: getDefaultSelectedCategories()
    };

    const DRAWING_TOOL_CONFIG = {
      'pen-thick': { color: '#111827', width: 12 },
      'pen-thin': { color: '#111827', width: 4 },
      'eraser-thick': { color: '#ffffff', width: 32 },
      'eraser-thin': { color: '#ffffff', width: 12 }
    };

    const drawingState = {
      canvas: null,
      ctx: null,
      activeTool: 'pen-thick',
      isDrawing: false,
      lastX: 0,
      lastY: 0
    };

    let wbDiff = 'easy';
    let wbCat = 'objects';
    let wbPreviewPackId = '';

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

      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.title = t(el.dataset.i18nTitle);
      });

      document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
      });

      const languageSelect = document.getElementById('language-select');
      if (languageSelect) languageSelect.value = currentLanguage;
    }

    function refreshLocalizedUI() {
      applyTranslations();
      refreshGameTypeUI();
      renderQuickGameSummary();
      updateTeamLabels();
      renderCategorySelection();
      renderSetupPlayers();
      updateDiffWordCount();
      syncWBDiffUI();
      syncWBCatUI();
      renderWordBank();
      renderChallengeBank();
      renderInstalledPacks();
      renderPackPreview();
      renderUserId();
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
      document.body.dataset.activeScreen = screen;
      if (screen === 'wordbank') {
        wbDiff = 'easy';
        wbCat = 'objects';
        syncWBDiffUI();
        syncWBCatUI();
        renderWordBank();
        renderChallengeBank();
        renderInstalledPacks();
        renderPackPreview();
      }
      if (screen === 'setup') {
        refreshGameTypeUI();
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

    function renderUserId() {
      const input = document.getElementById('user-id-display');
      if (input) input.value = appUserId;
    }

    async function copyUserId() {
      try {
        await navigator.clipboard.writeText(appUserId);
        showNotif(t('notifications.userIdCopied'));
      } catch (e) {
        const input = document.getElementById('user-id-display');
        input?.select();
        document.execCommand?.('copy');
        showNotif(t('notifications.userIdCopied'));
      }
    }

    function setPackInstallStatus(message = '', type = '') {
      const el = document.getElementById('pack-install-status');
      if (!el) return;
      el.textContent = message;
      el.classList.remove('success', 'error');
      if (type) el.classList.add(type);
    }

    function renderInstalledPacks() {
      const container = document.getElementById('installed-packs-list');
      if (!container) return;
      const installedPacks = (contentModel.packs || []).filter(pack => pack.source === 'downloaded');
      container.innerHTML = '';

      if (!installedPacks.length) {
        const empty = document.createElement('div');
        empty.className = 'installed-pack-empty';
        empty.textContent = t('wordbank.noInstalledPacks');
        container.appendChild(empty);
        return;
      }

      installedPacks.forEach(pack => {
        const row = document.createElement('div');
        row.className = 'installed-pack-row';
        if (pack.id === wbPreviewPackId) row.classList.add('selected');
        row.dataset.packPreviewId = pack.id;
        const name = getPackDisplayName(pack);
        const wordsCount = getPackWordCount(pack);
        const version = pack.version ? ` · ${t('dynamic.packVersion', { version: pack.version })}` : '';
        const info = document.createElement('div');
        const nameEl = document.createElement('div');
        nameEl.className = 'installed-pack-name';
        nameEl.textContent = name;
        const metaEl = document.createElement('div');
        metaEl.className = 'installed-pack-meta';
        metaEl.textContent = `${t('dynamic.packWordsSummary', { count: wordsCount })}${version}`;
        info.append(nameEl, metaEl);

        const actions = document.createElement('div');
        actions.className = 'installed-pack-actions';
        const toggleButton = document.createElement('button');
        toggleButton.className = 'btn btn-ghost btn-sm';
        toggleButton.dataset.action = 'toggle-installed-pack';
        toggleButton.dataset.packId = pack.id;
        toggleButton.textContent = pack.enabled === false ? t('wordbank.packDisabled') : t('wordbank.packEnabled');
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-ghost btn-sm';
        removeButton.dataset.action = 'remove-installed-pack';
        removeButton.dataset.packId = pack.id;
        removeButton.textContent = t('wordbank.removePack');
        actions.append(toggleButton, removeButton);
        row.append(info, actions);
        container.appendChild(row);
      });
    }

    function getInstalledPackById(packId) {
      return (contentModel.packs || []).find(pack => pack.id === packId && pack.source === 'downloaded') || null;
    }

    function getPackPreviewWordEntries(pack, diff = wbDiff, locale = currentLanguage) {
      const bank = normalizeWordBank(pack?.words?.[locale] || {});
      const entries = [];
      CATEGORY_KEYS.forEach(category => {
        (bank[diff]?.[category] || []).forEach(word => {
          entries.push({ word, category });
        });
      });
      return entries;
    }

    function renderPreviewItems(container, entries, emptyMessage, formatter) {
      if (!container) return;
      container.innerHTML = '';
      if (!entries.length) {
        const empty = document.createElement('div');
        empty.className = 'pack-preview-empty';
        empty.textContent = emptyMessage;
        container.appendChild(empty);
        return;
      }

      entries.forEach(entry => {
        const item = document.createElement('span');
        item.className = 'pack-preview-item';
        item.textContent = formatter(entry);
        container.appendChild(item);
      });
    }

    function renderPackPreview() {
      const subtitle = document.getElementById('pack-preview-subtitle');
      const diffLabel = document.getElementById('pack-preview-diff-label');
      const wordsContainer = document.getElementById('pack-preview-words');
      const challengesContainer = document.getElementById('pack-preview-challenges');
      if (!subtitle || !wordsContainer || !challengesContainer) return;

      if (diffLabel) diffLabel.textContent = getDifficultyLabel(wbDiff, true);
      const pack = getInstalledPackById(wbPreviewPackId);
      if (!pack) {
        subtitle.textContent = t('wordbank.packPreviewPrompt');
        renderPreviewItems(wordsContainer, [], t('wordbank.packPreviewNoWords'), item => item);
        renderPreviewItems(challengesContainer, [], t('wordbank.packPreviewNoChallenges'), item => item);
        return;
      }

      subtitle.textContent = t('wordbank.packPreviewSelected', { name: getPackDisplayName(pack) });
      const wordEntries = getPackPreviewWordEntries(pack);
      const challenges = normalizeChallenges(pack.challenges?.[currentLanguage] || []);
      renderPreviewItems(
        wordsContainer,
        wordEntries,
        t('wordbank.packPreviewNoWords'),
        entry => `${CATEGORY_ICONS[entry.category] || ''} ${entry.word}`.trim()
      );
      renderPreviewItems(
        challengesContainer,
        challenges,
        t('wordbank.packPreviewNoChallenges'),
        challenge => `🎯 ${challenge}`
      );
    }

    function selectPreviewPack(packId) {
      wbPreviewPackId = packId;
      renderInstalledPacks();
      renderPackPreview();
    }

    function getDonationUrl(platform) {
      return DONATION_LINKS[platform] || '';
    }

    function isDonationUrlConfigured(url) {
      return Boolean(url) && !/your-page/i.test(url);
    }

    function openExternalUrl(url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    function getShareUrl() {
      try {
        const url = new URL(window.location.href);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          if (['localhost', '127.0.0.1', '0.0.0.0'].includes(url.hostname)) return APP_PUBLIC_URL;
          url.hash = '';
          return url.href;
        }
      } catch (error) {
        console.warn('Could not read current URL for sharing.', error);
      }

      return APP_PUBLIC_URL;
    }

    function getShareData() {
      return {
        title: t('share.title'),
        text: t('share.text'),
        url: getShareUrl()
      };
    }

    function canUseNativeShare(shareData) {
      if (!navigator.share) return false;
      if (!navigator.canShare) return true;

      try {
        return navigator.canShare(shareData);
      } catch (error) {
        console.warn('Native share capability check failed.', error);
        return false;
      }
    }

    function createPlatformShareUrl(platform, shareData) {
      const encodedUrl = encodeURIComponent(shareData.url);
      const encodedText = encodeURIComponent(shareData.text);
      const encodedMessage = encodeURIComponent(`${shareData.text} ${shareData.url}`);

      if (platform === 'whatsapp') return `https://wa.me/?text=${encodedMessage}`;
      if (platform === 'facebook') return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      if (platform === 'x') return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

      return '';
    }

    async function copyTextToClipboard(text) {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);

      const activeElement = document.activeElement;
      textarea.focus();
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      if (activeElement?.focus) activeElement.focus();
      if (!copied) throw new Error('Clipboard fallback failed');
    }

    async function copyShareLink(notificationKey = 'notifications.shareCopied') {
      try {
        await copyTextToClipboard(getShareData().url);
        showNotif(t(notificationKey));
        return true;
      } catch (error) {
        console.warn('Share link could not be copied.', error);
        showNotif(t('notifications.shareCopyFailed'), 'var(--accent2)', 'var(--text)');
        return false;
      }
    }

    async function nativeShareApp(options = {}) {
      const { fallbackNotification = 'notifications.shareUnavailable' } = options;
      const shareData = getShareData();

      if (canUseNativeShare(shareData)) {
        try {
          await navigator.share(shareData);
          return true;
        } catch (error) {
          if (error?.name === 'AbortError') return false;
          console.warn('Native sharing failed; falling back to clipboard.', error);
        }
      }

      return copyShareLink(fallbackNotification);
    }

    async function shareToPlatform(platform) {
      const shareData = getShareData();
      const target = platform || '';

      if (target === 'copy') return copyShareLink();

      // Instagram and TikTok do not expose reliable public web share-intent URLs
      // for arbitrary app links. Use the native share sheet when supported;
      // otherwise copy the URL and open the platform so users can paste it.
      if (target === 'instagram' || target === 'tiktok') {
        const fallbackNotification = target === 'instagram'
          ? 'notifications.shareInstagramFallback'
          : 'notifications.shareTikTokFallback';
        const shared = await nativeShareApp({ fallbackNotification });
        if (!canUseNativeShare(shareData)) openExternalUrl(SOCIAL_WEB_FALLBACKS[target]);
        return shared;
      }

      const platformUrl = createPlatformShareUrl(target, shareData);
      if (platformUrl) {
        openExternalUrl(platformUrl);
        return true;
      }

      return nativeShareApp();
    }

    function loadExternalScript(src, scriptId) {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          if (existingScript.dataset.loaded === 'true') {
            resolve();
            return;
          }
          existingScript.addEventListener('load', () => resolve(), { once: true });
          existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
          return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = src;
        script.async = true;
        script.onload = () => {
          script.dataset.loaded = 'true';
          resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    }

    function openBuyMeACoffeeDonation() {
      const donationUrl = getDonationUrl('buyMeCoffee');
      if (isDonationUrlConfigured(donationUrl)) {
        openExternalUrl(donationUrl);
        return;
      }

      showNotif(t('notifications.donationLinkUnavailable'), 'var(--accent2)', 'var(--text)');
    }

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getKoFiWidgetTrigger() {
      const selectors = [
        'div[class*="kofi"] button',
        'div[class*="kofi"] a',
        'button[aria-label*="Support me"]',
        'button[title*="Support me"]',
        'a[aria-label*="Ko-fi"]',
        'a[href*="ko-fi.com"]'
      ];

      for (const selector of selectors) {
        const candidate = document.querySelector(selector);
        if (candidate) return candidate;
      }

      return Array.from(document.querySelectorAll('button, a')).find(el => {
        const text = (el.textContent || '').trim();
        const href = (el.getAttribute('href') || '').trim();
        const className = typeof el.className === 'string' ? el.className : '';
        return /support me/i.test(text) || /ko-?fi/i.test(text) || /ko-?fi/i.test(href) || /kofi/i.test(className);
      }) || null;
    }

    async function ensureKoFiWidgetReady() {
      await loadExternalScript(KO_FI_WIDGET_SCRIPT_URL, 'kofi-widget-script');
      if (!window.kofiWidgetOverlay?.draw) throw new Error('Ko-fi widget API unavailable');

      if (!window.__mmKoFiWidgetInitialized) {
        window.kofiWidgetOverlay.draw(KO_FI_SLUG, {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#323842',
          'floating-chat.donateButton.text-color': '#fff'
        });
        window.__mmKoFiWidgetInitialized = true;
      }
    }

    async function triggerKoFiWidget() {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        const trigger = getKoFiWidgetTrigger();
        if (trigger) {
          trigger.click();
          return true;
        }
        await wait(120);
      }
      return false;
    }

    async function openKoFiDonation() {
      try {
        await ensureKoFiWidgetReady();
        if (await triggerKoFiWidget()) return;
      } catch (error) {
        console.warn('Ko-fi widget could not be initialized.', error);
      }

      const fallbackUrl = getDonationUrl('koFi');
      if (isDonationUrlConfigured(fallbackUrl)) {
        openExternalUrl(fallbackUrl);
        return;
      }

      showNotif(t('notifications.donationLinkUnavailable'), 'var(--accent2)', 'var(--text)');
    }

    function openDonationLink(platform) {
      if (platform === 'buyMeCoffee') {
        openBuyMeACoffeeDonation();
        return;
      }
      if (platform === 'koFi') {
        openKoFiDonation();
        return;
      }

      const url = getDonationUrl(platform);
      if (!isDonationUrlConfigured(url)) {
        showNotif(t('notifications.donationLinkUnavailable'), 'var(--accent2)', 'var(--text)');
        return;
      }

      openExternalUrl(url);
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

    function detectBrowserLanguage() {
      const browserLanguages = Array.isArray(navigator?.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator?.language].filter(Boolean);
      for (const language of browserLanguages) {
        const normalized = String(language).toLowerCase().split('-')[0];
        if (SUPPORTED_LANGUAGES.includes(normalized)) return normalized;
      }
      return DEFAULT_LANGUAGE;
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

      let rawSaved = null;
      try {
        rawSaved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null');
      } catch (e) { }
      const shouldAutoDetectLanguage = !rawSaved || !SUPPORTED_LANGUAGES.includes(rawSaved.language);
      const resolvedLanguage = shouldAutoDetectLanguage ? detectBrowserLanguage() : rawSaved.language;
      const saved = { ...defaults, ...(rawSaved || {}), language: resolvedLanguage };

      document.getElementById('timer-slider').value = saved.timerDur;
      document.getElementById('toggle-sound').checked = Boolean(saved.soundEnabled);
      document.getElementById('toggle-navigation-sound').checked = Boolean(saved.navigationSoundEnabled);
      document.getElementById('toggle-penalty').checked = Boolean(saved.penaltyEnabled);
      document.getElementById('toggle-shuffle').checked = Boolean(saved.shuffleEnabled);
      document.getElementById('theme-select').value = applyTheme(saved.theme);
      document.getElementById('language-select').value = SUPPORTED_LANGUAGES.includes(saved.language) ? saved.language : DEFAULT_LANGUAGE;
      updateTimerLabel(saved.timerDur);
      setLanguage(saved.language || DEFAULT_LANGUAGE);
      if (shouldAutoDetectLanguage) saveSettings();
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
    function syncDrawingBoardVisibility(options = {}) {
      const { reset = false } = options;
      const board = document.getElementById('drawing-board');
      if (!board) return;
      const shouldShow = gameState.gameType === 'drawing' && gameState.phase === 'playing';
      board.classList.toggle('hidden', !shouldShow);
      if (shouldShow) requestAnimationFrame(() => resizeDrawingCanvas({ preserve: !reset }));
    }

    function refreshGameTypeUI() {
      const isDrawing = gameState.gameType === 'drawing';
      document.body.dataset.gameType = gameState.gameType;
      GAME_TYPES.forEach(type => {
        const card = document.getElementById(`game-type-${type}`);
        if (card) card.classList.toggle('selected', gameState.gameType === type);
      });

      const challengeToggle = document.getElementById('random-challenge-toggle');
      const challengeWrap = document.getElementById('random-challenge-wrap');
      const challengeSub = document.getElementById('random-challenge-sub');
      if (isDrawing) {
        gameState.randomChallenge = false;
        if (challengeToggle) challengeToggle.checked = false;
      }
      if (challengeToggle) challengeToggle.disabled = isDrawing;
      if (challengeWrap) challengeWrap.classList.toggle('is-disabled', isDrawing);
      if (challengeSub) challengeSub.textContent = t(isDrawing ? 'setup.randomChallengeDisabledSub' : 'setup.randomChallengeSub');

      const currentLabel = document.querySelector('.current-player .cp-label');
      if (currentLabel) currentLabel.textContent = t(isDrawing ? 'game.currentPlayerDrawingLabel' : 'game.currentPlayerLabel');
      const readyEmoji = document.getElementById('game-ready-emoji');
      if (readyEmoji) readyEmoji.textContent = isDrawing ? '✏️' : '🎭';
      const readyTitle = document.getElementById('game-ready-title');
      if (readyTitle) readyTitle.textContent = t(isDrawing ? 'game.readyDrawingTitle' : 'game.readyTitle');
      const readySub = document.getElementById('game-ready-sub');
      if (readySub) readySub.textContent = t(isDrawing ? 'game.readyDrawingSub' : 'game.readySub');
      const actorOnly = document.getElementById('game-only-actor-can-see');
      if (actorOnly) actorOnly.textContent = t(isDrawing ? 'game.onlyDrawerCanSee' : 'game.onlyMimeCanSee');
      syncDrawingBoardVisibility();
    }

    function selectGameType(type) {
      gameState.gameType = GAME_TYPES.includes(type) ? type : 'mime';
      refreshGameTypeUI();
    }

    function updateDiffWordCount() {
      const total = countWordsForSelectedCategories(gameState.selectedCategories, gameState.difficulty);
      document.getElementById('diff-word-count').textContent = t('dynamic.diffCount', {
        difficulty: getDifficultyLabel(gameState.difficulty, true),
        count: total
      });
    }

    function toggleRandomChallenge(enabled) {
      gameState.randomChallenge = gameState.gameType === 'mime' && enabled;
      refreshGameTypeUI();
    }

    function toggleCategory(category) {
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      if (gameState.selectedCategories.includes(category)) {
        gameState.selectedCategories = gameState.selectedCategories.filter(c => c !== category);
      } else {
        gameState.selectedCategories.push(category);
      }
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      renderCategorySelection();
    }

    function renderCategorySelection() {
      const container = document.getElementById('category-selection');
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      const premiumPacks = getPremiumPacks();
      const coreMarkup = CATEGORY_KEYS.map(category => `
        <div class="category-card ${gameState.selectedCategories.includes(category) ? 'selected' : ''}" data-category="${category}">
          ${CATEGORY_ICONS[category]} ${getCategoryLabel(category)}
        </div>
      `).join('');
      const premiumMarkup = premiumPacks.map(pack => {
        const category = getPremiumCategoryToken(pack.id);
        return `
          <div class="category-card premium-category-card ${gameState.selectedCategories.includes(category) ? 'selected' : ''}" data-category="${category}">
            ⭐ ${getPackDisplayName(pack)}
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="category-section-title">${t('setup.coreCategoriesLabel')}</div>
        ${coreMarkup}
        ${premiumPacks.length ? `<div class="category-section-title">${t('setup.premiumCategoriesLabel')}</div>${premiumMarkup}` : ''}
      `;
    }

    function selectMode(mode, options = {}) {
      const { skipLoadPlayers = false } = options;
      gameState.mode = mode;
      document.getElementById('mode-teams').classList.toggle('selected', mode === 'teams');
      document.getElementById('mode-ffa').classList.toggle('selected', mode === 'ffa');
      document.getElementById('step-teams').classList.toggle('hidden', mode !== 'teams');
      document.getElementById('step-ffa').classList.toggle('hidden', mode !== 'ffa');
      if (!skipLoadPlayers) loadPlayersForMode(mode);
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

    function normalizeQuickGameConfig(config) {
      const gameType = config?.gameType === 'drawing' ? 'drawing' : 'mime';
      const mode = config?.mode === 'teams' ? 'teams' : 'ffa';
      const difficulty = DIFFICULTY_KEYS.includes(config?.difficulty) ? config.difficulty : 'easy';
      const rounds = Math.min(5, Math.max(1, parseInt(config?.rounds, 10) || 3));
      const selectedCategories = normalizeSelectedCategories(
        Array.isArray(config?.selectedCategories) ? config.selectedCategories : []
      );
      const teams = {
        A: Array.isArray(config?.teams?.A) ? config.teams.A.map(name => String(name).trim()).filter(Boolean).slice(0, 3) : [],
        B: Array.isArray(config?.teams?.B) ? config.teams.B.map(name => String(name).trim()).filter(Boolean).slice(0, 3) : []
      };
      const players = Array.isArray(config?.players)
        ? config.players.map(name => String(name).trim()).filter(Boolean).slice(0, 6)
        : [];
      return {
        gameType,
        mode,
        difficulty,
        rounds,
        randomChallenge: gameType === 'mime' && Boolean(config?.randomChallenge),
        selectedCategories,
        teams,
        players,
        teamNames: {
          A: String(config?.teamNames?.A || getDefaultTeamName('A')).trim() || getDefaultTeamName('A'),
          B: String(config?.teamNames?.B || getDefaultTeamName('B')).trim() || getDefaultTeamName('B')
        }
      };
    }

    function buildQuickGameConfig() {
      return normalizeQuickGameConfig({
        gameType: gameState.gameType,
        mode: gameState.mode,
        difficulty: gameState.difficulty,
        rounds: parseInt(document.getElementById('rounds-slider').value, 10) || gameState.totalRounds || 3,
        randomChallenge: gameState.randomChallenge,
        selectedCategories: [...gameState.selectedCategories],
        teams: clone(gameState.teams),
        players: (gameState.players || []).map(player => player.name || player),
        teamNames: { ...gameState.teamNames }
      });
    }

    function saveQuickGameConfig(config = buildQuickGameConfig()) {
      localStorage.setItem(QUICK_GAME_KEY, JSON.stringify(normalizeQuickGameConfig(config)));
      renderQuickGameSummary();
    }

    function getFirstAccessQuickGameConfig() {
      return normalizeQuickGameConfig({
        gameType: 'mime',
        mode: 'ffa',
        difficulty: 'easy',
        rounds: 3,
        randomChallenge: false,
        selectedCategories: getDefaultSelectedCategories(),
        teams: { A: [], B: [] },
        players: [1, 2, 3, 4].map(number => getDefaultPlayerName(number)),
        teamNames: {
          A: getDefaultTeamName('A'),
          B: getDefaultTeamName('B')
        }
      });
    }

    function loadQuickGameConfig() {
      try {
        const saved = JSON.parse(localStorage.getItem(QUICK_GAME_KEY) || 'null');
        if (saved) return normalizeQuickGameConfig(saved);
      } catch (e) { }
      return getFirstAccessQuickGameConfig();
    }

    function applyQuickGameConfig(config) {
      const normalized = normalizeQuickGameConfig(config);
      selectGameType(normalized.gameType);
      selectMode(normalized.mode, { skipLoadPlayers: true });
      gameState.teams = clone(normalized.teams);
      gameState.players = normalized.mode === 'ffa' ? [...normalized.players] : [];
      gameState.teamNames = { ...normalized.teamNames };
      gameState.randomChallenge = normalized.randomChallenge;
      gameState.selectedCategories = [...normalized.selectedCategories];
      document.getElementById('random-challenge-toggle').checked = normalized.randomChallenge;
      document.getElementById('rounds-slider').value = String(normalized.rounds);
      document.getElementById('rounds-val').textContent = String(normalized.rounds);
      selectDifficulty(normalized.difficulty);
      updateTeamLabels();
      renderSetupPlayers();
      renderCategorySelection();
      refreshGameTypeUI();
    }

    function startQuickGame() {
      applyQuickGameConfig(loadQuickGameConfig());
      startGame();
    }

    // ============================================================
    // START GAME
    // ============================================================
    function startGame() {
      const rounds = parseInt(document.getElementById('rounds-slider').value, 10);
      gameState.totalRounds = rounds;
      gameState.timerDur = parseInt(document.getElementById('timer-slider').value, 10) || 60;
      if (gameState.gameType === 'drawing') {
        gameState.randomChallenge = false;
        const randomToggle = document.getElementById('random-challenge-toggle');
        if (randomToggle) randomToggle.checked = false;
      }
      refreshGameTypeUI();

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
      saveQuickGameConfig();

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
      gameState.timerLeft = gameState.timerDur;
      updateTimerDisplay(gameState.timerDur, gameState.timerDur);
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
      refreshGameTypeUI();
      syncDrawingBoardVisibility();
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
          syncDrawingBoardVisibility({ reset: true });
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
      const allWords = [];

      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      gameState.selectedCategories.forEach(category => {
        const premiumPack = getPremiumPackByToken(category);
        const words = premiumPack
          ? getPremiumWordsForPack(premiumPack, gameState.difficulty)
          : getCoreWordsForCategory(category, gameState.difficulty);
        words.forEach(word => {
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
      if (gameState.gameType === 'mime' && gameState.randomChallenge) {
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
      const strokeOffset = 427.3 - (left / total) * 427.3;
      const strokeColor = left > total * 0.5
        ? getThemeVar('--timer-color-safe')
        : left > total * 0.25
          ? getThemeVar('--timer-color-warning')
          : getThemeVar('--timer-color-danger');
      document.querySelectorAll('[data-timer-num]').forEach(el => {
        el.textContent = left;
      });
      document.querySelectorAll('[data-timer-circle]').forEach(circ => {
        circ.style.strokeDashoffset = strokeOffset;
        circ.style.stroke = strokeColor;
      });
    }

    function updateTimerLabel(val) {
      document.getElementById('timer-val').textContent = `${val}s`;
      gameState.timerDur = parseInt(val, 10);
    }

    // ============================================================
    // DRAWING CANVAS
    // ============================================================
    function getDrawingPoint(event) {
      const rect = drawingState.canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }

    function resizeDrawingCanvas(options = {}) {
      const { preserve = true } = options;
      const canvas = drawingState.canvas || document.getElementById('drawing-canvas');
      if (!canvas) return;
      drawingState.canvas = canvas;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const previous = preserve && canvas.width && canvas.height ? document.createElement('canvas') : null;
      if (previous) {
        previous.width = canvas.width;
        previous.height = canvas.height;
        previous.getContext('2d').drawImage(canvas, 0, 0);
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      const ctx = canvas.getContext('2d');
      drawingState.ctx = ctx;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
      if (previous) {
        ctx.drawImage(previous, 0, 0, previous.width, previous.height, 0, 0, rect.width, rect.height);
      }
    }

    function clearDrawingCanvas() {
      resizeDrawingCanvas({ preserve: false });
    }

    function selectDrawingTool(tool) {
      if (!DRAWING_TOOL_CONFIG[tool]) return;
      drawingState.activeTool = tool;
      document.querySelectorAll('[data-tool]').forEach(button => {
        button.classList.toggle('selected', button.dataset.tool === tool);
      });
    }

    function strokeDrawingLine(from, to) {
      if (!drawingState.ctx) resizeDrawingCanvas();
      const ctx = drawingState.ctx;
      const tool = DRAWING_TOOL_CONFIG[drawingState.activeTool] || DRAWING_TOOL_CONFIG['pen-thick'];
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = tool.color;
      ctx.lineWidth = tool.width;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.restore();
    }

    function startDrawing(event) {
      if (gameState.gameType !== 'drawing' || gameState.phase !== 'playing') return;
      event.preventDefault();
      resizeDrawingCanvas();
      drawingState.isDrawing = true;
      const point = getDrawingPoint(event);
      drawingState.lastX = point.x;
      drawingState.lastY = point.y;
      strokeDrawingLine(point, { x: point.x + 0.01, y: point.y + 0.01 });
      try {
        drawingState.canvas.setPointerCapture?.(event.pointerId);
      } catch (e) { }
    }

    function continueDrawing(event) {
      if (!drawingState.isDrawing) return;
      event.preventDefault();
      const point = getDrawingPoint(event);
      strokeDrawingLine({ x: drawingState.lastX, y: drawingState.lastY }, point);
      drawingState.lastX = point.x;
      drawingState.lastY = point.y;
    }

    function stopDrawing(event) {
      if (!drawingState.isDrawing) return;
      drawingState.isDrawing = false;
      try {
        drawingState.canvas.releasePointerCapture?.(event.pointerId);
      } catch (e) { }
    }

    function initializeDrawingCanvas() {
      const canvas = document.getElementById('drawing-canvas');
      if (!canvas) return;
      drawingState.canvas = canvas;
      canvas.addEventListener('pointerdown', startDrawing);
      canvas.addEventListener('pointermove', continueDrawing);
      canvas.addEventListener('pointerup', stopDrawing);
      canvas.addEventListener('pointercancel', stopDrawing);
      canvas.addEventListener('pointerleave', stopDrawing);
      window.addEventListener('resize', () => resizeDrawingCanvas());
      selectDrawingTool('pen-thick');
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
    function selectPackFile() {
      const input = document.getElementById('pack-file-input');
      if (!input) return;
      input.value = '';
      input.click();
    }

    async function installWordPackFile(file) {
      setPackInstallStatus(t('notifications.packInstallReading'));
      const envelope = await parsePackFile(file);
      const pack = await buildInstalledPackFromEnvelope(envelope);
      const existingIndex = contentModel.packs.findIndex(item => item.id === pack.id);

      if (existingIndex >= 0) {
        const existingPack = contentModel.packs[existingIndex];
        if (existingPack.id === CORE_PACK_ID) throw new Error(t('packErrors.reservedPackId'));
        const shouldReplace = confirm(t('confirmations.replacePack', { packName: getPackDisplayName(existingPack) }));
        if (!shouldReplace) {
          setPackInstallStatus(t('notifications.packInstallCancelled'));
          return null;
        }
        contentModel.packs[existingIndex] = pack;
      } else {
        contentModel.packs.push(pack);
      }

      saveContentModel();
      wbPreviewPackId = pack.id;
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      renderInstalledPacks();
      renderWordBank();
      renderPackPreview();
      renderCategorySelection();
      updateDiffWordCount();
      setPackInstallStatus(t('notifications.packInstallSuccess'), 'success');
      showNotif(t('dynamic.packInstalled', { name: getPackDisplayName(pack) }));
      return pack;
    }

    async function handlePackFileSelection(file) {
      try {
        await installWordPackFile(file);
      } catch (error) {
        const message = error?.message || t('packErrors.invalidJson');
        setPackInstallStatus(message, 'error');
        showNotif(message, 'var(--accent2)', 'var(--text)');
      }
    }

    function toggleInstalledPack(packId) {
      const pack = contentModel.packs.find(item => item.id === packId && item.source === 'downloaded');
      if (!pack) return;
      pack.enabled = pack.enabled === false;
      saveContentModel();
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      renderInstalledPacks();
      renderWordBank();
      renderPackPreview();
      renderCategorySelection();
      updateDiffWordCount();
      showNotif(t('notifications.packToggled'));
    }

    function removeInstalledPack(packId) {
      const pack = contentModel.packs.find(item => item.id === packId && item.source === 'downloaded');
      if (!pack) return;
      if (!confirm(t('confirmations.removePack', { packName: getPackDisplayName(pack) }))) return;
      contentModel.packs = contentModel.packs.filter(item => item.id !== packId);
      if (wbPreviewPackId === packId) wbPreviewPackId = '';
      saveContentModel();
      gameState.selectedCategories = normalizeSelectedCategories(gameState.selectedCategories);
      renderInstalledPacks();
      renderWordBank();
      renderPackPreview();
      renderCategorySelection();
      updateDiffWordCount();
      showNotif(t('notifications.packRemoved'));
    }

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
      renderPackPreview();
    }

    function switchWordTab(tab) {
      wbCat = tab;
      syncWBCatUI();
      renderWordBank();
    }

    function getWordEntriesForWordBank(locale = currentLanguage, diff = wbDiff, category = wbCat) {
      const entries = [];
      const pack = getCorePack();
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

    function getCoreChallengeList(locale = currentLanguage) {
      const pack = getCorePack();
      ensurePackLocale(pack, locale);
      const list = normalizeChallenges(pack.challenges?.[locale] || []);
      return list.length || pack.challengeOverrides?.[locale] ? list : getDefaultCoreChallenges(locale);
    }

    function setCoreChallengeList(list, locale = currentLanguage) {
      const pack = getCorePack();
      ensurePackLocale(pack, locale);
      pack.challenges[locale] = ensureUniqueWords(normalizeChallenges(list));
      pack.challengeOverrides = pack.challengeOverrides || {};
      pack.challengeOverrides[locale] = true;
      saveContentModel();
    }

    function renderChallengeBank() {
      const cont = document.getElementById('challenges-list');
      const countEl = document.getElementById('challenge-count');
      if (!cont || !countEl) return;
      const challenges = getCoreChallengeList();
      cont.innerHTML = '';
      challenges.forEach((challenge, index) => {
        const tag = document.createElement('span');
        tag.className = 'word-tag';
        const text = document.createTextNode(`🎯 ${challenge} `);
        const removeBtn = document.createElement('span');
        removeBtn.className = 'del-btn';
        removeBtn.dataset.action = 'remove-challenge';
        removeBtn.dataset.index = String(index);
        removeBtn.textContent = '✕';
        tag.append(text, removeBtn);
        cont.appendChild(tag);
      });
      countEl.textContent = challenges.length;
    }

    function addWord() {
      const inp = document.getElementById('inp-new-word');
      const category = document.getElementById('inp-word-cat').value;
      const word = inp.value.trim();
      if (!word) return;
      const currentBank = normalizeWordBank(getCorePack().words?.[currentLanguage] || {});
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

    function addChallenge() {
      const inp = document.getElementById('inp-new-challenge');
      const challenge = inp.value.trim();
      if (!challenge) return;
      const challenges = getCoreChallengeList();
      if (challenges.includes(challenge)) {
        showNotif(t('notifications.duplicateChallenge'), 'var(--accent2)', 'var(--text)');
        return;
      }

      setCoreChallengeList([...challenges, challenge]);
      inp.value = '';
      renderChallengeBank();
      showNotif(t('dynamic.challengeAdded', { challenge }));
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

    function removeChallenge(idx) {
      const challenges = getCoreChallengeList();
      if (idx < 0 || idx >= challenges.length) return;
      challenges.splice(idx, 1);
      setCoreChallengeList(challenges);
      renderChallengeBank();
      showNotif(t('notifications.challengeRemoved'));
    }

    function resetChallenges() {
      if (confirm(t('confirmations.resetChallenges'))) {
        const pack = getCorePack();
        ensurePackLocale(pack, currentLanguage);
        pack.challenges[currentLanguage] = getDefaultCoreChallenges();
        pack.challengeOverrides = pack.challengeOverrides || {};
        delete pack.challengeOverrides[currentLanguage];
        saveContentModel();
        renderChallengeBank();
        showNotif(t('notifications.challengesRestored'));
      }
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
        renderChallengeBank();
        updateDiffWordCount();
        showNotif(t('notifications.bankRestored'));
      }
    }

    function clearAppStorage(storage) {
      if (!storage) return;
      const keys = [];
      for (let i = 0; i < storage.length; i += 1) {
        const key = storage.key(i);
        if (key?.startsWith(APP_STORAGE_PREFIX)) keys.push(key);
      }
      keys.forEach(key => storage.removeItem(key));
    }

    function resetAppDefaults() {
      if (!confirm(t('confirmations.resetAppDefaults'))) return;
      clearAppStorage(localStorage);
      clearAppStorage(sessionStorage);
      window.location.reload();
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
        const prevGameType = gameState.gameType;
        gameState = {
          gameType: prevGameType,
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
          selectedCategories: getDefaultSelectedCategories()
        };
        selectGameType(prevGameType);
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
      if (key === 'add-challenge') addChallenge();
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
      const { action, team, index, wordCategory, wordDiff, wordPack, platform, packId } = button.dataset;

      if (shouldPlayNavigationSoundForAction(action)) {
        playNavigationSound();
      }

      if (action === 'next-turn') return nextTurn();
      if (action === 'share-platform') {
        animateButtonClick(button);
        return shareToPlatform(platform);
      }
      if (action === 'quick-game') {
        animateButtonClick(button);
        return startQuickGame();
      }
      if (action === 'donate-bmc') {
        animateButtonClick(button);
        return openDonationLink('buyMeCoffee');
      }
      if (action === 'donate-kofi') {
        animateButtonClick(button);
        return openDonationLink('koFi');
      }
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
      if (action === 'set-draw-tool') return selectDrawingTool(button.dataset.tool);
      if (action === 'clear-drawing-canvas') return clearDrawingCanvas();
      if (action === 'add-word') return addWord();
      if (action === 'add-challenge') return addChallenge();
      if (action === 'reset-words') return resetWords();
      if (action === 'reset-challenges') return resetChallenges();
      if (action === 'reset-app-defaults') return resetAppDefaults();
      if (action === 'select-pack-file') return selectPackFile();
      if (action === 'toggle-installed-pack') return toggleInstalledPack(packId);
      if (action === 'remove-installed-pack') return removeInstalledPack(packId);
      if (action === 'copy-user-id') return copyUserId();
      if (action === 'remove-word') return removeWord(wordCategory, wordDiff, wordPack, Number(index));
      if (action === 'remove-challenge') return removeChallenge(Number(index));
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

        const gameTypeCard = event.target.closest('.mode-card[data-game-type]');
        if (gameTypeCard) {
          selectGameType(gameTypeCard.dataset.gameType);
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

        const packPreviewRow = event.target.closest('[data-pack-preview-id]');
        if (packPreviewRow && !event.target.closest('[data-action]')) {
          playNavigationSound();
          selectPreviewPack(packPreviewRow.dataset.packPreviewId);
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

      const packFileInput = document.getElementById('pack-file-input');
      if (packFileInput) {
        packFileInput.addEventListener('change', event => {
          const file = event.target.files?.[0];
          handlePackFileSelection(file);
          event.target.value = '';
        });
      }

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
    initializeDrawingCanvas();
    selectGameType('mime');
    selectMode('teams');
    selectDifficulty('easy');
