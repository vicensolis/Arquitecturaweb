// Datos de prueba para la entidad Turnos
import { TurnoModel } from "../models/TurnoModel.js";
export const turnos = [
    new TurnoModel(
        1, 
        1, // idmedico: 1 (Juan Roman Riquelme)
        1, // idpaciente: 1 (Jose María Rodriguez)
        "2025-12-10T10:00:00Z", // Fecha y hora
        "CONFIRMADO"
    ),
    new TurnoModel(
        2, 
        2, // idmedico: 2 (Roberto Leto)
        3, // idpaciente: 3 (Julieta Gonzalez)
        "2025-12-10T11:30:00Z", 
        "RESERVADO"
    ),
    new TurnoModel(
        3, 
        1, // idmedico: 1 (Juan Roman Riquelme)
        2, // idpaciente: 2 (Carlos Tevez)
        "2025-12-10T10:30:00Z", 
        "CANCELADO" // Este turno no debería bloquear la agenda
    )
];