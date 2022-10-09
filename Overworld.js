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

        const hero = new GameObject({
            x: 5,
            y: 6,
        });

        const npc1 = new GameObject({
            x: 7,
            y: 9,
            src: "images/characters/people/npc1.png"
        });

        setTimeout(() => {
            hero.sprite.draw(this.ctx);
            npc1.sprite.draw(this.ctx);
        }, 200) 
        // 여기까지 해 놓고 계속 refresh 해도 object가 보이지 않는 이유를 알 수 없는 문제가 발생했음.
        // 근데 이게 브라우저의 inspect 때문에 그려지는 위치가 벗어나 버린게 아닌가 싶다.
        // inspect 끄고 다시 refresh하면 정상적으로 보임.
        // 이런 비슷한 문제 해결방법 예전에 배웠던거 같은데... 어쨌든 계속 강좌를 따라가 보기로 함.

        

    }
}