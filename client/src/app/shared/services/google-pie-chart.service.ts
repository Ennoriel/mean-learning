import { GoogleChartsBaseService } from './google-charts.base.service';
import { Injectable } from '@angular/core';
import { PieChartConfig } from './../Models/PieChartConfig';

declare var google: any;

@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {

    constructor() {
        super();
    }

    public BuildPieChart(elementId: string, data: any[], config: PieChartConfig): void {
        const datatableFunc = () => google.visualization.arrayToDataTable(data);
        const chartFunc = () => new google.visualization.PieChart(document.getElementById(elementId));
        const options = {
            title: config.title,
            pieHole: config.pieHole,
        };

        this.buildChart(datatableFunc, chartFunc, options);
    }
}
