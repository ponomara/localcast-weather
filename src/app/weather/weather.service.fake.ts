import {Observable, of} from "rxjs";
import {ICurrentWeather} from "../interfaces";
import {IWeatherService} from "./weather.service";

export const fakeWeather: ICurrentWeather = {
  city: "Bethesda",
  country: "US",
  date: new Date(1485789600),
  description: "light intensity drizzle",
  image: "",
  temperature: 280.32
}

export class WeatherServiceFake implements IWeatherService {
  public getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }

}
