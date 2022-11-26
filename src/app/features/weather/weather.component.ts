import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  map,
  Observable,
  startWith,
  switchMap,
  tap,
  catchError,
  Subject,
} from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  searchField = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-zA-Z -']+"),
  ]);

  //---------
  cityName!: string;
  CurrentCityName: string = 'Tel Aviv';
  CurrentDate!: Date;
  CurrentDescription!: string;
  CurrentTemp!: Number;
  //----

  currentLocationKey!: string;
  searchParam!: string;

  fiveDaysForecast$ = new Observable<any>();
  currentForcast$ = new Observable<any>();

  autoCompleteName = new Subject<string>();
  filteredOptions!: Observable<string[]>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getDeafultForcast();
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeather().subscribe((res) => {
      this.CurrentDate = res[0].LocalObservationDateTime;
      this.CurrentDescription = res[0].WeatherText;
      this.CurrentTemp = res[0].Temperature.Metric.Value;
    });
  }

  getDeafultForcast() {
    this.fiveDaysForecast$ = this.weatherService.getCity('Tel Aviv').pipe(
      tap((res) => (this.cityName = res[0].LocalizedName)),
      switchMap((res) =>
        this.weatherService.get5DayForcast(res[0].Key).pipe(
          map(
            (data) => data.DailyForecasts
            // (data) => console.log(data.DailyForecasts)
          )
        )
      )
    );
  }

  onSubmit() {
    // console.log(this.searchParam);
    // this.weatherService.getCity(this.searchParam).subscribe((res) => {
    //   console.log(res);
    //   this.currentLocationKey = res[0].Key;

    //   this.fiveDaysForecast$ = this.weatherService
    //     .get5DayForcast(this.currentLocationKey)
    //     .pipe(map((data) => data.DailyForecasts));
    // });

    this.fiveDaysForecast$ = this.weatherService.getCity(this.searchParam).pipe(
      tap((res) => (this.cityName = res[0].LocalizedName)),
      switchMap((res) =>
        this.weatherService
          .get5DayForcast(res[0].Key)
          .pipe(map((data) => data.DailyForecasts))
      )
    );
  }

  autocomplete() {
    //TODO: autocomplete integrate with the searchParam atribute as a subject to sent values via .next() and go through a pipe here to find suggestions
  }
}
