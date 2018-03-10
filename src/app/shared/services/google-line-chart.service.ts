import { GoogleChartsBaseService } from './google-charts.base.service';
import { Injectable } from '@angular/core';
import { LineChartConfig } from '../models/LineChartConfig';

declare var google: any;

@Injectable()
export class GoogleLineChartService extends GoogleChartsBaseService {

    constructor() {
        super();
    }

    public BuildLineChart(elementId: string, columnNames: string[], rows: any[], config: LineChartConfig): void {
        const chartFunc = () => new google.visualization.LineChart(document.getElementById(elementId));

        const datatableFunc = () => {
            const data = new google.visualization.DataTable();
            data.addColumn('number', 'X');
            columnNames.forEach(columnName => data.addColumn('number', columnName));
            data.addRows(rows);
            return data;
        };

        this.buildChart(datatableFunc, chartFunc, config);
    }
}
