import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from "crypto-js";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
import { IconFile } from '../models/icon-file';

@Injectable({
  providedIn: 'root'
})
export class HelperService {


  constructor(private router: Router) {
    PNotifyButtons;
  }

  getMessage(msg: string, type: string) {
    console.log(msg);
    return new PNotify({
      target: document.body,
      data: {
        text: msg,
        type: type,
        delay: 3e3, //3 segundos
      },
    });
  }

  encriptData(data: any) {
    const key = `${btoa(environment.PASSPORT_CODIGO_SISTEMA)}${btoa(
      environment.PASSPORT_CODIGO_SISTEMA
    )}`;

    const iv = CryptoJS.enc.Utf8.parse(key);

    const dataEncripted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      keySize: 16,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
      iv: iv,
    }).toString();
    return dataEncripted;
  }

  decriptData(data: any) {
    const key = `${btoa(environment.PASSPORT_CODIGO_SISTEMA)}${btoa(
      environment.PASSPORT_CODIGO_SISTEMA
    )}`;

    const iv = CryptoJS.enc.Utf8.parse(key);

    const dataBytes = CryptoJS.AES.decrypt(data, key, {
      keySize: 16,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
      iv: iv,
    });

    const dataDecripted = JSON.parse(dataBytes.toString(CryptoJS.enc.Utf8));
    return dataDecripted;
  }

  getSuccessAlert(
    title: string,
    message: string,
    confirmButtonText: string = ""
  ) {
    return Swal.fire({
      allowOutsideClick: false,
      title: title,
      icon: "success",
      html: message,
      confirmButtonColor: "#2282ff",
      confirmButtonText: confirmButtonText,
    });
  }

  getErrorAlert(
    message: string = `¡Oops! algo sucedió. <br>Por favor intenta nuevamente.`,
    title = "¡Lo sentimos!"
  ) {
    return Swal.fire({
      title: title,
      icon: "error",
      allowOutsideClick: false,
      html: message,
      confirmButtonText: `<i class="fa-solid fa-rotate-right"></i> Vuelve a intentar nuevamente`,
      confirmButtonColor: "#2282ff",
    });
  }

  getAlertMessage(
    message: string = `¡Oops! algo sucedió. <br>Por favor intenta nuevamente.`,
    title = ""
  ) {
    return Swal.fire({
      title: title,
      icon: "warning",
      allowOutsideClick: false,
      html: message,
      confirmButtonText: `<i class="fa-solid fa-rotate-right"></i> Vuelve a intentar nuevamente`,
      confirmButtonColor: "#2282ff",
    });
  }

  encodeData = async (e: any, r: any) => {
    if (null === e) return null;
    if (void 0 === e) return void 0;
    if ("" === e.replace(/^\s+|\s+$/gm, "")) return e;
    var t = CryptoJS.enc.Utf8.parse(r),
      n = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(e), t, {
        keySize: 16,
        iv: t,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }),
      o = n.toString();
    return encodeURIComponent(o);
  };

  decodeData = async (e: any, r: any) => {
    if (null === e) return null;
    if (void 0 === e) return void 0;
    if ("" === e.replace(/^\s+|\s+$/gm, "")) return e;
    var t = CryptoJS.enc.Utf8.parse(r);
    e = decodeURIComponent(e);
    var n = CryptoJS.AES.decrypt(e, t, {
        keySize: 16,
        iv: t,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }),
      o = n.toString(CryptoJS.enc.Utf8).replace(/\\/g, "");
    o = o.replace('"{', "{").replace('}"', "}");

    return o;
  };

  /*
  messagePassport(tokenBoot: string, value: object) {
    if (tokenBoot === '') {
      const jsonString = JSON.stringify(value);
      const data = jsonString;
      const dataRequest = { key: tokenBoot, data: data };
      const json = JSON.stringify(dataRequest);
      return json;
    } else {
      const jsonString = JSON.stringify(value);
      const data = this.encryptStringAES(jsonString, tokenBoot, true);
      const dataRequest = { key: tokenBoot, data: data };
      const json = JSON.stringify(dataRequest);
      return json;
    }
  }
  */

  async messagePassport(tokenBoot: string, value: object) {
    var jsonLoginServicio = await this.encodeData(JSON.stringify(value), tokenBoot);
    const params = { key: tokenBoot, data: jsonLoginServicio };
    const s = JSON.stringify(params);
    return s;
  }

  /*encryptStringAES(plainText: string, key: string, encode: boolean = true) {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const ivBytes = CryptoJS.enc.Utf8.parse(key); // Usa la misma clave para el vector de inicialización (iv)

    const encrypted = CryptoJS.AES.encrypt(plainText, keyBytes, {
      iv: ivBytes,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    let encryptedStr = encrypted.toString();

    if (encode) {
      encryptedStr = encodeURIComponent(encryptedStr); // Codificar para URL si es necesario
    }

    return encryptedStr;
  }

  decryptStringAES(cipherText: string, key: string, decode: boolean = false): string {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const ivBytes = CryptoJS.enc.Utf8.parse(key);
    if (decode) {
      cipherText = decodeURIComponent(cipherText);
    }

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cipherText)
    });

    const decryptedBytes = CryptoJS.AES.decrypt(cipherParams, keyBytes, {
      iv: ivBytes,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    const decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedBytes);
    return decryptedStr;
  }*/

  resultPassport = async (jsonString: any) => {
    const llaves = await this.reverse(jsonString);
    var ndata = jsonString.replace(`${llaves.Separetor}${llaves.Key1}`, "");
    var decodeData = await this.decodeData(ndata, llaves.Key2);
    const result = JSON.parse(decodeData);
    return result;
  };

  /*resultPassport(param: any): any {
    const jsonString: RequestDataModel = JSON.parse(param);

    const llaves = this.letraToNumero(jsonString.DataModel);
    const ndata = jsonString.DataModel.replace(llaves.Separetor + llaves.Key1, '');
    const decodeData = this.decryptStringAES(ndata, llaves.Key2, true);

    const dataAuth = JSON.parse(decodeData);
    const response = JSON.parse(dataAuth);

    return response;
  }*/

  /*letraToNumero(r: any): LLaves {
    const e: string[] = [
      "xZxS%jqm", "nr%Ft1Jr", "60Vc%UNh", "6e9hv9%M", "K%NZThUV",
      "JT%WG5aU", "hn8q%xb4", "QO1%qim9", "EjuRBck%", "eX1%P2Gd"
    ];

    const a: { [key: string]: number } = {
      'a': 0, 'B': 1, 'X': 2, 'D': 3, 'e': 4,
      '%': 5, 'g': 6, 'H': 7, 'i': 8, 'Z': 9
    };

    let separetor = "";
    let pos = -1;

    const t: number = e.length;

    for (let o = 0; t > o; o++) {
      const p = e[o];
      pos = r.lastIndexOf(p);

      if (pos > 1) {
        separetor = p;
        break;
      }
    }

    const n = r.substring(pos + separetor.length, pos + separetor.length + 16);
    const v: string[] = n.split('');
    const f: string[] = [];

    const g = v.length;

    for (let u = 0; g > u; u++) {
      f.push(a[v[u]].toString());
    }

    const h = f.join('');

    return {
      Separetor: separetor,
      Key1: n,
      Key2: h
    };
  }*/

  reverse = async (r: any) => {
    let e = [
      "xZxS%jqm",
      "nr%Ft1Jr",
      "60Vc%UNh",
      "6e9hv9%M",
      "K%NZThUV",
      "JT%WG5aU",
      "hn8q%xb4",
      "QO1%qim9",
      "EjuRBck%",
      "eX1%P2Gd",
    ];
    let a = {
      a: 0,
      B: 1,
      X: 2,
      D: 3,
      e: 4,
      "%": 5,
      g: 6,
      H: 7,
      i: 8,
      Z: 9,
    };
    let s = {
      separetor: "",
      pos: -1,
    };

    for (let o = 0, t = e.length; t > o; o++) {
      var p = e[o];
      if (((s.pos = r.lastIndexOf(p)), s.pos > 1)) {
        s.separetor = p;
        break;
      }
    }

    let n = r.substr(s.pos + s.separetor.length, 16);
    let v = Array.from(n);
    let f = [];

    for (let u = 0, g = v.length; g > u; u++) {
      // @ts-ignore
      f.push(a[v[u].toString()]);
    }

    var h = f.join("");
    return {
      Separetor: s.separetor,
      Key1: n,
      Key2: h,
    };
  };

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return { size: 0, measure: "Bytes" };

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return {
      size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
      measure: sizes[i],
    };
  }

  compareBinaryMeasure(size_file_request: number, pmax_size: string) {
    const measures = [
      { measure: "Bytes", order: 0 },
      { measure: "KB", order: 1 },
      { measure: "MB", order: 2 },
      { measure: "GB", order: 3 },
      { measure: "TB", order: 4 },
    ];

    //I check the weight of the file
    const size_file = this.formatBytes(size_file_request);

    //I get the order of the file measure
    const measure_file = measures.find(
      (item) => item.measure === size_file.measure
    );

    //Obtengo la medida solicitada del archivo
    const size_request = measures.find(
      (item) => item.measure === pmax_size.slice(-2)
    );

    //Get the maximum size of the requested file
    const max_size = pmax_size.slice(0, -2);

    //I compare the measurements if it is less than or equal to what is requested
    if (measure_file!.order < size_request!.order) {
      return { result: true, size_file: size_file.size + size_file.measure };
    } else if (measure_file!.order == size_request!.order) {
      if (size_file.size <= parseInt(max_size)) {
        return { result: true, size_file: size_file.size + size_file.measure };
      } else {
        return { result: false, size_file: size_file.size + size_file.measure };
      }
    } else {
      return { result: false, size_file: size_file.size + size_file.measure };
    }
  }

  getIconFile(typeFile): IconFile {
    let icon: IconFile = new IconFile();
    switch (typeFile) {
      case "application/pdf":
        icon.name = "fa-solid fa-file-pdf";
        icon.color = "#ea4e4e";
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        icon.name = "fa-regular fa-file-word";
        icon.color = "#2778c4";
        break;
      case "application/msword":
        icon.name = "fa-solid fa-file-word";
        icon.color = "#2778c4";
        break;
      case "image/jpeg":
        icon.name = "fa-regular fa-image";
        icon.color = "#2778c4";
        break;

      case "image/png":
        icon.name = "fa-regular fa-image";
        icon.color = "#2778c4";
        break;

      case "application/vnd.rar":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "";
        break;
      case "application/zip":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "#a38835";
        break;
      case "application/octet-stream":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "#a38835";
        break;
      case "application/x-zip-compressed":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "#a38835";
        break;
      case "multipart/x-zip":
        icon.name = "fa-regular fa-file-zipper";
        icon.color = "#a38835";
        break;
      default:
        icon.name = "fa-regular fa-file";
        icon.color = "#2778c4";
        break;
    }

    return icon;
  }

}


