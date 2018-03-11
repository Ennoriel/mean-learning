import { Component, OnInit, Input } from '@angular/core';
import { AVIntradaySeries } from '../shared/alpha-vantage-api-query';
import { AlphaVantageApiService } from '../shared/alpha-vantage-api.service';
import { AlphaVantageRepositoryService } from '../shared/alpha-vantage-repository.service';
import { LineChartConfig } from '../../shared/models/LineChartConfig';

@Component({
    selector: 'app-alpha-vantage-form',
    templateUrl: './alpha-vantage-form.component.html',
    styleUrls: ['./alpha-vantage-form.component.css']
})
export class AlphaVantageFormComponent implements OnInit {

    @Input() model: AVIntradaySeries;

    showSpinner: boolean;
    resultsAll: any;
    results: any;
    apiKey: String;

    // Params for the chart
    columnOptions: any[];
    lineChartConfig: LineChartConfig;
    elementIdLine: string;

    constructor(
        private _alphaVantageApiService: AlphaVantageApiService,
        private _alphaVantageRepositoryService: AlphaVantageRepositoryService
    ) { }

    ngOnInit() {
        this.model = new AVIntradaySeries();
        this.showSpinner = false;
    }

    fetchData() {

        this.showSpinner = true;

        this._alphaVantageRepositoryService.getApiKey().subscribe(res => {

            this.apiKey = res.apiKey;

            this._alphaVantageApiService.get(this.model.getQuery(this.apiKey)).subscribe(results => {
                this.resultsAll = results;
                this.results = {
                    name: this.model.symbol,
                    series: []
                };

                this.columnOptions = [
                    {
                        type: 'datetime',
                        name: 'X'
                    },
                    {
                        type: 'number',
                        name: this.results.name
                    }
                ];

                const data = results['Time Series (60min)'];
                for (const property in data) {
                    if (data.hasOwnProperty(property)) {
                        this.results.series.push([
                            new Date(property),
                            Number(data[property]['1. open'])
                        ]);
                    }
                }

                this.lineChartConfig = new LineChartConfig('Socks', 'Date', 'Price (US $)', ['blue']);
                this.elementIdLine = this.results.name;

                this.showSpinner = false;
            });

        });
    }
}
