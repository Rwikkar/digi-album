import { Component, OnInit } from '@angular/core';
import { PhotosComponent } from '../photos/photos.component';
import { ApiCallService } from 'src/app/services/api-call.service';
//import * as fs from 'fs';
//import * as path from 'path';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})

export class AddContentComponent implements OnInit {
  constructor(
    private api: ApiCallService
  ) { }
  ngOnInit() {
    this.showContent = true;
  }
  imageSource = "./assets/upload-file.jpg"
  acceptType = 'image/*'
  format = 'image'
  onSelectOptions(values: any) {
    if (values == 'image') {
      this.imageSource = "./assets/upload-file.jpg"
      this.acceptType = 'image/*';
      this.format = 'image';
    }
    else if (values == 'video') {
      this.imageSource = "./assets/demo-video.mp4"
      this.acceptType = 'video/*';
      this.format = 'video';
    }
    else if (values == 'text-file') {
      this.imageSource = "./assets/no-preview-available.png";
      this.acceptType = '.txt';
      this.format = 'text-file';
    }
    else {
      this.format = 'text';
    }
  }

  file: any
  onSelectFile(MyFile: any) {
    if (MyFile.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(MyFile.target.files[0]);

      this.file = MyFile.target.files[0];
      console.log(this.file);

      reader.onload = (myFile: any) => {
        this.imageSource = myFile.target.result;
        console.log(this.imageSource);
      }
    }
  }
  
  showLoader: any;
  showContent: any;
  doUpload() {
    this.showLoader = true;
    this.showContent = false;
    this.api.postImageData(this.file).subscribe({
      next:(response)=>{
        console.log(response);
        alert("Done!")
        this.showLoader = false;
        this.showContent = true;
      },
      error:(error)=>{
        console.log(error);
        alert("Error!")
        this.showLoader = false;
        this.showContent = true;
      },
      complete:()=>{
        console.log("Request Completed!");
        this.showLoader = false;
        this.showContent = true;
      }
    })
  }

  textAreaValue: any;
  textToBase64: any;
  textToBlob: any;
  doTextUpload() {
    this.showLoader = true;
    this.showContent = false;
    this.textAreaValue = (document.getElementById('exampleFormControlTextarea3') as HTMLInputElement).value;
    //
    /*fs.writeFileSync(path.join('./', 'tempTxtFile'), this.textAreaValue, {
      flag: 'w',
    });
    const contents = fs.readFileSync(path.join('./', this.textAreaValue), 'utf-8');
    console.log(contents);*/
    //console.log(this.textAreaValue);
    /*console.log(btoa(this.textAreaValue));
    this.textToBase64 = btoa(this.textAreaValue);
    this.textToBlob = fetch(`data:plain/text;base64,${this.textToBase64}`).then(res => res.blob());
    console.log(this.textToBlob);*/
    this.api.postTextData(this.textAreaValue).subscribe({
      next:(response)=>{
        console.log(response);
        alert("Done!")
        this.showLoader = false;
        this.showContent = true;
      },
      error:(error)=>{
        console.log(error);
        alert("Error!")
        this.showLoader = false;
        this.showContent = true;
      },
      complete:()=>{
        console.log("Request Completed!");
        this.showLoader = false;
        this.showContent = true;
      }
    })
  }
}
