let personagem = {
    nome: "Valente",
    vida: 100,
    forca: 20,
    recursos: 50, // Recursos como dinheiro ou poções
    magia: 30 // Poder de magia
};

let inimigo = {
    nome: "Monstro",
    vida: 100,
    forca: 15
};

let rodada = 1; // Contador de rodadas

function start() {
    // Reiniciando a vida e recursos dos personagens
    personagem.vida = 100;
    inimigo.vida = 100;
    personagem.recursos = 50;
    personagem.magia = 30;
    rodada = 1; // Reinicia o contador de rodadas
    
    console.log(`\nBem-vindo à aventura, ${personagem.nome}!`);
    console.log(`Você começa com: VIDA: ${personagem.vida}, FORÇA: ${personagem.forca}, RECURSOS: ${personagem.recursos}, MAGIA: ${personagem.magia}`);
    console.log(`${inimigo.nome} aparece! VIDA: ${inimigo.vida}`);
    
    proximoRound(); // Iniciar o primeiro round
}

function enfrentarDesafio() {
    console.log(`\n--- RODADA ${rodada} ---`); // Exibe o número da rodada
    const ataque = prompt("Escolha seu ataque: (1) Ataque Físico (2) Ataque Mágico (3) Defesa (4) Usar Recurso");

    let danoJogador = 0;

    switch (ataque) {
        case '1':
            danoJogador = Math.floor(Math.random() * 20) + 10; // Ataque Físico
            console.log(`Você usou Ataque Físico e causou ${danoJogador} de dano!`);
            // Custo do ataque físico
            personagem.recursos -= 5;
            console.log(`Você gastou 5 recursos. Recursos restantes: ${personagem.recursos}`);
            break;
        case '2':
            if (personagem.magia > 0) {
                danoJogador = Math.floor(Math.random() * 25) + 15; // Ataque Mágico
                personagem.magia -= 5; // Custa magia
                console.log(`Você usou Ataque Mágico e causou ${danoJogador} de dano!`);
                // Custo do ataque mágico
                personagem.recursos -= 10;
                console.log(`Você gastou 10 recursos. Recursos restantes: ${personagem.recursos}`);
            } else {
                console.log("Você não tem magia suficiente!");
                return;
            }
            break;
        case '3':
            console.log("Você se defendeu, reduzindo o dano do próximo ataque.");
            // Nenhum dano causado, mas aumenta a defesa
            break;
        case '4':
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
        if (ataque === '3') {
            danoInimigo /= 2; // Reduzido pela metade se o jogador se defendeu
        }
        personagem.vida -= danoInimigo;
        console.log(`${inimigo.nome} atacou e causou ${danoInimigo} de dano. Sua VIDA: ${personagem.vida}`);
    }

    verificarEstado();
}

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
        proximoRound(); // Chama diretamente o próximo round sem delay
    }
}

function proximoRound() {
    enfrentarDesafio();
}

