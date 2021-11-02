const express = require('express');
const app = express();
const port = 3010;


app.use(express.json());
const cors = require('cors');
app.use(cors());

app.set('port', process.env.PORT || port)

app.get('/', (req, res) => {
    res.send('Servicio de BD Comercializadora en funcionamiento');
});

require("./routes/venta.rutas")(app);
require("./routes/usuario.rutas")(app);
require("./routes/producto.rutas")(app);

const puerto = app.get('port');
app.listen(app.get('port'), () => {
    console.log(`Servicio de BD Comercializadora eschuchando en http://localhost:${puerto}`);
})