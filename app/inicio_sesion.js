function cambiar_icono() {
    event.preventDefault();
    const icon = document.querySelector('#ver_contrasena i');
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');

    const ver = document.querySelector('.contrasena');
    if (ver.type === 'password') {
        ver.type = 'text';
    } else {
        ver.type = 'password';
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    function cambiar_icono() {
        event.preventDefault();
        const icon = document.querySelector('#ver_contrasena i');
        icon.classList.toggle('fa-eye-slash');
        icon.classList.toggle('fa-eye');

        const ver = document.querySelector('.contrasena');
        if (ver.type === 'password') {
            ver.type = 'text';
        } else {
            ver.type = 'password';
        }
    
    }
    
    // Manejo del envío del formulario
    document.querySelector('.formato_inicio').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        // Captura los valores del formulario
        const usuario = document.querySelector('.usuario').value;
        const contrasena = document.querySelector('.contrasena').value;

        localStorage.setItem('correo', usuario);

        try {
            // Envía los datos al servidor
            const response = await fetch('http://localhost:8086/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contrasena: contrasena,
                }),
            });

            // Maneja la respuesta del servidor
            const result = await response.text();
            alert(result);

            if (response.ok) {
                window.location.href = 'perfil.html';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al iniciar sesión');
        }
    });
});