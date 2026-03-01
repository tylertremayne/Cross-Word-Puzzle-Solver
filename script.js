
const rowInput = document.getElementById("row-input");
const rowsBtn = document.getElementById("rowsButton");

const colInput = document.getElementById("cols-input");
const colsBtn = document.getElementById("colsButton");

let userSearch = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const updateBtn = document.getElementById("save-button");

let inputEvents = document.addEventListener("input", inputValidation);

let numOfCols = 5;
let numOfRows = 5;

let tableContents = [];

function buildTable(){

    let table = document.getElementById("tableOfElements");

    table.innerHTML = "";

    tableContents.forEach((row) => {
        let rowElement = document.createElement("tr");
        row.forEach((cell) =>{
            let dataElement = document.createElement("td");
            dataElement.setAttribute("contenteditable" , "true");
            dataElement.textContent = cell;

            rowElement.appendChild(dataElement);
        })
        table.appendChild(rowElement);
    })
    
}

function modifyTable(){

    let holdValues = tableContents;
    
    tableContents = [];

    for(let r = 0; r < numOfRows; r++){
        let row = [];
        for(let c = 0; c< numOfCols; c++){
            row.push(``)
        }
        tableContents.push(row);
    }

    for(let i = 0; i < tableContents.length; i++){
        for(let j = 0; j < tableContents[i].length; j++){
            if(i < holdValues.length && j < holdValues[i].length){
                tableContents[i][j] = holdValues[i][j];
            } else{
                tableContents[i][j] = "";   
            }
        }
    }
    buildTable();

}

function readTable(){
    tableContents = [];

    let rows = document.querySelectorAll("tr");
    

    rows.forEach(row =>{
        let rowData = [];
        let cells = row.querySelectorAll("td");
        cells.forEach(cell => {
            
            rowData.push(cell.textContent);
        })

        tableContents.push(rowData);
    })
}

readTable();



function searchWord(){
    const directions = [
        {name:"left",     dr: 0, dc: -1},
        {name:"right",       dr:0, dc:1},
        {name: "up",       dr: -1, dc:0},
        {name:"down",      dr: 1, dc: 0},
        {name:"up-left",   dr:-1, dc:-1},
        {name:"up-right",   dr:-1, dc:1},
        {name:"down-left",  dr:1, dc:-1},
        {name:"down-right",  dr:1, dc:1}
    ]

    function isInsideGrid(row,col){
        return(
            row >= 0 && row < tableContents.length
            && col >=0 && col < tableContents[row].length
        )
    }

    function getLetter(row, col){
        if(!isInsideGrid(row, col)){
            return null;
        }else{
            return tableContents[row][col]
        }
    }

  
    for (let row = 0; row < tableContents.length; row++) {
        for (let col = 0; col < tableContents[row].length; col++) {
            if (getLetter(row, col) !== userSearch[0]) continue;
            for (const dir of directions) {

                let matchedLetters = []
                let matches = true    

                for (let k = 0; k < userSearch.length; k++) {
                    const checkRow = row + dir.dr * k;
                    const checkCol = col + dir.dc * k;
                    if (getLetter(checkRow, checkCol) !== userSearch[k]) {
                        matches = false;
                        break;
                    }

                    matchedLetters.push(getLetter(checkRow, checkCol));
                }

                if (matches) {
                    return {
                        found: true,
                        start: { row, col },
                        direction: dir.name,
                        letters: matchedLetters
                    };
                }
            }
        }   
    }

  return { found: false };
} 

function highlightWord(result){
    
    const directionMap = {
        "left":       { dr: 0, dc: -1 },
        "right":      { dr: 0, dc: 1 },
        "up":         { dr: -1, dc: 0 },
        "down":       { dr: 1, dc: 0 },
        "up-left":    { dr: -1, dc: -1 },
        "up-right":   { dr: -1, dc: 1 },
        "down-left":  { dr: 1, dc: -1 },
        "down-right": { dr: 1, dc: 1 }
    };

    let table = document.getElementById("tableOfElements");

    const dir = directionMap[result.direction];

    for (let k = 0; k < result.letters.length; k++) {
        const row = result.start.row + dir.dr * k;
        const col = result.start.col + dir.dc * k;

        const cell = table.rows[row].cells[col];
        cell.style.backgroundColor = "green";
    }
}

function clearHighlights() {
  let table = document.getElementById("tableOfElements");

  for (let r = 0; r < table.rows.length; r++) {
    for (let c = 0; c < table.rows[r].cells.length; c++) {
      table.rows[r].cells[c].style.backgroundColor = "";
    }
  }
}

function inputValidation(){

    let cells = document.querySelectorAll("td");

    cells.forEach(cell => {
            cell.addEventListener("input", () => {
                let val = cell.innerText.toUpperCase()

                val = val.replace(/[^A-Z] && [^0-9]/g, "").slice(0,1);
                cell.innerText = val;
            })
    })
}

updateBtn.addEventListener("click", readTable)

rowsBtn.addEventListener("click", function(){

    numOfRows = parseInt(rowInput.value);
    // console.log(numOfRows);
    modifyTable();
});

colsBtn.addEventListener("click", function(){
    numOfCols = parseInt(colInput.value);
    // console.log(numOfCols);
    modifyTable();
});

searchBtn.addEventListener("click", function(){
    userSearch = document.getElementById("search-input").value;
    
    clearHighlights()
    const result = searchWord();
    highlightWord(result)
    // console.log(`FOUND: ${JSON.stringify(result)}`)
});








