let carrito = [];
let total = 0;

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

    // Solicitar ubicación GPS nativa del dispositivo
    if (navigator.geolocation) {
        const opcionesGps = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            function(posicion) {
                var latitud = posicion.coords.latitude;
                var longitud = posicion.coords.longitude;
                
                textoComanda += "📍 Ubicación de entrega (Google Maps):\n";
                textoComanda += "https://google.com" + latitud + "," + longitud;

                var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
                window.open(urlWhatsApp, '_blank');
            },
            function(error) {
                textoComanda += "📍 Ubicación: No proporcionada por el cliente.";
                
                var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
                window.open(urlWhatsApp, '_blank');
            },
            opcionesGps
        );
    } else {
        textoComanda += "📍 Ubicación: Navegador no compatible con GPS.";
        var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
        window.open(urlWhatsApp, '_blank');
    }
}
