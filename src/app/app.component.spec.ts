import { TestBed } from '@angular/core/testing';
import {MockComponent} from "ng-mocks";
import { AppComponent } from './app.component';
import {CurrentWeatherComponent} from "./current-weather/current-weather.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockComponent(CurrentWeatherComponent)
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('.content span')?.textContent).toContain('local-weather-app app is running!');
    expect(compiled.querySelector('h1')?.textContent)
      .toContain('LocalCast Weather');
  });
});
