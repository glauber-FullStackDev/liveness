import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivenessPage } from './liveness.page';

describe('LivenessPage', () => {
  let component: LivenessPage;
  let fixture: ComponentFixture<LivenessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivenessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivenessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
