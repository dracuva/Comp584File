import { Component } from '@angular/core';
import { CountryData } from './country-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country',
  imports: [RouterLink],
  templateUrl: './country.html',
  styleUrl: './country.scss'
})
export class Country {
    countries: CountryData[] = [];
    constructor(http: HttpClient) {
    http.get<CountryData[]>(environment.apiUrl + "api/countries").subscribe(data => {
      this.countries = data;
    });
  }
}


