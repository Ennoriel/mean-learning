import { Component, OnInit, Input } from '@angular/core';
import { LineChartConfig } from './../../models/LineChartConfig';
import { GoogleLineChartService } from '../../services/google-line-chart.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() elementId: string;
  @Input() columnOptions: any[];
  @Input() rows: any[];
  @Input() config: LineChartConfig;

  constructor(
    private _lineChartService: GoogleLineChartService
  ) { }

  ngOnInit(): void {
    this._lineChartService.BuildLineChart(this.elementId, this.columnOptions, this.rows, this.config);
  }

}
