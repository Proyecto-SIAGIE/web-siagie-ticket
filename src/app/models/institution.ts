export class Institution {
  modularCode: string = '';
  dre: string = '';
  nameDRE: string = '';
  ugel: string = '';
  nameUGEL: string = '';
  deparment: string = '';
  province: string = '';
  district: string  = '';
  anexo: string = '';
  nameIE: string = '';
  level: string = '';
  nameLevel: string = '';
  codeAndName: string = '';

  static getJson(obj: any) {
    let institution: Institution = new Institution();

    institution.modularCode = obj.CODIGO_MODULAR? obj.CODIGO_MODULAR: null;
    institution.dre = obj.DRE? obj.DRE: null;
    institution.nameDRE = obj.NOMBRE_DRE? obj.NOMBRE_DRE: null;
    institution.ugel = obj.UGEL? obj.UGEL: null;
    institution.nameUGEL = obj.NOMBRE_UGEL? obj.NOMBRE_UGEL: null;
    institution.deparment = obj.DEPARTAMENTO? obj.DEPARTAMENTO: null;
    institution.province = obj.PROVINCIA? obj.PROVINCIA: null;
    institution.district = obj.DISTRITO? obj.DISTRITO: null;
    institution.anexo = obj.ANEXO? obj.ANEXO: null;
    institution.nameIE = obj.NOMBRE_IE? obj.NOMBRE_IE: null;
    institution.level = obj.NIVEL? obj.NIVEL: null;
    institution.nameLevel = obj.NOMBRE_NIVEL? obj.NOMBRE_NIVEL: null;
    institution.codeAndName = `${obj.CODIGO_MODULAR} - ${obj.NOMBRE_IE}`
    return institution;
  }

  static getJsonMaterialesPadron(obj: any){
    let institution: Institution = new Institution();

    institution.modularCode = obj.cod_mod? obj.cod_mod: null;
    institution.dre = obj.dre? obj.dre: null;
    institution.nameDRE = obj.des_dre? obj.des_dre: null;
    institution.ugel = '';
    institution.nameUGEL = obj.nombreOI? obj.nombreOI: null;
    institution.deparment = obj.region? obj.region: null;
    institution.province = obj.provincia? obj.provincia: null;
    institution.district = obj.cen_pob? obj.cen_pob: null;
    institution.anexo = obj.anexo? obj.anexo: null;
    institution.nameIE = obj.cen_edu? obj.cen_edu: null;
    institution.level = obj.niv_mod? obj.niv_mod: null;
    institution.nameLevel = obj.niv_mod_detalle? obj.niv_mod_detalle: null;
    institution.codeAndName = `${obj.cod_mod} - ${obj.cen_edu}`
    return institution;
  }
}
