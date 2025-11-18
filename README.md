# Arquitecturaweb
El negocio para la api va a ser un sistema de turnos medicos, los usuarios podran registrar medicos, pacientes y reservar turnos
* Tecnologias del Backend: Node.js / Express
* Base de datos: se esta simulando una base de datos usando archivos .mock.js
  
# Instrucciones de Ejecucion:
(Puerto(3000))
1) cd turnera_api
2) npm install
3) npm run dev
- El servidor estará corriendo en: http://localhost:3000

# Entidades:
* Medico: datos de los medicos(id, nombre, apellido,dni,especialidad)
* Paciente: datos de los pacientes(id, nombre, apellido,dni)
* Turnos: informacion sobre el turno (id,idmedico,idpaciente, fechahora, estado)

# Endpoints: 
## Health Check (/health)
- Verifica que la API funciona
* Respuesta: 200:
  ```
  {
      "status": "OK",
      "message": "API de Turnos Médicos funcionando correctamente",
      "timestamp": "2025-11-18T04:12:49.125Z"
  }
  ```
  
## Medico (/api/medicos):
* GET /api/medicos -> Lista todos los medicos
  - Respuesta: 200 -> {nombre,apellido,dni,especialidad}     
* GET /api/medicos/:id -> Obtiene medicos por id
  - Respuesta: 200 -> {nombre,apellido,dni,especialidad}
  - Error: 404 -> Medico no encontrado
* POST /api/medicos -> Crea un nuevo medico
  - Body ejemplo:
    ```
    {
          "nombre": "Pablo",
          "apellido": "Ledesma",
          "dni":47894321,
          "especialidad": "Dermatologo"
          }
    ```
  - Respuesta: 201-> Medico creado
  - Error: 400 -> Faltan campos
  - Error 409 -> DNI repetido
  
* PUT /api/medicos/:id -> Actualiza los datos de un medico que ya existe
  - Body ejemplo:
    ```
    {
          "nombre": "Juan",
          "apellido": "Ledesma",
          "dni":47894321,
          "especialidad": "Traumatologo"
    }
    ```
  - Respuesta:
  - Respuesta: 200 -> Médico actualizado
  - Error: 400 -> Faltan campos obligatorios
  - Error: 404 -> Médico no encontrado

* DELETE /api/medicos/:id -> Elimina un medico
  - Respuesta: 204 -> Médico eliminado
  - Error: 404 -> Médico no encontrado

* GET /api/medicos/:id/turnos -> Lista los turnos de un medico
  - Respuesta: 200 -> Array de turnos del médico
  - Error: 404 -> Médico no encontrado
          
## Paciente (/api/pacientes)
* GET /api/pacientes -> Devuelve la lista de los pacientes
  - Respuesta: 200 -> {id, nombre, apellido,dni}
  - Error: ninguno
    
* GET /api/pacientes/:id -> Devuelve paciente por id
  - Respuesta: 200 -> {id, nombre, apellido,dni}
  - Error: 404 -> Paciente no encontrado

* POST /api/pacientes -> Crea un paciente
  - Body ejemplo:
      ```
      {
          "nombre": "Marcelo",
          "apellido": "Meli",
          "dni":47894456
      }
      ```
  - Respuesta: 201 -> Paciente creado
  - Error: 400 -> Faltan campos
  - Error: 409 -> DNI repetido
  
* PUT /api/pacientes/:id -> Actualiza datos de un paciente especifico por id
  - Body ejemplo:
      ```
      {
          "nombre": "Cesar Marcelo",
          "apellido": "Meli",
          "dni":47894456
      }
      ```
  - Respuesta: 200 -> Paciente actualizado
  - Error: 400 -> Faltan campos
  - Error: 404 -> Paciente no encontrado
    
* DELETE /api/pacientes/:id -> Elimina un paciente por su id especifico
  - Respuesta: 204 -> Paciente eliminado
  - Error: 404 -> Paciente no encontrado
  - 
## Turnos (/api/turnos)
* GET /api/turnos -> Devuelve la lista completa de los turnos
  - Respuesta: 200 -> {id,idmedico,idpaciente, fechahora, estado}
  - Error: ninguno
    
* GET /api/turnos/:id -> Devuelve el turno especifico por id
  - Respuesta: 200 -> {id,idmedico,idpaciente, fechahora, estado}
  - Error: 404 -> Turno no encontrado
    
* POST /api/turnos -> Crea un turno
  - Body ejemplo:
    ```
      {
      "idmedico": 3,
      "idpaciente": 2,
      "fechahora": "2025-12-20T14:00:00Z"
    }
    ```
  - Respuesta: 201 -> Turno creado
  - Error: 400 -> Faltan campos
  - Error: 409 -> Médico no disponible en esa fecha/hora
  - Error: 400 -> Médico o paciente inexistente
  
* PATCH /api/turnos/:id -> Cambia el estado del turno a cancelado
  - Body ejemplo:
    ```
      {
        "estado": "CANCELADO"
      }
    ```
  - Respuesta: 200 -> Turno actualizado (estado modificado)
  - Error: 400 -> Falta el campo "estado" o estado inválido
  - Error: 404 -> Turno no encontrado
    
* DELETE /api/turnos/:id -> Elimina turno
  - Respuesta: 204 -> Turno eliminado
  - Error: 404 -> Turno no encontrado
