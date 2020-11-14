(function () {

  const FPS = 1; 

  //Dimensions
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let lifeDimensions = [100, 54];

  let probFoco = 25;
  let reserva;
  let focos = [];
  let gameLoop;
  const S = 115;

  function init() {
    setScenario();
    startGame();
  }

  function startGame(){
    window.addEventListener("keypress", (e) =>{
      if(e.key === 's')
        gameLoop = setInterval(burn, 1000/FPS);
    });
  }

  function setScenario(){
    reserva = new Reserva();
    lifes = new Life();
    score = new Score();
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
  })

  function burn () {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
    }
  }

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      document.body.appendChild(this.element);
    }
  }  
  
  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      reserva.element.appendChild(this.element);
    }
  }

  class Life {
    constructor (){
      this.number = 5;
      this.element = document.createElement("div");
      this.element.className = "vida";
      this.element.style.width = `${this.number*lifeDimensions[0]}px`;
      this.element.style.height = `${lifeDimensions[1]}px`;
      document.body.appendChild(this.element);
    }

    loseLife(){
      this.number--;
      this.element.style.width = `${this.number*lifeDimensions[0]}px`;
    }
  }

  class Score {
    constructor(){
      this.num = 0;    
      this.element = document.createElement("div");
      this.element.className = "score";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.innerHTML = this.num.toString().padStart(5, "0"); 
      document.body.appendChild(this.element);
    }
  }


  init();
})();


//todo: inserir quadro de pontuação
//todo: criar função stillBurning
//todo: criar função putOutFire


//-----------melhorias
//todo: mostrar tela de "pressione S para começar!"