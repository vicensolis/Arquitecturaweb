import { TurnoModel } from "../models/TurnoModel.js";
import { MedicoService } from "./medicoServices.js"; 
import { PacienteService } from "./pacienteServices.js"; 


import { turnos as turnosMock } from "../data/turnos.mock.js"; 

export class TurnosService {
    constructor() {

        this.turnos = [...turnosMock]; 
        
        
        this.pacienteService = new PacienteService();
        
        
        this.nextId = this.turnos.length > 0 ? this.turnos[this.turnos.length - 1].id + 1 : 1;
    }


    // GET


    async getAll() {
        return this.turnos;
    }

    async getById(id) {
        const turnoId = parseInt(id);
        const turno = this.turnos.find(t => t.id === turnoId); 
        
        if (!turno) {
            const error = new Error(`Turno con id ${id} no encontrado`);
            error.code = 404;
            throw error;
        }
        return turno;
    }

   
    // POST

    async add(body) {
        const { idmedico, idpaciente, fechahora } = body;
        
        if (!idmedico || !idpaciente || !fechahora) {
            const error = new Error("Faltan campos requeridos: idmedico, idpaciente, fechahora.");
            error.code = 400;
            throw error;
        }

        const medicoService = new MedicoService(); 

        
        try {
            await medicoService.getById(idmedico);
            await this.pacienteService.getById(idpaciente);
        } catch (ex) {
            
            const error = new Error(`Error de validación de FK: ${ex.message}`);
            error.code = 400; 
            throw error;
        }

        
        const isDisponible = !this.turnos.some(t => 
            t.idmedico === parseInt(idmedico) && 
            t.estado !== 'CANCELADO' && new Date(t.fechahora).getTime() === new Date(fechahora).getTime()
        );
        
        if (!isDisponible) {
            const error = new Error(`El medico ${idmedico} no está disponible en la fecha y hora solicitada.`);
            error.code = 409; 
            throw error;
        }

        
        const nuevoTurno = new TurnoModel(
            this.nextId++,
            parseInt(idmedico),
            parseInt(idpaciente),
            fechahora,
            'RESERVADO'
        );
        
        this.turnos.push(nuevoTurno);
        return nuevoTurno;
    }

    
    // PATCH/PUT
    
    
    async updateEstado(id, nuevoEstado) {
        const turnoId = parseInt(id);
        const turno = this.turnos.find(t => t.id === turnoId); 
    
        if (!turno) {
            const error = new Error(`Turno con id ${id} no encontrado para actualizar`);
            error.code = 404;
            throw error;
        }
        
        
        if (['CANCELADO', 'CONFIRMADO', 'REALIZADO'].includes(nuevoEstado)) {
            turno.estado = nuevoEstado;
            return turno;
        } else {
            const error = new Error(`Estado '${nuevoEstado}' no válido.`);
            error.code = 400;
            throw error;
        }
    }
    
    // DELETE
    
    async remove(id) {
        const turnoId = parseInt(id);
        const index = this.turnos.findIndex(t => t.id === turnoId); 
    
        if (index > -1) {
            this.turnos.splice(index, 1);
            return true;
        } else {
            const error = new Error(`Turno con id ${id} no encontrado para eliminar`);
            error.code = 404;
            throw error;
        }
    }
}