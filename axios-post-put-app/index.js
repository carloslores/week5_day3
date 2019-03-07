
/*

document.getElementById('post-wall-e').onclick = () => {

    // alert("Para Sofi <3")

    const character = {
        name: 'Robotito de pixar',
        occupation: 'Recoge basura espacial',
        weapon: 'Ninguna'
    }


    axios.post('https://ih-crud-api.herokuapp.com/characters', character)
        .then(response => {
            const info = `<li>${response.data.name} (id ${response.data.id}) <br>${response.data.occupation}</li>`
            document.getElementById('characters-list').innerHTML += info;
        })
        .catch(e => console.log(`¡Ops! Error: ${e}`))

}

*/



// Guardamos un array con cada juego de campos que comparten la misma clase
const nameFields = document.getElementsByClassName('the-name')
const occupationFields = document.getElementsByClassName('the-occupation')
const weaponFields = document.getElementsByClassName('the-weapon')



// Formulario para crear nuevo personaje
document.getElementById('character-form').onsubmit = e => {

    // Anulación del evento
    e.preventDefault()

    // Usamos el array de campos para apintar a los que están en el primer formulario y obtener su valor
    const character = {
        name: nameFields[0].value,
        occupation: occupationFields[0].value,
        weapon: weaponFields[0].value
    }

    axios.post('https://ih-crud-api.herokuapp.com/characters', character)
        .then(response => {

            // Inyectamos en el DOM la respuesta del servidor deconstruyendo el objeto
            const { name, occupation, id } = response.data

            const info = `<li>${name} (id ${id}) <br>${occupation}</li>`
            document.getElementById('characters-list').innerHTML += info;
        })
        .catch(e => console.log(`¡Ops! Error: ${e}`))

}


// Formulario de detalles de personaje por ID
document.getElementById('show-info-form').onsubmit = e => {
    e.preventDefault()

    const errorBoxes = document.getElementsByClassName('error');
    if (errorBoxes.length) {
        errorBoxes[0].remove()
    }

    const id = document.getElementById('char-id').value

    // Enviamos ID mediante AJAX e inyectamos detalles en campos
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${id}`)
        .then(response => {

            const { name, occupation, weapon } = response.data

            nameFields[1].value = name;
            occupationFields[1].value = occupation;
            weaponFields[1].value = weapon;
        })
        .catch(e => {

            // Gestionamos errores 404 creando div de error e inyectando
            if (e.response.status === 404) {
                const div = document.createElement('div')
                div.setAttribute('class', 'error')
                const text = document.createTextNode(`El ID ${id} no corresponde con ningún personaje`)
                div.appendChild(text)
                document.getElementById('update-form').appendChild(div)
            }
        })
}






document.getElementById('update-form').onsubmit = e => {

    e.preventDefault()

    const id = document.getElementById('char-id').value

    const newCharacterInfo = {
        name: nameFields[1].value,
        occupation: occupationFields[1].value,
        weapon: weaponFields[1].value
    }

    axios.put(`https://ih-crud-api.herokuapp.com/characters/${id}`, newCharacterInfo)
        .then(response => {
            const result = `El personaje ${response.data.name} ha sido actualizado`
            document.getElementById('character-result').textContent = result;
        })
        .catch(e => console.log(`¡Ops! Error: ${e}`))
}