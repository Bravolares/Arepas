// Variables globales para almacenar el estado del carrito
let carrito = [];
let total = 0;

function anadirAlCarrito(nombreProducto, precioBase, boton) {
    // 1. Encontrar la tarjeta del producto donde se hizo clic
    const tarjeta = boton.closest('.tarjeta-producto');
    
    // 2. Buscar qué extras (checkboxes) están marcados dentro de esa tarjeta
    const checkboxesExtras = tarjeta.querySelectorAll('.extra-item:checked');
    
    let extrasSeleccionados = [];
    let precioExtras = 0;

    // 3. Procesar los extras seleccionados
    checkboxesExtras.forEach(checkbox => {
        extrasSeleccionados.push(checkbox.value);
        precioExtras += parseFloat(checkbox.getAttribute('data-precio'));
        
        // Opcional: Desmarcar el checkbox después de añadirlo
        checkbox.checked = false;
    });

    // 4. Calcular el precio final de este producto individual
    const precioFinalProducto = precioBase + precioExtras;

    // 5. Crear el objeto del producto y meterlo al carrito
    const itemCarrito = {
        nombre: nombreProducto,
        precio: precioFinalProducto,
        extras: extrasSeleccionados
    };

    carrito.push(itemCarrito);

    // 6. Actualizar el acumulador del total de dinero
    total += precioFinalProducto;

    // 7. Actualizar la interfaz visual (los números en el HTML)
    actualizarInterfaz();
}

function actualizarInterfaz() {
    // Cambiar el contador de items
    document.getElementById('contador-items').innerText = carrito.length;
    
    // Cambiar el texto del precio total formateado
    document.getElementById('total-precio').innerText = total.toLocaleString('es-CO');
}

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

    // Enlace directo a WhatsApp sin bloques de GPS que arruinen el código
    var urlWhatsApp = "https://wa.me" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
    window.open(urlWhatsApp, '_blank');
}
