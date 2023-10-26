export class TicketNotes {
  id: number = 0;
  techId: number = 0;
  techName: string = '';
  date: Date = new Date();
  comment: string = '';
  isPrivate: boolean = true;
  ticketId: number = 0

  static getJson(obj:any){
      let ticket_notes: TicketNotes = new TicketNotes;

      ticket_notes.id = obj.id ? obj.id : null;
      ticket_notes.techId = obj.techId ? obj.techId : null;
      ticket_notes.techName = obj.techName ? obj.techName : null;
      ticket_notes.date = obj.date ? obj.date : null;
      ticket_notes.comment = obj.comment ? obj.comment : null;
      ticket_notes.isPrivate = obj.isPrivate ? obj.isPrivate : null;
      ticket_notes.ticketId = obj.ticketId ? obj.ticketId : null;

      return ticket_notes;

  }
}
