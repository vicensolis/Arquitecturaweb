import { PacienteModel } from "../models/PacienteModel.js";
import { pacientes as pacientesMock } from "../data/pacientes.mock.js";

export class PacienteService {
    constructor() {

        this.pacientes = [...pacientesMock]; 
       
        this.nextId = this.pacientes.length > 0 ? this.pacientes[this.pacientes.length - 1].id + 1 : 1;
    }

    // GET 
    async getAll() {
        return this.pacientes;
    }

    async getById(id) {
        const pacienteId = parseInt(id);
        const paciente = this.pacientes.find(p => p.id === pacienteId);

        if (!paciente) {
            const error = new Error(`Paciente con id ${id} no encontrado`);
            error.code = 404;
            throw error;
        }
        return paciente;
    }

    // POST
    async add(body) {
        
        if (!body.nombre || !body.apellido || !body.dni) {
             const error = new Error("Faltan campos obligatorios para registrar el paciente");
             error.code = 400; 
             throw error;
        }
        
        const nuevoPaciente = new PacienteModel(
            this.nextId++,
            body.nombre,
            body.apellido,
            body.dni
        );
        
        this.pacientes.push(nuevoPaciente);
        return nuevoPaciente;
    }

    // PUT
    async update(id, body) {
        const pacienteId = parseInt(id);
        const paciente = this.pacientes.find(p => p.id === pacienteId);
        
        if (!paciente) {
            const error = new Error(`Paciente con id ${id} no encontrado para actualizar`);
            error.code = 404;
            throw error;
        }

        if (body.id) delete body.id; 
        Object.assign(paciente, body);
        return paciente;
    }
    
    // DELETE
    async remove(id) {
        const pacienteId = parseInt(id);
        const index = this.pacientes.findIndex(p => p.id === pacienteId);

        if (index > -1) {
            this.pacientes.splice(index, 1);
            return true;
        } else {
            const error = new Error(`Paciente con id ${id} no encontrado para eliminar`);
            error.code = 404;
            throw error;
        }
    }
}