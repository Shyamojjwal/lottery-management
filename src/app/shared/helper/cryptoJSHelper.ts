import * as CryptoJS from "crypto-js"

import { environment } from '@app-env/environment';

let key : string = environment.cryptoJSKey;

export const cryptoJSHelper = {
    
    encrypt: function(data:any){

        return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();

    },

    decrypt:function(ciphertext:any){
        let bytes  = CryptoJS.AES.decrypt(ciphertext, key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}