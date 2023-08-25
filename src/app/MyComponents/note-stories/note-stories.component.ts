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
  ngOnInit() { }

  tempData: any;
  AllTextData: any;
  getTextValue() {
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
          //console.log(this.AllTextData);
          //alert("Done")
        },
        error: (error) => {
          console.log(error);
          //alert("Error")
        },
        complete: () => {
          console.log("Request Completed");
        }
      })
    }
}
