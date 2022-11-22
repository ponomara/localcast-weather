import {HttpClient, HttpParams} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Coordinates, ICurrentWeather} from "../interfaces";

export interface IWeatherService {
  getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather>;
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather>;
}

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}


@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(search: string | number, country?: string) : Observable<ICurrentWeather> {
    let uriParams = new HttpParams();

    if (typeof search === 'string') {
      uriParams = uriParams.set('q', country ? `${search},${country}` : search);
    } else {
      uriParams = uriParams.set('zip', 'search');
    }
    return this.getCurrentWeatherResponse(uriParams);
  }

  private getCurrentWeatherResponse(uriParams: HttpParams): Observable<ICurrentWeather> {

    uriParams = uriParams.set('appid', environment.appId);

    return this.httpClient.get<ICurrentWeatherData>(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
      {params: uriParams}
    ).pipe(map(data => this.transformToICurrentWeather(data)));

  }

  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString());

    return this.getCurrentWeatherResponse(uriParams);
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: new Date(data.dt * 1000),
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    }
  }

  private convertKelvinToFahrenheit(kelvin: number) {
    return kelvin * 9 / 5 - 459.67;
  }
}
