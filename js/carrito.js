let carrito = [];
let total = 0;

function anadirAlCarrito(nombreProducto, precioBase, boton) {
    const tarjeta = boton.closest('.tarjeta-producto');
    const checkboxesExtras = tarjeta.querySelectorAll('.extra-item:checked');
    
    let extrasSeleccionados = [];
    let precioExtras = 0;

    checkboxesExtras.forEach(checkbox => {
        extrasSeleccionados.push(checkbox.value);
        precioExtras += parseFloat(checkbox.getAttribute('data-precio'));
        checkbox.checked = false; 
    });

    const precioFinalProducto = precioBase + precioExtras;

    carrito.push({
        nombre: nombreProducto,
        precio: precioFinalProducto,
        extras: extrasSeleccionados
    });

    total += precioFinalProducto;

    document.getElementById('contador-items').innerText = carrito.length;
    document.getElementById('total-precio').innerText = total.toLocaleString('es-CO');
}
