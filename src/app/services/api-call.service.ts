import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(
    private httpClient: HttpClient
  ) { }
  postImageData(file: Blob) {
    let formData = new FormData();
    formData.append("image", file);
    return this.httpClient.post(`https://restapifordigialbumproject-production.up.railway.app/image`, formData);
  }

  getAllImages(fileType: String): Observable<any[]> {
    return this.httpClient.get<any>(`https://restapifordigialbumproject-production.up.railway.app/Photos/`+fileType).pipe(
      map(res => res as any[])
      );
  }

  /*getAllImageIds() {
    return this.httpClient.get(`https://restapifordigialbumproject-production.up.railway.app/Photos`);
  }*/

  /*getAllImageIds(): Observable<any[]> {
    return this.httpClient.get<any>(`https://restapifordigialbumproject-production.up.railway.app/Photos`).pipe(
      map(res => res as any[])
    );
  }

  getImageById(imageId: number): Observable<any> {
    return this.httpClient.get(`https://restapifordigialbumproject-production.up.railway.app/Photos/` + imageId).pipe(
      map(res => res as any)
    );
  }*/
}
