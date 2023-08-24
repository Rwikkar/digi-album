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
    this.getAllPhotos();
  }

  AllPhotoData: any;
  tempData: any;
  showLoader: any;

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
}
