import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import {of} from "rxjs";
import {WeatherService} from "../weather/weather.service";
import {fakeWeather} from "../weather/weather.service.fake";

import {CurrentWeatherComponent} from './current-weather.component';


describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy =
      jasmine.createSpyObj(
        'WeatherService',
        ['getCurrentWeather']
      );

    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent ],
      imports: [],
      providers: [{
        provide: WeatherService,
        useValue: weatherServiceSpy
      }]
    })
    .compileComponents();
    weatherServiceMock = TestBed.inject(WeatherService) as any;

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    //Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    //Act
    fixture.detectChanges();

    //Assert
    expect(component).toBeTruthy();
  });

  it('should get currentWeather from weatherService', () => {
    //Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    //Act
    fixture.detectChanges(); // triggers ngOnInit()

    //Assert
    expect(weatherServiceMock.getCurrentWeather)
      .toHaveBeenCalledTimes(1);
  });

  it('should eagerly load currentWeather in Bethesda from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));

    // Act
    fixture.detectChanges(); // triggers ngOnInit()

    // Assert
    expect(component.current).toBeDefined();
    expect(component.current?.city).toEqual('Bethesda');
    expect(component.current?.temperature).toEqual(280.32);

    // Assert on DOM
    const debugEl = fixture.debugElement;
    const titleEl : HTMLElement = debugEl.query(By.css('span')).nativeElement;
    expect(titleEl.textContent).toContain('Bethesda');
  });
});
