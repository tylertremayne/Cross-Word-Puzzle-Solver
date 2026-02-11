
const rowInput = document.getElementById("row-input");
const rowsBtn = document.getElementById("rowsButton");

const colInput = document.getElementById("cols-input");
const colsBtn = document.getElementById("colsButton");

let userSearch = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

let tableBody = document.getElementById("tableOfElements");

const updateTable = document.getElementById("save-button");

let inputEvents = document.addEventListener("input", inputValidation);

let numOfCols = 5;
let numOfRows = 5;

function buildTable(){
    if(numOfRows <= 0 || numOfCols <= 0){
       console.log("return");
        return
    }

    tableBody.innerHTML = "";

    for(let i = 0; i < numOfRows; i++){
        let row = document.createElement("tr");

        for(let j = 0; j < numOfCols; j++){
            let cell = document.createElement("td");
            // cell.textContent = ` Row ${i + 1} Col ${j + 1}`;
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

function readTable(){

    let grid = [];

    let rows = document.querySelectorAll("tr");
    

    rows.forEach(row =>{
        let rowData = [];
        let cells = row.querySelectorAll("td");
        cells.forEach(cell => {
            
            rowData.push(cell.textContent);
        })

        grid.push(rowData);
    })

    console.log(grid);
    return grid;
}

function inputValidation(){

    let cells = document.querySelectorAll("td");

    cells.forEach(cell => {
            cell.addEventListener("input", () => {
                let val = cell.innerText.toUpperCase()

                val = val.replace(/[^A-Z]/g, "").slice(0,1);
                cell.innerText = val;
            })
    })
}

updateTable.addEventListener("click", readTable())

rowsBtn.addEventListener("click", function(){
    numOfRows = parseInt(rowInput.value);
    // console.log(numOfRows);
    buildTable();
});

colsBtn.addEventListener("click", function(){
    numOfCols = parseInt(colInput.value);
    // console.log(numOfCols);
    buildTable();
});

searchBtn.addEventListener("click", function(){
    userSearch = document.getElementById("search-input").value;
    // console.log(userSearch);
});








