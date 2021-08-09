window.addEventListener("load", () => {
    start();
    loadItems();
});
var idCount = 0;
var option;

function start() {

    option = document.getElementById("drinks");
    option.addEventListener("change", displayImage);

    var addBtn = document.getElementById("add");
    addBtn.addEventListener("click", addItem);

    var removeBtn = document.getElementById("removeBtn");
    removeBtn.addEventListener("click", removeItem);

    var updateBtn = document.getElementById("updateBtn");
    updateBtn.addEventListener("click", updateItem);

    var saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener("click", saveItems);
}

function displayImage() {
    var holder = document.querySelector("#holder");
    holder.textContent = ""

    var pic = option.value;
    var img = document.createElement('img');
    img.setAttribute("src", "images/" + pic + ".jpeg");
    img.setAttribute("alt", pic + " image");
    img.setAttribute("height", "200px");
    img.setAttribute("width", "200px");

    holder.appendChild(img);
    holder.style.border = "0px"
}

function addItem() {
    var cups = document.querySelector("#cupsnum");

    var quantity = cups.value;
    var drink = option.value;

    if (quantity <= 0) {
        window.alert("Please fix the number of cups needed!");
    } else {
        var id = "item" + idCount;
        idCount++;

        var table = document.querySelector("#orderSum");
        var rowLength = table.rows.length;
        var tr = document.createElement("tr");
        table.appendChild(tr, rowLength);
        //var tr = table.insertRow(rowLength);
        tr.setAttribute("id", id);

        var cell1 = document.createElement("td");
        tr.appendChild(cell1);

        var cell2 = document.createElement("td");
        tr.appendChild(cell2);

        var cell3 = document.createElement("td");
        tr.appendChild(cell3);

        /*var cell1 = tr.insertCell(0);
        var cell2 = tr.insertCell(1);
        var cell3 = tr.insertCell(2);*/

        cell1.innerHTML = id;
        cell2.innerHTML = drink;
        cell3.innerHTML = quantity;
    }
}

function removeItem() {
    var idInput = document.querySelector("#itemId");
    var idRemove = idInput.value;

    var rowintable = document.getElementById(idRemove);
    var parent = rowintable.parentNode;
    parent.removeChild(rowintable);
}

function updateItem() {
    var idInput = document.querySelector("#itemId2");
    var cupsInput = document.querySelector("#cupsNb");

    var idval = idInput.value;
    var cupsval = cupsInput.value;

    var rowintable = document.getElementById(idval);
    rowintable.cells[2].innerHTML = cupsval;
}

function saveItems() {
    var itemsArr = [];
    var table = document.querySelector("#orderSum");
    var length = table.rows.length;
    for (i = 1; i < length; i++) {
        var row = table.rows[i];
        id = row.cells[0].innerText
        drink = row.cells[1].innerText;
        quantity = row.cells[2].innerText;

        var item = itemHelper(id, drink, quantity);
        itemsArr.push(item);
        // console.log(itemsArr);
    }
    localStorage.setItem("Items", JSON.stringify(itemsArr));

}

function itemHelper(id, drink, quantity) {
    return { itemId: id, drink: drink, numCups: quantity };
}

function loadItems() {
    if (document.cookie.indexOf('mycookie') == -1) {
        //first visit > data should not be saved and table is empty
        document.cookie = 'mycookie=1';
    } else {
        //already there exist saved data
        var array = JSON.parse(localStorage.getItem("Items"));
        for (i = 0; i < array.length; i++) {
            var table = document.querySelector("#orderSum");
            var rowLength = table.rows.length;
            var tr = table.insertRow(rowLength);
            tr.setAttribute("id", array[i].itemId);

            var cell1 = tr.insertCell(0);
            var cell2 = tr.insertCell(1);
            var cell3 = tr.insertCell(2);

            cell1.innerHTML = array[i].itemId;
            cell2.innerHTML = array[i].drink;
            cell3.innerHTML = array[i].numCups;
        }
    }
}