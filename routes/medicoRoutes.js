import { Router } from "express";

import { MedicoController } from "../controllers/medicoController.js"; 

const router = Router();
const medicoController = new MedicoController();

// ---------------------------------------------
// RUTAS GET
// ---------------------------------------------

// GET /api/medicos -> Obtener la lista completa de médicos
router.get("/", medicoController.getAllMedicos);

// GET /api/medicos/:id -> te devuelve un médico específico por su ID
router.get('/:id', medicoController.getMedicoById);

// GET /api/medicos/:id/turnos -> te da todos los turnos de un médico específico
router.get('/:id/turnos', medicoController.getTurnosByMedico);


// ---------------------------------------------
// RUTAS POST, PUT, DELETE 
// ---------------------------------------------

// POST /api/medicos -> Crear un nuevo médico
router.post("/", medicoController.createMedico);

// PUT /api/medicos/:id -> Actualizar la información de un médico
router.put("/:id", medicoController.updateMedico);

// DELETE /api/medicos/:id -> Eliminar un médico
router.delete("/:id", medicoController.deleteMedico);

export default router;