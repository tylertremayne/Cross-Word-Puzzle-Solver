
const rowInput = document.getElementById("row-input");
const rowsBtn = document.getElementById("rowsButton");

const colInput = document.getElementById("cols-input");
const colsBtn = document.getElementById("colsButton");

let userSearch = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

let tableBody = document.getElementById("tableOfElements");

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
            cell.textContent = ` Row ${i + 1} Col ${j + 1}`;
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

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








