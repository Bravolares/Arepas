let carrito = [];
let total = 0;

function anadirAlCarrito(nombreProducto, precioBase, boton) {
    // Buscar los checkboxes de extras dentro de la tarjeta de este botón
    const tarjeta = boton.closest('.tarjeta-producto');
    const checkboxes = tarjeta.querySelectorAll('.extra-item:checked');
    
    let precioTotalProducto = precioBase;
    let extrasSeleccionados = [];

    // Sumar el valor de los cuadros de selección marcados
    checkboxes.forEach(cb => {
        precioTotalProducto += parseInt(cb.getAttribute('data-precio'));
        extrasSeleccionados.push(cb.value);
    });

    // Guardar en el carrito
    carrito.push({
        nombre: nombreProducto,
        precio: precioTotalProducto,
        extras: extrasSeleccionados
    });

    // Actualizar los totales de la pantalla automáticamente
    total += precioTotalProducto;
    document.getElementById('total-precio').innerText = total.toLocaleString('es-CO');
    document.getElementById('contador-items').innerText = carrito.length;

    // Desmarcar los cuadros para el siguiente pedido
    tarjeta.querySelectorAll('.extra-item').forEach(cb => cb.checked = false);
    
    // EFECTO VISUAL FLUIDO: El botón cambia de color y texto por un segundo
    const textoOriginal = boton.innerText;
    boton.innerText = "¡Añadido! ✓";
    boton.style.backgroundColor = "#2ecc71"; // Cambia a verde
    boton.style.color = "white";

    setTimeout(() => {
        boton.innerText = textoOriginal;
        boton.style.backgroundColor = "#f39c12"; // Vuelve a tu amarillo/naranja
        boton.style.color = "black";
    }, 1000);
}

function enviarPedido() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Añade algunas arepas primero.");
        return;
    }

    // Tu número de Colombia configurado de manera estricta y limpia
    var numeroTelefono = "573219163532"; 

    // Construir el texto de la comanda
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

    textoComanda += "\nTOTAL A PAGAR: $" + total.toLocaleString('es-CO');

    // ENLACE TOTALMENTE SEGURO: Sin llaves, sin comillas invertidas, construido por partes fijas
    var urlWhatsApp = "https://wa.me/" + numeroTelefono + "?text=" + encodeURIComponent(textoComanda);
    
    // Abrir la aplicación de WhatsApp directamente
    window.open(urlWhatsApp, '_blank');
}
