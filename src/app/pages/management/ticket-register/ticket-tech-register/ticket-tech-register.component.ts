import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject, catchError, firstValueFrom, lastValueFrom, switchMap, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Institution } from 'src/app/models/institution';
import { Sede } from 'src/app/models/sede';
import { GestorGlpiService } from 'src/app/services/gestor-glpi.service';
import { GestorTicketService } from 'src/app/services/gestor-ticket.service';
import { HelperService } from 'src/app/services/helper.service';
import { SecurityService } from 'src/app/services/security.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-ticket-tech-register',
  templateUrl: './ticket-tech-register.component.html',
  styleUrls: ['./ticket-tech-register.component.css']
})
export class TicketTechRegisterComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  unsuscribe = new Subject<void>();
  constructor(
    private gestorTicketService: GestorTicketService,
    private gestorGlpiService: GestorGlpiService,
    private securityService: SecurityService,
    private helperService: HelperService,
    private fb: FormBuilder,
  ) { }

  userId: number = 0;
  userdni: string = '';
  name: string = '';
  lastname: string = '';
  username: string = '';
  usermail: string = '';
  userphone: string = '';
  phoneanexo: string = '';
  usercomment: string = '';

  sedeOptions: Sede[] = [];
  sedeFirstOption: Sede | null = null;
  institutions: Institution[] = [];
  institutionFirstOption: Institution | null = null;

  categories: Category[] = [];
  subCategories1: Category[] = [];
  subCategories2: Category[] = [];
  subCategories3: Category[] = [];



  selectedFiles: File[] | null = null;

  formTicket = this.fb.group({
    username: new FormControl('', [
      Validators.required, Validators.minLength(3)
    ]),

    name: new FormControl('', [
      Validators.required, Validators.minLength(1),
    ]),

    usermail: new FormControl('', [
      Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.email,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ]),

    userphone: new FormControl('', [
      Validators.required, Validators.minLength(9),
      Validators.pattern(/^9[0-9]\d{6,10}$/),
    ]),
    phoneanexo: new FormControl('', [Validators.maxLength(3)]),
    usercomment: new FormControl('', [Validators.required, Validators.maxLength(500)]),

    categoriesId: [null, [Validators.required]],
    subCategories1Id: [null, [Validators.required]],
    subCategories2Id: [null, [Validators.required]],
    subCategories3Id: [null, [Validators.required]],
    institutionId: [null, [Validators.required]],
  })
  submitted: boolean = false;



  async ngOnInit(): Promise<void> {
    this.categories = await this.getITILCategories();
  }

  getInstitutions(dreCode: string, ugelCode: string) {
    this.gestorTicketService.getEducativeInstitutions(dreCode, ugelCode)
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (resp: any) => {
          //console.log(resp);
          resp.sort((a, b) => {
            const codeA = a.modularCode;
            const codeB = b.modularCode;

            if (codeA < codeB) {
              return -1;
            } else if (codeA > codeB) {
              return 1;
            } else {
              return 0;
            }
          });

          this.institutions = resp;
          this.institutionFirstOption = resp[0];
        },
        error: (error: any) => {
          console.log(error);
          this.institutions = [];
        }
      })
  }

  getSedeFromUser(userId: string) {
    this.securityService.getRolesFromUser(userId)
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (resp: any) => {
          if (resp.success) {

            this.institutions = [];
            this.sedeOptions = [];

            for (const e of resp.data as any[]) {
              this.sedeOptions.push(Sede.getJson(e));
            }

            this.sedeFirstOption = this.sedeOptions[0];

            if (this.sedeFirstOption?.code == 'IGED001') {
              //Obtenemos los codigos modulares
              //console.log(this.sedeSelected);
              var defaultInstitution = new Institution();
              defaultInstitution.nameIE = this.sedeFirstOption.sedeName;
              defaultInstitution.modularCode = this.sedeFirstOption.sedeCode;
              defaultInstitution.anexo = this.sedeFirstOption.sedeAnexo
              defaultInstitution.codeAndName = `${this.sedeFirstOption.sedeCode} - ${this.sedeFirstOption.sedeName}`
              this.institutions.push(defaultInstitution);
              this.institutionFirstOption = defaultInstitution;
            } else {
              this.getInstitutions(this.sedeFirstOption.sedeCode, this.sedeFirstOption.sedeCode);
            }
          }

          else {
            Swal.close();
            this.helperService.getAlertMessage("Roles no encontrados",
              "El usuario no tiene ningún rol asignado");
          }
        },
        error: (error: any) => {
          Swal.close();
          this.helperService.getErrorAlert("Error al retornar los roles",
            "Ocurrió un error buscando los roles del usuario");
        }
      })
  }


  getUserPassportData() {
    if (this.userdni.trim().length == 0) {
      Swal.close();
      this.helperService.getAlertMessage("Debe ingresar un DNI antes de intentar buscar el usuario", "DNI no proporcionado");
    }
    else {

      this.securityService.searchUserPassport(this.userdni)
        .pipe(takeUntil(this.unsuscribe))
        .subscribe({
          next: (resp: any) => {
            this.userdni = "";

            if (resp.success) {
              const localUser = resp.data;
              this.userId = localUser.id;
              this.username = localUser.dni;
              this.formTicket.get('username')?.setValue(localUser.dni);
              this.name = localUser.name;
              this.formTicket.get('name')?.setValue(`${localUser.name} ${localUser.lastName}`);
              this.lastname = localUser.lastName;
              this.usermail = localUser.email;
              this.formTicket.get('usermail')?.setValue(localUser.email);
              this.userphone = localUser.phone
              ///////-----------
              this.getSedeFromUser(localUser.id);

            } else {
              Swal.close();
              this.helperService.getAlertMessage("Usuario no encontrado",
                "DNI proporcionado no coincidió con ningún usuario");
            }
          },
          error: (error: any) => {
            Swal.close();
            this.helperService.getErrorAlert("Error al buscar",
              "Ocurrió un error buscando al usuario");
          }
        })
    }
  }

  formatStringProcessCategory() {
    const categoryFields = [
      "categoriesId",
      "subCategories1Id",
      "subCategories2Id",
      "subCategories3Id"
    ];

    let base = "";
    for (const field of categoryFields) {
      const category = this.formTicket.controls[field].value as Category;
      if (category) {
        if (base) {
          base += " -> ";
        }
        base += category.name;
      }
    }

    return base;
  }

  async registerTicket() {
    this.submitted = true;
    if (!this.formTicket.valid) {
      for (const controlKey of Object.keys(this.formTicket.controls) as (keyof typeof this.formTicket.controls)[]) {
        this.formTicket.controls[controlKey].markAsTouched();
      }
      return;
    }

    this.blockUI.start();

    let datauser = {
      "passportUserId": this.userId,
      "username": this.username, //si modifican el campo esto no cambia
      "dni": this.username, //si modifican el campo esto no cambia
      "name": this.name, //si modifican el campo esto no cambia
      "email": this.formTicket.controls["usermail"].value,
      "lastName": this.lastname,
      "phone": this.formTicket.controls["userphone"].value,
      "phoneExt": this.formTicket.controls["phoneanexo"].value?.trim().length == 0 ? null : this.formTicket.controls["phoneanexo"].value
    }

    let dataTicket = {
      "description": this.formTicket.controls["usercomment"].value,
      "categoryId": (this.formTicket.controls["categoriesId"].value == null) ? 0 : (this.formTicket.controls["categoriesId"].value as Category).id,
      "subcategory1Id": (this.formTicket.controls["subCategories1Id"].value == null) ? 0 : (this.formTicket.controls["subCategories1Id"].value as Category).id,
      "subcategory2Id": (this.formTicket.controls["subCategories2Id"].value == null) ? 0 : (this.formTicket.controls["subCategories2Id"].value as Category).id,
      "subcategory3Id": (this.formTicket.controls["subCategories3Id"].value == null) ? 0 : (this.formTicket.controls["subCategories3Id"].value as Category).id,
    }

    const now = new Date();
    const isoString = now.toISOString();

    let dataTicketDetail = {
      "date": isoString,
      "dateMod": isoString,
      "assignedTechId": 1,
      "assignedTechName": "GLPI",
      "solveDate": null,
      "source": "Web",
      "status": 1,
      "priority": 1,
      "impact": 1,
      "urgency": 1,
      "summary": "Solicitud Siagie",
      "modality": "EBS", //NOSE
      "type": 1,
      "process": this.formatStringProcessCategory(),
      "usiStatus": 1
    }

    let institution = (this.formTicket.controls["institutionId"].value == null) ? null : (this.formTicket.controls["institutionId"].value as Institution);

    if (institution?.dre == "") {
      institution = await firstValueFrom(
        this.gestorTicketService.getInstitutionByModularCode(institution!.modularCode, institution!.anexo)
      )
    }

    let dataFromIe = {
      name: institution!.nameIE,
      modularCode: institution!.modularCode,
      dreName: institution!.nameDRE,
      ugelName: institution?.nameUGEL,
      address: institution?.district
    }


    const responseRegisterUser: any = await firstValueFrom(this.gestorTicketService.registerUser(datauser));
    //console.log(responseRegisterUser);

    if (responseRegisterUser.success) {

      if (responseRegisterUser.data.roleId == null) {
        const roleId = (this.sedeFirstOption!.code == 'IGED001') ? "1" : "2";
        const responseAssignRole: any = await firstValueFrom(this.gestorTicketService.assignRole(roleId, responseRegisterUser.data.id));
        console.log(responseAssignRole);
      }

      const responseRegisterTicket: any = await firstValueFrom(this.gestorTicketService.registerTicket(responseRegisterUser.data.id, dataTicket));
      if (responseRegisterTicket.success) {

        const responseRegisterTicketDetail: any = await firstValueFrom(this.gestorTicketService.registerTicketDetail(responseRegisterTicket.data.id, dataTicketDetail));
        if (responseRegisterTicketDetail.success) {

          const responseRegisterIE: any = await firstValueFrom(this.gestorTicketService.registerIE(dataFromIe));
          if (responseRegisterIE.success) {

            const responseAssignIE: any = await firstValueFrom(this.gestorTicketService.assignIEtoTicket(responseRegisterIE.data.id, responseRegisterTicket.data.id));

            if (responseAssignIE.success) {
              console.log("todos los datos se registraron exitosamente");

              const responseRegisterInGLPI: any = await firstValueFrom(this.gestorTicketService.sendTicketToGlpi(responseRegisterUser.data.id,
                responseRegisterTicket.data.id,
                dataFromIe.modularCode, this.selectedFiles));

              if (responseRegisterInGLPI.success) {
                Swal.close();
                this.helperService.getSuccessAlert("Registro exitoso", `Ticket exitosamente registrado en GLPI con Id ${responseRegisterInGLPI.data.id}\n
                Consulte el estado de su ticket en el siguiente url: `, "Aceptar");

              } else {
                Swal.close();
                this.helperService.getErrorAlert('No se pudo registrar el ticket en GLPI', "Error al guardar datos");
              }

            }
            else {
              Swal.close();
              this.helperService.getErrorAlert('No se pudo asociar la IE a su solicitud', "Error al guardar datos");
            }

          } else {
            Swal.close();
            this.helperService.getErrorAlert('No se pudo registrar la IE a la que se intenta asociar la solicitud', "Error al guardar datos");
          }

        } else {
          Swal.close();
          this.helperService.getErrorAlert('No se pudo registrar el detalle del ticket', "Error al guardar datos");
        }


      } else {
        Swal.close();
        this.helperService.getErrorAlert('No se pudo registrar el ticket', "Error al guardar datos");
      }

    }
    else {
      Swal.close();
      this.helperService.getErrorAlert('No se pudo registrar al autor del ticket', "Error al guardar datos");
    }



    this.blockUI.stop();
  }



  validateSizeAndCountFiles(event: any) {
    //this.selectedFiles = Array.from(event.target.files);
    var totalSize = 0;
    var files: File[] = Array.from(event.target.files);

    if (files.length > 5) {
      Swal.close();
      this.helperService.getAlertMessage("Solo puede adjuntar 5 archivos a la vez", "Cantidad máxima de archivos excedida");
      return [];
    }

    for (let i = 0; i < files.length; i++) {

      if (files[i].name.split(".").length > 2) {
        this.helperService.getAlertMessage(
          "El nombre del archivo no debe contener punto (.) o caracteres especiales"
        );
        return [];
      }
      else {
        totalSize += files[i].size;
      }
    }

    const compareResult = this.helperService.compareBinaryMeasure(
      totalSize,
      environment.SIZE_MAX_FILES_TOTAL
    );

    if (!compareResult.result) {
      Swal.close();
      this.helperService.getAlertMessage(
        `El peso total de los archivos ( ${compareResult.size_file} )  es superior a lo máximo permitido ( ${environment.SIZE_MAX_FILES_TOTAL} )`, "Tamaño máximo excedido");
      return [];
    } else {
      return [...files];
    }

  }

  onFileSelected(event: any) {
    this.selectedFiles = this.validateSizeAndCountFiles(event);
    if (this.selectedFiles.length == 0) {
      return;
    }
  }

  onRemoveFile(file: File) {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      // Encuentra el índice del archivo en el arreglo
      const index = this.selectedFiles.indexOf(file);

      if (index !== -1) {
        // Si se encontró el archivo, elimínalo del arreglo
        this.selectedFiles.splice(index, 1);
      }
    }
  }

  getIconName(type: any) {
    return this.helperService.getIconFile(type).name;
  }

  async getITILCategories() {
    return await firstValueFrom(
      this.gestorGlpiService.getCategories()
    )
  }

  onSelectedCategory(type: string, { value: params }: any) {

    switch (type) {
      case "category":

        this.subCategories1 = [];
        this.subCategories2 = [];
        this.subCategories3 = [];
        this.formTicket.controls["subCategories1Id"].setValue(null);
        this.formTicket.controls["subCategories2Id"].setValue(null);
        this.formTicket.controls["subCategories3Id"].setValue(null);

        if (params.children && params.children.length > 0) {
          this.subCategories1 = params.children;
        } else {
          this.setValueCategorySelected(params);
        }
        break;
      case "subCategoria1":

        this.subCategories2 = [];
        this.subCategories3 = [];
        this.formTicket.controls["subCategories2Id"].setValue(null);
        this.formTicket.controls["subCategories3Id"].setValue(null);

        if (params.children && params.children.length > 0) {
          this.subCategories2 = params.children;
        } else {
          this.setValueCategorySelected(params);
        }
        break;
      case "subCategoria2":

        this.subCategories3 = [];
        this.formTicket.controls["subCategories3Id"].setValue(null);

        if (params.children && params.children.length > 0) {
          this.subCategories3 = params.children;
        } else {
          this.setValueCategorySelected(params);
        }
        break;
    }
    //this.formTicket.controls["categories_Id"].setValue(params.id);

    this.formTicket?.get("subCategories1Id")?.updateValueAndValidity();
    this.formTicket?.get("subCategories2Id")?.updateValueAndValidity();
    this.formTicket?.get("subCategories3Id")?.updateValueAndValidity();
  }

  setValueCategorySelected(params) {
    const level = params.level;
    switch (level) {
      case 1:
        this.formTicket?.get("subCategories1Id")?.setValidators(Validators.required);
        this.formTicket?.get("subCategories2Id")?.clearValidators();
        this.formTicket?.get("subCategories3Id")?.clearValidators();
        break;
      case 2:
        this.formTicket?.get("subCategories1Id")?.setValidators(Validators.required);
        this.formTicket?.get("subCategories2Id")?.clearValidators();
        this.formTicket?.get("subCategories3Id")?.clearValidators();
        break;
      case 3:
        this.formTicket?.get("subCategories1Id")?.setValidators(Validators.required);
        this.formTicket?.get("subCategories2Id")?.setValidators(Validators.required);
        this.formTicket?.get("subCategories3Id")?.clearValidators();
        break;
      case 4:
        this.formTicket?.get("subCategories1Id")?.setValidators(Validators.required);
        this.formTicket?.get("subCategories2Id")?.setValidators(Validators.required);
        this.formTicket?.get("subCategories3Id")?.setValidators(Validators.required);
        break;

      default:
        break;
    }

    //this.formTicket.controls["categoriesId"].setValue(params.id);
  }

  inputNotValid(form: string, campo: string): boolean {
    let status = false;

    switch (form) {
      case "formCategories":
        {
          if (
            this.formTicket?.get(campo)?.invalid &&
            this.formTicket?.get(campo)?.touched
          ) {
            status = true;
          } else {
            status = false;
          }
        }; break;

      case "formInstitutions": {
        if (
          this.formTicket?.get(campo)?.invalid &&
          this.formTicket?.get(campo)?.touched
        ) {
          status = true;
        } else {
          status = false;
        }
      }; break;

      default:
        break;
    }
    return status;
  }

  ngOnDestroy(): void {
    this.unsuscribe.next();
    this.unsuscribe.complete();
  }



}
