# Arquitecturaweb
El negocio para la api va a ser un sistema de turnos medicos, los usuarios podran registrar medicos, pacientes y reservar turnos
# Instrucciones de Ejecucion:
(Puerto(3000))
1) cd turnera-api
2) npm install
3) npm run dev
- El servidor estará corriendo en: http://localhost:3000

# Entidades:
* Medico: datos de los medicos(id, nombre, apellido,dni,especialidad)
* Paciente: datos de los pacientes(id, nombre, apellido,dni)
* Turnos: informacion sobre el turno (id,idmedico,idpaciente, fechahora, estado)

# Endpoints: 
## Medico (/api/medicos):
* GET /api/medicos -> Lista todos los medicos      
* GET /api/medicos/:id -> Obtiene medicos por id
* POST /api/medicos -> Crea un nuevo medico
  - Body ejemplo:
  ```
  {
        "nombre": "Pablo",
        "apellido": "Ledesma",
        "dni":47894321,
        "especialidad": "Dermatologo"
        } 
* PUT /api/medicos/:id -> Actualiza los datos de un medico que ya existe
  - Body ejemplo:
    ```
    {
          "nombre": "Pablo",
          "apellido": "Ledesma",
          "dni":47894321,
          "especialidad": "Traumatologo"
    }       
* DELETE /api/medicos/:id -> Elimina un medico
* GET /api/medicos/:id/turnos -> Lista los turnos de un medico
          
          
## Paciente (/api/pacientes)
* GET /api/pacientes -> Devuelve la lista de los pacientes
* GET /api/pacientes/:id -> Devuelve paciente por id
* POST /api/pacientes -> Crea un paciente
  - Body ejemplo:
  ```
  {
      "nombre": "Marcelo",
      "apellido": "Meli",
      "dni":47894456,
  }
* PUT /api/pacientes/:id -> Actualiza datos de un paciente especifico por id
* DELETE /api/pacientes/:id -> Elimina un paciente por su id especifico


## Turnos (/api/turnos)
* GET /api/turnos -> Devuelve la lista completa de los turnos
* GET /api/turnos/:id -> Devuelve los turnos especificos por id
* POST /api/turnos -> Crea un turno
- Body ejemplo:
  ```
  {
      "idMedico": 2,
      "idPaciente": 3,
      "fechaHora": "2025-12-15T12:00:00Z",
      "estado": "CONFIRMADO"
  }
  
* PUT /api/turnos/:id/cancelar -> Cambia el estado del turno a cancelado
