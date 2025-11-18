import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import moment from 'moment'; 

import medicoRoutes from './routes/medicoRoutes.js'; 
import pacienteRoutes from './routes/pacienteRoutes.js';
import turnoRoutes from './routes/turnoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use((req, res, next) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSS'); 
    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }

    next();
});


// RUTAS

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API de Turnos Médicos funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

//rutas de Médicos
app.use('/api/medicos', medicoRoutes);

//rutas de paciente
app.use('/api/pacientes', pacienteRoutes);

//rutas de turnos
app.use('/api/turnos', turnoRoutes);


app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        path: req.originalUrl,
        method: req.method
    });
});


// Errores
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);

    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message
    });
});

// INICIAR SERVIDOR

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

