import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
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
  date!: Date;
  description!: string;
  dayTemp!: Number;
  nightTemp!: number;

  CurrentCityName!: string;
  CurrentDate!: Date;
  CurrentDescription!: string;
  CurrentDayTemp!: Number;
  CurrentNightTemp!: number;
  //----

  currentLocationKey!: string;
  searchParam!: string;
  options: string[] = [];

  fiveDaysForecast$ = new Observable<any>();
  currentForcast$ = new Observable<any>();

  filteredOptions!: Observable<string[]>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.filteredOptions = this.searchField.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.filter(value || ''))
    );
    this.getDeafultForcast();
  }

  getDeafultForcast() {
    this.fiveDaysForecast$ = this.weatherService
      .getCity('Tel Aviv')
      .pipe(
        switchMap((res) =>
          this.weatherService
            .get5DayForcast(res[0].Key)
            .pipe(map((data) => data.DailyForecasts))
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

    this.fiveDaysForecast$ = this.weatherService
      .getCity(this.searchParam)
      .pipe(
        switchMap((res) =>
          this.weatherService
            .get5DayForcast(res[0].Key)
            .pipe(map((data) => data.DailyForecasts))
        )
      );
  }

  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.options.filter((option) =>
      this.normalizeValue(option).includes(filterValue)
    );
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
