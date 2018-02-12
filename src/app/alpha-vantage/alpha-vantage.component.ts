import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-alpha-vantage',
  templateUrl: './alpha-vantage.component.html',
  styleUrls: ['./alpha-vantage.component.css']
})
export class AlphaVantageComponent implements OnInit {

  route: String;

  constructor() {
  }

  ngOnInit() {
    this.route = location.pathname;
  }

}
