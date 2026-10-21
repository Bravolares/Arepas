let carrito = [];
let total = 0;
let urlUbicacionGps = ""; // Almacena la ubicación de fondo

// Solicitar GPS de forma segura al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    obtenerUbicacionSilenciosa();
});

function obtenerUbicacionSilenciosa() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(posicion) {
                let lat = posicion.coords.latitude;
                let lon = posicion.coords.longitude;
                urlUbicacionGps = "https://google.com" + lat + "," + lon;
                
                let indicador = document.getElementById('estado-gps');
                if(indicador) {
                    indicador.innerText = "📍 GPS Vinculado ✓";
                    indicador.style.color = "#2ecc71";
                }
            },
            function(error) {
                let indicador = document.getElementById('estado-gps');
                if(indicador) {
                    indicador.innerText = "📍 Dirección manual requerida";
                    indicador.style.color = "#e74c3c";
                }
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
        );
    }
}

function anadirAlCarrito(nombreProducto, precioBase, boton) {
    const tarjeta = boton.closest('.tarjeta-producto');
    const checkboxes = tarjeta.querySelectorAll('.extra-item:checked');
    
    let precioTotalProducto = precioBase;
    let extrasSeleccionados = [];

    checkboxes.forEach(cb => {
        precioTotalProducto += parseInt(cb.getAttribute('data-precio'));
        extrasSeleccionados.push(cb.value);
    });

    carrito.push({
        nombre: nombreProducto,
        precio: precioTotalProducto,
        extras: extrasSeleccionados
    });

    total += precioTotalProducto;
    document.getElementById('total-precio').innerText = total.toLocaleString('es-CO');
    document.getElementById('contador-items').innerText = carrito.length;

    tarjeta.querySelectorAll('.extra-item').forEach(cb => cb.checked = false);
    
    const textoOriginal = boton.innerText;
    boton.innerText = "¡Añadido! ✓";
    boton.style.backgroundColor = "#2ecc71"; 
    boton.style.color = "white";

    setTimeout(() => {
        boton.innerText = textoOriginal;
        boton.style.backgroundColor = "#f39c12"; 
        boton.style.color = "black";
    }, 1000);
}

function enviarPedido() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Añade algunas arepas primero.");
        return;
    }

    var numeroTelefono = "573219163532"; 

    var textoComanda = "=========================\n";
    textoComanda += "   NUEVO PEDIDO DE AREPAS\n";
    textoComanda += "=========================\n\n";

    carrito.forEach((item, index) => {
        textoComanda += (index + 1) + ". " + item.nombre + " ($" + item.precio.toLocaleString('es-CO') + ")\n";
        if (item.extras.length > 0) {
            textoComanda += "   Extras: " + item.extras.join(', ') + "\n";
        }
        textoComanda += "-------------------------\n";
    });

    textoComanda += "\nTOTAL A PAGAR: $" + total.toLocaleString('es-CO') + "\n\n";

    // Adjuntar la ubicación si fue capturada previamente
    if (urlUbicacionGps !== "") {
        textoComanda += "📍 Ubicación de entrega (Google Maps):\n" + urlUbicacionGps;
    } else {
        textoComanda += "📍 Ubicación: No compartida (Solicitar dirección de entrega texto).";
    }

    // Al ejecutarse directo en la acción del click, el navegador ya NO lo bloquea
    var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
    window.open(urlWhatsApp, '_blank');
}
