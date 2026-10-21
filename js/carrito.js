let carrito = [];
let total = 0;
let urlUbicacionGps = ""; 

function obtenerUbicacion() {
    const botonGps = document.getElementById('btn-gps');
    if (!botonGps) return;

    botonGps.innerText = "⌛ Buscando...";
    botonGps.style.backgroundColor = "#7f8c8d";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(posicion) {
                let lat = posicion.coords.latitude;
                let lon = posicion.coords.longitude;
                urlUbicacionGps = "https://google.com" + lat + "," + lon;
                
                botonGps.innerText = "📍 GPS Vinculado ✓";
                botonGps.style.backgroundColor = "#2ecc71";
                botonGps.style.color = "white";
                botonGps.disabled = true; // Evita doble clic
            },
            function(error) {
                botonGps.innerText = "❌ Error al obtener GPS";
                botonGps.style.backgroundColor = "#e74c3c";
                botonGps.style.color = "white";
                setTimeout(() => {
                    botonGps.innerText = "📍 Vincular mi GPS";
                    botonGps.style.backgroundColor = "#34495e";
                }, 3000);
            },
            { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
        );
    } else {
        botonGps.innerText = "❌ No compatible";
        botonGps.style.backgroundColor = "#e74c3c";
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

    if (urlUbicacionGps !== "") {
        textoComanda += "📍 Ubicación de entrega (Google Maps):\n" + urlUbicacionGps;
    } else {
        textoComanda += "📍 Ubicación: No vinculada (Solicitar dirección escrita al cliente).";
    }

    var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
    window.open(urlWhatsApp, '_blank');
}
