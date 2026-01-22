const Articulo = require('../models/articulo');

class ArticuloService {
    //METODO PARA CREAR UN ARTICULO
    async createArticulo({ nombre, descripcion, imagen, precio, stock }) {
        //Validar que lleguen todos los datos
        if(!nombre || !descripcion || !imagen || precio == null || stock == null) {
            throw new Error('Debe ingresar todos los campos');
        };
        //VALIDACIONES
        //Validar longitudes
        if(nombre.length < 8 || nombre.length > 40) {
            throw new Error('El nombre del articulo debe tener entre 8 y 40 caracteres');
        };
        if(descripcion.length < 10 || descripcion.length > 200) {
            throw new Error('La descripcion del articulo debe tener entre 10 y 200 caracteres');
        };
        //Validar valor
        if(precio < 0) {
            throw new Error('El precio no puede ser negativo');
        };
        if(stock < 0) {
            throw new Error('El stock no puede ser negativo');
        };
        const articulo = await Articulo.create({
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen,
            precio: precio,
            stock: stock 
        });
        return articulo;
    };

    //METODO PARA TRAER LOS ARTICULOS (para los clientes)
    async getArticulos({ nombre, descripcion, precioMin, precioMax, page, limit, sortBy, order}) {
        //Para que por defecto traiga la pagina 1 con 9 articulos
        page = Math.max(1, Number(page) || 1 );
        limit = Math.min(50, Math.max(1, Number(limit) || 9));
        const filter = {
            estado: 'ACTIVO'
        };
        if(nombre && nombre.trim() !== '') {
            filter.nombre = { $regex: nombre.trim(), $options: 'i' }
        };
        if(descripcion && descripcion.trim() !== '') {
            filter.descripcion = { $regex: descripcion.trim(), $options: 'i' }
        };
        //Para traer precios mayor que y/o menor que
        if((precioMin !== undefined && precioMin !== '') || (precioMax !== undefined && precioMax !== '')) {
            filter.precio = {};
            if(precioMin !== undefined && precioMin !== '') {
                filter.precio.$gte = Number(precioMin);
            };
            if(precioMax !== undefined && precioMax !== '') {
                filter.precio.$lte = Number(precioMax);
            };
        };
        //Establecer el salto
        const skip = (page - 1) * limit;
        //Si no llega forma de ordenacion, se devuelve lo mas nuevo primero
        let sort = { createdAt: -1 };   
        //Cuando si llega se asigna esa forma
        if(sortBy) {
            const orderValid = order === 'asc' || order === 'desc';
            switch (sortBy) {
                //Se ordena por mayor precio o menor precio
                case 'precio':
                    if(orderValid) {
                        sort = { precio: order === 'asc' ? 1 : -1 }
                    } else {
                        throw new Error('Ingrese un orden de precio valido');
                    };
                    break;
                //Se ordena por nombre (A-z)
                case 'nombre':
                    sort = { nombre: 1 };
                    break;
                //Si no es un caso valido, ordena por defecto desde el mas nuevo
                default: sort = { createdAt: -1 };
            };
        };
        //Se establece todo lo definido
        const [ articulos, total ] = await Promise.all([
            Articulo.find(filter)
            .select('-estado -total_vendido -createdAt -updatedAt')
            .skip(skip)
            .limit(limit)
            .sort(sort),
            Articulo.countDocuments(filter)
        ]);
        return {
            articulos,
            pagination: {
                page,
                limit,
                total,
                //Cuantas paginas totales habran con el limite establecido
                totalPages: Math.ceil(total / limit),
                //Verifica si se llego al total de articulos
                hasMore: page * limit < total
            }
        };
    };

    //METODO PARA TREAER EL INVENTARIO (para el admin)
    async getInventario({ nombre, descripcion, precioMin, precioMax, estado, page, limit, sortBy, order}) {
        //Para que por defecto traiga la pagina 1 con 9 articulos
        page = Math.max(1, Number(page) || 1 );
        limit = Math.min(50, Math.max(1, Number(limit) || 9));
        const filter = {};
        if(nombre && nombre.trim() !== '') {
            filter.nombre = { $regex: nombre.trim(), $options: 'i' }
        };
        if(descripcion && descripcion.trim() !== '') {
            filter.descripcion = { $regex: descripcion.trim(), $options: 'i' }
        };
        if(estado && (estado === 'ACTIVO' || estado === 'INACTIVO')) {
            filter.estado = estado;
        };
        //Para traer precios mayor que y/o menor que
        if((precioMin !== undefined && precioMin !== '') || (precioMax !== undefined && precioMax !== '')) {
            filter.precio = {};
            if(precioMin !== undefined && precioMin !== '') {
                filter.precio.$gte = Number(precioMin);
            };
            if(precioMax !== undefined && precioMax !== '') {
                filter.precio.$lte = Number(precioMax);
            };
        };
        //Establecer el salto
        const skip = (page - 1) * limit;
        //Si no llega forma de ordenacion, se devuelve lo mas nuevo primero
        let sort = { createdAt: -1 };
        //Cuando si llega se asigna esa forma
        if(sortBy) {
            const orderValid = order === 'asc' || order === 'desc';
            switch (sortBy) {
                //Se ordena por mayor precio o menor precio
                case 'precio':
                    if(orderValid) {
                        sort = { precio: order === 'asc' ? 1 : -1 }
                    } else {
                        throw new Error('Ingrese un orden de precio valido');
                    };
                    break;
                //Se ordena por nombre (A-z)
                case 'nombre':
                    sort = { nombre: 1 };
                    break;
                //Se ordena por mayor stock o menor stock
                case 'stock':
                    if(orderValid) {
                        sort = { stock: order === 'asc' ? 1 : -1 }
                    } else {
                        throw new Error('Ingrese un orden de stock valido');
                    };
                    break;
                //Se ordena por mayor cantidad vendida o menor cantidad vendida
                case 'total_vendido':
                    if(orderValid) {
                        sort = { total_vendido: order === 'asc' ? 1 : -1 }
                    } else {
                        throw new Error('Ingrese un orden de total vendido valido');
                    };
                    break;
                //Si no es un caso valido, ordena por defecto desde el mas nuevo
                default: sort = { createdAt: -1 };
            };
        };
        //Se establece todo lo definido
        const [ articulos, total ] = await Promise.all([
            Articulo.find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort),
            Articulo.countDocuments(filter)
        ]);
        return {
            articulos,
            pagination: {
                page,
                limit,
                total,
                //Cuantas paginas totales habran con el limite establecido
                totalPages: Math.ceil(total / limit),
                //Verifica si se llego al total de articulos
                hasMore: page * limit < total
            }
        };
    };
};

module.exports = new ArticuloService();