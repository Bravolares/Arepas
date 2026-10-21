function enviarPedido() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Añade algunas arepas primero.");
        return;
    }

    // Tu número de Colombia configurado de manera estricta y limpia
    var numeroTelefono = "573219163532"; 

    // Construir el texto base de la comanda
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

    textoComanda += "\nTOTAL A PAGAR: $" + total.toLocaleString('es-CO') + "\n";

    // Intentar obtener la ubicación GPS antes de enviar
    if (navigator.geolocation) {
        // Opción de configuración para alta precisión en móviles
        const opcionesGps = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            function(posicion) {
                // ÉXITO: El usuario aceptó el GPS
                var latitud = posicion.coords.latitude;
                var longitud = posicion.coords.longitude;
                
                textoComanda += "📍 Ubicación de entrega (Google Maps):\n";
                textoComanda += "https://google.com" + latitud + "," + longitud;

                // Enviar con el enlace integrado
                var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
                window.open(urlWhatsApp, '_blank');
            },
            function(error) {
                // ERROR O RECHAZO: El usuario no aceptó o falló el GPS
                textoComanda += "📍 Ubicación: No proporcionada por el cliente.";
                
                var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
                window.open(urlWhatsApp, '_blank');
            },
            opcionesGps
        );
    } else {
        // El navegador no es compatible con GPS (casos muy raros hoy en día)
        textoComanda += "📍 Ubicación: Navegador no compatible con GPS.";
        var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
        window.open(urlWhatsApp, '_blank');
    }
}
