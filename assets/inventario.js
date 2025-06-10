// ================== OPCIONES DE CATEGORÍAS Y PROVEEDORES ==================
const categoriasDisponibles = [
    "Electrónica",
    "Accesorios",
    "Muebles",
    "Oficina",
    "Redes",
    "Papelería",
    "Limpieza",
    "Alimentos",
    "Ropa",
    "Sin categoría"
];

const proveedoresDisponibles = [
    "Distribuidora Central",
    "OfiProveedores",
    "Redes y Más",
    "Muebles Express",
    "Papelería El Sol",
    "Limpieza Total",
    "Alimentos Selectos",
    "Ropa Moderna",
    "ElectroMundo",
    "Proveedora General"
];

// ================== DATOS INICIALES ==================
const productosIniciales = [
    { nombre: "Laptop HP 14", categoria: "Electrónica", stock: 10, precio: 9500.00 },
    { nombre: "Mouse Logitech M185", categoria: "Accesorios", stock: 30, precio: 250.00 },
    { nombre: "Monitor Samsung 24\"", categoria: "Electrónica", stock: 8, precio: 3200.00 },
    { nombre: "Teclado Redragon Kumara", categoria: "Accesorios", stock: 15, precio: 650.00 },
    { nombre: "Silla ergonómica", categoria: "Muebles", stock: 3, precio: 2100.00 },
    { nombre: "Cámara web Full HD", categoria: "Electrónica", stock: 20, precio: 780.00 },
    { nombre: "Impresora Epson L3150", categoria: "Oficina", stock: 5, precio: 4200.00 },
    { nombre: "Router TP-Link Archer", categoria: "Redes", stock: 8, precio: 1100.00 },
    { nombre: "Resma de papel", categoria: "Papelería", stock: 50, precio: 120.00 },
    { nombre: "Detergente Multiusos", categoria: "Limpieza", stock: 25, precio: 85.00 }
];

const comprasIniciales = [
    {
        proveedor: "Distribuidora Central",
        producto: "Laptop HP 14",
        cantidad: 10,
        fecha: "2024-06-01",
        recibido: "Sí"
    },
    {
        proveedor: "OfiProveedores",
        producto: "Impresora Epson L3150",
        cantidad: 5,
        fecha: "2024-06-03",
        recibido: "Sí"
    },
    {
        proveedor: "Redes y Más",
        producto: "Router TP-Link Archer",
        cantidad: 8,
        fecha: "2024-06-05",
        recibido: "Sí"
    },
    {
        proveedor: "Muebles Express",
        producto: "Silla ergonómica",
        cantidad: 3,
        fecha: "2024-06-07",
        recibido: "Sí"
    },
    {
        proveedor: "Papelería El Sol",
        producto: "Resma de papel",
        cantidad: 50,
        fecha: "2024-06-08",
        recibido: "Sí"
    },
    {
        proveedor: "Limpieza Total",
        producto: "Detergente Multiusos",
        cantidad: 25,
        fecha: "2024-06-09",
        recibido: "Sí"
    },
    {
        proveedor: "Alimentos Selectos",
        producto: "Café Gourmet",
        cantidad: 15,
        fecha: "2024-06-10",
        recibido: "No"
    },
    {
        proveedor: "Ropa Moderna",
        producto: "Playera Polo",
        cantidad: 40,
        fecha: "2024-06-11",
        recibido: "No"
    },
    {
        proveedor: "ElectroMundo",
        producto: "Cámara web Full HD",
        cantidad: 20,
        fecha: "2024-06-12",
        recibido: "Sí"
    },
    {
        proveedor: "Proveedora General",
        producto: "Silla ergonómica",
        cantidad: 2,
        fecha: "2024-06-13",
        recibido: "No"
    }
];

// ================== VENTAS INICIALES (10 ventas de la última semana, productos existentes) ==================
function fechaDiasAtras(dias) {
    const d = new Date();
    d.setDate(d.getDate() - dias);
    return d.toISOString().slice(0, 10);
}
const ventasIniciales = [
    { productoIdx: 0, cantidad: 2, cliente: "Juan Pérez", fecha: fechaDiasAtras(7) }, // Laptop HP 14
    { productoIdx: 1, cantidad: 5, cliente: "Ana López", fecha: fechaDiasAtras(6) }, // Mouse Logitech M185
    { productoIdx: 2, cantidad: 1, cliente: "Carlos Ruiz", fecha: fechaDiasAtras(5) }, // Monitor Samsung 24"
    { productoIdx: 3, cantidad: 3, cliente: "María Torres", fecha: fechaDiasAtras(4) }, // Teclado Redragon Kumara
    { productoIdx: 4, cantidad: 1, cliente: "Luis Gómez", fecha: fechaDiasAtras(3) }, // Silla ergonómica
    { productoIdx: 5, cantidad: 4, cliente: "Sofía Martínez", fecha: fechaDiasAtras(2) }, // Cámara web Full HD
    { productoIdx: 6, cantidad: 2, cliente: "Pedro Sánchez", fecha: fechaDiasAtras(1) }, // Impresora Epson L3150
    { productoIdx: 7, cantidad: 2, cliente: "Laura Díaz", fecha: fechaDiasAtras(0) }, // Router TP-Link Archer
    { productoIdx: 8, cantidad: 10, cliente: "Empresa XYZ", fecha: fechaDiasAtras(3) }, // Resma de papel
    { productoIdx: 9, cantidad: 5, cliente: "Mónica Herrera", fecha: fechaDiasAtras(5) } // Detergente Multiusos
];

// ================== LOCALSTORAGE HELPERS ==================
function cargarLS(key, fallback) {
    const guardados = localStorage.getItem(key);
    if (guardados) {
        try {
            return JSON.parse(guardados);
        } catch (e) {
            return fallback;
        }
    }
    return fallback;
}
function guardarLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ================== SINCRONIZACIÓN INICIAL ==================
function sincronizarInventario(productos, compras, ventas) {
    let inventario = JSON.parse(JSON.stringify(productos));
    // Sumar compras recibidas
    compras.forEach(compra => {
        if (compra.recibido === "Sí") {
            let idx = inventario.findIndex(p => p.nombre === compra.producto);
            if (idx !== -1) {
                inventario[idx].stock += compra.cantidad;
            } else {
                inventario.push({
                    nombre: compra.producto,
                    categoria: "Sin categoría",
                    stock: compra.cantidad,
                    precio: 0
                });
            }
        }
    });
    // Restar ventas
    ventas.forEach(venta => {
        if (inventario[venta.productoIdx]) {
            inventario[venta.productoIdx].stock -= venta.cantidad;
            if (inventario[venta.productoIdx].stock < 0) inventario[venta.productoIdx].stock = 0;
        }
    });
    return inventario;
}

// ================== DATOS GLOBALES ==================
window.compras = cargarLS('compras', comprasIniciales);
window.ventas = cargarLS('ventas', ventasIniciales);
window.productos = cargarLS('productos', sincronizarInventario(productosIniciales, window.compras, window.ventas));

// ================== GUARDADO GLOBAL ==================
function guardarProductos() { guardarLS('productos', window.productos); }
function guardarVentas() { guardarLS('ventas', window.ventas); }
function guardarCompras() { guardarLS('compras', window.compras); }

// ...El resto del código permanece igual...

// ================== CRUD INVENTARIO (UI) ==================
function setupInventarioCrud() {
    const productoForm = document.getElementById('productoForm');
    if (!productoForm) return;

    let nombreInput = document.getElementById('nombre');
    let categoriaInput = document.getElementById('categoria');
    let stockInput = document.getElementById('stock');
    let precioInput = document.getElementById('precio');
    let editIndexInput = document.getElementById('editIndex');
    let guardarBtn = document.getElementById('guardarBtn');
    let cancelarBtn = document.getElementById('cancelarBtn');
    let productosTabla = document.getElementById('productosTabla') ? document.getElementById('productosTabla').querySelector('tbody') : null;

    // Poblar select de categorías
    if (categoriaInput && categoriaInput.tagName === "SELECT") {
        categoriaInput.innerHTML = "";
        categoriasDisponibles.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoriaInput.appendChild(option);
        });
    }

    let editando = false;
    let editIndex = null;

    function renderTabla() {
        if (!productosTabla) return;
        productosTabla.innerHTML = '';
        if (window.productos.length === 0) {
            productosTabla.innerHTML = `<tr><td colspan="6" style="color:#888;">No hay productos registrados.</td></tr>`;
            return;
        }
        window.productos.forEach((prod, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${prod.nombre}</td>
                <td>${prod.categoria}</td>
                <td>${prod.stock}</td>
                <td>$${parseFloat(prod.precio).toFixed(2)}</td>
                <td class="crud-actions">
                    <button class="btn btn-sm btn-primary" onclick="editarProducto(${idx})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${idx})">Eliminar</button>
                </td>
            `;
            productosTabla.appendChild(tr);
        });
    }

    window.editarProducto = function (idx) {
        const prod = window.productos[idx];
        nombreInput.value = prod.nombre;
        categoriaInput.value = prod.categoria;
        stockInput.value = prod.stock;
        precioInput.value = prod.precio;
        editIndexInput.value = idx;
        guardarBtn.textContent = 'Actualizar';
        cancelarBtn.style.display = 'inline-block';
        editando = true;
        editIndex = idx;
    };

    window.eliminarProducto = function (idx) {
        if (confirm('¿Seguro que deseas eliminar este producto?')) {
            window.productos.splice(idx, 1);
            guardarProductos();
            renderTabla();
            if (editando && editIndex === idx) {
                resetForm();
            }
        }
    };

    function resetForm() {
        productoForm.reset();
        guardarBtn.textContent = 'Agregar';
        cancelarBtn.style.display = 'none';
        editando = false;
        editIndex = null;
        editIndexInput.value = '';
    }

    cancelarBtn.addEventListener('click', resetForm);

    productoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = nombreInput.value.trim();
        const categoria = categoriaInput.value;
        const stock = parseInt(stockInput.value, 10);
        const precio = parseFloat(precioInput.value);

        if (!nombre || !categoria || isNaN(stock) || isNaN(precio)) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        if (editando && editIndex !== null) {
            window.productos[editIndex] = { nombre, categoria, stock, precio };
        } else {
            window.productos.push({ nombre, categoria, stock, precio });
        }
        guardarProductos();
        renderTabla();
        resetForm();
    });

    renderTabla();
}

// ================== CRUD VENTAS (UI) ==================
function setupVentasCrud() {
    const ventaForm = document.getElementById('ventaForm');
    if (!ventaForm) return;

    const selectProducto = document.getElementById('productoVenta');
    const cantidadVenta = document.getElementById('cantidadVenta');
    const fechaVenta = document.getElementById('fechaVenta');
    const clienteVenta = document.getElementById('clienteVenta');
    const ventasTabla = document.getElementById('ventasTabla') ? document.getElementById('ventasTabla').querySelector('tbody') : null;

    // Poblar el select de productos
    if (selectProducto && window.productos) {
        selectProducto.innerHTML = '<option value="">Selecciona un producto</option>';
        window.productos.forEach((prod, idx) => {
            const option = document.createElement('option');
            option.value = idx;
            option.textContent = prod.nombre + " (" + prod.categoria + ")";
            selectProducto.appendChild(option);
        });

        selectProducto.addEventListener('change', function () {
            const idx = parseInt(this.value, 10);
            if (!isNaN(idx) && window.productos[idx]) {
                cantidadVenta.max = window.productos[idx].stock;
                cantidadVenta.value = "";
                cantidadVenta.placeholder = "Máx: " + window.productos[idx].stock;
                cantidadVenta.disabled = false;
            } else {
                cantidadVenta.max = "";
                cantidadVenta.value = "";
                cantidadVenta.placeholder = "";
                cantidadVenta.disabled = true;
            }
        });

        cantidadVenta.disabled = true;
    }

    // Fecha de hoy, deshabilitada
    if (fechaVenta) {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        const fechaHoy = `${yyyy}-${mm}-${dd}`;
        fechaVenta.value = fechaHoy;
        fechaVenta.setAttribute('readonly', true);
        fechaVenta.setAttribute('tabindex', '-1');
        fechaVenta.style.background = "#f3f4f6";
        fechaVenta.style.cursor = "not-allowed";
    }

    function renderVentasTabla() {
        if (!ventasTabla) return;
        ventasTabla.innerHTML = '';
        if (window.ventas.length === 0) {
            ventasTabla.innerHTML = `<tr><td colspan="7" style="color:#888;">No hay ventas registradas.</td></tr>`;
            return;
        }
        window.ventas.forEach((venta, idx) => {
            const producto = window.productos[venta.productoIdx];
            const nombreProducto = producto ? producto.nombre : 'Producto eliminado';
            const total = producto ? (venta.cantidad * producto.precio) : 0;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${nombreProducto}</td>
                <td>${venta.cantidad}</td>
                <td>${venta.cliente}</td>
                <td>${venta.fecha}</td>
                <td>$${total.toFixed(2)}</td>
                <td class="crud-actions">
                    <button class="btn btn-sm btn-danger" onclick="eliminarVentaUI(${idx})">Eliminar</button>
                </td>
            `;
            ventasTabla.appendChild(tr);
        });
    }

    window.eliminarVentaUI = function(idx) {
        window.ventas.splice(idx, 1);
        guardarVentas();
        renderVentasTabla();
        if (typeof setupInventarioCrud === 'function') setupInventarioCrud();
    };

    ventaForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const idx = parseInt(selectProducto.value, 10);
        const cantidad = parseInt(cantidadVenta.value, 10);
        const cliente = clienteVenta ? clienteVenta.value.trim() : '';
        const fecha = fechaVenta ? fechaVenta.value : '';

        if (isNaN(idx) || !window.productos[idx]) {
            alert("Selecciona un producto válido.");
            return;
        }
        if (isNaN(cantidad) || cantidad < 1) {
            alert("Ingresa una cantidad válida.");
            return;
        }
        if (cantidad > window.productos[idx].stock) {
            alert("No puedes vender más del stock disponible.");
            return;
        }
        if (!cliente) {
            alert("Ingresa el nombre del cliente.");
            return;
        }

        window.ventas.push({
            productoIdx: idx,
            cantidad: cantidad,
            cliente: cliente,
            fecha: fecha
        });
        guardarVentas();

        window.productos[idx].stock -= cantidad;
        guardarProductos();

        renderVentasTabla();
        if (typeof setupInventarioCrud === 'function') setupInventarioCrud();

        ventaForm.reset();
        if (fechaVenta) fechaVenta.value = fecha;
        cantidadVenta.disabled = true;
        selectProducto.value = "";
    });

    renderVentasTabla();
}

// ================== CRUD COMPRAS (UI) ==================
function setupComprasCrud() {
    const compraForm = document.getElementById('compraForm');
    if (!compraForm) return;

    let proveedorInput = document.getElementById('proveedor');
    let productoInput = document.getElementById('productoCompra');
    let cantidadInput = document.getElementById('cantidadCompra');
    let fechaInput = document.getElementById('fechaCompra');
    let recibidoInput = document.getElementById('recibidoCompra');
    let editIndexInput = document.getElementById('editIndexCompra');
    let guardarBtn = document.getElementById('guardarCompraBtn');
    let cancelarBtn = document.getElementById('cancelarCompraBtn');
    let comprasTabla = document.getElementById('comprasTabla') ? document.getElementById('comprasTabla').querySelector('tbody') : null;

    // Poblar select de proveedores
    if (proveedorInput && proveedorInput.tagName === "SELECT") {
        proveedorInput.innerHTML = "";
        proveedoresDisponibles.forEach(prov => {
            const option = document.createElement('option');
            option.value = prov;
            option.textContent = prov;
            proveedorInput.appendChild(option);
        });
    }

    // Fecha de hoy, deshabilitada
    if (fechaInput) {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        const fechaHoy = `${yyyy}-${mm}-${dd}`;
        fechaInput.value = fechaHoy;
        fechaInput.setAttribute('readonly', true);
        fechaInput.setAttribute('tabindex', '-1');
        fechaInput.style.background = "#f3f4f6";
        fechaInput.style.cursor = "not-allowed";
    }

    let editandoCompra = false;
    let editIndexCompra = null;

    function renderComprasTabla() {
        if (!comprasTabla) return;
        comprasTabla.innerHTML = '';
        if (window.compras.length === 0) {
            comprasTabla.innerHTML = `<tr><td colspan="7" style="color:#888;">No hay órdenes de compra registradas.</td></tr>`;
            return;
        }
        window.compras.forEach((compra, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${compra.proveedor}</td>
                <td>${compra.producto}</td>
                <td>${compra.cantidad}</td>
                <td>${compra.fecha}</td>
                <td>${compra.recibido}</td>
                <td class="crud-actions">
                    <button class="btn btn-sm btn-primary" onclick="editarCompra(${idx})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarCompra(${idx})">Eliminar</button>
                </td>
            `;
            comprasTabla.appendChild(tr);
        });
    }

    window.editarCompra = function(idx) {
        const compra = window.compras[idx];
        proveedorInput.value = compra.proveedor;
        productoInput.value = compra.producto;
        cantidadInput.value = compra.cantidad;
        recibidoInput.value = compra.recibido;
        editIndexInput.value = idx;
        guardarBtn.textContent = 'Actualizar';
        cancelarBtn.style.display = 'inline-block';
        editandoCompra = true;
        editIndexCompra = idx;
    };

    window.eliminarCompra = function(idx) {
        if (confirm('¿Seguro que deseas eliminar esta orden de compra?')) {
            const compra = window.compras[idx];
            if (compra.recibido === "Sí") {
                let prodIdx = window.productos.findIndex(p => p.nombre === compra.producto);
                if (prodIdx !== -1) {
                    window.productos[prodIdx].stock -= compra.cantidad;
                    if (window.productos[prodIdx].stock < 0) window.productos[prodIdx].stock = 0;
                    guardarProductos();
                }
            }
            window.compras.splice(idx, 1);
            guardarCompras();
            renderComprasTabla();
            if (editandoCompra && editIndexCompra === idx) {
                resetCompraForm();
            }
            if (typeof setupInventarioCrud === 'function') setupInventarioCrud();
        }
    };

    function resetCompraForm() {
        compraForm.reset();
        guardarBtn.textContent = 'Agregar';
        cancelarBtn.style.display = 'none';
        editandoCompra = false;
        editIndexCompra = null;
        editIndexInput.value = '';
        if (fechaInput) {
            const hoy = new Date();
            const yyyy = hoy.getFullYear();
            const mm = String(hoy.getMonth() + 1).padStart(2, '0');
            const dd = String(hoy.getDate()).padStart(2, '0');
            const fechaHoy = `${yyyy}-${mm}-${dd}`;
            fechaInput.value = fechaHoy;
        }
    }

    cancelarBtn.addEventListener('click', resetCompraForm);

    compraForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const proveedor = proveedorInput.value;
        const producto = productoInput.value.trim();
        const cantidad = parseInt(cantidadInput.value, 10);
        const fecha = fechaInput.value;
        const recibido = recibidoInput.value;

        if (!proveedor || !producto || isNaN(cantidad) || cantidad < 1 || !fecha || !recibido) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const nuevaCompra = { proveedor, producto, cantidad, fecha, recibido };

        if (editandoCompra && editIndexCompra !== null) {
            const compraAnterior = window.compras[editIndexCompra];
            if (compraAnterior.recibido === "Sí") {
                let prodIdx = window.productos.findIndex(p => p.nombre === compraAnterior.producto);
                if (prodIdx !== -1) {
                    window.productos[prodIdx].stock -= compraAnterior.cantidad;
                    if (window.productos[prodIdx].stock < 0) window.productos[prodIdx].stock = 0;
                }
            }
            window.compras[editIndexCompra] = nuevaCompra;
        } else {
            window.compras.push(nuevaCompra);
        }

        if (recibido === "Sí") {
            let prodIdx = window.productos.findIndex(p => p.nombre === producto);
            if (prodIdx !== -1) {
                window.productos[prodIdx].stock += cantidad;
            } else {
                window.productos.push({
                    nombre: producto,
                    categoria: "Sin categoría",
                    stock: cantidad,
                    precio: 0
                });
            }
            guardarProductos();
        }
        guardarCompras();
        renderComprasTabla();
        resetCompraForm();
        if (typeof setupInventarioCrud === 'function') setupInventarioCrud();
    });

    renderComprasTabla();
}

// ========== INICIALIZACIÓN SEGURA DE TODOS LOS MÓDULOS ==========
document.addEventListener('DOMContentLoaded', function () {
    setupInventarioCrud();
    setupVentasCrud();
    setupComprasCrud();
});