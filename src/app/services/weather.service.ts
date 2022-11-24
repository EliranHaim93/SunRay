import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private APIKEY: string = '?apikey=SNha4BWV0MLdTqbEVKUM52IFDG5CwJ8j';
  private defaultLocaionKey: string = '215854';

  constructor(private http: HttpClient) {}

  get5DayForcast(cityKey: string): Observable<any> {
    return this.http.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}${this.APIKEY}`
    );
  }

  getCurrentWeather(cityName: string): Observable<any> {
    return this.http.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${cityName}?${this.APIKEY}`
    );
  }
  getAutocomplete(cityName: string): Observable<any> {
    return this.http.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete${this.APIKEY}&q=${cityName}`
    );
  }

  getCity(cityName: string): Observable<any> {
    return this.http.get(
      `http://dataservice.accuweather.com/locations/v1/cities/search${this.APIKEY}&q=${cityName}`
    );
  }
}
