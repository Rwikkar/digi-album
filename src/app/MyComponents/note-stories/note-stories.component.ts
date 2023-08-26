import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-note-stories',
  templateUrl: './note-stories.component.html',
  styleUrls: ['./note-stories.component.css']
})
export class NoteStoriesComponent {

  constructor(
    private api: ApiCallService
  ) { }
  ngOnInit() {
    this.getTextValue();
    this.readOnly = true;
    this.showLoader = true;
    this.showContent = true;
  }

  readOnly: any;
  editText() {
    this.readOnly = false;
  }

  tempData: any;
  AllTextData: any;
  showLoader: any;
  showContent: any;
  getTextValue() {
    this.showLoader = true;
    this.api.getAllImages('text').subscribe({
      next: (response) => {
        //console.log(response);
        for (let key in response) {
          let obj = response[key];
          this.tempData = obj['raw_data'];
          //console.log(atob(this.tempData));
          //this.tempData = "data:text/plain;base64,".concat(this.tempData.toString());
          //response[key]['raw_data'] = this.tempData;
          response[key]['raw_data'] = atob(this.tempData);
        }
        this.AllTextData = response;
        this.showLoader = false;
        //console.log(this.AllTextData);
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

  element: any;
  blob: any;
  fileUrl: any;
  downloadTxtFile(textData: any, fileName: any) {
    this.element = document.createElement('a');
    this.blob = new Blob([textData], { type: 'plain/text' });
    this.fileUrl = URL.createObjectURL(this.blob);
    this.element.setAttribute('href', this.fileUrl); //file location
    this.element.setAttribute('download', fileName); // file name
    this.element.style.display = 'none';
    document.body.appendChild(this.element);
    this.element.click();
    //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
    document.body.removeChild(this.element);
  }

  textAreaValue: any;
  updateText(textBoxId: any) {
    this.showLoader = true;
    this.showContent = false;
    //console.log(textBoxId);
    //console.log(document.getElementById(textBoxId) as HTMLTextAreaElement);
    this.textAreaValue = (document.getElementById(textBoxId) as HTMLInputElement).value;
    this.api.updateTextData(textBoxId, this.textAreaValue).subscribe({
      next: (response) => {
        console.log(response);
        alert("Done!");
        this.getTextValue();
        this.showLoader = false;
        this.showContent = true;
      },
      error: (error) => {
        console.log(error);
        alert("Error!");
        this.getTextValue();
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

  deleteTextFile(textBoxId: any) {
    this.showLoader = true;
    this.showContent = false;
    this.api.deleteTextData(textBoxId).subscribe({
      next: (response) => {
        console.log(response);
        alert("Done!");
        this.getTextValue();
        this.showLoader = false;
        this.showContent = true;
      },
      error: (error) => {
        console.log(error);
        alert("Error!");
        this.getTextValue();
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
