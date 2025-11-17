// 💡 Importar el servicio que maneja la lógica de datos de los Pacientes
import { PacienteService } from "../services/pacienteServices.js"; 

export class PacienteController {
  constructor() {
    // Inicializa la instancia del servicio de Pacientes
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
      const id = req.params.id; // Se pasa como string al servicio
      const responseBody = await this.pacienteService.getById(id);
      
      if (!responseBody) {
          // Si el servicio no encuentra el recurso, lanzamos un error 404
          throw { code: 404, message: `Paciente con ID ${id} no encontrado.` }; 
      }
      
      res.status(200).json(responseBody);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  };

  /* // 🚫 NOTA: Eliminamos getTurnosByMedico ya que es específico del médico.
  // Si quisiéramos listar los turnos de un paciente, usaríamos getTurnosByPaciente.
  */

  // POST /api/pacientes
  createPaciente = async (req, res) => {
    try {
      // 💡 Se asume que req.body contiene { nombre, apellido, dni }
      const responseBody = await this.pacienteService.add(req.body); 
      res.status(201).json(responseBody); // 201 Created
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
      
      res.status(204).send(); // 204 No Content para eliminación exitosa
    }
    catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // Función auxiliar para manejar errores HTTP (Traduce errores 404 del servicio a respuestas HTTP)
  manejarErrores(res, error){
    switch (error.code) {
      case 404:
        res.status(404).json({ message: error.message });
        break;
      case 400: // Se puede agregar si el servicio lanza 400 por validación de campos
        res.status(400).json({ message: error.message });
        break;
      default:
        res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}