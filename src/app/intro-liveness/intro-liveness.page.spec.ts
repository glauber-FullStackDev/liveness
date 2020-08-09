import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroLivenessPage } from './intro-liveness.page';

describe('IntroLivenessPage', () => {
  let component: IntroLivenessPage;
  let fixture: ComponentFixture<IntroLivenessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroLivenessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroLivenessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
