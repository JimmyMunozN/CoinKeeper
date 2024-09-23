
function cambiar_icono() {
    event.preventDefault();
    const icon = document.querySelector('.ver_contrasena i');
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');

    const ver = document.querySelector('.contrasena');
    if (ver.type === 'password') {
        ver.type = 'text';
    } else {
        ver.type = 'password';
    }
}

function cambiar_icono_2() {
    event.preventDefault();
    const icon = document.querySelector('.ver_contrasena_2 i');
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');

    const ver = document.querySelector('.contrasena_2');
    if (ver.type === 'password') {
        ver.type = 'text';
    } else {
        ver.type = 'password';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.formato_registro').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        // Captura los valores del formulario
        const usuario = document.getElementById('usuario_id').value;
        const correo = document.getElementById('correo_id').value;
        const edad = document.getElementById('edad_id').value;
        const contrasena = document.getElementById('contrasena_id').value;
        const telefono = document.getElementById('telefono_id').value;
        const contrasenaConfirmacion = document.getElementById('contrasena_2_id').value;

        // Verifica que las contraseñas coincidan
        if (contrasena !== contrasenaConfirmacion) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Verifica que el usuario haya aceptado los términos y condiciones
        const aceptaTerminos = document.getElementById('acepta_terminos').checked;
        if (!aceptaTerminos) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }

        try {
            // Envía los datos al servidor
            const response = await fetch('http://localhost:8086/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: usuario,
                    correo: correo,
                    edad: edad,
                    contrasena: contrasena,
                    telefono: telefono
                }),
            });

            // Maneja la respuesta del servidor
            if (response.ok) {
                const result = await response.text();
                alert(result);
                window.location.href = 'inicio_sesion.html';
            } else if (response.status === 400) {
                const error = await response.text();
                alert(error); // Mostrar el mensaje de "correo ya en uso"
            } else {
                const error = await response.text();
                alert('Error al registrar el usuario: ' + error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar el usuario');
        }
    });
});
