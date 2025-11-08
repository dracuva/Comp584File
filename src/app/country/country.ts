import { Component } from '@angular/core';
import { CountryData } from './country-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-country',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './country.html',
  styleUrl: './country.scss'
})
export class Country {
  country:any;
    countries$: Observable<CountryData[]>;
    constructor(private http: HttpClient) {
    this.countries$ = http.get<CountryData[]>(environment.apiUrl + "api/countries");
  }
}


