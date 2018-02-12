import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-autre-truc',
  templateUrl: './autre-truc.component.html',
  styleUrls: ['./autre-truc.component.css']
})
export class AutreTrucComponent implements OnInit {

  route: String;

  constructor() {
  }

  ngOnInit() {
    this.route = location.pathname;
  }

}
