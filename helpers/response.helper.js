//Helper para estructurar las respuestas http
function success(res, msg = 'Operacion exitosa', data) {
    return res.json({
        status: '1',
        msg,
        data
    });
};

function failed(res, errorMsg = 'Error procesando la peticion') {
    return res.status(400).json({
        status: '0',
        msg: errorMsg
    });
};

module.exports = { success, failed };