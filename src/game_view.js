export default class GameRouter {
  constructor(menu,game,tutorial,canvas){  
    this.menu = menu;
    this.game = game;
    this.tutorial = tutorial;
    this.ctx = canvas.getContext("2d");
    this.menuCtx = canvas.getContext("2d")
    this.lastTime = 0;
    this.title = document.getElementById("title-screen-text-wrapper")
    this.time = 0
  }


  start(){
    const menu = document.getElementById("menu")
    menu.addEventListener('mouseover', this.menu.selectMouseOver)
    menu.addEventListener('click', (e) => { this.selectEventCallback(e) })
    document.addEventListener('keydown', (e) => { this.selectEventCallback(e) })

  }

  selectEventCallback(e){
    const menu = document.getElementById("menu")
    if(e.keyCode == 13 && !menu.classList.contains("none")){
      this.select(this.menu.keyPressed(e))
    }else if(e.type == "click"){
      this.select(this.menu.selectMouseClick(e))
    }else{
      return this.menu.keyPressed(e)
    }
  }

  select(selection){
    if (selection.innerText === "Start Game" ) {
      const titleAudio = document.getElementById("title-audio")
      this.title.classList.remove("appearing");
      this.title.classList.add("disappearing");
      titleAudio.volume = 0.3
      this.game.ctx = this.ctx
      
      this.title.addEventListener("animationend", () => {
        this.title.classList.add("none");
        titleAudio.pause();      
        document.getElementById("battleView").classList.remove("none");
        this.game.start(this.menu);
      }, {once: true})
      requestAnimationFrame(this.gameAnimate.bind(this));

    }else if(selection.innerText === "How To Play"){
      const menu = new Menu("")
      this.tutorial.start(menu)
    }else{
    }
    // this.game.onSelect()
  }

  gameAnimate(time) {
    // const timeDelta = time - this.lastTime;
    this.time++
    // this.game.step(timeDelta);
    if(this.time > 17){
      if(this.game.aniDone){ 
        this.game.frame++
      }
      this.time = 0
      this.game.draw();
    }
    // this.game.drawBackground(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.gameAnimate.bind(this));
  };


}