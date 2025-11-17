import { PacienteModel } from "../models/PacienteModel.js";

// Datos de prueba para la entidad Paciente
export const pacientes = [
    new PacienteModel(
        1, 
        "Jose María", 
        "Rodriguez", 
        "38000111"
    ),
    new PacienteModel(
        2, 
        "Carlos", 
        "Tevez", 
        "32555444"
    ),
    new PacienteModel(
        3, 
        "Julieta", 
        "Gonzalez", 
        "41999888"
    )
];