// Inicialización del estado del carrito
window.carrito = [];
window.total = 0;

function anadirAlCarrito(nombreProducto, precioBase, boton) {
    try {
        const tarjeta = boton.closest('.tarjeta-producto');
        const checkboxesExtras = tarjeta.querySelectorAll('.extra-item:checked');
        
        let extrasSeleccionados = [];
        let precioExtras = 0;

        checkboxesExtras.forEach(checkbox => {
            extrasSeleccionados.push(checkbox.value);
            precioExtras += parseFloat(checkbox.getAttribute('data-precio')) || 0;
            checkbox.checked = false; 
        });

        const precioFinalProducto = precioBase + precioExtras;

        window.carrito.push({
            nombre: nombreProducto,
            precio: precioFinalProducto,
            extras: extrasSeleccionados
        });

        window.total += precioFinalProducto;

        // Renderizar cambios en pantalla
        document.getElementById('contador-items').innerText = window.carrito.length;
        document.getElementById('total-precio').innerText = window.total.toLocaleString('es-CO');
    } catch (error) {
        console.error("Error al añadir al carrito:", error);
    }
}

function enviarPedido() {
    if (!window.carrito || window.carrito.length === 0) {
        alert("Tu carrito está vacío. Añade algunas arepas primero.");
        return;
    }

    var numeroTelefono = "573219163532"; 

    // Formatear el mensaje de texto de la comanda
    var textoComanda = "=========================\n";
    textoComanda += "   NUEVO PEDIDO DE AREPAS\n";
    textoComanda += "=========================\n\n";

    window.carrito.forEach((item, index) => {
        textoComanda += (index + 1) + ". " + item.nombre + " ($" + item.precio.toLocaleString('es-CO') + ")\n";
        if (item.extras && item.extras.length > 0) {
            textoComanda += "   Extras: " + item.extras.join(', ') + "\n";
        }
        textoComanda += "-------------------------\n";
    });

    textoComanda += "\nTOTAL A PAGAR: $" + window.total.toLocaleString('es-CO') + "\n";

    // Enlace limpio y verificado con barra "/" obligatoria
    var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
    
    // Abrir ventana hacia WhatsApp
    window.open(urlWhatsApp, '_blank');
}
