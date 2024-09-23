window.onload = async function() {
    const correo_verificación = localStorage.getItem('correo');

    try {
        const response = await fetch(`http://localhost:8086/get-profile?correo=${correo_verificación}`);

        if (response.ok) {
            const data = await response.json();

            // Llenar campos del perfil
            nombre.value = data.nombre;
            edad.value = data.edad;
            correo.value = data.correo;
            telefono.value = data.telefono;

            // Llenar lista de idiomas
            idiomas = data.preferencia_idiomas.map((idioma) => ({ codigo: idioma.nombre, nombre: idioma.nombre }));
            crearListaIdiomas(idiomas);

            // Llenar lista de bancos
            bancos = data.preferencia_bancos.map((banco) => ({ codigo: banco.nombre, nombre: banco.nombre }));
            crearListaBancos(bancos);

            // Llenar preferencia de moneda
            document.getElementById('pref_monedas').value = data.preferencia_moneda;

        } else {
            const errorData = await response.json();
            console.error('Error al obtener perfil:', errorData.message);
        }
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
    }
};

function crearListaIdiomas(idiomas) {
    const lista = document.getElementById('idiomas');
    lista.innerHTML = '';

    idiomas.forEach((idioma, index) => {
        const item = document.createElement('li');
        item.textContent = idioma.nombre;
        lista.appendChild(item);

        // Configurar cursor y evento de clic
        if (modoEdicion_languages) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => editarIdioma(index));
        } else {
            item.style.cursor = 'default';
        }
    });
}

function crearListaBancos(bancos) {
    const lista = document.getElementById('bancos');
    lista.innerHTML = '';

    bancos.forEach((banco, index) => {
        const item = document.createElement('li');
        item.textContent = banco.nombre;
        lista.appendChild(item);

        // Configurar cursor y evento de clic
        if (modoEdicion_bank) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => editarBanco(index));
        } else {
            item.style.cursor = 'default';
        }
    });
}

function mostrarIdiomaModal(index) {
    idiomaModal.style.display = 'block';

    saveIdiomaButton.onclick = () => {
        const nuevoCodigo = idiomaSelect.value;
        const nuevoNombre = idiomaSelect.options[idiomaSelect.selectedIndex].text;

        if (nuevoCodigo) {
            idiomas[index].codigo = nuevoCodigo;
            idiomas[index].nombre = nuevoNombre;
            crearListaIdiomas(idiomas);
            idiomaModal.style.display = 'none';
        }
    };
}

function mostrarBancoModal(index) {
    bancoModal.style.display = 'block';

    saveBancoButton.onclick = () => {
        const nuevoCodigo = bancoSelect.value;
        const nuevoNombre = bancoSelect.options[bancoSelect.selectedIndex].text;

        if (nuevoCodigo) {
            bancos[index].codigo = nuevoCodigo;
            bancos[index].nombre = nuevoNombre;
            crearListaBancos(bancos);
            bancoModal.style.display = 'none';
        }
    };
}

function editarIdioma(index) {
    mostrarIdiomaModal(index);
}

function editarBanco(index) {
    mostrarBancoModal(index);
}

function activarModoEdicion_languages() {
    modoEdicion_languages = true;
    crearListaIdiomas(idiomas);
}

function desactivarModoEdicion_languages() {
    modoEdicion_languages = false;
    crearListaIdiomas(idiomas);
}

function activarModoEdicion_bank() {
    modoEdicion_bank = true;
    crearListaBancos(bancos);
}

function desactivarModoEdicion_bank() {
    modoEdicion_bank = false;
    crearListaBancos(bancos);
}

function enableEditing_profile() {
    nombre.removeAttribute('readonly');
    edad.removeAttribute('readonly');
    correo.removeAttribute('readonly');
    telefono.removeAttribute('readonly');
}


let modoEdicion_languages = false;
let modoEdicion_bank = false;

const nombre = document.getElementById('nombre');
const edad = document.getElementById('edad');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const contrasena = document.getElementById('contrasena');
const pref_idiomas = document.getElementById('idiomas');
const pref_bancos = document.getElementById('bancos');
const editButton_profile = document.getElementById('editButton');
const editButton_languages = document.getElementById('edit_languages');
const editButton_bank = document.getElementById('edit_bank');
const saveButton = document.getElementById('guardar');
const profileButton = document.getElementById('user_button');
const profile_options = document.getElementById('perfil_modal')

const idiomaModal = document.getElementById('idiomaModal');
const bancoModal = document.getElementById('bancoModal');
const idiomaSelect = document.getElementById('idiomaSelect');
const bancoSelect = document.getElementById('bancoSelect');
const saveIdiomaButton = document.getElementById('saveIdioma');
const saveBancoButton = document.getElementById('saveBanco');
const closeIdiomaModal = document.getElementById('closeIdiomaModal');
const closeBancoModal = document.getElementById('closeBancoModal');

closeIdiomaModal.onclick = () => {
    idiomaModal.style.display = 'none';
};

closeBancoModal.onclick = () => {
    bancoModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === idiomaModal) {
        idiomaModal.style.display = 'none';
    }
    if (event.target === bancoModal) {
        bancoModal.style.display = 'none';
    }
}

editButton_languages.addEventListener('click', activarModoEdicion_languages);
editButton_bank.addEventListener('click', activarModoEdicion_bank);
editButton_profile.addEventListener('click', enableEditing_profile);
saveButton.addEventListener('click', () => {
    nombre.setAttribute('readonly', 'true');
    edad.setAttribute('readonly', 'true');
    correo.setAttribute('readonly', 'true');
    telefono.setAttribute('readonly', 'true');
    desactivarModoEdicion_languages();
    desactivarModoEdicion_bank();
});

const cambios = document.getElementById('cambios');

saveButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Evitar comportamiento por defecto del botón

    // Capturar los idiomas seleccionados
    const listaIdiomas = Array.from(document.querySelectorAll('#idiomas li')).map((li, index) => {
        return {
            nombre: li.textContent,
        };
    });
    
    console.log('Idiomas seleccionados:', listaIdiomas); // Debugging

    const listaBancos = Array.from(document.querySelectorAll('#bancos li')).map((li, index) => {
        return {
            nombre: li.textContent,
        };
    });
    console.log('Bancos seleccionados:', listaBancos);
    // Capturar información personal
    const up_nombre = document.getElementById('nombre');
    const up_edad = document.getElementById('edad');
    const up_correo = document.getElementById('correo');
    const up_telefono = document.getElementById('telefono');

    // Capturar preferencia de moneda
    const up_moneda = document.getElementById('pref_monedas').value;

    // Crear un objeto con los datos capturados
    const updatedProfile = {
        nombre: up_nombre.value,
        edad: up_edad.value,
        correo: up_correo.value,
        telefono: up_telefono.value,
        preferencia_idiomas: listaIdiomas,
        preferencia_moneda: up_moneda,
        preferencia_bancos: listaBancos,
    };

    // Enviar los datos al servidor mediante una petición PUT
    try {
    const correo_verificación2 = localStorage.getItem('correo');
    const response = await fetch(`http://localhost:8086/update-profile/?correo=${correo_verificación2}`, {
        method: 'PUT', // Asegúrate de que el método sea PUT
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile) // Envía el objeto actualizado
    });

    if (response.ok) {
        alert('Perfil actualizado exitosamente');
        window.onload();
    } else {
        const errorData = await response.json();
        alert('Error al actualizar perfil: ' + errorData.message);
    }
} catch (error) {
    console.error('Error al enviar la solicitud:', error);
    alert('Ocurrió un error al actualizar el perfil');
}
});