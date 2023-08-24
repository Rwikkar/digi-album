import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollBodyComponent } from './MyComponents/scroll-body/scroll-body.component';
import { AddContentComponent } from './MyComponents/add-content/add-content.component';
import { PhotosComponent } from './MyComponents/photos/photos.component';
import { VideosComponent } from './MyComponents/videos/videos.component';
import { NoteStoriesComponent } from './MyComponents/note-stories/note-stories.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './MyComponents/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollBodyComponent,
    AddContentComponent,
    PhotosComponent,
    VideosComponent,
    NoteStoriesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
