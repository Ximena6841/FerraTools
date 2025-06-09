document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('contenedor-carrito');
    let totalGeneral = 0;
    let totalItems = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-center">No hay productos en el carrito.</p>';
    } else {
        let html = `
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`;

        carrito.forEach((producto, index) => {
            const total = producto.precio * producto.cantidad;
            totalGeneral += total;
            totalItems += producto.cantidad;

            html += `
                <tr>
                    <td><img src="${producto.imagen}" width="50"></td>
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio.toLocaleString()}</td>
                    <td>${producto.cantidad}</td>
                    <td>$${total.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger btn-sm eliminar-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
        });

        html += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" class="text-right"><strong>Total General:</strong></td>
                        <td><strong>$${totalGeneral.toLocaleString()}</strong></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="text-right mt-3">
            <button class="btn btn-danger mr-2" id="vaciar-carrito">
                Vaciar Carrito
            </button>
            <button class="btn btn-primary">
                Proceder al Pago
            </button>
        </div>`;

        contenedor.innerHTML = html;

        // Eventos para botones de eliminar
        document.querySelectorAll('.eliminar-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                location.reload(); // Recargar para ver cambios
            });
        });

        // Evento para vaciar carrito
        document.getElementById('vaciar-carrito').addEventListener('click', () => {
            localStorage.removeItem('carrito');
            location.reload();
        });
    }

    // Actualizar resumen del pedido en el checkout
    const totalItemsElem = document.getElementById('total-items');
    const subtotalPriceElem = document.getElementById('subtotal-price');
    const shippingPriceElem = document.getElementById('shipping-price');
    const totalPriceElem = document.getElementById('total-price');

    if (totalItemsElem && subtotalPriceElem && shippingPriceElem && totalPriceElem) {
        const shippingCost = totalGeneral > 0 ? 100 : 0; // Ejemplo: envío fijo 100 MXN si hay productos
        totalItemsElem.textContent = totalItems;
        subtotalPriceElem.textContent = totalGeneral.toFixed(2);
        shippingPriceElem.textContent = shippingCost.toFixed(2);
        totalPriceElem.textContent = (totalGeneral + shippingCost).toFixed(2);
    }

    
});
