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
    return this.httpClient.post(`http://localhost:8080/image`, formData);
  }

  getAllImages(fileType: String): Observable<any[]> {
    return this.httpClient.get<any>(`http://localhost:8080/Photos/`+fileType).pipe(
      map(res => res as any[])
      );
  }

  /*getAllImageIds() {
    return this.httpClient.get(`http://localhost:8080/Photos`);
  }*/

  /*getAllImageIds(): Observable<any[]> {
    return this.httpClient.get<any>(`http://localhost:8080/Photos`).pipe(
      map(res => res as any[])
    );
  }

  getImageById(imageId: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/Photos/` + imageId).pipe(
      map(res => res as any)
    );
  }*/
}
