import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  map,
  Observable,
  switchMap,
  tap,
  Subject,
  filter,
  debounceTime,
  startWith,
  distinctUntilChanged,
} from 'rxjs';
import { City } from 'src/app/models/city';
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

  fiveDaysForecast$ = new Observable<any>();
  currentForcast$ = new Observable<any>();

  autoCompleteKey$ = new Subject<string>();
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getDeafultForcast();
    this.getCurrentWeather();

    // this.autoCompleteKey$
    //   .pipe(
    //     debounceTime(300),
    //     filter((data: string) => data.length > 0),
    //     switchMap((data: string) => {
    //       return this.weatherService.getAutocomplete(data);
    //     })
    //   )
    //   .subscribe((results: City[]) => {
    //     results.forEach((result) => {
    //       let cityName = result.LocalizedName;
    //       this.options.push(cityName);
    //       console.log(cityName);
    //     });
    //   });

    this.filteredOptions = this.searchField.valueChanges.pipe(
      filter((value) => !!value),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value) => this.weatherService.getAutocomplete(value)),
      map((data: City[]) => data.map((city) => city.LocalizedName))
    );
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
        this.weatherService
          .get5DayForcast(res[0].Key)
          .pipe(map((data) => data.DailyForecasts))
      )
    );
  }

  onSubmit() {
    this.fiveDaysForecast$ = this.weatherService
      .getCity(this.searchField.value)
      .pipe(
        tap((res) => (this.cityName = res[0].LocalizedName)),
        switchMap((res) =>
          this.weatherService
            .get5DayForcast(res[0].Key)
            .pipe(map((data) => data.DailyForecasts))
        )
      );
  }
}
