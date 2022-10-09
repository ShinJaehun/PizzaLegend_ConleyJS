class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop(){
        const step = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // console.log("stepping");
            // draw lower layer
            this.map.drawLowerImage(this.ctx);

            // draw game objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.x += 0.02;
                object.sprite.draw(this.ctx);
            });

            // draw upper layer
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => {
                step()
            });
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.Kitchen);
        this.startGameLoop();

        // console.log("Hello, from Overworld", this);
        // const image = new Image();
        // image.onload = () => {
        //     this.ctx.drawImage(image, 0, 0); // 꼭 이렇게 그려야하는거야?
        // };
        // image.src = "images/maps/DemoLower.png";

        // const x = 5;
        // const y = 6;
        
        // const shadow = new Image();
        // shadow.onload = () => {
        //     this.ctx.drawImage(
        //         shadow,
        //         0, // sx
        //         0, // sy
        //         32, // sw
        //         32, // sj
        //         x * 16 - 8, // dx
        //         y * 16 - 18, // dy
        //         32, // dw
        //         32, // dh
        //     );
        // };
        // shadow.src = "images/characters/shadow.png";

        // const hero = new Image();
        // hero.onload = () => {
        //     this.ctx.drawImage(
        //         hero,
        //         0, // sx
        //         0, // sy
        //         32, // sw
        //         32, // sj
        //         x * 16 - 8, // dx
        //         y * 16 - 18, // dy
        //         32, // dw
        //         32, // dh
        //     );
        // };
        // hero.src = "images/characters/people/hero.png";

        // const hero = new GameObject({
        //     x: 5,
        //     y: 6,
        // });

        // const npc1 = new GameObject({
        //     x: 7,
        //     y: 9,
        //     src: "images/characters/people/npc1.png"
        // });

        // setTimeout(() => {
        //     hero.sprite.draw(this.ctx);
        //     npc1.sprite.draw(this.ctx);
        // }, 200) 
    }
}