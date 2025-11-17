import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import moment from 'moment'; 

// 1. Importar las rutas de los models (Asume que está en ./routes/medicoRoutes.js)
import medicoRoutes from './routes/medicoRoutes.js'; 
import pacienteRoutes from './routes/pacienteRoutes.js';
import turnoRoutes from './routes/turnoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ================================
// MIDDLEWARES DE CONFIGURACIÓN
// ================================

// CORS: Permite la comunicación entre el frontend y el backend
app.use(cors({
    origin: 'http://localhost:4200', // Ajusta este origen a tu frontend
    credentials: true
}));

// BODY PARSER: Para que Express lea el cuerpo de las peticiones
app.use(express.json()); // Lee cuerpos JSON (reemplaza bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // Lee cuerpos URL-encoded

// Middleware de Logging y Body Dump (como en tu ejemplo)
app.use((req, res, next) => {
    // Usamos moment para un formato de timestamp limpio
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSS'); 
    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    if (req.method === 'POST' || req.method === 'PUT') {
        // Muestra el cuerpo del request para debug
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }

    next();
});

// ================================
// RUTAS
// ================================

// Health Check (Ruta de monitoreo)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API de Turnos Médicos funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

//montaje rutas de Médicos
app.use('/api/medicos', medicoRoutes);

//montaje rutas de paciente
app.use('/api/pacientes', pacienteRoutes);

//montaje rutas de turnos
app.use('/api/turnos', turnoRoutes);

// 404 Handler: Captura cualquier solicitud que no haya coincidido con las rutas anteriores
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        path: req.originalUrl,
        method: req.method
    });
});

// ================================
// MANEJO DE ERRORES (Global 500)
// ================================

// Middleware de manejo de errores global (captura los errores internos no manejados)
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);

    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message
    });
});

// ================================
// INICIAR SERVIDOR
// ================================

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// Este tipo de exportación es más común en CommonJS, pero la API iniciará sin ella.
// module.exports = app;