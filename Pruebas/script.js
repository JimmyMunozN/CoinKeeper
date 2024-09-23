document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var openPopupButton = document.getElementById('open-popup');
    var closeButton = document.querySelector('.close');
    var form = document.getElementById('popup-form');

    // Mostrar el pop-up
    openPopupButton.addEventListener('click', function() {
        popup.style.display = 'flex';
    });

    // Cerrar el pop-up
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario y la recarga de la página

        var data1 = document.getElementById('data1').value;
        var data2 = document.getElementById('data2').value;

        console.log('Data 1:', data1);
        console.log('Data 2:', data2);

        // Aquí puedes manejar los datos como desees

        // Ocultar el pop-up después de enviar
        popup.style.display = 'none';
    });
});