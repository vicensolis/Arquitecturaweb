import { TurnosService } from "../services/turnosService.js"; 

export class TurnoController {
  constructor() {
    this.turnosService = new TurnosService(); 
  }

  // GET /api/turnos
  getAllTurnos = async (req, res) => {
    try {
      const responseBody = await this.turnosService.getAll();
      res.status(200).json(responseBody);
      console.log('Turnos obtenidos:', responseBody.length);
    } catch (error) {
      this.manejarErrores(res, error); 
    }
  }

  // GET /api/turnos/:id
  getTurnosById = async (req, res) => {
    try {
      const id = req.params.id;
      const responseBody = await this.turnosService.getById(id);
      
      res.status(200).json(responseBody);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  };

  // POST /api/turnos
  createTurno = async (req, res) => {
    try {
      const responseBody = await this.turnosService.add(req.body); 
      res.status(201).json(responseBody); 
      console.log('Turno reservado ID:', responseBody.id);
    } catch (error) {
      this.manejarErrores(res, error);
    }
  }

  // PATCH /api/turnos/:id
  actualizarEstadoTurno = async (req, res) => {
  try {
    const id = req.params.id;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ message: "El campo 'estado' es obligatorio." });
    }

    const responseBody = await this.turnosService.updateEstado(id, estado);
    res.status(200).json(responseBody);
  } catch (error) {
    this.manejarErrores(res, error);
  }
}

  // DELETE /api/turnos/:id 
  deleteTurno = async(req, res) => {
    try{
      const id = req.params.id;
      const result = await this.turnosService.remove(id); 
      if (!result) {
          throw { code: 404, message: `Turno con ID ${id} no encontrado para eliminar.` };
      }
      res.status(204).send(); 
    }
    catch (error) {
      this.manejarErrores(res, error);
    }
  }

  manejarErrores(res, error){
    switch (error.code) {
      case 409: 
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