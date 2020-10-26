
let jokenpo = {
    1: "Papel",
    2: "Pedra",
    3: "Tesoura"
};


let points = 0;

do{
    console.log(`
    Escolha sua jogada:
    1 - Papel\n
    2 - Pedra\n
    3 - Tesoura
    `)
    player = playerMove();
    computer = computerMove();
    gameResult = whoWins(player, computer);
    generateResult(gameResult);    

} while(isValidMove(player) && notLose(gameResult));

function whoWins(player, computer){
    let playerWins = ["Papel-Pedra","Tesoura-Papel","Pedra-Tesoura"];
    if(player == computer){
        return "draw";
    }
    if(playerWins.includes(`${player}-${computer}`)){
        return "player";
    }
    else{
        return "computer";
    }
}

function playerMove(){
    let id = parseInt(prompt());
    return jokenpo[id];
}

function computerMove(){
    let id = Math.floor(Math.random() * 3)+1;
    let move = jokenpo[id];
    console.log(`O computador jogou ${move}`);
    return move;
}

function generateResult(gameResult){
    if(gameResult == "player"){
        points++;
        console.log("Você ganhou!");
    }
    else if(gameResult == "draw"){
        console.log("A rodada empatou!");
    }
    else{
        console.log(`Você perdeu! A sua pontuação foi de ${points}`);
    }
}

function isValidMove(game){
    return game == "Pedra" | game == "Papel" | game == "Tesoura";
}

function notLose(gameResult){
    return gameResult != "computer";
}