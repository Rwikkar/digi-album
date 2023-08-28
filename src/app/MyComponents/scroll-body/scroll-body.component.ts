import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-scroll-body',
  templateUrl: './scroll-body.component.html',
  styleUrls: ['./scroll-body.component.css']
})
export class ScrollBodyComponent implements OnInit {
  myTrustedUrl: any;
  constructor(private sanitizer: DomSanitizer,
    public api: ApiCallService
  ) {
    this.myTrustedUrl = sanitizer.bypassSecurityTrustUrl(this.AllPhotoData);
  }
  ngOnInit() {
    this.getAllPhotos();
    this.getAllVideos();
    this.showContent1 = true;
    this.showContent2 = true;
  }

  showContent(): boolean {
    if (this.showContent1 == false && this.showContent2 == false)
      return false;
    else
      return true;
  }

  AllPhotoData: any;
  AllVideoData: any;
  tempData: any;
  tempVideoData: any;
  showLoader: any;
  imgSrcData: any;
  vdoSrcData: any;
  imgCaption: any;
  vdoCaption: any;
  imgDescription: any;
  vdoDescription: any;
  imgTagId: any;
  vdoTagId: any;

  getAllPhotos() {
    this.showContent1 = false;
    this.showLoader = true;
    this.api.getSpecificFiles('image', 11).subscribe({
      next: (response) => {
        console.log(response);
        for (let key in response) {
          let obj = response[key];
          this.tempData = obj['raw_data'];
          this.tempData = "data:image/png;base64,".concat(this.tempData.toString());
          response[key]['raw_data'] = this.tempData;
          this.showLoader = false;
          this.showContent1 = true;
        }
        this.AllPhotoData = response;
        //alert("Done")
      },
      error: (error) => {
        console.log(error);
        //alert("Error")
        this.showLoader = false;
        this.showContent1 = true;
      },
      complete: () => {
        console.log("Request Completed");
        this.showLoader = false;
        this.showContent1 = true;
      }
    })
  }

  clickOnPhoto(imgTagId: any, imgCaption: any, imgDescription: any) {
    this.imgSrcData = (document.getElementById(imgTagId))?.getAttribute('src');
    this.imgTagId = imgTagId;
    this.imgCaption = imgCaption;
    this.imgDescription = imgDescription;
  }

  showContent1: any;
  deleteTextFile(textBoxId: any) {
    this.showLoader = true;
    this.showContent1 = false;
    this.api.deleteTextData(textBoxId).subscribe({
      next: (response) => {
        console.log(response);
        alert("Done!");
        this.getAllPhotos();
        this.showLoader = false;
        this.showContent1 = true;
      },
      error: (error) => {
        console.log(error);
        alert("Error!");
        this.getAllPhotos();
        this.showLoader = false;
        this.showContent1 = true;
      },
      complete: () => {
        console.log("Request Completed!");
        this.showLoader = false;
        this.showContent1 = true;
      }
    })
  }


  getAllVideos() {
    this.showLoader = true;
    this.showContent1 = false;
    this.api.getSpecificFiles('video', 7).subscribe({
      next: (response) => {
        console.log(response);
        for (let key in response) {
          let obj = response[key];
          this.tempVideoData = obj['raw_data'];
          this.tempVideoData = this.sanitizer.bypassSecurityTrustUrl("data:video/mp4;base64,".concat(this.tempVideoData.toString()));
          response[key]['raw_data'] = this.tempVideoData;
          this.showLoader = false;
          this.showContent1 = true;
        }
        this.AllVideoData = response;
        //alert("Done")
      },
      error: (error) => {
        console.log(error);
        //alert("Error")
        this.showLoader = false;
        this.showContent1 = true;
      },
      complete: () => {
        console.log("Request Completed");
        this.showLoader = false;
        this.showContent1 = true;
      }
    })
  }
  clickOnVideo(vdoTagId: any, vdoCaption: any, vdoDescription: any) {
    //console.log(vdoCaption);
    this.vdoSrcData = (document.getElementById(vdoTagId))?.getAttribute('src');
    this.vdoTagId = vdoTagId;
    this.vdoCaption = vdoCaption;
    console.log(this.vdoCaption);
    this.vdoDescription = vdoDescription;
  }
  showContent2: any;
  deleteVideoFile(videoId: any) {
    this.showLoader = true;
    this.showContent2 = false;
    this.api.deleteTextData(videoId).subscribe({
      next: (response) => {
        console.log(response);
        alert("Done!");
        this.getAllVideos();
        this.showLoader = false;
        this.showContent2 = true;
      },
      error: (error) => {
        console.log(error);
        alert("Error!");
        this.getAllVideos();
        this.showLoader = false;
        this.showContent2 = true;
      },
      complete: () => {
        console.log("Request Completed!");
        this.showLoader = false;
        this.showContent2 = true;
      }
    })
  }


}
