(function () {

  const FPS = 1; 

  //Dimensions
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let lifeDimensions = [100, 54];
  let devastationDims = [250,250];
  let pauseDims = [512,512];
  let skullDims = [120,136];
  
  let probFoco = 25;
  let reserva;
  let gameLoop;
  let focoTimers = [];
  let pause = null;


  function init() {
    setScenario();
    startGame();
  }

  function startGame(){

    function start(e){
      if(e.key === 's'){
        window.removeEventListener("keypress",start);
        setLooping();
        pauseGame();
        resumeGame();
      }      
    }


    window.addEventListener("keypress",start);  
  }

  function setLooping(){
    gameLoop = setInterval(putEvils, 1000/FPS);
  }

  function pauseGame(){
    window.addEventListener("keypress", (e) =>{
      if (e.key === 'p') {
        clearInterval(gameLoop);
        focoTimers.forEach((t) => {
          t.pause();
        })
        if(pause == null){
          pause = new Pause();
        }       
        
      }
    });
  }

  function resumeGame(){
    window.addEventListener("keypress", (e)=>{
      if(e.key === 'r'){
        resumeFocos();
        removePauseButton();
        setLooping();
      }
    })

    function removePauseButton(){
      reserva.element.removeChild(pause.element);
      pause = null;
    }

    function resumeFocos(){
      focoTimers.forEach((t) => t.resume());
    }
  }

  function setScenario(){
    reserva = new Reserva();
    lives = new Life();
    score = new Score();
  }

  function putEvils(){
    setFire();
    setSkulls();
  }

  function setFire() {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      foco.burning();
    }
  }

  function setSkulls(){
    let random = generateRandomTime(5,20);
    setTimeout(createSkull,random);

    function generateRandomTime(min,max){
      return (Math.floor(Math.random() * (max - min) ) + min)*1000;
    }

    function createSkull(){
      let skull = new Skull();
      // skull.burning();
    }
  }

  

  class Timer{
    constructor(callback, delay){
      this.timerId = delay;
      this.start = delay;
      this.remaining = delay;
      this.callback = callback;
    }

    pause(){
      window.clearTimeout(this.timerId);
      this.remaining -= Date.now() - this.start;
    }

    resume(){
      this.start = Date.now();
      window.clearTimeout(this.timerId);
      this.timerId = window.setTimeout(this.callback,this.remaining);
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
      generatePosition(this);
      reserva.element.appendChild(this.element);

      this.state = "burning";

      function generatePosition(self){
        let left = Math.floor((Math.random() * (gameDimensions[0]-devastationDims[0])));
        let top = Math.floor((Math.random() * (gameDimensions[1]-devastationDims[1])));

        while(isFireAtBigLake() || isFireAtSmallLake()){
          left = Math.floor((Math.random() * (gameDimensions[0]-devastationDims[0])));
          top = Math.floor((Math.random() * (gameDimensions[1]-devastationDims[1])));

        }

        self.element.style.left = `${left}px`;
        self.element.style.top = `${top}px`;

        function isFireAtBigLake(){
          return left > 670 && left < 1050 && top < 90;
        }
  
        function isFireAtSmallLake(){
          return top > 440 && top < 700 && left < 212;
        }
      }


    }

    burning(){
      var self = this;

      stillBurning();
      putOutFire();

      function stillBurning(){
        let timer = new Timer(devastation, 2000);
        focoTimers.push(timer);
        timer.resume();
      }

      function devastation(){
        if(self.state != "extinguished"){
          self.element.className += " foco-devastated";
          self.element.style.height = `${devastationDims[0]}px`;
          self.element.style.width = `${devastationDims[1]}px`;
          self.element.removeEventListener("click",extinguish);
          lives.loseLives(1);
          //todo: retirar da lista de focoTimers
        } 
      }

      function putOutFire(){
        self.element.addEventListener("click", extinguish);
      }

      function extinguish(){
        self.state = "extinguished";
        self.element.parentNode.removeChild(self.element);
        score.increaseScore(10);
      }

      
    }
      
  }

  class Skull{
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "skull";
      this.element.style.width = `${skullDims[0]}px`;
      this.element.style.height = `${skullDims[1]}px`;
      reserva.element.appendChild(this.element);
    }
  }

  class Life {
    constructor (){
      this.remainingLives = 5;
      this.element = document.createElement("div");
      this.element.className = "vida";
      this.element.style.width = `${this.remainingLives*lifeDimensions[0]}px`;
      this.element.style.height = `${lifeDimensions[1]}px`;
      document.body.appendChild(this.element);
    }

    loseLives(lives){
      if(this.remainingLives > 0){
        this.remainingLives -= lives;
        this.element.style.width = `${this.remainingLives*lifeDimensions[0]}px`;
      }
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

    increaseScore(points){
      this.num += points;
      this.element.innerHTML = this.num.toString().padStart(5, "0");
    }
  }

  class Pause{
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "pause";
      this.element.style.width = `${pauseDims[0]}px`;
      this.element.style.height = `${pauseDims[1]}px`;
      reserva.element.appendChild(this.element);
    }
  }

  


  init();
})();


//-----------melhorias
//todo: mostrar tela de "pressione S para começar!"