import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class HelperService {


  constructor() { }

  /*encriptData(data: any) {
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
  }*/

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



}

class RequestDataModel {
  DataModel!: string;
  // Agrega las propiedades necesarias aquí
}

class LLaves {
  Separetor!: string;
  Key1!: string;
  Key2!: string;
}
