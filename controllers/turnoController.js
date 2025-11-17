// Importar el servicio que maneja la lógica de datos de los Turnos
import { TurnosService } from "../services/turnosService.js"; 

export class TurnoController {
  constructor() {
    // Inicializa la instancia del servicio de Turnos (CORRECTO)
    this.turnosService = new TurnosService(); 
  }

  // GET /api/turnos -> Obtener todos los turnos
  getAllTurnos = async (req, res) => {
    try {
      // ✅ Usa this.turnosService
      const responseBody = await this.turnosService.getAll();
      res.status(200).json(responseBody);
      console.log('Turnos obtenidos:', responseBody.length);
    } catch (error) {
      this.manejarErrores(res, error); // Usar manejarErrores para un manejo uniforme
    }
  }

  // GET /api/turnos/:id -> Obtener un turno por ID
  getTurnosById = async (req, res) => {
    try {
      const id = req.params.id; // Se pasa como string
      // ✅ Usa this.turnosService.getById
      const responseBody = await this.turnosService.getById(id);
      
      // La verificación de 404 está delegada al servicio
      
      res.status(200).json(responseBody);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  };

  // POST /api/turnos -> RESERVAR TURNO (Lógica Central)
  createTurno = async (req, res) => {
    try {
      // 💡 Se asume que req.body contiene { idmedico, idpaciente, fechahora }
      // ✅ Usa this.turnosService.add
      const responseBody = await this.turnosService.add(req.body); 
      
      // El servicio lanza 409 Conflict si el médico no está disponible
      res.status(201).json(responseBody); // 201 Created
      console.log('Turno reservado ID:', responseBody.id);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // PUT/PATCH /api/turnos/:id/cancelar -> Cancelar Turno (Actualización de Estado)
  cancelarTurno = async (req, res) => {
    try{
      const id = req.params.id;
      const nuevoEstado = 'CANCELADO'; // Definimos el nuevo estado
      
      // ✅ Usa this.turnosService.updateEstado (Método definido en el servicio)
      const responseBody = await this.turnosService.updateEstado(id, nuevoEstado);
      
      res.status(200).json(responseBody);    
    }
    catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // DELETE /api/turnos/:id -> Eliminar (Opción de eliminación directa)
  deleteTurno = async(req, res) => {
    try{
      const id = req.params.id;
      // ✅ Usa this.turnosService.remove
      const result = await this.turnosService.remove(id); 
      
      if (!result) {
          // El servicio debería lanzar 404, pero esto captura fallos inesperados
          throw { code: 404, message: `Turno con ID ${id} no encontrado para eliminar.` };
      }
      
      res.status(204).send(); // 204 No Content para eliminación exitosa
    }
    catch (error) {
      this.manejarErrores(res, error);
    }
  }
  
  // 🚫 NOTA: Las funciones getTurnosByMedico, createMedico y updateMedico 
  // pertenecen al controlador de Médico y deben eliminarse de aquí.

  // Función auxiliar para manejar errores HTTP (Manejador de errores consistente)
  manejarErrores(res, error){
    switch (error.code) {
      case 409: // Conflict, para cuando el médico ya está ocupado
        res.status(409).json({ message: error.message });
        break;
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