export class Ticket {
    id: number = 0;
    description: string = '';
    subcategory1Id: number = 0;
    subcategory2Id: number = 0;
    subcategory3Id: number = 0;
    use_ExternalId: number = 0;
    
    static getJson(obj:any){
        let ticket: Ticket = new Ticket();

        ticket.id = obj.ID ? obj.id : null;
        ticket.description = obj.description ? obj.description : null;
        ticket.subcategory1Id = obj.subcategory1Id ? obj.subcategory1Id : null;
        ticket.subcategory2Id = obj.subcategory2Id ? obj.subcategory2Id : null;
        ticket.subcategory3Id = obj.subcategory3Id ? obj.subcategory3Id : null;
        ticket.use_ExternalId = obj.use_ExternalId ? obj.use_ExternalId : null;
    
        return ticket;
    }
}

