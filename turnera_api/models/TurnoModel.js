export class TurnoModel {
    constructor(id, idmedico, idpaciente, fechahora, estado = 'RESERVADO') {
        this.id = id;
        this.idmedico = idmedico;       
        this.idpaciente = idpaciente;   
        this.fechahora = fechahora;     
        this.estado = estado;           
    }
}