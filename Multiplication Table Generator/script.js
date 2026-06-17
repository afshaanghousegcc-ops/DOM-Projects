let table=document.getElementById("multiplicationTable")

let header=document.createElement("tr")

let thead1=document.createElement("th")
thead1.textContent="Number"

let thead2=document.createElement("th")
thead2.textContent="x5 Result"

header.appendChild(thead1)
header.appendChild(thead2)
table.appendChild(header)

for(let i=1;i<=10;i++){
    let row=document.createElement("tr")
    let col1=document.createElement("td")
    col1.textContent=i;
    let col2=document.createElement("td")
    col2.textContent=i*5
    row.appendChild(col1)
    row.appendChild(col2)
    table.appendChild(row)
}

table.style.border="2px solid black"
table.style.textAlign="center"
table.style.margin="40px auto"
table.style.borderCollapse="collapse"


let cell=table.querySelectorAll("th","td")
cell.forEach(cell => {
    cell.style.border="1px solid black"
    cell.style.padding="8px"
});