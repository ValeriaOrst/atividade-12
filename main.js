let personagem = {
    nome: "Valente",
    vida: 100,
    forca: 20
};

let inimigo = {
    nome: "Monstro",
    vida: 100,
    forca: 15
};

let rodada = 1; // Contador de rodadas

function start() {
    // Reiniciando a vida dos personagens
    personagem.vida = 100;
    inimigo.vida = 100;
    rodada = 1; // Reinicia o contador de rodadas
    
    console.log(`\nBem-vindo à aventura, ${personagem.nome}!`);
    console.log(`Você começa com: VIDA: ${personagem.vida}, FORÇA: ${personagem.forca}`);
    console.log(`${inimigo.nome} aparece! VIDA: ${inimigo.vida}`);
    
    proximoRound(); // Iniciar o primeiro round
}

function enfrentarDesafio() {
    console.log(`\n--- RODADA ${rodada} ---`); // Exibe o número da rodada
    const ataque = prompt("Escolha seu ataque: (1) Ataque Físico (2) Ataque Mágico (3) Defesa");

    let danoJogador = 0;

    switch (ataque) {
        case '1':
            danoJogador = Math.floor(Math.random() * 20) + 10; // Ataque Físico
            console.log(`Você usou Ataque Físico e causou ${danoJogador} de dano!`);
            break;
        case '2':
            danoJogador = Math.floor(Math.random() * 15) + 5; // Ataque Mágico
            console.log(`Você usou Ataque Mágico e causou ${danoJogador} de dano!`);
            break;
        case '3':
            console.log("Você se defendeu, reduzindo o dano do próximo ataque.");
            danoJogador = 0; // Nenhum dano causado
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
    } else {
        rodada++; // Incrementa o número da rodada
        proximoRound(); // Chama diretamente o próximo round sem delay
    }
}

function proximoRound() {
    enfrentarDesafio();
}
