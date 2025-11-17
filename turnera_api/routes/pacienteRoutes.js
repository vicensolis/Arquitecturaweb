import { Router } from "express";
import { PacienteController } from "../controllers/pacienteController.js"; 

const router = Router();
const pacienteController = new PacienteController();

// GET /api/pacientes 
router.get("/", pacienteController.getAllPacientes);

// GET /api/pacientes/:id 
router.get('/:id', pacienteController.getPacienteById);


// POST /api/pacientes 
router.post("/", pacienteController.createPaciente);

// PUT /api/pacientes/:id 
router.put("/:id", pacienteController.updatePaciente);

// DELETE /api/pacientes/:id 
router.delete("/:id", pacienteController.deletePaciente);

export default router;