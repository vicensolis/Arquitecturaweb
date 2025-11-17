import { MedicoModel } from "../models/MedicoModel.js";
import { medicos as medicosMock } from "../data/medicos.mock.js";
import { TurnosService } from "./turnosService.js"; 

export class MedicoService {
    constructor() {
        this.medicos = [...medicosMock];
        this.turnosService = new TurnosService(); 
        this.nextId = this.medicos.length > 0 ? this.medicos[this.medicos.length - 1].id + 1 : 1;
    }

    
    // GET
    

    async getAll() {
        return this.medicos;
    }

    async getById(id) {
        const medicoId = parseInt(id);
        const medico = this.medicos.find(m => m.id === medicoId); 
        if (!medico) {
            const error = new Error(`Médico con id ${id} no encontrado`);
            error.code = 404;
            throw error;
        }
        return medico;
    }

    
    async getTurnos(id) {
        const medicoId = parseInt(id); 
        const medico = this.medicos.find(m => m.id === medicoId);
        if (!medico) {
            const error = new Error(`Médico con id ${id} no encontrado`);
            error.code = 404;
            throw error;
        }

        
        const todosLosTurnos = await this.turnosService.getAll();
        const turnosDelMedico = todosLosTurnos.filter(t => t.idmedico === medicoId);

        
        return turnosDelMedico;
    }

    
    // POST
    

    async add(body) {
        const nuevoMedico = new MedicoModel(
            this.nextId++,
            body.nombre,
            body.apellido,
            body.dni,
            body.especialidad
        );
        
        this.medicos.push(nuevoMedico);
        return nuevoMedico;
    }

    
    // PUT
  

    async update(id, body) {
        const medicoId = parseInt(id); 
        const medico = this.medicos.find(m => m.id === medicoId); 
    
        if (!medico) {
            const error = new Error(`Médico con id ${id} no encontrado para actualizar`);
            error.code = 404;
            throw error;
        }
    
        if (body.id) delete body.id; 
        Object.assign(medico, body);
        return medico;
    }

    // DELETE

    async remove(id) {
        const medicoId = parseInt(id); 
        const index = this.medicos.findIndex(m => m.id === medicoId); 
    
        if (index > -1) {
            this.medicos.splice(index, 1);
            return true;
        } else {
            const error = new Error(`Médico con id ${id} no encontrado para eliminar`);
            error.code = 404;
            throw error;
        }
    }
}