import { Component, OnInit } from '@angular/core';

import { Weather } from './weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather: Weather[];
  weatherLocation: string;
  loading: boolean;
  wLocation: string;

  model: any = {};

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    // console.log('NG Inited');
    this.weather = [];
    this.weatherLocation = 'Jacksonville';
    this.model.weatherLocation = 'Jacksonville';
    this.getWeather(this.weatherLocation);
  }


  onSubmit() {
    this.weather = [];
    this.weatherLocation = this.model.weatherLocation;
    this.getWeather(this.weatherLocation);
  }

  getWeather(wLocation): void {
    this.weather = [];
    this.wLocation = wLocation;
    if (wLocation.length === 0) {
      this.weather = [];
    } else {
      this.loading = true;
      this.weatherService.getWeather(wLocation)
        .subscribe(weather => {
          this.weather = weather;
          // console.log(wLocation);
          // console.log(weather);
          this.loading = false;
        });
    }

  }
}
