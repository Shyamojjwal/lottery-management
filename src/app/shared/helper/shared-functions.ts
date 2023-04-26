import { HttpParams } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

const img_ext_list = ['JPG', 'JPEG', 'PNG']

export function checkFormValidation(form: FormGroup, listValidationMessage: any) {
    let showValidationMessages: any = {};

    for(const _key of Object.keys(form.controls)){
        let cur_control = form.get(_key);
        if(cur_control instanceof FormControl) {
            showValidationMessages[_key] = '';
            if (cur_control.invalid && (cur_control.dirty || cur_control.touched)) {
              let errors:any = cur_control.errors;
              for(const _err of Object.keys(errors)) {
                showValidationMessages[_key] = listValidationMessage[_key][_err];
              }
            }
        }
    }
    return showValidationMessages;
}

export function makeAllFormControlAsDirty(form: FormGroup | any) {
    Object.keys(form.controls).forEach((key:any) => {
        form.get(key).markAsDirty();
    });
}

export function loadDynamicScript(url: string, value: any): HTMLScriptElement | null {
    var scripts = document.getElementById(url);
    if (!scripts) {
        // console.log(url, ' Script is not availble');
        value.src = url;
        value.type = 'text/javascript';
        value.defer = true;
        value.id = url;
        return value;
    }
    else {
        // console.log(url, ' Script is availble');
        return null;
    }
}

export function getQueryParams(param: any){
    return new HttpParams({
        fromString: Object.entries(param).map(([key, val]) => `${key}=${val}`).join('&'),
    });
}

// export function imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
//     fileReader.readAsDataURL(fileToRead);
//     return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
// }

export function getFileExtention(_fileName:string = "") {
    // return (/[.]/.exec(_fileName)) ? /[^.]+$/.exec(_fileName)[0] : undefined;
    return _fileName && _fileName.length > 0 ? _fileName.substring(_fileName.lastIndexOf('.') + 1) : null;
}

export function checkImageExtention(control: FormControl): { extension: boolean; } | null {
    if(control.value && control.value != undefined) {
        var _ext: string | any = '';

        if(typeof(control.value) !== 'object') {
            _ext = getFileExtention(control.value);
        } else if(typeof(control.value) === 'object') {
            _ext = getFileExtention(control.value.name);
        }
        if(_ext && _ext != undefined && img_ext_list.indexOf(_ext.toUpperCase()) > -1) {
            return null
        } else {
            return { 'extension': true }
        }
    } else {
        return null;
    }
}

export function roundUp(_value: number = 0) {
    return Math.ceil(_value);
}

export function sortValues(sortArray: Array<any> = [], key: string, order:string = 'asc') {
    if(order == 'asc') {
        return sortArray.sort((a, b) => {
            if (a[key] < b[key])
                return -1;
            if (a[key] > b[key])
                return 1;
            return 0;
        })
    } else {
        return sortArray.sort((a, b) => {
            if (b[key] < a[key])
                return -1;
            if (b[key] > a[key])
                return 1;
            return 0;
        })
    }
}

export function sumOfArrayObjectKeyValue(_array: Array<object>, _key:string) {
    const _selectedProjects = Object.assign([], _array);
    return _selectedProjects.map((item:any) => item[_key]).reduce((prev:any, curr:any) => prev + curr, 0);
}