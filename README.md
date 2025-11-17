# Arquitecturaweb
El negocio para la api va a ser un sistema de turnos medicos, los usuarios podran registrar medicos, pacientes y reservar turnos
# Instrucciones de Ejecucion:
(Puerto(3000))
1) cd turnera-api
2) npm install
3) npm run dev
El servidor estará corriendo en: http://localhost:3000

# Entidades:
* Medico: datos de los medicos(id, nombre, apellido,dni,especialidad)
* Paciente: datos de los pacientes(id, nombre, apellido,dni)
* Turnos: informacion sobre el turno (id,idmedico,idpaciente, fechahora, estado)

# Endpoints: 
## Medico (/api/medicos):
* GET /api/medicos
  - Lista todos los medicos
          
* GET /api/medicos/:id
  - Obtiene medicos por id

* POST /api/medicos
  - Crea un nuevo medico
        body
        {
        "nombre": "Pablo",
        "apellido": "Costa",
        "dni":47894321,
        "especialidad": "Dermatologo"
        }
          
* PUT /api/medicos/:id
  - Actualiza los datos de un medico que ya existe
          
* DELETE /api/medicos/:id
  - Elimina un medico 
* GET /api/medicos/:id/turnos
  -Lista los turnos de un medico
          
          
## Paciente (/api/pacientes)



## Turnos (/api/turnos)

