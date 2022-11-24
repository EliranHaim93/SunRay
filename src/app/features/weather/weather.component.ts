import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  days: any[] = [];
  searchField = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-zA-Z -']+"),
  ]);
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  // TODO:add reactive validation for english char only pattern

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // this.weatherService.getDefaultForcast().subscribe((res) => {
    //   this.days.push(...res.DailyForecasts);
    // });
    // console.log(this.days);

    this.filteredOptions = this.searchField.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.filter(value || ''))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
