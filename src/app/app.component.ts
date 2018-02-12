import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AlphaVantageApiService } from './alpha-vantage/shared/alpha-vantage-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor (
    private _alphaVantageApiService: AlphaVantageApiService
  ) {}
}
