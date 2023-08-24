import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollBodyComponent } from './MyComponents/scroll-body/scroll-body.component';
import { AddContentComponent } from './MyComponents/add-content/add-content.component';
import { PhotosComponent } from './MyComponents/photos/photos.component';
import { VideosComponent } from './MyComponents/videos/videos.component';
import { NoteStoriesComponent } from './MyComponents/note-stories/note-stories.component';

const routes: Routes = [
  {
    path: '',
    component: ScrollBodyComponent
  },
  {
    path: 'AddContent',
    component: AddContentComponent
  },
  {
    path: 'Photos',
    component: PhotosComponent
  },
  {
    path: 'Videos',
    component: VideosComponent
  },
  {
    path: 'NoteStories',
    component: NoteStoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
