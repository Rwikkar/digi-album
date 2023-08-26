import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  myTrustedUrl: any;
  constructor(private sanitizer:DomSanitizer,
    public api: ApiCallService
  ) {
    this.myTrustedUrl = sanitizer.bypassSecurityTrustUrl(this.AllPhotoData);
  }
  ngOnInit() {
    this.showContent = true;
    this.getAllPhotos();
  }

  AllPhotoData: any;
  tempData: any;
  showLoader: any;
  imgSrcData: any;
  imgCaption: any;
  imgDescription: any;
  vdoTagId: any;

  getAllPhotos() {
    this.showLoader = true;
    this.api.getAllImages('video').subscribe({
      next: (response) => {
        console.log(response);
        for (let key in response) {
          let obj = response[key];
          this.tempData = obj['raw_data'];
          this.tempData = this.sanitizer.bypassSecurityTrustUrl("data:video/mp4;base64,".concat(this.tempData.toString()));
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
    this.vdoTagId = imgTagId;
    this.imgCaption = imgCaption;
    this.imgDescription = imgDescription;
  }

  showContent: any;
  deleteVideoFile(videoId: any) {
    this.showLoader = true;
    this.showContent = false;
    this.api.deleteTextData(videoId).subscribe({
      next: (response) => {
        console.log(response);
        alert("Done!");
        this.getAllPhotos();
        this.showLoader = false;
        this.showContent = true;
      },
      error: (error) => {
        console.log(error);
        alert("Error!");
        this.getAllPhotos();
        this.showLoader = false;
        this.showContent = true;
      },
      complete: () => {
        console.log("Request Completed!");
        this.showLoader = false;
        this.showContent = true;
      }
    })
  }
}
