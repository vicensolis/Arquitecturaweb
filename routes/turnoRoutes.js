import { Router } from "express";
import { TurnoController } from "../controllers/turnoController.js"; 

const router = Router();
const turnoController = new TurnoController();

// ---------------------------------------------
// RUTAS GET (LECTURA)
// ---------------------------------------------

// GET /api/turnos -> Obtener la lista completa de turnos
router.get("/", turnoController.getAllTurnos);

// GET /api/turnos/:id -> Obtener un turno específico por su ID
router.get('/:id', turnoController.getTurnosById);

// ---------------------------------------------
// RUTAS POST y PUT (RESERVA y CANCELACIÓN)
// ---------------------------------------------

// POST /api/turnos -> Reservar un nuevo turno 
router.post("/", turnoController.createTurno);

// PUT /api/turnos/:id/cancelar -> Cambia el estado del turno a CANCELADO
router.put("/:id/cancelar", turnoController.cancelarTurno);



export default router;