// Datos de prueba iniciales para la entidad Turnos
import { TurnoModel } from "../models/TurnoModel.js";
export const turnos = [
    new TurnoModel(
        1, 
        1, // idmedico: 1 (Laura Rodríguez)
        1, // idpaciente: 1 (María López)
        "2025-12-10T10:00:00Z", // Fecha y hora
        "CONFIRMADO"
    ),
    new TurnoModel(
        2, 
        2, // idmedico: 2 (Roberto Giménez)
        3, // idpaciente: 3 (Julieta Ramos)
        "2025-12-10T11:30:00Z", 
        "RESERVADO"
    ),
    new TurnoModel(
        3, 
        1, // idmedico: 1 (Laura Rodríguez)
        2, // idpaciente: 2 (Carlos Díaz)
        "2025-12-10T10:30:00Z", 
        "CANCELADO" // Este turno no debería bloquear la agenda
    )
];