import { Router } from "express";
import { MedicoController } from "../controllers/medicoController.js"; 

const router = Router();
const medicoController = new MedicoController();

// GET /api/medicos
router.get("/", medicoController.getAllMedicos);

// GET /api/medicos/:id 
router.get('/:id', medicoController.getMedicoById);

// GET /api/medicos/:id/turnos
router.get('/:id/turnos', medicoController.getTurnosByMedico);

// POST /api/medicos
router.post("/", medicoController.createMedico);

// PUT /api/medicos/:id 
router.put("/:id", medicoController.updateMedico);

// DELETE /api/medicos/:id
router.delete("/:id", medicoController.deleteMedico);

export default router;