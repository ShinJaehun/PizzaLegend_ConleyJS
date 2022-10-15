class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        // this.direction = "right";
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            // case: keboard ready and arrow pressed
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(); // 여기 state는 삭제해도 되는거지?
        }
    }

    startBehavior(state, behaivor) {
        // set charater direction to whatever behaivor has 
        this.direction = behaivor.direction;

        if (behaivor.type === "walk") {
            // console.log(state.map.isSpaceTaken(this.x, this.y, this.direction));

            // stop here if space is not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                behaivor.retry && setTimeout(() => {
                    this.startBehavior(state, behaivor);
                }, 10)
                
                return;
            }

            // ready to walk
            state.map.moveWall(this.x, this.y, this.direction); // 이게 있어야 spawn 지점의 wall이 사라짐
            this.movingProgressRemaining = 16;
            this.updateSprite(state);
        }

        if (behaivor.type === "stand") {
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
            }, behaivor.time)
        }
    }

    updatePosition(){
        // console.log('hello');
        const [property, change] = this.directionUpdate[this.direction]; // 아 이런 식으로 쓸 수 있구나!
        this[property] += change;
        // console.log(this[property]);
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
            // finished the walk
            // const event = new CustomEvent("PersonWalkingComplete", {
            //     detail: {
            //         whoId: this.id
            //     }
            // });
            // document.dispatchEvent(event);
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }

        this.sprite.setAnimation("idle-"+this.direction);

        // if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
        //     this.sprite.setAnimation("idle-"+this.direction);
        //     return;
        // }

    }
}