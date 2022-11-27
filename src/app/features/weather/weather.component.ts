import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  map,
  Observable,
  switchMap,
  tap,
  Subject,
  filter,
  debounceTime,
} from 'rxjs';
import { City } from 'src/app/models/city';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnChanges {
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

  autoCompleteKey$ = new Subject<string>();
  options!: string[];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getDeafultForcast();
    this.getCurrentWeather();

    this.autoCompleteKey$
      .pipe(
        debounceTime(300),
        filter((data: string) => data.length > 0),
        switchMap((data: string) => {
          return this.weatherService.getAutocomplete(data);
        })
      )
      .subscribe((results: City[]) => {
        results.forEach((result) => {
          let cityName = result.LocalizedName;
          this.options.push(cityName);
          console.log(this.options);
          ד;
        });
      });
  }

  ngOnChanges() {
    // this.autoCompleteKey
    //   .pipe(
    //     filter((data: string) => data.length > 0),
    //     debounceTime(500),
    //     switchMap((data: string) => {
    //       return this.weatherService.getAutocomplete(data);
    //     })
    //   )
    //   .subscribe((options: any) => {
    //     console.log(options);
    //   });
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

  SelectOption() {
    //TODO: autocomplete integrate with the searchParam atribute as a subject to sent values via .next() and go through a pipe here to find suggestions
  }
}
