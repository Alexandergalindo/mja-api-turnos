const servicio = require('../services/turnos');

function listar(req, res) {
  return res.status(200).json(servicio.listar());
}

function consultar(req, res) {
  const turno = servicio.consultar(req.params.id);
  if (!turno) return res.status(404).json({ error: 'Solicitud no encontrada' });
  return res.status(200).json(turno);
}

function crear(req, res) {
  const { cliente, tipoServicio, origen, destino, fechaHora, precioBase, prioritario = false } = req.body || {};
  const campos = { cliente, tipoServicio, origen, destino, fechaHora };
  for (const [campo, valor] of Object.entries(campos)) {
    if (typeof valor !== 'string' || !valor.trim()) {
      return res.status(400).json({ error: campo + ' es obligatorio y debe ser texto' });
    }
    campos[campo] = valor.trim();
  }
  if (!['mensajería', 'diligencia'].includes(campos.tipoServicio)) {
    return res.status(400).json({ error: 'tipoServicio debe ser mensajería o diligencia' });
  }
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:Z|[+-]\d{2}:\d{2})$/.test(campos.fechaHora) ||
      !Number.isFinite(Date.parse(campos.fechaHora))) {
    return res.status(400).json({ error: 'fechaHora debe ser una fecha ISO 8601 con zona horaria' });
  }
  if (!Number.isSafeInteger(precioBase) || precioBase <= 0 || precioBase > Math.floor(Number.MAX_SAFE_INTEGER / 2)) {
    return res.status(400).json({ error: 'precioBase debe ser un importe entero positivo en COP dentro del rango admitido' });
  }
  if (typeof prioritario !== 'boolean') {
    return res.status(400).json({ error: 'prioritario debe ser true o false' });
  }
  return res.status(201).json(servicio.crear({ ...campos, precioBase, prioritario }));
}

function manejarError(error, req, res, next) {
  if (res.headersSent) return next(error);
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo contiene JSON inválido' });
  }
  const estado = error.status >= 400 && error.status < 500 ? error.status : 500;
  return res.status(estado).json({ error: estado === 500 ? 'Error interno' : 'Solicitud inválida' });
}

module.exports = { listar, consultar, crear, manejarError };
