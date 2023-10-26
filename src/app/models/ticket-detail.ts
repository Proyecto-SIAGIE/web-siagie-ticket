export class TicketDetail{
  id: number = 0;
  dateMod: Date = new Date();
  assignedTechId: number = 0;
  assignedTechName: string = '';
  solveDate: Date = new Date();
  source: string = '';
  status: number = 0;
  priority: number = 0;
  impact: number = 0;
  urgency: number = 0;
  summary: string = '';
  modality: string = '';
  type: number = 0;
  process: string = '';
  usiStatus: number = 0

  static getJson(obj:any) {
      let ticket_detail: TicketDetail = new TicketDetail();

      ticket_detail.id = obj.ID ? obj.ID : null;
      ticket_detail.dateMod = obj.dateMod ? obj.dateMod : null;
      ticket_detail.assignedTechId = obj.assignedTechId ? obj.assignedTechId : null;
      ticket_detail.assignedTechName = obj.assignedTechName ? obj.assignedTechName : null;
      ticket_detail.solveDate = obj.solveDate ? obj.solveDate: null;
      ticket_detail.source = obj.source ? obj.source: null;
      ticket_detail.status = obj.status ? obj.status: null;
      ticket_detail.priority = obj.priority ?obj.priority : null;
      ticket_detail.impact = obj.impact ? obj.impact : null;
      ticket_detail.urgency = obj.urgency ? obj.urgency : null;
      ticket_detail.summary = obj.summary ? obj.summary : null;
      ticket_detail.modality = obj.modality ? obj.modality: null;
      ticket_detail.type = obj.type ? obj.type : null;
      ticket_detail.process = obj.process ? obj.process : null;
      ticket_detail.usiStatus = obj.usiStatus ? obj.usiStatus : null;

      return ticket_detail;
  }

}
