const express = require('express');
const turnos = require('./routes/turnos');
const app = express();

app.use(express.json());
app.use('/api/turnos', turnos);
app.use(require('./controllers/turnos').manejarError);
app.listen(process.env.PORT || 3000, '127.0.0.1', () => {
  console.log('API de MJA Soluciones Express iniciada');
});
