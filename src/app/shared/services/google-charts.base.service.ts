import { BaseChartConfig } from '../models/BaseChartConfig';

declare var google: any;

export class GoogleChartsBaseService {

    constructor() {
        google.charts.load('current', {'packages': ['corechart', 'line']});
    }

    protected buildChart(datatableFunc: any, chartFunc: any, options: BaseChartConfig): void {
        const func = (_chartFunc, _options) => {
            chartFunc().draw(datatableFunc(), options);
        };
        const callback = () => func(chartFunc, options);
        google.charts.setOnLoadCallback(callback);
    }
}
