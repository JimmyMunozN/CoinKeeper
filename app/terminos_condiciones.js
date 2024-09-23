function showTermsModal(event) {
    event.preventDefault();

    // Obtener el div existente con el ID 'modalTerminos'
    const modalTerminos = document.getElementById('modalTerminos');

    // Asignar el contenido al div (reemplazará cualquier contenido existente)
    modalTerminos.innerHTML = `
        <div class="modal-content-terminos">
            <span class="close_terminos" id="closeModalTerminos">&times;</span>
            <p class="texto_terminos">
            <strong>Términos y Condiciones de Uso de CoinKeeper</strong>
                    <br><br>
                    1. Introducción <br>
                    Bienvenido a CoinKeeper. Al acceder y utilizar esta plataforma de gestión contable, aceptas los términos y condiciones establecidos a continuación. Estos términos son vinculantes y aplicables a todos los usuarios de la plataforma. Si no aceptas alguna de las disposiciones aquí indicadas, te pedimos que dejes de utilizar el sitio inmediatamente. CoinKeeper se reserva el derecho de modificar estos términos en cualquier momento y sin previo aviso. Es tu responsabilidad revisar periódicamente esta página para estar al tanto de cualquier cambio.
                    <br><br>
                    2. Definiciones <br>
                    En estos Términos y Condiciones:
                    <br>
                    "Plataforma" se refiere a los servicios ofrecidos por CoinKeeper, incluidas todas las funcionalidades de gestión contable disponibles en nuestro sitio web y/o aplicación móvil. <br>
                    "Usuario" se refiere a cualquier persona o entidad que accede a la plataforma, ya sea de manera gratuita o mediante la contratación de algún servicio pago. <br>
                    "Servicios" se refiere a las herramientas de gestión contable, informes financieros, registro de ingresos y gastos, y otras funcionalidades proporcionadas por CoinKeeper. <br>
                    "Contenido" se refiere a toda la información, datos, textos, gráficos, imágenes, software, y otros materiales publicados, generados o proporcionados a través de CoinKeeper. <br><br>
                    3. Aceptación de los Términos <br>
                    Al crear una cuenta o utilizar los servicios de CoinKeeper, aceptas cumplir con todos los términos y condiciones establecidos aquí. Si eres una empresa o entidad, afirmas que tienes la autoridad para vincular a tu organización a estos términos. En caso de no estar de acuerdo con alguna parte de los términos, deberás abstenerte de utilizar la plataforma.
                    <br><br>
                    4. Registro de Usuario y Seguridad de la Cuenta <br>
                    Para utilizar ciertos servicios de CoinKeeper, es necesario que te registres y crees una cuenta. Debes proporcionar información veraz, completa y actualizada durante el proceso de registro. Eres responsable de mantener la confidencialidad de tu cuenta, así como de cualquier actividad realizada a través de la misma. CoinKeeper no se hace responsable de cualquier pérdida o daño derivado del incumplimiento de esta obligación. Si detectas un uso no autorizado de tu cuenta, debes notificarlo de inmediato.
                    <br><br>
                    5. Uso de los Servicios <br>
                    CoinKeeper proporciona herramientas para la gestión contable personal y empresarial. Al utilizar la plataforma, te comprometes a:
                    <br>
                    No usar los servicios para actividades ilegales o no autorizadas. <br>
                    No interferir con el funcionamiento adecuado de la plataforma, incluyendo el uso de virus o cualquier otro código malicioso. <br>
                    No intentar acceder a cuentas de otros usuarios o a cualquier sistema no autorizado por CoinKeeper. <br>
                    No revender, reproducir o redistribuir los servicios sin el consentimiento previo de CoinKeeper. <br>
                    CoinKeeper se reserva el derecho de suspender o cancelar cuentas de usuarios que incumplan estos términos o que realicen actividades fraudulentas o perjudiciales para la plataforma o terceros.
                    <br><br>
                    6. Responsabilidad del Usuario <br>
                    El uso de CoinKeeper es bajo tu propia responsabilidad. Si bien nos esforzamos por proporcionar una plataforma segura y eficiente, no garantizamos la precisión o integridad de la información generada a través de los servicios. Las decisiones financieras que tomes basadas en la información proporcionada por CoinKeeper son enteramente tu responsabilidad, y CoinKeeper no será responsable de ninguna pérdida directa, indirecta o consecuente derivada de dichas decisiones.
                    <br><br>
                    7. Pago y Suscripción a Servicios Premium <br>
                    Algunos servicios de CoinKeeper pueden estar disponibles mediante suscripción a un plan pago. Si decides suscribirte a estos servicios, se te cobrará una tarifa de acuerdo con el plan seleccionado. Las tarifas y términos de pago serán claramente indicados en la página de suscripción. CoinKeeper se reserva el derecho de modificar las tarifas de los servicios en cualquier momento, y cualquier cambio se te notificará con antelación.
                    <br><br>
                    8. Propiedad Intelectual <br>
                    Todos los derechos de propiedad intelectual relacionados con CoinKeeper, incluyendo su diseño, código, logotipos, marcas registradas, y otros contenidos, son propiedad exclusiva de CoinKeeper o de sus licenciantes. No está permitido copiar, distribuir, modificar o crear trabajos derivados de ninguno de los elementos de la plataforma sin el consentimiento previo por escrito de CoinKeeper.
                    <br><br>
                    9. Protección de Datos y Privacidad <br>
                    CoinKeeper se compromete a proteger la privacidad de sus usuarios. La información personal que proporciones durante el uso de la plataforma será tratada de acuerdo con nuestra Política de Privacidad, la cual puedes consultar en nuestra página web. Al aceptar estos términos, también aceptas la recopilación y uso de tus datos conforme a dicha política. CoinKeeper no compartirá ni venderá tu información personal a terceros sin tu consentimiento, excepto cuando sea necesario para cumplir con las obligaciones legales.
                    <br><br>
                    10. Limitación de Responsabilidad <br>
                    CoinKeeper no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente derivado del uso o la imposibilidad de uso de la plataforma. Esto incluye, pero no se limita a, la pérdida de ingresos, daños por interrupciones comerciales o pérdida de datos. En cualquier caso, la responsabilidad total de CoinKeeper por cualquier reclamación no excederá el monto pagado por el usuario durante los últimos 12 meses.
                    <br><br>
                    11. Modificaciones y Suspensión del Servicio <br>
                    CoinKeeper se reserva el derecho de modificar, suspender o discontinuar cualquier parte de la plataforma en cualquier momento, ya sea temporal o permanentemente, con o sin previo aviso. No seremos responsables ante los usuarios o terceros por cualquier modificación, suspensión o interrupción de los servicios.
                    <br><br>
                    12. Enlaces a Terceros <br>
                    La plataforma puede contener enlaces a sitios web de terceros. Estos sitios no están bajo el control de CoinKeeper, y no nos hacemos responsables por el contenido o prácticas de dichos sitios. La inclusión de cualquier enlace no implica una aprobación por parte de CoinKeeper.
                    <br><br>
                    13. Ley Aplicable y Jurisdicción <br>
                    Estos términos y condiciones se rigen por las leyes de [país o región], sin tener en cuenta sus disposiciones sobre conflictos de leyes. Cualquier disputa relacionada con el uso de CoinKeeper será resuelta ante los tribunales competentes de [jurisdicción aplicable].
                </p>
        </div>
    `;

    const closeModalTerminos = document.getElementById('closeModalTerminos');
    closeModalTerminos.addEventListener('click', () => {
        modalTerminos.style.display = 'none';
    });

    modalTerminos.style.display = 'block';
}

window.onclick = function(event) {
    const modalTerminos = document.getElementById('modalTerminos');
    if (modalTerminos && event.target === modalTerminos) {
        modalTerminos.style.display = 'none';
    }
};

document.getElementById('showTermsModalButton').addEventListener('click', showTermsModal);