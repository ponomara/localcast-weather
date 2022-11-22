export interface ICurrentWeather {
  city: string,
  country: string,
  date: Date,
  image:string,
  temperature: number,
  description: string
}

export interface Coordinates {
  latitude: number,
  longitude: number
}
