import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../image.service';

import { ImageDetailComponent } from './image-details.component';

class ImageServiceMock {
  getImages = () => {};
  getImage = () => ({
    id: 1,
    brand: 'string',
    url: 'string'});
};

class ActiveRouteMock {
  snapshot = {
    params: {
      id: '1234'
    }
  };
};

describe('ImageDetailsComponent', () => {
  let component: ImageDetailComponent;
  let fixture: ComponentFixture<ImageDetailComponent>;
  const imageServiceMock = new ImageServiceMock();
  const activeRouteMock = new ActiveRouteMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetailComponent ],
      providers: [{ provide: ImageService, useValue: imageServiceMock},
        { provide: ActivatedRoute, useValue: activeRouteMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be defined the div image when de the component is created', () => {
    const debugElement = fixture.debugElement;
    const divImage = debugElement.query(By.css('#div_image')).nativeElement;

    fixture.autoDetectChanges();

    expect(divImage).toBeDefined();
  })
});
