
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

            row.push(``);

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
    // console.log(userSearch);
});








