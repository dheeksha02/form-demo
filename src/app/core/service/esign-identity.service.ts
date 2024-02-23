import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { zignAPIConfigs } from '@zign-app/zign-api.config';
// import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class E_SignIdentityService {

  constructor(
    private _http: HttpClient
    //private _authService: AuthService
  ) { }

  /**
   * @description get signature or initials or stamp blob image
   * @param fieldType - 'SIGNATURE' | 'INITIALS' | 'STAMP'
   * @param id        - saved id of esign identity
   * @returns image blob
   */
  // public get_eSignIdentity(fieldType: string, id: string): Observable<any> {
  //   let url = zignAPIConfigs.getSavedSignImages;
  //   url = url.replace('{userId}', this._authService.userInfo.sub);
  //   url = url.replace('{type}', fieldType);
  //   url = url.replace('{signatureId}', id);

  //   return this._http.get(url, {
  //     headers: new HttpHeaders({ 'Content-Type': 'image/jpeg' }),
  //     responseType: 'blob',
  //     observe: 'response',
  //   }).pipe(
  //     map(
  //       (res) =>
  //         new Blob([res['body']], {
  //           type: res['headers'].get('Content-Type'),
  //         })
  //     )
  //   );
  // }

  /**
   * @description Add signature or initials blob image
   * @param fieldType - 'SIGNATURE' | 'INITIALS' | 'STAMP'
   * @param formData  - fieldType related form data
   * @param id        - saved id of esign identity
   * @param httpType  - 'post' | 'put'
   * @returns id of esign identity ()
   */
  //  public post_eSignIdentity(fieldType: string, formData: FormData, id: string = null, httpType: string = 'post'): Observable<Object> {
  //   let url = zignAPIConfigs.signatureUpload;
  //   url = url.replace('{user_id}', this._authService.userInfo.sub);
  //   url = url.replace('{type}', fieldType);
  //   if (httpType === 'put') {
  //     url = `${url}/${id}`;
  //   }
  //   return this._http[httpType](url, formData);
  // }

  /**
   * @param fieldType - 'SIGNATURE' | 'INITIALS' | 'STAMP'
   * @param formData  - fieldType related form data
   * @param id        - saved id of esign identity
   * @description update signature or initials blob image
   */
  //  public update_eSignIdentity(fieldType: string, formData: FormData, id: string): Observable<Object> {
  //   return this.post_eSignIdentity(fieldType, formData, id, 'put');
  // }

  /**
   * @description delete signature or initials or stamp
   * @param fieldType - 'SIGNATURE' | 'INITIALS' | 'STAMP'
   * @param id        - saved id of esign identity
   * @param httpType  - 'post' | 'put'
   */
  //  public delete_eSignIdentity(fieldType: string, id: string): Observable<object> {
  //   // let url = zignAPIConfigs.deleteSignature;
  //   // url = url.replace('{userId}', this._authService.userInfo.sub);
  //   // url = url.replace('{type}', fieldType);
  //   // url = url.replace('{signatureId}', id);
  //   // return this._http.delete(url);
  // }

  /**
   * @description convert text into image
   * @param recipientName recipient name | typed name
   * @param fontName selected font name
   * @param id canvas id
   * @returns image URL
   */
  public async convertTextIntoImage(recipientName: string, fontName: string = 'dancing script', id: string = 'CreateProposedSignature') {
    console.log("recipientName", recipientName);
    console.log("fontName", fontName);
    console.log("id", id);
    const fontStyle = `normal 60px ${fontName}`;
    let textCanvas: any = document.getElementById(id);
    let tCtx = textCanvas?.getContext?.('2d');

    // Set it before getting the size
    tCtx.font = fontStyle;
    // this will reset all our context's properties
    // const textWidth = tCtx.measureText(recipientName).width;
    // if(textWidth < textCanvas?.width){
    tCtx.canvas.width = tCtx.measureText(recipientName).width + 200;
    // }
    // so we need to set it again
    tCtx.font = fontStyle;
    // set the color only now
    tCtx.fillText(recipientName, 100, 50);

    const canvas = await this.trimCanvas(tCtx.canvas);
    return canvas.toDataURL();
  }

  /**
   * @description create image through Canvas
   * @param canvas 
   * @return trimmed canvas file
   */
  public async trimCanvas(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext('2d');
    const copy = document.createElement('canvas').getContext('2d');
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const l = pixels.data.length;
    let i;
    const bound = {
      top: null,
      left: null,
      right: null,
      bottom: null,
    };
    let x;
    let y;

    // Iterate over every pixel to find the highest
    // and where it ends on every axis ()
    for (i = 0; i < l; i += 4) {
      if (pixels.data[i + 3] !== 0) {
        x = (i / 4) % canvas.width;
        y = ~~(i / 4 / canvas.width);

        if (bound.top === null) {
          bound.top = y;
        }

        if (bound.left === null) {
          bound.left = x;
        } else if (x < bound.left) {
          bound.left = x;
        }

        if (bound.right === null) {
          bound.right = x;
        } else if (bound.right < x) {
          bound.right = x;
        }

        if (bound.bottom === null) {
          bound.bottom = y;
        } else if (bound.bottom < y) {
          bound.bottom = y;
        }
      }
    }

    // Calculate the height and width of the content
    var trimHeight = bound.bottom - bound.top + 3,
      trimWidth = bound.right - bound.left + 3,
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    // Return trimmed canvas
    return copy.canvas;
  }

}


