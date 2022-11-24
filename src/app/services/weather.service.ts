import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private APIKEY: string = '?apikey=SNha4BWV0MLdTqbEVKUM52IFDG5CwJ8j';
  private defaultLocaionKey: string = '215854';
  private userLocationKey!: string;

  constructor(private http: HttpClient) {}

  getDefaultForcast(): Observable<any> {
    return this.http.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.defaultLocaionKey}${this.APIKEY}`
    );
  }

  getCurrentWeather(): Observable<any> {
    return this.http.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${this.userLocationKey}`
    );
  }
  autocomplete(charsArr: string[]): Observable<any> {
    const chars = [...charsArr].concat();
    return this.http.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete${this.APIKEY}&q=${chars}`
    );
  }
}
