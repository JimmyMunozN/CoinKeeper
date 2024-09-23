//Menú grid
const menuButton = document.getElementById('menuButton');
const menuGrid = document.getElementById('menuGrid');

menuButton.addEventListener('click', function (e) {
    e.stopPropagation();
    menuGrid.classList.toggle('active');
});

document.addEventListener('click', function (e) {
    if (!menuGrid.contains(e.target) && !menuButton.contains(e.target)) {
    menuGrid.classList.remove('active');
    }
});

function cambiar_formulario() {
    const SELECCION = document.getElementById('calculos').value;

    document.getElementById('mod_prestamo').style.display = 'none';
    document.getElementById('mod_ahorro').style.display = 'none';
    document.getElementById('mod_meta').style.display = 'none';
    document.getElementById('mod_conversor').style.display = 'none';

    // Limpiar los resultados al cambiar de formulario
    document.getElementById('tabla_amortizacion').innerHTML = '';
    document.getElementById('resultado_ahorro').textContent = '';
    document.getElementById('resultado_meta').textContent = '';
    document.getElementById('resultado_conversor').textContent = '';

    if (SELECCION === 'prestamo') {
        document.getElementById('mod_prestamo').style.display = 'block';
    } else if (SELECCION === 'anualidad') {
        document.getElementById('mod_ahorro').style.display = 'block';
    } else if (SELECCION === 'meta') {
        document.getElementById('mod_meta').style.display = 'block';
    } else if (SELECCION === 'tasas') {
        document.getElementById('mod_conversor').style.display = 'block';
    }
}

function calcular_prestamo() {
    let valor = parseInt(document.getElementById('monto').value);
    let tasa = Math.pow((1 + parseFloat(document.getElementById('tasa').value) / 100), (1 / 12)) - 1;
    let plazo = parseInt(document.getElementById('periodo').value);
    let cuota = (valor * tasa) / (1 - Math.pow(1 + tasa, -plazo));

    if (isNaN(valor) || isNaN(tasa) || isNaN(plazo)) {
        Swal.fire({
            title: "ERROR",
            text: "Debes llenar todas las casillas con valores numericos",
            icon: "error"
        });
        return
    } else if (valor <= 0 || tasa <= 0 || plazo <= 0) {
        Swal.fire({
            title: "ERROR",
            text: 'Debes ingresar valores superiores a "0"',
            icon: "error"
        });
    }

    let tabla = [];
    let saldoPendiente = valor;

    for (let i = 1; i <= plazo; i++) {
        let interes = saldoPendiente * tasa;
        let amortizacion = cuota - interes;
        saldoPendiente -= amortizacion;

        tabla.push({
            numero: i,
            pago: cuota,
            interes,
            amortizacion,
            saldoPendiente
        });
    }

    mostrarTablaAmortizacion(tabla);

    // Limpiar campos de entrada
    document.getElementById('monto').value = '';
    document.getElementById('tasa').value = '';
    document.getElementById('periodo').value = '';
}

function mostrarTablaAmortizacion(tabla) {
    const contenedor = document.getElementById('tabla_amortizacion');

    contenedor.innerHTML = '';

    const tablaHTML = document.createElement('table');

    const encabezado = tablaHTML.createTHead();
    const filaEncabezado = encabezado.insertRow();
    const celdasEncabezado = ['Cuota N°', 'Pago', 'Interés', 'Amortización', 'Saldo'];
    celdasEncabezado.forEach(celda => {
        const th = document.createElement('th');
        th.textContent = celda;
        filaEncabezado.appendChild(th);
    });

    const cuerpo = tablaHTML.createTBody();
    tabla.forEach(celdas => {
        const fila = cuerpo.insertRow();
        Object.values(celdas).forEach(valor => {
            const celda = fila.insertCell();
            celda.textContent = valor.toFixed(0);
        });
    });

    contenedor.appendChild(tablaHTML);
}

function calcular_ahorro() {
    let monto = parseInt(document.getElementById('ahorro').value);
    let tasa = parseFloat(document.getElementById('interes').value);
    let periodos = parseInt(document.getElementById('meses').value);
    let total

    if (isNaN(monto) || isNaN(tasa) || isNaN(periodos)) {
        Swal.fire({
            title: "ERROR",
            text: "Debes ingresar valores numericos",
            icon: "error"
        });
        return
    } else if (monto <= 0 || periodos <= 0) {
        Swal.fire({
            title: "ERROR",
            text: 'Los campos "ahorro y meses" deben ser mayores a 0',
            icon: "error"
        });
    }

    if (tasa != 0) {
        total = monto * ((Math.pow(1 + tasa, periodos) - 1) / tasa);
    } else {
        total = monto * periodos;
    }

    document.getElementById('resultado_ahorro').textContent = 'El ahorro total será: $' + total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Limpiar campos de entrada
    document.getElementById('ahorro').value = '';
    document.getElementById('interes').value = '';
    document.getElementById('meses').value = '';
}

function calcular_meta() {
    let meta = parseInt(document.getElementById('meta').value);
    let tasa = parseFloat(document.getElementById('interes_meta').value);
    let periodos = parseInt(document.getElementById('meses_meta').value);
    let ahorro;

    if (isNaN(meta) || isNaN(tasa) || isNaN(periodos)) {
        Swal.fire({
            title: "ERROR",
            text: "Debes ingresar valores numericos",
            icon: "error"
        });
        return
    } else if (meta <= 0 || periodos <= 0) {
        Swal.fire({
            title: "ERROR",
            text: 'Los campos "Meta y meses" deben ser mayores a 0',
            icon: "error"
        });
    }

    if (tasa != 0) {
        ahorro = meta / ((Math.pow(1 + tasa, periodos) - 1) / tasa);
    } else {
        ahorro = meta / periodos;
    }

    document.getElementById('resultado_meta').textContent = 'El ahorro mensual necesario es: $' + ahorro.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Limpiar campos de entrada
    document.getElementById('meta').value = '';
    document.getElementById('interes_meta').value = '';
    document.getElementById('meses_meta').value = '';


}

function conversor_tasas() {
    let monto = parseFloat(document.getElementById('porcentaje').value) / 100;
    let tipo_1 = document.getElementById('tipo').value;
    let tipo_2 = document.getElementById('tipo_final').value;
    let resultado = 0;

    if (isNaN(monto)) {
        Swal.fire({
            title: "ERROR",
            text: "Debes llenar todas las casillas con valores numericos",
            icon: "error"
        });
        return
    } else if (monto <= 0) {
        Swal.fire({
            title: "ERROR",
            text: 'El campo "Tasa a convertir" debe tener valores superiores a "0"',
            icon: "error"
        });
    }
    
    if (tipo_1 == 'ma' && tipo_2 == 'mv') {
        resultado = monto / (1 - monto);
    } else if (tipo_1 == 'ma' && tipo_2 == 'ea') {
        resultado = Math.pow(((1 + monto) / (1 - monto)), 12) - 1;
    } else if (tipo_1 == 'mv' && tipo_2 == 'ma') {
        resultado = monto / (1 + monto);
    } else if (tipo_1 == 'mv' && tipo_2 == 'ea') {
        resultado = Math.pow((1 + monto), 12) - 1;
    } else if (tipo_1 == 'ea' && tipo_2 == 'ma') {
        resultado = Math.pow(1 + monto, 1/12) - 1;
    } else if (tipo_1 == 'ea' && tipo_2 == 'mv') {
        resultado = Math.pow((1 + monto), (1 / 12)) - 1;
    } else if (tipo_1 == tipo_2){
        Swal.fire({
            title: "ERROR",
            text: "La convinación de tasas ingresadas no son validas",
            icon: "error"
          });
    }

    resultado = resultado * 100;

    document.getElementById('resultado_conversor').textContent = 'La tasa a "' + tipo_2 + '" es: ' + resultado.toFixed(5) + '%';
}