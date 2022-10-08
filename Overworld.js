class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    init() {
        // console.log("Hello, from Overworld", this);
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0); // 꼭 이렇게 그려야하는거야?
        };
        image.src = "images/maps/DemoLower.png";

        const x = 5;
        const y = 6;
        
        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0, // sx
                0, // sy
                32, // sw
                32, // sj
                x * 16 - 8, // dx
                y * 16 - 18, // dy
                32, // dw
                32, // dh
            );
        };
        shadow.src = "images/characters/shadow.png";

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0, // sx
                0, // sy
                32, // sw
                32, // sj
                x * 16 - 8, // dx
                y * 16 - 18, // dy
                32, // dw
                32, // dh
            );
        };
        hero.src = "images/characters/people/hero.png";
    }
}