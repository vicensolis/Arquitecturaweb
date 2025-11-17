import { Router } from "express";
// 💡 Importamos la clase que acabamos de definir en el paso anterior
import { PacienteController } from "../controllers/pacienteController.js"; 

const router = Router();
const pacienteController = new PacienteController();

// ---------------------------------------------
// RUTAS GET (LECTURA)
// ---------------------------------------------

// GET /api/pacientes -> Obtener la lista completa de pacientes
router.get("/", pacienteController.getAllPacientes);

// GET /api/pacientes/:id -> Obtener un paciente específico por su ID
router.get('/:id', pacienteController.getPacienteById);



// 🚫 NOTA: Eliminamos la ruta adicional de turnos, ya que es específica de la agenda del médico.

// ---------------------------------------------
// RUTAS POST, PUT, DELETE (CREACIÓN y MODIFICACIÓN)
// ---------------------------------------------

// POST /api/pacientes -> Crear un nuevo registro de paciente
router.post("/", pacienteController.createPaciente);

// PUT /api/pacientes/:id -> Actualizar completamente la información de un paciente
router.put("/:id", pacienteController.updatePaciente);

// DELETE /api/pacientes/:id -> Eliminar un paciente
router.delete("/:id", pacienteController.deletePaciente);

export default router;