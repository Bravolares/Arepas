// Variables de control del carrito
let carrito = [];
let total = 0;

function anadirAlCarrito(nombreProducto, precioBase, boton) {
    // Buscar la tarjeta contenedora del producto
    const tarjeta = boton.closest('.tarjeta-producto');
    
    // Obtener los extras seleccionados en esta tarjeta
    const checkboxesExtras = tarjeta.querySelectorAll('.extra-item:checked');
    
    let extrasSeleccionados = [];
    let precioExtras = 0;

    // Procesar cada extra marcado
    checkboxesExtras.forEach(checkbox => {
        extrasSeleccionados.push(checkbox.value);
        precioExtras += parseFloat(checkbox.getAttribute('data-precio'));
        
        // Limpiar el check después de añadirlo al pedido
        checkbox.checked = false;
    });

    // Sumar el precio base más los adicionales seleccionados
    const precioFinalProducto = precioBase + precioExtras;

    // Agregar objeto al arreglo
    carrito.push({
        nombre: nombreProducto,
        precio: precioFinalProducto,
        extras: extrasSeleccionados
    });

    // Acumular en el total general
    total += precioFinalProducto;

    // Actualizar la interfaz gráfica de inmediato
    actualizarInterfaz();
}

function actualizarInterfaz() {
    document.getElementById('contador-items').innerText = carrito.length;
    document.getElementById('total-precio').innerText = total.toLocaleString('es-CO');
}

function enviarPedido() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Añade algunas arepas primero.");
        return;
    }

    // Número de teléfono con código de país (Colombia: 57)
    var numeroTelefono = "573219163532"; 

    // Construcción del texto formateado para la comanda de WhatsApp
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

    // Enlace corregido con la barra diagonal "/" mandatoria
    var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
    
    // Ejecución de apertura de pestaña hacia WhatsApp
    window.open(urlWhatsApp, '_blank');
}
