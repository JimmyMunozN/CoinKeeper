class PasswordModal extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div id="modalOverlay" class="modal_overlay"></div>
            <div id="passwordModal" class="modal_password">
                <div class="modal-content-password">
                    <h2>Cambiar contraseña</h2>
                    <label for="newPassword">Nueva contraseña:</label>
                    <input type="password" id="newPassword">
                    <div class="botones_password">
                        <button id="savePasswordButton">Guardar</button>
                        <button id="closePasswordModal">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    connectedCallback() {
        this.querySelector('#savePasswordButton').addEventListener('click', this.savePassword.bind(this));
        this.querySelector('#closePasswordModal').addEventListener('click', this.hide.bind(this));
    }

    show() {
        this.querySelector('#modalOverlay').style.display = 'block';
        this.querySelector('#passwordModal').style.display = 'block';
    }

    hide() {
        this.querySelector('#modalOverlay').style.display = 'none';
        this.querySelector('#passwordModal').style.display = 'none';
    }

//ALEJANDRO EDITAR AQUI!!!!!!!
    async savePassword() {
        const nuevaContrasena = this.querySelector('#newPassword').value;
        if (nuevaContrasena) {
            try {
                const response = await fetch('http://localhost:8086/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: nuevaContrasena })
                });

                if (response.ok) {
                    alert('Contraseña actualizada exitosamente');
                    this.hide();
                } else {
                    Swal.fire({
                        title: "ERROR",
                        text: 'Error al actualizar la contraseña',
                        icon: "error"
                    });
                }
            } catch (error) {
                console.error('Error al actualizar la contraseña:', error);
                Swal.fire({
                    title: "ERROR",
                    text: 'Ocurrió un error al actualizar la contraseña',
                    icon: "error"
                });
            }
        } else {
            Swal.fire({
                title: "Aviso",
                text: 'Por favor, ingresa una nueva contraseña',
                icon: "info"
            });
        }
    }
}
//HASTA AQUI

customElements.define('password-modal', PasswordModal);

class MyHeader extends HTMLElement {
    connectedCallback() {
        const headerHTML = `
            <header>
                <nav class="navbar">
                    <div class="nav-left">
                        <button class="boton_menu" id="menuButton">
                            <div class="icono_grid">
                                <div class="item_menu"></div>
                                <div class="item_menu"></div>
                                <div class="item_menu"></div>
                                <div class="item_menu"></div>
                                <div class="item_menu"></div>
                                <div class="item_menu"></div>
                                <div class="item_menu"></div>
                                <div class="item_menu"></div>
                                <div class="item_menu"></div>
                            </div>
                        </button>
                        <img src="img/Logo_sin_fondo.png" alt="Logo" class="logo">
                    </div>
                    <div class="nav-right">
                        <div class="balance">
                            <span>Balance Total:</span>
                            <span id="balance-amount"></span>
                            <span id="moneda">COP</span>
                        </div>
                        <div class="user_logo" id="user_button">
                            <i class="fa-solid fa-user"></i>
                        </div>
                    </div>
                </nav>
            </header>
            <div class="menu_grid" id="menuGrid">
                <a href="perfil.html" class="menu_item">
                    <img src="img/logo_perfil.png" alt="Logo perfil de usuario">
                    Perfil
                </a>
                <a href="transacciones.html" class="menu_item">
                    <img src="img/logo_transacciones.png" alt="Logo transacciones">
                    Transacciones
                </a>
                <a href="calculadora.html" class="menu_item">
                    <img src="img/logo_calculadora.png" alt="Logo calculadora">
                    Calculadora
                </a>
                <a href="graficas.html" class="menu_item">
                    <img src="img/logo_graficos.png" alt="Logo reportes y graficas">
                    Reportes y graficas
                </a>
            </div>

            <div id="modalTerminos" class="modal_terminos"></div>

            <div id="perfil_modal" class="profile">
                <button onclick="window.location.href = 'perfil.html'">Mi perfil</button>
                <button id="changePasswordButton">Cambiar contraseña</button>
                <button id="showTermsModalButton">Términos y condiciones</button>
                <button onclick="help()"><i class="fa-solid fa-circle-info" style="color: #b3d9db;"></i>Ayuda</button>
                <div id="modalTerminos" class="modal_terminos"></div>
            </div>
        `;

        this.innerHTML = headerHTML;

        // Menú grid
        const menuButton = this.querySelector('#menuButton');
        const menuGrid = this.querySelector('#menuGrid');

        menuButton.addEventListener('click', function (e) {
            e.stopPropagation();
            menuGrid.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!menuGrid.contains(e.target) && !menuButton.contains(e.target)) {
                menuGrid.classList.remove('active');
            }
        });

        // Perfil de usuario
        const userProfileButton = this.querySelector('#user_button');
        const perfilModal = this.querySelector('#perfil_modal');
        const changePasswordButton = this.querySelector('#changePasswordButton');
        const passwordModal = document.querySelector('password-modal');

        function hideProfileModal() {
            perfilModal.classList.remove('active');
        }

        userProfileButton.addEventListener('click', function (e) {
            e.stopPropagation();
            perfilModal.classList.toggle('active');
        });
        
        document.addEventListener('click', function (e) {
            if (!perfilModal.contains(e.target) && !userProfileButton.contains(e.target)) {
                perfilModal.classList.remove('active');
            }
        });

        changePasswordButton.addEventListener('click', function () {
            if (passwordModal) {
                hideProfileModal();
                passwordModal.show();
            } else {
                console.error('El componente PasswordModal no está presente en el DOM.');
            }
        });
    }
}

customElements.define('my-header', MyHeader);