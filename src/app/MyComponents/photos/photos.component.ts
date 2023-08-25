import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  constructor(
    public api: ApiCallService
  ) { }
  ngOnInit() {
    this.getAllPhotos();
  }
  

  AllPhotoData: any;
  tempData: any;
  showLoader: any;
  imgSrcData: any;
  imgCaption: any;
  imgDescription: any;

  getAllPhotos() {
    this.showLoader = true;
    this.api.getAllImages('image').subscribe({
      next: (response) => {
        console.log(response);
        for (let key in response) {
          let obj = response[key];
          this.tempData = obj['raw_data'];
          this.tempData = "data:image/png;base64,".concat(this.tempData.toString());
          response[key]['raw_data'] = this.tempData;
          this.showLoader = false;
        }
        this.AllPhotoData = response;
        //alert("Done")
      },
      error: (error) => {
        console.log(error);
        //alert("Error")
        this.showLoader = false;
      },
      complete: () => {
        console.log("Request Completed");
        this.showLoader = false;
      }
    })
  }

  clickOnPhoto(imgTagId: any, imgCaption: any, imgDescription: any) {
    this.imgSrcData = (document.getElementById(imgTagId))?.getAttribute('src');
    this.imgCaption = imgCaption;
    this.imgDescription = imgDescription;
  }
  /*photoUrl=""
  getPhoto(PIds: number) {
    this.api.getImageById(PIds).subscribe({
      next: (response) => {
        console.log(response);
        //return response;
        alert("Done")
      },
      error: (error) => {
        console.log(error);
        alert("Error")
      },
      complete: () => {
        console.log("Request Completed")
      }
    })
  }*/


  /*allPhotoIds: any;
  PhotoIds: any;

  getAllIds() {
    this.api.getAllImageIds().subscribe(
    //  (data)=>{
    //  for (let key in data) {
    //    let obj = data[key];
    //    this.allPhotoIds = obj['id'];
    //  }
    //}
      {
        next: (response) => {
          console.log(response);
          this.PhotoIds = response;
          for (let key in response) {
            let obj = response[key];
            this.allPhotoIds = +obj['id'];
            
          }
          alert("Done!")
        },
        error: (error) => {
          console.log(error);
          alert("Error!")
        },
        complete: () => {
          console.log("Request Completed!")
        }
      }
    )
  }*/
}
