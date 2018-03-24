import { Component, Input, OnInit } from '@angular/core';

import { GooglePieChartService } from './../../services/google-pie-chart.service';
import { PieChartConfig } from './../../Models/PieChartConfig';

declare var google: any;


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styles: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

    @Input() data: any[];
    @Input() config: PieChartConfig;
    @Input() elementId: string;

    constructor(private _pieChartService: GooglePieChartService) {}

    ngOnInit(): void {
        this._pieChartService.BuildPieChart(this.elementId, this.data, this.config);
    }
}
