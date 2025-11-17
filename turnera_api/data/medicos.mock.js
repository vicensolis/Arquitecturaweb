import { MedicoModel } from "../models/MedicoModel.js";

// Datos de prueba para la entidad Medico
export const medicos = [
    new MedicoModel(
        1, 
        "Juan Roman", 
        "Riquelme", 
        "30123456", 
        "Cardiología"
    ),
    new MedicoModel(
        2, 
        "Roberto", 
        "Leto", 
        "25876543", 
        "Pediatría"
    ),
    new MedicoModel(
        3, 
        "Ana", 
        "Vargas", 
        "35444333", 
        "Dermatología"
    )
];