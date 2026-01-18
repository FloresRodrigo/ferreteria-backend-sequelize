## Objetivo General

Diseñar e implementar un sistema web completo, aplicando los conocimientos y tecnologías abordadas en la materia **Programación y Servicios Web**, tanto en frontend como en backend.  
El proyecto incluye aspectos fundamentales como seguridad, consumo de servicios web externos, validaciones, gestión de datos y desarrollo de una arquitectura organizada.

---

## Requisitos Generales del Proyecto

### 1. Diseño del Sistema

- Definición e implementación de un sistema realista y funcional (educativo, social, comercial, deportivo, institucional, etc.).
- Implementación de múltiples roles de usuario.
- Operaciones CRUD completas.
- Aplicación de buenas prácticas de desarrollo web.
- Uso del patrón de arquitectura **MVC** en el backend.
- Uso de **componentes organizados en Angular** para el frontend.

---

### 2. Aplicación del Protocolo HTTP

- Uso de los métodos HTTP:
  - GET
  - POST
  - PUT
  - DELETE
- Comprensión de la arquitectura cliente-servidor.
- Entendimiento del funcionamiento del protocolo HTTP/HTTPS.
- Implementación de servicios **RESTful** en Node.js con Express.
- Consumo de servicios REST desde Angular.
- Visualización del tráfico HTTP mediante herramientas como Postman o API Tester.

---

### 3. Desarrollo Frontend

- Maquetación con:
  - HTML5
  - CSS3
  - Bootstrap 5
- Diseño responsivo y adaptativo.
- Uso de Angular para:
  - Componentes
  - Routing
  - Servicios HTTP
  - Formularios reactivos con validaciones personalizadas
  - Pipes, data binding y modularización
- Gestión de dependencias mediante NPM.

---

### 4. Consumo e Implementación de Servicios Web

- Desarrollo de servicios REST en Node.js con Express.
- Integración de al menos **dos servicios web externos**, tales como:
  - Google (Calendario, Maps, Gmail)
  - Facebook / Instagram / Twitter (login social o publicaciones)
  - MercadoLibre / MercadoPago (productos, pagos y QR)
  - YouTube (videos embebidos)
  - APIs públicas o privadas relevantes al sistema
- Implementación de llamadas asíncronas mediante Promesas y/o Observables.
- Pruebas de servicios utilizando Postman u otras herramientas.

---

### 5. Seguridad en Aplicaciones Web

- Autenticación mediante **JWT (JSON Web Tokens)**.
- Control de acceso basado en roles de usuario.
- Hasheo de contraseñas utilizando bcrypt u otra librería similar.
- Implementación de login social mediante OAuth (Google, Facebook, etc.).

---

### 6. Base de Datos y Backend

- Implementación de una base de datos:
  - No relacional (MongoDB)
  - o relacional (MySQL, PostgreSQL)
- Uso de ORM/ODM:
  - Sequelize
  - o Mongoose
- Implementación de CRUD completos con modelos y controladores en Express.
- Validaciones en el servidor.
- Modularización del backend.
- Documentación de la API.

---

### 7. Visualización y Estadísticas

- Desarrollo de un panel administrativo con métricas.
- Visualización de datos agregados.
- Implementación de gráficos:
  - Barras
  - Torta
  - Línea  
  (utilizando librerías como Chart.js, ng2-charts u otras).
- Listados tabulares con:
  - Filtros
  - Búsqueda
  - Paginación.

## Propuesta del Sistema

Sitio web completo para una ferretería que permita el login y registro de usuarios tanto de forma tradicional como mediante Google.  
El sistema permitirá que el administrador gestione los artículos disponibles para la venta e implemente pagos mediante la API de Mercado Pago utilizando cuentas de prueba.  
Luego de una compra exitosa, se enviará un correo electrónico al usuario que realizó la compra con el detalle correspondiente.

Los usuarios clientes podrán agregar artículos al carrito, confirmar compras y visualizar el historial de compras desde su perfil.  
Además, el sistema contará con métricas visuales mediante gráficos para uso exclusivo del administrador.

---

## Páginas del Sistema

### Globales

- Todas las páginas contarán con el mismo header y footer.
- El header mostrará información relevante, permitirá la navegación y destacará la página actual.
- El footer incluirá información de contacto y enlaces a redes sociales.
- Botón para volver al inicio de la página, visible solo cuando el usuario no se encuentre arriba.
- Burbuja de comunicación para interactuar con un bot de soporte.

---

### Login / Registro

- Formulario único reutilizado para login y registro.
- Opciones dinámicas según el modo seleccionado (login o registro).
- Implementación de login con Google.

---

### Home

- Visualización de artículos más vendidos.
- Sección de ofertas.
- Carruseles y cards informativas.
- Banner principal.
- Contadores de clientes satisfechos y estadísticas generales.

---

### Inventarios (Administrador)

- Gestión completa de artículos:
  - Agregar
  - Editar
  - Eliminar
- Acceso exclusivo para el administrador.
- Implementación de medidas de seguridad en todo el sitio.
- Eliminación lógica de artículos para no afectar las métricas.

---

### Agregar / Editar Artículo

- Formulario exclusivo para el administrador.
- Permite crear y modificar artículos del inventario.

---

### Compra

- Visualización de todos los artículos disponibles.
- Filtros por:
  - Precio
  - Disponibilidad de stock
- Búsqueda por nombre.
- Carrito de compras con:
  - Nombre del artículo
  - Precio individual
  - Cantidad
- Visualización del total de la compra.
- Botón para confirmar la compra.

---

### Confirmación de Compra

- Página accesible únicamente luego de un pago exitoso con la API de Mercado Pago.
- Visualización del detalle completo de la compra realizada.

---

### Perfil de Usuario

- Visualización y edición de datos personales.
- Historial de compras con detalle completo.
- Opción para eliminar la cuenta:
  - El estado del usuario cambia
  - Se cierra la sesión
  - Al volver a iniciar sesión, se consulta si desea cancelar la eliminación.

---

### Métricas (Administrador)

- El administrador no cuenta con página de perfil.
- Acceso a un panel de métricas del negocio.
- Visualización de información como:
  - Usuarios registrados
  - Ventas realizadas
  - Artículos vendidos
  - Artículos más vendidos
- Gráficos de tipo torta y lineales.

---

## Entidades del Sistema

### Usuario (Cliente y Administrador)

- Nombre completo
- Usuario
- Email
- Contraseña
- Rol
- Fecha de registro
- Fecha de última edición
- Estado

---

### Artículo

- Nombre
- Descripción
- Imagen
- Precio
- Stock
- Cantidad total vendida
- Fecha de agregado
- Fecha de última edición
- Estado

---

### Ticket

- Número de ticket
- ID del cliente
- Fecha de compra
- Fecha de creación
- Fecha de última edición
- Total
- Estado
- Detalle del ticket

---

### Detalle de Ticket

- ID del artículo
- Nombre del artículo
- Precio unitario
- Cantidad
- Subtotal