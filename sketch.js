const width = 500
const height = 500

const nbofSquare = 6
const rectWidth = width / nbofSquare
const rectHeight = height / nbofSquare
const myColor = ["grey","darkblue", "darkgreen"]
const fullArray = createArray()
function setup() {
    createCanvas(width, height);
    rect(0,0, width, height)
    frameRate(60)
    generate()
}

function createArray(){
    let column = new Array(nbofSquare)
    for(let i=0; i<column.length; i++){
        column[i] = new Array(nbofSquare)
    }
    return column
}
function sleep(millisecondsDuration)
{
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondsDuration);
    })
}

async function generate(){
    for(let i=0; i<nbofSquare; i++){
        for (let j=0; j<nbofSquare; j++){


                let cell = new Cell(i,j)
                // fill(cell.getColor())
                // rect(cell.posX*(width/nbofSquare),cell.posY*(width/nbofSquare),rectWidth,rectHeight)
                fullArray[i][j] = cell
            }

    }
    colorDefining(fullArray[Math.floor(Math.random()*fullArray.length)][Math.floor(Math.random()*fullArray.length)])

}

async function colorDefining(cell){
    //Take a random Cell to start
    await sleep(1000)


    fill(cell.getColor())
    rect(cell.posX*(width/nbofSquare),cell.posY*(width/nbofSquare),rectWidth,rectHeight)
    cell.setDone()
    analyze(cell)
}


function analyze(cell){
    const posY = cell.posY
    const posX = cell.posX

    // Above cell is [y-1][x]
    if(fullArray[cell.posX][cell.posY-1] !== undefined) {
        let aboveCell = fullArray[cell.posY-1][cell.posX]
        if(!aboveCell.isDone) {
        aboveCell.reduceColorChoices(cell.getColor())
    }    }

    // Right Cell is [x+1][y]
    if(fullArray[cell.posY][cell.posX+1] !== undefined) {
        let rightCell = fullArray[posY][posX+1]
        if(!rightCell.isDone) {
            rightCell.reduceColorChoices(cell.getColor())
    }}


    // Left Cell is [x-1][y]
    if(fullArray[cell.posY][cell.posX-1] !== undefined) {
        let leftCell = fullArray[posY][posX-1]
        if(!leftCell.isDone) {
        leftCell.reduceColorChoices(cell.getColor())
    }}

    // Under Cell is [x][y+1]
    if(fullArray[cell.posX][cell.posY+1] !== undefined ) {
        let underCell = fullArray[cell.posY+1][cell.posX]
        if(!underCell.isDone) {
            underCell.reduceColorChoices(cell.getColor())
        }
    }

    findMinEntropy()
}

function findMinEntropy(){
    for(let i=0; i<nbofSquare; i++){
        let found = fullArray[i].find(element => {
            if(element.isDone !== true) {
                return element.entropy < 3
            }
        })
        if(found){
            colorDefining(found)
        }
    }

}

