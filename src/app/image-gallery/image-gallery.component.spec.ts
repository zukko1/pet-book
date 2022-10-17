import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageService } from '../image.service';
import { FilterimagesPipe } from '../filterimages.pipe';

import { GalleryComponent } from './image-gallery.component';
import { By } from '@angular/platform-browser';

class ImageServiceMock {
  getImages = () => ([...imagesdelatilsMock]);
  getImage = () => ({
    id: 1,
    brand: 'string',
    url: 'string'});
};

const imagesdelatilsMock = [
  { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },
  { "id": 2, "brand": "gato", "url": "assets/images/gato1.jpg" }
];

describe('ImageGalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  const imageServiceMock = new ImageServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent, FilterimagesPipe ],
      providers: [{provide: ImageService, useValue: imageServiceMock}]
    })
    .compileComponents();
  }));


  describe('Constructor test', () => {
    it('Should call a getImges when the component is created', () => {
      const spyOfImages = spyOn(imageServiceMock, 'getImages').and.returnValue([...imagesdelatilsMock]);

      fixture = TestBed.createComponent(GalleryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.allImages).toEqual(imagesdelatilsMock);
      expect(spyOfImages).toHaveBeenCalled();
    })
  })

  describe('After to life cycle of angular', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(GalleryComponent);
      component = fixture.componentInstance;
      fixture.autoDetectChanges();
    });

    it('Should show a title when the template is created and put a filterby in all', () => {
      const debugElement = fixture.debugElement;
      const titleTag = debugElement.query(By.css('#image_gallery_title')).nativeElement;
      const innerHTMLTitleExpected = 'Pet Book Prueba Devops';
      const filterByExpected = 'all';

      fixture.autoDetectChanges();

      expect((titleTag as HTMLElement).innerHTML.trim()).toBe(innerHTMLTitleExpected);
      expect(component.filterBy).toBe(filterByExpected);
    })

    it('Should filter by "all" when the button all-button is clicked', () => {
      const debugElement = fixture.debugElement;
      const allButton = debugElement.query(By.css('#img_gallery_all_button')).nativeElement;
      const dogImageTag = debugElement.query(By.css('#img_1')).nativeElement;
      const catImageTag = debugElement.query(By.css('#img_2')).nativeElement;
      const filterByExpected = 'all';
      const url = 'http://localhost:9876/';

      allButton.click();

      expect(dogImageTag.src).toBe(`${url}${imagesdelatilsMock[0].url}`);
      expect(catImageTag.src).toBe(`${url}${imagesdelatilsMock[1].url}`);
      expect(component.filterBy).toBe(filterByExpected);
    });

    it('Should filter by "dog" when the button all-button is clicked', () => {
      const debugElement = fixture.debugElement;
      const dogButton = debugElement.query(By.css('#img_gallery_dog_button')).nativeElement;
      const dogImageTag = debugElement.query(By.css('#img_1')).nativeElement;
      const filterByExpected = 'perro';
      const url = 'http://localhost:9876/';

      dogButton.click();

      expect(dogImageTag.src).toBe(`${url}${imagesdelatilsMock[0].url}`);
      expect(component.filterBy).toBe(filterByExpected);
    });

    it('Should filter by "cat" when the button all-button is clicked', () => {
      const debugElement = fixture.debugElement;
      const catButton = debugElement.query(By.css('#img_gallery_cat_button')).nativeElement;
      const catImageTag = debugElement.query(By.css('#img_2')).nativeElement;
      const filterByExpected = 'gato';
      const url = 'http://localhost:9876/';

      catButton.click();

      expect(catImageTag.src).toBe(`${url}${imagesdelatilsMock[1].url}`);
      expect(component.filterBy).toBe(filterByExpected);
    });
  })

});
