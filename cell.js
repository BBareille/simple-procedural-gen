class Cell{

//rules : color darkblue and darkgreen can't be next to each other
    colorChoice = ["grey","darkblue", "darkgreen"];
    entropy = 3
    posX;
    posY;
    isDone = false;
    constructor(posY, posX) {
        this.posX = posX;
        this.posY = posY;
    }


    getColor(){
        if(this.entropy > 1){
            this.colorChoice = this.colorChoice[Math.floor(Math.random() * this.entropy)]
            this.entropy = 1
        }

        return this.colorChoice
    }

    setDone(){
        this.isDone = true;
    }

    reduceColorChoices(color){
        this.colorChoice = this.colorChoice.filter(item => {
            return item !== color
        })
        this.entropy = this.colorChoice.length;
    }

}