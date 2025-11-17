import { Router } from "express";
import { TurnoController } from "../controllers/turnoController.js"; 

const router = Router();
const turnoController = new TurnoController();

// GET /api/turnos
router.get("/", turnoController.getAllTurnos);

// GET /api/turnos/:id
router.get('/:id', turnoController.getTurnosById);


// POST /api/turnos
router.post("/", turnoController.createTurno);

// PUT /api/turnos/:id/cancelar
router.put("/:id/cancelar", turnoController.cancelarTurno);

export default router;