import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Weather } from './weather';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})

export class WeatherComponent implements OnInit {
  weather: Weather[];
  weatherLocation: string;
  loading: boolean;
  wLocation: string;
  tempData: {};
  tempChart: [];
  pressureData: {};
  pressureChart: [];
  humidityData: {};
  humidityChart: [];
  windData: {};
  windChart: [];
  chartOptions: {};
  model: any = {};

  iconMap = {
      "sn": "wi wi-snow",
      "sl": "wi wi-sleet",
      "h" : "wi wi-hail", // hail
      "t" : "wi wi-thunderstorm", // thunderstorm
      "hr": "wi wi-rain", // heavy rain
      "lr": "wi wi-sprinkle", // light rain
      "s":  "wi wi-showers", // showers
      "hc": "wi wi-cloudy", // heavy clouds
      "lc" : "wi wi-cloud", // light clouds
      "c" : "wi wi-day-sunny" // clear
  };

  @ViewChild('temperatureCanvas') tempCanvas: ElementRef;
  @ViewChild('pressureCanvas') pressureCanvas: ElementRef;
  @ViewChild('humidityCanvas') humidityCanvas: ElementRef;
  @ViewChild('windCanvas') windCanvas: ElementRef;

  public contextTemp: CanvasRenderingContext2D;
  public contextPressure: CanvasRenderingContext2D;
  public contextHumidity: CanvasRenderingContext2D;
  public contextWind: CanvasRenderingContext2D;

  constructor(
      private weatherService: WeatherService,
      private ref: ChangeDetectorRef,
      private datePipe: DatePipe
  ) { }

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

      this.chartOptions = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      };

      this.weatherService.getWeather(wLocation)
        .subscribe(weather => {
          this.weather = weather;
          // console.log(wLocation);
          // console.log(weather);
          this.ref.markForCheck();
          this.loading = false;
          this.temperatureChart(weather);
        });
    }
  }

  temperatureChart(weather): void {
    const datePipe = new DatePipe('en-US');
    const temperaturesMin = [];
    const temperaturesMax = [];
    const airPressure = [];
    const humidity  = [];
    const wind  = [];
    const days = [];

    weather.forEach(function(w) {
      temperaturesMin.push(Math.round(w.min_temp  * 9.0 / 5.0 + 32));
      temperaturesMax.push(Math.round(w.max_temp  * 9.0 / 5.0 + 32));
      airPressure.push(w.air_pressure);
      humidity.push(w.humidity);
      wind.push(w.wind_speed);
      days.push(datePipe.transform(w.applicable_date, 'MM/dd'));
    });

    this.tempData = {
      labels: days,
      datasets: [
        {
          label: 'Min',
          data: temperaturesMin,
          fill: true,
          backgroundColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderColor: [
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)'
          ],
          borderWidth: 1
        },
        {
          label: 'Max',
          data: temperaturesMax,
          fill: true,
          backgroundColor: [
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)',
            'rgba(251, 110, 33)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        },
      ]
    };

    this.pressureData = {
      labels: days,
      datasets: [
        {
          label: 'Air Pressure (mb)',
          data: airPressure,
          fill: true,
          backgroundColor: [
            'rgb(63, 127, 191)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    this.humidityData = {
      labels: days,
      datasets: [
        {
          label: '% Humidity',
          data: humidity,
          fill: true,
          backgroundColor: [
            'rgb(95, 54, 246, 0.78)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    this.windData = {
      labels: days,
      datasets: [
        {
          label: 'Wind mph',
          data: wind,
          fill: true,
          backgroundColor: [
            'rgb(54, 214, 246)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    this.contextTemp = (<HTMLCanvasElement>this.tempCanvas.nativeElement).getContext('2d');
    this.tempChart = new Chart(this.contextTemp, {
      type: 'bar',
      data: this.tempData,
      options: this.chartOptions
    });

    this.contextPressure  = (<HTMLCanvasElement>this.pressureCanvas.nativeElement).getContext('2d');
    this.pressureChart = new Chart(this.contextPressure, {
      type: 'line',
      data: this.pressureData,
      options: this.chartOptions
    });

    this.contextHumidity  = (<HTMLCanvasElement>this.humidityCanvas.nativeElement).getContext('2d');
    this.humidityChart = new Chart(this.contextHumidity, {
      type: 'line',
      data: this.humidityData,
      options: this.chartOptions
    });

    this.contextWind  = (<HTMLCanvasElement>this.windCanvas.nativeElement).getContext('2d');
    this.windChart = new Chart(this.contextWind, {
      type: 'line',
      data: this.windData,
      options: this.chartOptions
    });
  }
}
