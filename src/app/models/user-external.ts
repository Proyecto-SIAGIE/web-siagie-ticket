export class UserExternal {
  id: number = 0;
  passportUserId: number = 0;
  username: string = '';
  dni: number = 0;
  lastName: string = '';
  email: string = '';
  phone: number = 0;
  phoneExt: number = 0

  static getJson(obj:any){
      let user_external: UserExternal = new UserExternal();

      user_external.id = obj.id ? obj.id : null;
      user_external.passportUserId = obj.passportUserId ? obj.passportUserId : null;
      user_external.username = obj.username ? obj.username : null;
      user_external.dni = obj.dni ? obj.dni: null;
      user_external.lastName = obj.lastName ? obj.lastName : null;
      user_external.email = obj.email ? obj.email : null;
      user_external.phone = obj.phone ? obj.phone : null;
      user_external.phoneExt = obj.phoneExt ? obj.phoneExt : null;

      return user_external;
  }

}
