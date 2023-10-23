export class Sede{
  id: number = 0;
  code: string = '';
  name: string = '';
  sede: string = '';
  sedeName: string = '';
  sedeCode: string = '';
  sedeAnexo: string = '';

  static getJson(obj: any) {
    let sede: Sede = new Sede();

    sede.id = obj.id? obj.id: null;
    sede.code = obj.code? obj.code: null;
    sede.name = obj.name? obj.name: null;
    sede.sede = obj.sede? obj.sede: null;
    sede.sedeName = obj.sede_name? obj.sede_name: null;
    sede.sedeCode = obj.sede_code? obj.sede_code: null;
    sede.sedeAnexo = obj.sede_anexo? obj.sede_anexo: null;

    return sede;
  }
}
