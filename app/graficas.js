// Datos para el gráfico de barras
const barChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
        label: 'Ingresos',
        backgroundColor: '#507255',
        data: [1300000,1300000,1300000,1700000,1800000,2000000,1500000,1300000,1600000,1500000,1800000,2000000]
    }, {
        label: 'Gastos',
        backgroundColor: '#2d3047',
        data: [934023, 988585, 856241, 981423, 997265, 876750, 987217, 966996, 856610, 893282, 933984, 965048]
    }]
};

// Contenedores de ingresos y gastos
function calcularTotales() {
    const ingresos = barChartData.datasets[0].data.reduce((total, valor) => total + valor, 0);
    const gastos = barChartData.datasets[1].data.reduce((total, valor) => total + valor, 0);
    const utilidades = ((ingresos - gastos) / ingresos) * 100;

    document.getElementById('ingresos_totales').textContent = '$' + ingresos.toLocaleString();
    document.getElementById('gastos_totales').textContent = '$' + gastos.toLocaleString();
    document.getElementById('utilidades').textContent = utilidades.toFixed(2) + '%';
}

// Configuración del gráfico de barras
const barChartConfig = {
    type: 'bar',
    data: barChartData,
    options: {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar la relación de aspecto
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Crear el gráfico de barras
const barChart = new Chart(
    document.getElementById('barChart'),
    barChartConfig
);

// Datos para el gráfico de pastel
const pieChartData = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [{
        data: [19100000, 10927403],
        backgroundColor: ['#507255', '#2d3047'],
    }]
};

// Configuración del gráfico de pastel
const pieChartConfig = {
    type: 'pie',
    data: pieChartData,
    options: {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar la relación de aspecto
        plugins: {
            legend: {
                position: 'top',
            },
        }
    }
};

// Crear el gráfico de pastel
const pieChart = new Chart(
    document.getElementById('pieChart'),
    pieChartConfig
);

calcularTotales();