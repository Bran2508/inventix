const productos = [
  {
    id: 1,
    nombre: "Mensualidad",
    descripcion: `
      • Hasta <b>100 productos</b><br>
      • <b>1 usuario</b><br>
      • <b>Reporte básico</b> (mensual)<br>
      • <b>Almacenamiento:</b> 1 GB<br>
      • Acceso al punto de venta por <b>1 mes</b><br>
      • <b>Soporte:</b> Email<br>
      • <b>Actualizaciones automáticas incluidas</b>
    `,
    precio: 99.00,
    duracion: "1 mes",
    imagen: "assets/1.png",
    limite_productos: 100,
    usuarios: 1,
    reporte: "Básico (mensual)",
    almacenamiento: "1 GB",
    soporte: "Email",
    actualizaciones: true
  },
  {
    id: 2,
    nombre: "Trimestral",
    descripcion: `
      • Hasta <b>500 productos</b><br>
      • <b>3 usuarios</b><br>
      • <b>Reporte estándar</b> (mensual y trimestral)<br>
      • <b>Almacenamiento:</b> 5 GB<br>
      • Acceso al punto de venta por <b>3 meses</b><br>
      • <b>Soporte:</b> Email y chat<br>
      • <b>Actualizaciones automáticas incluidas</b>
    `,
    precio: 249.00,
    duracion: "3 meses",
    imagen: "assets/3.png",
    limite_productos: 500,
    usuarios: 3,
    reporte: "Estándar (mensual y trimestral)",
    almacenamiento: "5 GB",
    soporte: "Email y chat",
    actualizaciones: true
  },
  {
    id: 3,
    nombre: "Medio Año",
    descripcion: `
      • Hasta <b>2000 productos</b><br>
      • <b>5 usuarios</b><br>
      • <b>Reporte avanzado</b> (mensual, trimestral y semestral)<br>
      • <b>Almacenamiento:</b> 20 GB<br>
      • Acceso al punto de venta por <b>6 meses</b><br>
      • <b>Soporte:</b> Prioritario (email, chat y teléfono)<br>
      • <b>Actualizaciones automáticas incluidas</b>
    `,
    precio: 499.00,
    duracion: "6 meses",
    imagen: "assets/6.png",
    limite_productos: 2000,
    usuarios: 5,
    reporte: "Avanzado (mensual, trimestral y semestral)",
    almacenamiento: "20 GB",
    soporte: "Prioritario (email, chat y teléfono)",
    actualizaciones: true
  },
  {
    id: 4,
    nombre: "Año",
    descripcion: `
      • <b>Productos ilimitados</b><br>
      • <b>10 usuarios</b><br>
      • <b>Reporte completo</b> (mensual, trimestral, semestral y anual)<br>
      • <b>Almacenamiento:</b> 100 GB<br>
      • Acceso al punto de venta por <b>12 meses</b><br>
      • <b>Soporte:</b> VIP 24/7 (email, chat y teléfono)<br>
      • <b>Actualizaciones automáticas incluidas</b>
    `,
    precio: 899.00,
    duracion: "12 Meses",
    imagen: "assets/12.png",
    limite_productos: "Ilimitado",
    usuarios: 10,
    reporte: "Completo (mensual, trimestral, semestral y anual)",
    almacenamiento: "100 GB",
    soporte: "VIP 24/7 (email, chat y teléfono)",
    actualizaciones: true
  }
];
