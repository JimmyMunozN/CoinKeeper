document.addEventListener('DOMContentLoaded', () => {

    const API_KEY = '688371db5c2fbc071548d271';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/COP`; // COP como moneda base
    let conversionRates = {};

    // Obtener tasas de cambio al cargar la página
    const obtenerTasasDeCambio = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            conversionRates = data.conversion_rates; // Guardar las tasas de conversión
            console.log('Tasas de cambio actualizadas:', conversionRates);
        } catch (error) {
            console.error('Error al obtener las tasas de cambio:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo obtener las tasas de cambio. Por favor, inténtalo más tarde.'
            });
        }
    };

    // Ejecutar la función para obtener las tasas de cambio al cargar la página
    document.addEventListener('DOMContentLoaded', obtenerTasasDeCambio);

    obtenerTasasDeCambio();
    setInterval(obtenerTasasDeCambio, 3600000);

    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const entryForm = document.getElementById('entryForm');
    const registerButton = document.querySelector('.total-container .btn');
    const stage1 = document.getElementById('modal-stage-1');
    const stage2 = document.getElementById('modal-stage-2');
    const transactionTypeInput = document.getElementById('transactionType');
    const formTitle = document.getElementById('form-title');
    const btnIncome = document.getElementById('btn-income');
    const btnExpenses = document.getElementById('btn-expenses');
    const btnBudgets = document.getElementById('btn-budgets');
    const showIncome = document.getElementById('showIncome');
    const showExpenses = document.getElementById('showExpenses');
    const showBudgets = document.getElementById('showBudgets');
    const historyTitle = document.getElementById('history-title');
    let totalIncome = 0;
    let totalExpenses = 0;
    const balanceUser = document.getElementById('balance-amount');
    const showAll = document.getElementById('showAll');

    const toggleModal = (show) => {
        modal.style.display = show ? 'block' : 'none';
        stage1.style.display = show ? 'block' : 'none';
        stage2.style.display = 'none';
    };

    registerButton.addEventListener('click', () => toggleModal(true));
    closeModal.addEventListener('click', () => toggleModal(false));
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    const showForm = (type) => {
        transactionTypeInput.value = type;
        formTitle.textContent = `Registrar nuevo ${type}`;
        stage1.style.display = 'none';
        stage2.style.display = 'block';
    };

    btnIncome.addEventListener('click', () => showForm('Ingreso'));
    btnExpenses.addEventListener('click', () => showForm('Gasto'));
    btnBudgets.addEventListener('click', () => showForm('Presupuesto'));

    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const date = document.getElementById('date').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const currency = document.getElementById('currency').value; // Moneda seleccionada por el usuario
        const total = parseFloat(document.getElementById('total').value);
        const type = transactionTypeInput.value;
        const category = document.getElementById('category').value;
    
        // Verificar que las tasas de conversión están cargadas correctamente
        if (!conversionRates || Object.keys(conversionRates).length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Tasas no disponibles',
                text: 'No se pudo obtener la tasa de cambio. Inténtalo de nuevo más tarde.',
            });
            return;
        }
    
        // Verificar si la moneda seleccionada tiene una tasa de cambio
        if (!conversionRates[currency]) {
            Swal.fire({
                icon: 'warning',
                title: 'Moneda no válida',
                text: 'Selecciona una moneda válida para realizar la conversión.',
            });
            return;
        }
    
        // Obtener la tasa de cambio de la moneda seleccionada
        const tasaDeCambio = conversionRates[currency]; // Toma la tasa de conversión específica
        const totalCOP = total / tasaDeCambio; // Conversión a COP (Pesos Colombianos)
    
        // Agregar la transacción a la tabla
        const table = document.querySelector('table tbody');
        const newRow = document.createElement('tr');
        newRow.classList.add(type.toLowerCase());
    
        newRow.innerHTML = `
            <td>${date}</td>
            <td>${category}</td>
            <td>${paymentMethod}</td>
            <td>${currency}</td>
            <td>$${total.toFixed(2)} ${currency}</td>
            <td>$${totalCOP.toFixed(2)} COP</td>
        `;
    
        table.appendChild(newRow);
    
        // Actualizar totales según el tipo de transacción
        if (type === 'Ingreso') {
            totalIncome += totalCOP;
        } else if (type === 'Gasto') {
            totalExpenses -= totalCOP;
        }
    
        updateTotal();
        toggleModal(false);
        entryForm.reset();
        stage1.style.display = 'block';
        stage2.style.display = 'none';
    });    

    const updateTotal = () => {
        const balanceCOP = totalIncome + totalExpenses;
        const totalElement = document.querySelector('.total');
        totalElement.textContent = `Total: $${balanceCOP.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} COP`;
        balanceUser.textContent = `$${balanceCOP.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} COP`;

        if (balanceCOP >= 0) {
            totalElement.style.color = 'green';
        } else {
            totalElement.style.color = 'red';
        }
    };

    const filterTable = (category, label) => {
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            if (category === 'Todos' || row.classList.contains(category.toLowerCase())) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        historyTitle.textContent = `Historial (${label})`;
    };

    showIncome.addEventListener('click', () => filterTable('Ingreso', 'Ingresos'));
    showExpenses.addEventListener('click', () => filterTable('Gasto', 'Gastos'));
    showBudgets.addEventListener('click', () => filterTable('Presupuesto', 'Presupuestos'));
    showAll.addEventListener('click', () => filterTable('Todos', 'Total'));

    // Categoría
    const categorySelect = document.getElementById('category');
    const newCategoryInput = document.getElementById('newCategoryInput');

    categorySelect.addEventListener('change', () => {
        if (categorySelect.value === 'Agregar nuevo') {
            newCategoryInput.style.display = 'inline';
            newCategoryInput.focus();
        } else {
            newCategoryInput.style.display = 'none';
        }
    });

    newCategoryInput.addEventListener('blur', () => {
        const newCategory = newCategoryInput.value.trim();
        if (newCategory) {
            const option = document.createElement('option');
            option.textContent = newCategory;
            option.value = newCategory;
            categorySelect.insertBefore(option, categorySelect.querySelector('option[value="Agregar nuevo"]'));
            categorySelect.value = newCategory;
        }
        newCategoryInput.style.display = 'none';
        newCategoryInput.value = '';
    });
});