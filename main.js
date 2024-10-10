let personagem; // Inicializamos o personagem vazio no começo
let inimigo; // Inicializamos o inimigo vazio no começo
let rodada = 1; // Contador de rodadas

// Função para escolher o personagem
function escolherPersonagem(opcao) {
    switch (opcao) {
        case 1:
            personagem = { nome: "Chapeuzinho Vermelho", vida: 100, forca: 20, recursos: 50, magia: 30 };
            break;
        case 2:
            personagem = { nome: "Porquinho", vida: 120, forca: 15, recursos: 40, magia: 20 };
            break;
        case 3:
            personagem = { nome: "Princesa", vida: 90, forca: 25, recursos: 60, magia: 40 };
            break;
        default:
            console.log("Escolha inválida! Selecione uma opção entre 1 e 3.");
            return false;
    }
    console.log(`Você escolheu jogar como ${personagem.nome}! VIDA: ${personagem.vida}, FORÇA: ${personagem.forca}, RECURSOS: ${personagem.recursos}, MAGIA: ${personagem.magia}`);
    return true; // Personagem escolhido com sucesso
}

// Função para escolher o vilão
function escolherVilao(opcao) {
    switch (opcao) {
        case 1:
            inimigo = { nome: "Lobo Mau", vida: 80, forca: 10 };
            break;
        case 2:
            inimigo = { nome: "Bruxa", vida: 70, forca: 15 };
            break;
        case 3:
            inimigo = { nome: "Bicho Papão", vida: 90, forca: 12 };
            break;
        case 4:
            inimigo = { nome: "Pé Grande", vida: 120, forca: 18 };
            break;
        default:
            console.log("Escolha inválida! Selecione uma opção entre 1 e 4.");
            return false;
    }
    console.log(`Você escolheu enfrentar ${inimigo.nome}! VIDA: ${inimigo.vida}, FORÇA: ${inimigo.forca}`);
    return true; // Vilão escolhido com sucesso
}

// Função para iniciar o jogo e apresentar o menu de seleção de personagem e vilão
function start() {
    console.log("Escolha seu personagem:");
    console.log("1 - Chapeuzinho Vermelho");
    console.log("2 - Porquinho");
    console.log("3 - Princesa");

    let personagemEscolhido = parseInt(prompt("Digite o número do personagem que você deseja jogar:"));
    if (!escolherPersonagem(personagemEscolhido)) return; // Checa se o personagem foi escolhido corretamente

    console.log("\nEscolha seu vilão para a batalha:");
    console.log("1 - Lobo Mau");
    console.log("2 - Bruxa");
    console.log("3 - Bicho Papão");
    console.log("4 - Pé Grande");

    let vilaoEscolhido = parseInt(prompt("Digite o número do vilão que você deseja enfrentar:"));
    if (!escolherVilao(vilaoEscolhido)) return; // Checa se o vilão foi escolhido corretamente
    
    // Reiniciando a vida e recursos dos personagens
    rodada = 1; // Reinicia o contador de rodadas
    
    console.log(`\nBem-vindo à aventura, ${personagem.nome}!`);
    console.log(`Você começa com: VIDA: ${personagem.vida}, FORÇA: ${personagem.forca}, RECURSOS: ${personagem.recursos}, MAGIA: ${personagem.magia}`);
    console.log(`${inimigo.nome} aparece! VIDA: ${inimigo.vida}`);
    
    proximoRound(); // Iniciar o primeiro round
}

// Função para enfrentar o desafio
function enfrentarDesafio(escolhaAtaque) {
    console.log(`\n--- RODADA ${rodada} ---`);
    console.log(`Status do Jogador:
    VIDA: ${personagem.vida}
    FORÇA: ${personagem.forca}
    RECURSOS: ${personagem.recursos}
    MAGIA: ${personagem.magia}`);

    let danoJogador = 0;

    switch (escolhaAtaque) {
        case 1: // Ataque Físico
            danoJogador = Math.floor(Math.random() * 20) + 10;
            console.log(`Você usou Ataque Físico e causou ${danoJogador} de dano!`);
            personagem.recursos -= 5; // Custo do ataque físico
            console.log(`Você gastou 5 recursos. Recursos restantes: ${personagem.recursos}`);
            break;
        case 2: // Ataque Mágico
            if (personagem.magia > 0) {
                danoJogador = Math.floor(Math.random() * 25) + 15;
                personagem.magia -= 5; // Custa magia
                console.log(`Você usou Ataque Mágico e causou ${danoJogador} de dano!`);
                personagem.recursos -= 10;
                console.log(`Você gastou 10 recursos. Recursos restantes: ${personagem.recursos}`);
            } else {
                console.log("Você não tem magia suficiente!");
                return;
            }
            break;
        case 3: // Defesa
            console.log("Você se defendeu, reduzindo o dano do próximo ataque.");
            break;
        case 4: // Usar Recurso
            if (personagem.recursos >= 10) {
                personagem.vida += 20; // Recupera vida
                personagem.recursos -= 10; // Custa recursos
                console.log(`Você usou um recurso e recuperou 20 de vida! Sua VIDA: ${personagem.vida}`);
            } else {
                console.log("Você não tem recursos suficientes!");
                return;
            }
            break;
        default:
            console.log("Escolha inválida! Você perdeu a vez.");
            return;
    }

    // Aplica o dano ao inimigo
    inimigo.vida -= danoJogador;
    console.log(`${inimigo.nome} VIDA: ${inimigo.vida}`);

    if (inimigo.vida > 0) {
        let danoInimigo = Math.floor(Math.random() * 15) + 5; // Dano do inimigo
        if (escolhaAtaque === 3) {
            danoInimigo /= 2; // Reduzido pela metade se o jogador se defendeu
        }
        personagem.vida -= danoInimigo;
        console.log(`${inimigo.nome} atacou e causou ${danoInimigo} de dano. Sua VIDA: ${personagem.vida}`);
    }

    verificarEstado();
}

// Função para verificar o estado do jogo
function verificarEstado() {
    if (personagem.vida <= 0) {
        console.log("Você foi derrotado... Fim de jogo.");
    } else if (inimigo.vida <= 0) {
        console.log("Parabéns! Você derrotou o inimigo!");
        // Adiciona recursos como recompensa ao derrotar o inimigo
        let recompensa = Math.floor(Math.random() * 30) + 20;
        personagem.recursos += recompensa;
        console.log(`Você recebeu ${recompensa} recursos! Recursos totais: ${personagem.recursos}`);
    } else {
        rodada++; // Incrementa o número da rodada
        proximoRound(); // Próxima rodada
    }
}

// Função para iniciar a próxima rodada e exibir as opções de ataque
function proximoRound() {
    console.log("\nEscolha uma ação:");
    console.log("1 - Ataque Físico");
    console.log("2 - Ataque Mágico");
    console.log("3 - Defesa");
    console.log("4 - Usar Recurso");

    let escolhaAtaque = parseInt(prompt("Digite o número da sua ação:"));
    enfrentarDesafio(escolhaAtaque);
}
