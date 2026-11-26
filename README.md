# API de turnos de MJA Soluciones Express

MJA Soluciones Express es una propuesta de mensajería local y diligencias en la Comuna Cuba de Pereira. Para este taller, un turno representa una solicitud programada con cliente, tipo de servicio, origen, destino, fecha y hora, precio base en pesos colombianos y prioridad opcional.

## Equipo y recargo

Se tomó el equipo del acta y se cruzó con la lista oficial del grupo del jueves.

| Integrante | Número oficial |
| --- | ---: |
| Maicol Smith Bueno Ramírez | 5 |
| Juan Pablo Buitrago Mulcue | 6 |
| Alexander Galindo Granada | 9 |
| Esteban López Ocampo | 12 |

El primer apellido en orden alfabético es Bueno. Por tanto, N = 5 y el recargo es 5 × 2 % = **10 %**. Solo se aplica cuando `prioritario` es `true`. El total se redondea al peso más cercano.

## Ejecutar

Con Node.js y npm instalados, abre una terminal en esta carpeta.

~~~sh
npm install
npm start
~~~

La API escucha en `http://127.0.0.1:3000`. Las solicitudes se guardan en memoria durante la ejecución.

## Pruebas para la sustentación

Envía un POST a `/api/turnos` con el encabezado `Content-Type: application/json` y este cuerpo.

~~~json
{
  "cliente": "Cliente de prueba",
  "tipoServicio": "mensajería",
  "origen": "Comercio de prueba, Comuna Cuba",
  "destino": "Destino de prueba, Comuna Cuba",
  "fechaHora": "2027-01-15T10:00:00-05:00",
  "precioBase": 10000,
  "prioritario": true
}
~~~

En un servidor recién iniciado devuelve HTTP 201 con los mismos campos y agrega `id: 1`, `porcentajeRecargo: 10` y `totalPagar: 11000`. Repite con prioridad falsa u omitida para obtener un total de 10000.

Envía este segundo cuerpo al mismo endpoint para comprobar el error de validación.

~~~json
{
  "cliente": "Cliente de prueba",
  "tipoServicio": "diligencia",
  "origen": "Comercio de prueba, Comuna Cuba",
  "destino": "Destino de prueba, Comuna Cuba",
  "fechaHora": "2027-01-15T10:00:00-05:00",
  "precioBase": 0
}
~~~

La respuesta es HTTP 400 con un campo JSON `error` que indica que el precio debe ser un importe entero positivo en COP dentro del rango admitido.

| Petición | Resultado |
| --- | --- |
| GET /api/turnos | HTTP 200 y listado de solicitudes |
| GET /api/turnos/1 | HTTP 200 y solicitud creada |
| GET /api/turnos/999 | HTTP 404 y `{"error":"Solicitud no encontrada"}` |

## Arquitectura

`index.js` configura Express y arranca el servidor. `routes/turnos.js` conecta cada endpoint con su controlador. `controllers/turnos.js` valida datos y responde con el código HTTP correspondiente. `services/turnos.js` guarda las solicitudes y calcula la tarifa.

## Entrega

Publicar estos archivos en un repositorio público de GitHub y entregar un único enlace por equipo en la plataforma institucional. Los cuatro integrantes deben poder iniciar el servidor, mostrar los códigos 200, 201, 400 y 404 y explicar el cálculo del recargo.

