// 💡 Importar el servicio que maneja la lógica de datos de los Médicos
import { MedicoService } from "../services/medicoServices.js"; 

export class MedicoController {
  constructor() {
    // Inicializa la instancia del servicio de Médicos
    this.medicoService = new MedicoService(); 
  }

  // GET /api/medicos
  getAllMedicos = async (req, res) => {
    try {
      const responseBody = await this.medicoService.getAll();
      res.status(200).json(responseBody);
      console.log('Médicos obtenidos:', responseBody.length);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la lista de médicos" });
    }
  }

  // GET /api/medicos/:id
  getMedicoById = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const responseBody = await this.medicoService.getById(id);
      
      if (!responseBody) {
          // Si el servicio no encuentra el recurso, lanzamos un error 404
          throw { code: 404, message: `Médico con ID ${id} no encontrado.` }; 
      }
      
      res.status(200).json(responseBody);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  };

  // GET /api/medicos/:id/turnos (Ruta de Negocio Específica)
  getTurnosByMedico = async(req, res) => {
    console.log("Consultando turnos para médico ID:", req.params.id);
    try {
      const id = parseInt(req.params.id);
      // 💡 Llamamos a una función específica para obtener los turnos de ese médico
      const responseBody = await this.medicoService.getTurnos(id); 
      
      res.status(200).json(responseBody);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // POST /api/medicos
  createMedico = async (req, res) => {
    try {
      // 💡 Se asume que req.body contiene { nombre, apellido, dni, especialidad }
      const responseBody = await this.medicoService.add(req.body); 
      res.status(201).json(responseBody); // 201 Created
      console.log('Médico creado:', responseBody.id);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // PUT /api/medicos/:id
  updateMedico = async (req, res) => {
    try{
      const id = parseInt(req.params.id);
      const responseBody = await this.medicoService.update(id, req.body);
      
      if (!responseBody) {
          throw { code: 404, message: `Médico con ID ${id} no encontrado para actualizar.` }; 
      }
      
      console.log('Médico actualizado:', responseBody.id);
      res.status(200).json(responseBody);    
    }
    catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // DELETE /api/medicos/:id
  deleteMedico = async(req, res) => {
    try{
      const id = parseInt(req.params.id);
      const result = await this.medicoService.remove(id); // remove debe devolver true/false
      
      if (!result) {
          throw { code: 404, message: `Médico con ID ${id} no encontrado para eliminar.` };
      }
      
      res.status(204).send(); // 204 No Content para eliminación exitosa
    }
    catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // Función auxiliar para manejar errores HTTP
  manejarErrores(res, error){
    switch (error.code) {
      case 404:
        res.status(404).json({ message: error.message });
        break;
      default:
        res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}