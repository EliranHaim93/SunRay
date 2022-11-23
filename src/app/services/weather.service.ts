import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private APIKEY: string = '?apikey=SNha4BWV0MLdTqbEVKUM52IFDG5CwJ8j';
  private defaultLocaionKey: string = '215854';

  private baseUrl = 'http://dataservice.accuweather.com/';
  private fiveDayForcastURL = 'forecasts/v1/daily/5day/';

  private fiveDayForcastDefaultLocationResponce: Observable<any> = JSON.parse(`{
    "Headline": {
        "EffectiveDate": "2022-11-25T01:00:00+02:00",
        "EffectiveEpochDate": 1669330800,
        "Severity": 3,
        "Text": "Expect showery weather late Thursday night through Friday morning",
        "Category": "rain",
        "EndDate": "2022-11-25T13:00:00+02:00",
        "EndEpochDate": 1669374000,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date": "2022-11-23T07:00:00+02:00",
            "EpochDate": 1669179600,
            "Temperature": {
                "Minimum": {
                    "Value": 53,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 80,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 1,
                "IconPhrase": "Sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 38,
                "IconPhrase": "Mostly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
        },
        {
            "Date": "2022-11-24T07:00:00+02:00",
            "EpochDate": 1669266000,
            "Temperature": {
                "Minimum": {
                    "Value": 54,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 68,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 13,
                "IconPhrase": "Mostly cloudy w/ showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Night": {
                "Icon": 12,
                "IconPhrase": "Showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Heavy"
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
        },
        {
            "Date": "2022-11-25T07:00:00+02:00",
            "EpochDate": 1669352400,
            "Temperature": {
                "Minimum": {
                    "Value": 49,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 67,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 13,
                "IconPhrase": "Mostly cloudy w/ showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Heavy"
            },
            "Night": {
                "Icon": 36,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light"
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
        },
        {
            "Date": "2022-11-26T07:00:00+02:00",
            "EpochDate": 1669438800,
            "Temperature": {
                "Minimum": {
                    "Value": 46,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 71,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 6,
                "IconPhrase": "Mostly cloudy",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 35,
                "IconPhrase": "Partly cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
        },
        {
            "Date": "2022-11-27T07:00:00+02:00",
            "EpochDate": 1669525200,
            "Temperature": {
                "Minimum": {
                    "Value": 53,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 73,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 4,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 7,
                "IconPhrase": "Cloudy",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
        }
    ]
}`);
  constructor(private httpClient: HttpClient) {}

  getWeather(): Observable<any> {
    // return this.httpClient.get(
    //   `${this.baseUrl}${this.fiveDayForcastURL}${this.defaultLocaionKey}${this.APIKEY}`
    // );
    return this.fiveDayForcastDefaultLocationResponce;
  }

  // autocomplete(): Observable<any> {}
}
