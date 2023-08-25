// Fecha y hora de destino para la cuenta regresiva (en milisegundos)
const fechaDestino = new Date("2023-10-22T18:00:00").getTime();

// Actualizar la cuenta regresiva con animación cada segundo
setInterval(function() {
    const fechaActual = new Date().getTime();
    const diferencia = fechaDestino - fechaActual;

    if (diferencia <= 0) {
        // La cuenta regresiva ha terminado
        actualizarContador(0, 0, 0, 0);
    } else {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        actualizarContador(dias, horas, minutos, segundos);
    }
}, 1000);

// Función para actualizar el contador con animación
function actualizarContador(dias, horas, minutos, segundos) {
    const numeros = [dias, horas, minutos, segundos];
    const etiquetas = ["dias", "horas", "minutos", "segundos"];

    for (let i = 0; i < numeros.length; i++) {
        const elemento = document.getElementById(etiquetas[i]);
        elemento.textContent = numeros[i].toString().padStart(2, '0');
        elemento.style.animation = "bounce 0.5s";
        
        setTimeout(function() {
            elemento.style.animation = "";
        }, 500);
    }
}

let contadorDeVotos = 0;

const config = {
    type: 'doughnut',
    data: {
        labels: ['Votos', 'Restantes'],
        datasets: [{
            data: [0, 47000000], // Inicialmente, 0 votos y 100 votos restantes
            backgroundColor: ['#a72cf8', '#666'], // Colores de los sectores
        }]
    },
    options: {
        animation: {
            animateRotate: true, // Habilitar animación de rotación
            animateScale: true // Habilitar animación de escala
        }
    }
};

const ctx = document.getElementById('graficoVotos').getContext('2d');
const myChart = new Chart(ctx, config);

function votar() {
    if (contadorDeVotos === 0) {
        contadorDeVotos++;
        myChart.data.datasets[0].data[0]++; // Incrementar votos
        myChart.data.datasets[0].data[1]--; // Decrementar votos restantes
        myChart.update(); // Actualizar el gráfico
        document.getElementById("botonVotar").disabled = true;
    } else {
        alert("Ya has votado.");
    }
}




