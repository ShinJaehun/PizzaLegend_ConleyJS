class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop(){
        const step = () => {
            // clear off the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            });

            // establish the camera person
            const cameraPserson = this.map.gameObjects.hero;

            // draw lower layer
            this.map.drawLowerImage(this.ctx, cameraPserson);

            // draw game objects
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y; // 이렇게 해서 object 아래에 hero의 머리가 밟히는 것을 수정할 수 있음!
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPserson);
            });

            // draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPserson);

            requestAnimationFrame(() => {
                step()
            });
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();
        // console.log(this.map.walls);
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();

        this.map.startCutscene([
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "npcA", type: "walk", direction: "left" },
            { who: "npcA", type: "walk", direction: "left" },
            { who: "npcA", type: "stand", direction: "up", time: 800 },
        ])
    }
}