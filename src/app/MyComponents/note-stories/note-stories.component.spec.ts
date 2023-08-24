import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteStoriesComponent } from './note-stories.component';

describe('NoteStoriesComponent', () => {
  let component: NoteStoriesComponent;
  let fixture: ComponentFixture<NoteStoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteStoriesComponent]
    });
    fixture = TestBed.createComponent(NoteStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
