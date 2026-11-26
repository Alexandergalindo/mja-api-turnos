const turnos = [];
const N = 5;
const porcentajeRecargo = N * 2;

function crear(datos) {
  const recargo = datos.prioritario ? porcentajeRecargo : 0;
  const totalPagar = Math.round(datos.precioBase * (1 + recargo / 100));
  const turno = { id: turnos.length + 1, ...datos, porcentajeRecargo: recargo, totalPagar };
  turnos.push(turno);
  return turno;
}

module.exports = {
  crear,
  listar: () => turnos,
  consultar: id => turnos.find(turno => String(turno.id) === id)
};
