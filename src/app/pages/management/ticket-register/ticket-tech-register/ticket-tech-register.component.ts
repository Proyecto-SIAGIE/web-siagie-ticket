import { Component, OnInit } from '@angular/core';
import { Subject, catchError, firstValueFrom, switchMap, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Institution } from 'src/app/models/institution';
import { GestorGlpiService } from 'src/app/services/gestor-glpi.service';
import { GestorTicketService } from 'src/app/services/gestor-ticket.service';
import { HelperService } from 'src/app/services/helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-tech-register',
  templateUrl: './ticket-tech-register.component.html',
  styleUrls: ['./ticket-tech-register.component.css']
})
export class TicketTechRegisterComponent implements OnInit {
  unsuscribe = new Subject<void>();
  constructor(
    private gestorTicketService: GestorTicketService,
    private gestorGlpiService: GestorGlpiService,
    private helperService: HelperService) { }


  userdni: string = '';
  username: string = '';
  fullname: string = '';
  name: string = '';
  lastname: string = '';
  usermail: string = '';
  userType: number = 0;
  sedeOptions: string[] = [];
  userphone: string = '';
  userphoneanexo: string = '';
  requestuser: string = '';
  modularCode: string = '';

  selectedFiles: File[] | null = null;


  selectedOpt: string = '';
  selectSedeStatus: boolean = true;

  //UGEL
  ugelOptions: string[] = [];
  selectedUgel: string = '';

  //IE
  ieOptions: string[] = [];
  selectedIE: string = '';

  isTypeIE: boolean = true;

  categories: Category[] = [];
  subCategories1: Category[] = [];
  subCategories2: Category[] = [];
  subCategories3: Category[] = [];

  institutions: Institution[] = [];

  async ngOnInit(): Promise<void> {
    this.categories = await this.getITILCategories();
    this.institutions = await this.getInstitutions('060000','060013');
  }

  async getUserPassportData() {
    //Proceso para obtener info del passport

    ///
    this.username = '09785463';
    this.name = 'Luis Miguel';
    this.lastname = 'Challco';
    this.fullname = this.name + " " + this.lastname;
    this.usermail = 'nivel3_esp1@minedu.gob.pe'
    this.userType = 2; //usuario IE
    switch (this.userType) {
      case 1: this.sedeOptions = ['DRE', 'UGEL', 'IE']; break;
      case 2: this.sedeOptions = ['UGEL', 'IE']; break;
      case 3: this.sedeOptions = ['IE']; break;
    }
    this.selectedOpt = this.sedeOptions[0];
    this.selectSedeStatus = false;

    if (this.selectedOpt !== 'IE') {
      this.isTypeIE = false;
    }

  }

  onSelectSedeChange(value: string) {

    if (value !== 'IE') {
      this.isTypeIE = false;
    } else {
      this.isTypeIE = true
    }
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  async getITILCategories() {
    return await firstValueFrom(
      this.gestorGlpiService.getCategories()
    )
  }

  async getInstitutions(dreCode: string, ugelCode: string){
    return await firstValueFrom(
      this.gestorTicketService.getEducativeInstitutions(dreCode, ugelCode)
    );
  }

  onSelectedCategory(type: string, params: any) {
    switch (type) {
      case "category":

        this.subCategories1 = [];
        this.subCategories2 = [];
        this.subCategories3 = [];

        if (params.children && params.children.length > 0) {
          this.subCategories1 = params.children;
        }
        break;
      case "subCategoria1":

        this.subCategories2 = [];
        this.subCategories3 = [];

        if (params.children && params.children.length > 0) {
          this.subCategories2 = params.children;
        }
        break;
      case "subCategoria2":

        this.subCategories3 = [];
        if (params.children && params.children.length > 0) {
          this.subCategories3 = params.children;
        }
        break;

    }
  }

  storeTicket() {
    let datauser = {
      passportUserId: 464,
      username: this.username,
      dni: this.userdni,
      name: this.name,
      lastName: this.lastname,
      email: this.usermail,
      phone: this.userphone,
      phoneExt: this.userphoneanexo
    }

    //Guardamos el ticket
    let dataTicket = {
      description: this.requestuser,
      categoryId: 1,
      subcategory1Id: 1,
      subcategory2Id: 1,
      subcategory3Id: 1
    }

    let dataTicketDetail = {
      date: "2023-09-06T16:50:20.648Z",
      dateMod: "2023-09-06T16:50:20.648Z",
      assignedTechId: 1,
      assignedTechName: "GLPI",
      solveDate: "2023-09-06T16:50:20.648Z",
      source: "Web",
      status: 1,
      priority: 1,
      impact: 1,
      urgency: 1,
      summary: "Solicitud Siagie",
      modality: "string",
      type: 1,
      process: "string",
      usiStatus: 1
    }

    let dataFromIe = {
      name: "IE Fanning",
      modularCode: this.modularCode,
      dreName: "DRE Lima Metropolitana",
      ugelName: "UGEL 9",
      address: "Mz C lote 4 Miguel Grau, Chaclacayo"
    }

    //Guardar al usuario

    let userId: string;
    let ticketId: string;
    //let iieeModularCode: number;

    this.gestorTicketService.registerUser(datauser)
      .pipe(
        takeUntil(this.unsuscribe),
        switchMap((response: any) => {
          console.log(response);
          userId = response.data.id;

          return this.gestorTicketService.assignRole(this.userType.toString(), userId)
            .pipe(
              takeUntil(this.unsuscribe),
              switchMap(() => {

                return this.gestorTicketService.registerTicket(userId, dataTicket)
                  .pipe(
                    takeUntil(this.unsuscribe),
                    switchMap((response: any) => {
                      //const respTicket = response.data;
                      ticketId = response.data.id;

                      return this.gestorTicketService.registerTicketDetail(ticketId, dataTicketDetail)
                        .pipe(
                          takeUntil(this.unsuscribe),
                          switchMap(() => {

                            return this.gestorTicketService.registerIE(dataFromIe)
                              .pipe(
                                takeUntil(this.unsuscribe),
                                switchMap((response: any) => {
                                  console.log(response);
                                  const ieId = response.data.id;

                                  return this.gestorTicketService.assignIEtoTicket(ieId, ticketId)
                                    .pipe(
                                      takeUntil(this.unsuscribe),
                                      switchMap(() => {
                                        return this.gestorTicketService.sendTicketToGlpi(userId, ticketId, this.modularCode);
                                      }
                                      ))
                                })
                              )
                          })
                        )
                    })
                  )
              })
            );
        })
      )
      .subscribe({
        next: (response: any) => {
          Swal.close();
          this.helperService.getSuccessAlert("Ticket registrado exitosamente",
            `Id del ticket en plataforma SIAGIE ${ticketId}\n
          Id del ticket en GLPI ${response.data.id}`)
          console.log(response);
          // Handle response of registering the ticket
        },
        error: (responseError: any) => {
          console.log(responseError);
          Swal.close();
          this.helperService.getErrorAlert('No se pudo hacer el registro del ticket', "Error al guardar datos");
          //console.log(responseError)
          // Handle error
        }
      });

    /*const userId = this.gestorTicketService.registerUser(datauser)
    .pipe(takeUntil(this.unsuscribe))
    switchMap((response: any) => {
      const respUser = response.data;
      return this.gestorTicketService.assignRole(this.userType,respUser.id)
      .pipe(
        takeUntil(this.unsuscribe),
        switchMap()
        )
    })
    .subscribe({
      next: async (response: any) => {
        console.log(response);
        const respUser = response.data;

        this.gestorTicketService.assignRole(this.userType,respUser.id)
        .pipe(takeUntil(this.unsuscribe))
        .subscribe({
          next: (response: any) => {
            console.log(response)
          },
          error: (response: any) => {
            console.log(response)
            Swal.close();
            this.helperService.getErrorAlert('No se pudo hacer un registro del rol del usuario', "Error al guardar datos de usuario solicitante");
          }

        })

        return respUser.id;

      },
      error: (response: any) => {
        console.log(response.error)
        Swal.close();
        this.helperService.getErrorAlert('No se pudo hacer un registro del usuario', "Error al guardar datos de usuario solicitante");
      }
    })*/




    /*this.gestorTicketService.registerTicket(userId, dataTicket)
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (response: any) => {

        },
        error: (response: any) => {

        }
      });*/


  }

}
