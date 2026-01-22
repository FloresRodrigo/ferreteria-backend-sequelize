const articuloService = require('../services/articulo.service');
const { success, failed } = require('../helpers/response.helper');
const fs = require('fs');
const path = require('path');

const articuloCtrl = {};

//METODO PARA CREAR UN ARTICULO
articuloCtrl.createArticulo = async (req, res) => {
    try {
        const articulo = await articuloService.createArticulo({ ...req.body, imagen: req.file?.path });
        return success(res, 'Articulo creado exitosamente', articulo);
    } catch (error) {
        console.error('ERROR AL CREAR ARTICULO: ', error);
        //Borrar la imagen si falla algo
        if(req.file?.path) {
            fs.unlink(req.file.path, err => {
                if(err) {
                    console.error('ERROR AL BORRAR LA IMAGEN: ', err);
                };
            });
        };
        return failed(res, error.message);
    };
};

articuloCtrl.getArticulos = async (req, res) => {
    try {
        const articulos = await articuloService.getArticulos(req.query);
        return success(res, 'Lista de articulos obtenida', articulos);
    } catch (error) {
        console.error('ERROR AL OBTENER ARTICULOS: ', error);
        return failed(res, error.message);
    }
};
 
module.exports = articuloCtrl;