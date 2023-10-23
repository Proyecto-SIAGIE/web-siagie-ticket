export class RolePassport {
  id: number = 0;
  code: string = '';
  name: string = '';
  sede: string = '';
  sedeName: string = '';
  sedeCode: string = '';

  static getJson(obj: any) {
    let rolePassport: RolePassport = new RolePassport();
    //let obj = obj_base as Category;

    rolePassport.id = obj.id ? obj.id : null;
    rolePassport.code = obj.code ? obj.code : null;
    rolePassport.name = obj.name ? obj.name : null;
    rolePassport.sede = obj.sede ? obj.sede : null;
    rolePassport.sedeCode = obj.sede_code ? obj.sede_code: null;
    rolePassport.sedeName = obj.sede_name ? obj.sede_name: null;
    
    return rolePassport;
  }
}
