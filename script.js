let table = document.getElementById('table');

function request(keyword) {
    const api = 'https://api.github.com/search/repositories?q=';
    fetch(api + keyword)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // limit to request is 10 per minute, 
        // so it is a good idea to add a button with onclick, not input with oninput event
        try {
            table.innerHTML = ''; //clear the table
            for (let i = 0; i < data.items.length; i++) {
                newTableRow(data.items[i].url);
            }
        } catch(err) {
            alert('Error occured: limit exceded or there is no result');
        }
    });
}

// this function creates new row in table with link [data = link]
function newTableRow(data) {
    let row = document.createElement('tr');
    let cell = document.createElement('td');
    let cell_btn = document.createElement('td');

    let link = document.createElement('a');
    link.href = data;
    link.innerHTML = data;
    cell.appendChild(link);

    let btn = document.createElement('button');
    // 
    btn.setAttribute("onClick", "addRepoToLocalStorage(this.parentNode.parentNode.getElementsByTagName('a')[0].href)");
    btn.innerHTML = "add to selected";
    cell_btn.appendChild(btn);

    row.appendChild(cell);
    row.appendChild(cell_btn);
    table.appendChild(row);
}

function addRepoToLocalStorage(repo) {
    localStorage.setItem('repo', repo);
}