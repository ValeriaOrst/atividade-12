let personagem; // Personagem do jogador
let inimigo; // Vilão adversário
let rodada = 1; // Contador de rodadas

// Função para escolher o personagem
function escolherPersonagem(opcao) {
    const personagens = [
        { nome: "Chapeuzinho Vermelho", vida: 100, forca: 20, recursos: 50, magia: 30 },
        { nome: "Porquinho", vida: 120, forca: 15, recursos: 40, magia: 20 },
        { nome: "Princesa", vida: 90, forca: 25, recursos: 60, magia: 40 }
    ];

    if (opcao >= 1 && opcao <= 3) {
        personagem = personagens[opcao - 1];
        console.log(`Você escolheu jogar como ${personagem.nome}! VIDA: ${personagem.vida}, FORÇA: ${personagem.forca}, RECURSOS: ${personagem.recursos}, MAGIA: ${personagem.magia}`);
        return true;
    } else {
        console.log("Escolha inválida! Selecione uma opção entre 1 e 3.");
        return false;
    }
}

// Função para escolher o vilão
function escolherVilao(opcao) {
    const viloes = [
        { nome: "Lobo Mau", vida: 80, forca: 10 },
        { nome: "Bruxa", vida: 70, forca: 15 },
        { nome: "Bicho Papão", vida: 90, forca: 12 },
        { nome: "Pé Grande", vida: 120, forca: 18 }
    ];

    if (opcao >= 1 && opcao <= 4) {
        inimigo = viloes[opcao - 1];
        console.log(`Você escolheu enfrentar ${inimigo.nome}! VIDA: ${inimigo.vida}, FORÇA: ${inimigo.forca}`);
        return true;
    } else {
        console.log("Escolha inválida! Selecione uma opção entre 1 e 4.");
        return false;
    }
}

// Função para iniciar o jogo
function start() {
    console.log("Escolha seu personagem:");
    console.log("1 - Chapeuzinho Vermelho\n2 - Porquinho\n3 - Princesa");

    let personagemEscolhido = parseInt(prompt("Digite o número do personagem que você deseja jogar:"));
    if (!escolherPersonagem(personagemEscolhido)) return; // Verifica se a escolha foi válida

    console.log("\nEscolha seu vilão para a batalha:");
    console.log("1 - Lobo Mau\n2 - Bruxa\n3 - Bicho Papão\n4 - Pé Grande");

    let vilaoEscolhido = parseInt(prompt("Digite o número do vilão que você deseja enfrentar:"));
    if (!escolherVilao(vilaoEscolhido)) return; // Verifica se a escolha foi válida

    rodada = 1; // Reinicia o contador de rodadas
    console.log(`\nBem-vindo à aventura, ${personagem.nome}!`);
    console.log(`Você começa com: VIDA: ${personagem.vida}, FORÇA: ${personagem.forca}, RECURSOS: ${personagem.recursos}, MAGIA: ${personagem.magia}`);
    console.log(`${inimigo.nome} aparece! VIDA: ${inimigo.vida}`);

    proximoRound(); // Inicia a primeira rodada
}

// Função para enfrentar o desafio
function enfrentarDesafio(escolhaAtaque) {
    console.log(`\n--- RODADA ${rodada} ---`);
    console.log(`Status do Jogador: VIDA: ${personagem.vida}, FORÇA: ${personagem.forca}, RECURSOS: ${personagem.recursos}, MAGIA: ${personagem.magia}`);

    let danoJogador = 0;

    switch (escolhaAtaque) {
        case 1: // Ataque Físico
            danoJogador = Math.floor(Math.random() * 20) + 10;
            console.log(`Você usou Ataque Físico e causou ${danoJogador} de dano!`);
            personagem.recursos -= 5;
            break;
        case 2: // Ataque Mágico
            if (personagem.magia > 0) {
                danoJogador = Math.floor(Math.random() * 25) + 15;
                personagem.magia -= 5;
                personagem.recursos -= 10;
                console.log(`Você usou Ataque Mágico e causou ${danoJogador} de dano!`);
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
                personagem.vida += 20;
                personagem.recursos -= 10;
                console.log(`Você usou um recurso e recuperou 20 de vida! Sua VIDA: ${personagem.vida}`);
            } else {
                console.log("Você não tem recursos suficientes!");
                return;
            }
            break;
        case 5: // Sair do Jogo
            console.log("Saindo...");
            return;
        default:
            console.log("Escolha inválida! Faça outra escolha.");
            proximoRound();
            return;
    }

    inimigo.vida -= danoJogador;
    console.log(`${inimigo.nome} VIDA: ${inimigo.vida}`);

    if (inimigo.vida > 0) {
        let danoInimigo = Math.floor(Math.random() * 15) + 5;
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
        let recompensa = Math.floor(Math.random() * 30) + 20;
        personagem.recursos += recompensa;
        console.log(`Você recebeu ${recompensa} recursos! Recursos totais: ${personagem.recursos}`);
    } else {
        rodada++;
        proximoRound();
    }
}

// Função para iniciar a próxima rodada
function proximoRound() {
    console.log("\nEscolha uma ação:");
    console.log("1 - Ataque Físico\n2 - Ataque Mágico\n3 - Defesa\n5 - Sair");

    if (personagem.recursos > 0) {
        console.log("4 - Usar Recurso");
    }

    let escolhaAtaque = parseInt(prompt("Digite o número da sua ação:"));

    if (escolhaAtaque === 4 && personagem.recursos <= 0) {
        console.log("Você não pode usar recursos, eles acabaram!");
        proximoRound();
    } else {
        enfrentarDesafio(escolhaAtaque);
    }
}
