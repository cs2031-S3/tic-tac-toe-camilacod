// comilla simple para variable global
// back : para externos

// then: carga la respuesta de lo anterior

// response: respuesta del servidor


function fetchPlayers() { // GET
    fetch('/players')
      .then(response => response.json()) // se obtiene la data
      .then(players => { // para pasar a html
        const playerTable = document.getElementById('player_table'); // obtener la tabla
        const tbody = playerTable.getElementsByTagName('tbody')[0]; // permite editar 
        tbody.innerHTML = ''; // Clear existing rows
        // players: lista de json
        players.forEach(player => { // Las promesas => espera la entrada, luego ejecuta la funcion
          const row = document.createElement('tr'); // type row
          row.innerHTML = `
            <td>${player.username}</td>
            <td>${player.password}</td>
            <td>
              <button onclick="editPlayer(${player.id})">Edit</button>
              <button onclick="deletePlayer(${player.id})">Delete</button>
            </td>
          `;
          tbody.appendChild(row);
        });
    });
}


function editPlayer(id){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var data = {"username":username, "password": password}

    fetch(`players/${id}`, { // api en la ruta, carga el id como parámetro
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "content-Type": "application/json"
        }
    }).then(response => response.text()) // obtener la respuesta
    .then(text => { //  actualizacion
        if (text === 'SUCCESS'){ // ejecutar fetchPlayers
            fetchPlayers()
        }
        else {
            alert("Error")
        }
    }) 
}

function createPlayer(){ // POST
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var data = {"username":username, "password": password}

    fetch(`players`, { // api en la ruta, carga el id como parámetro
        method: 'POST', // se envia un mensaje de request POST
        body: JSON.stringify(data),
        headers: {
            "content-Type": "application/json"
        }
    }).then(response => response.text()) // obtener la respuesta
    .then(text => { //  actualizacion
        if (text === 'SUCCESS'){ // ejecutar fetchPlayers
            fetchPlayers()
        }
        else {
            alert("Error")
        }
    }) 
}

function deletePlayer(id){ // POST
    fetch(`players/${id}`, { // api en la ruta, carga el id como parámetro
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
            "content-Type": "application/json"
        }
    }).then(response => response.text()) // obtener la respuesta
    .then(text => { //  actualizacion
        if (text === 'SUCCESS'){ // ejecutar fetchPlayers
            fetchPlayers()
        }
        else {
            alert("Error")
        }
    }) 
}

fetchPlayers() // Se ejecuta y lLama a la ruta /players con método get