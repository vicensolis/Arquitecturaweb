# Arquitecturaweb
El negocio para la api va a ser un sistema de turnos medicos, los usuarios podran registrar medicos, pacientes y reservar turnos
# Instrucciones de Ejecucion:
1) cd turnera-api
2) npm install
3) npm run dev

# Entidades:
          Medico: datos de los medicos(id, nombre, apellido,dni,especialidad)
          Paciente: datos de los pacientes(id, nombre, apellido,dni)
          Turnos: informacion sobre el turno (id,idmedico,idpaciente, fechahora, estado)

# Endpoints: 
## Medico (/api/medicos):
* GET /api/medicos
          
* GET /api/medicos/:id

* POST /api/medicos
          
* PUT /api/medicos/:id 
          
* DELETE /api/medicos/:id
          
* GET /api/medicos/:id/turnos
          
          
## Paciente (/api/pacientes)



## Turnos (/api/turnos)

