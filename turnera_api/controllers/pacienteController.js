import { PacienteService } from "../services/pacienteServices.js"; 

export class PacienteController {
  constructor() {
    this.pacienteService = new PacienteService(); 
  }

  // GET /api/pacientes
  getAllPacientes = async (req, res) => {
    try {
      const responseBody = await this.pacienteService.getAll();
      res.status(200).json(responseBody);
      console.log('Pacientes obtenidos:', responseBody.length);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la lista de pacientes" });
    }
  }

  // GET /api/pacientes/:id
  getPacienteById = async (req, res) => {
    try {
      const id = req.params.id; 
      const responseBody = await this.pacienteService.getById(id);
      
      if (!responseBody) {
          throw { code: 404, message: `Paciente con ID ${id} no encontrado.` }; 
      }
      
      res.status(200).json(responseBody);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  };

  // POST /api/pacientes
  createPaciente = async (req, res) => {
    try {
      const responseBody = await this.pacienteService.add(req.body); 
      res.status(201).json(responseBody);
      console.log('Paciente creado:', responseBody.id);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // PUT /api/pacientes/:id
  updatePaciente = async (req, res) => {
    try{
      const id = req.params.id;
      const responseBody = await this.pacienteService.update(id, req.body);
      
      if (!responseBody) {
          throw { code: 404, message: `Paciente con ID ${id} no encontrado para actualizar.` }; 
      }
      
      console.log('Paciente actualizado:', responseBody.id);
      res.status(200).json(responseBody);    
    }
    catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // DELETE /api/pacientes/:id
  deletePaciente = async(req, res) => {
    try{
      const id = req.params.id;
      const result = await this.pacienteService.remove(id); 
      
      if (!result) {
          throw { code: 404, message: `Paciente con ID ${id} no encontrado para eliminar.` };
      }
      
      res.status(204).send();
    }
    catch (error) {
      this.manejarErrores(res, error);
    }
  }

  manejarErrores(res, error){
    switch (error.code) {
      case 404:
        res.status(404).json({ message: error.message });
        break;
      case 400:
        res.status(400).json({ message: error.message });
        break;
      default:
        res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}