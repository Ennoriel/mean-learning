import {
  Component,
  OnInit
} from '@angular/core';
import { PieChartConfig } from '../shared/Models/PieChartConfig';
import { LineChartConfig } from '../shared/models/LineChartConfig';

@Component({
  selector: 'app-alpha-vantage',
  templateUrl: './alpha-vantage.component.html',
  styleUrls: ['./alpha-vantage.component.css']
})
export class AlphaVantageComponent implements OnInit {

  route: String;

  data: any[];
  config: PieChartConfig;
  elementId: string;

  columnNames: string[];
  rows: any[];
  lineChartConfig: LineChartConfig;
  elementIdLine: string;

  constructor() {
  }

  ngOnInit() {
    this.route = location.pathname;

    this._initPieChart();
    this._initLineChart();
  }

  /**
   * http://anthonygiretti.com/2017/10/12/using-google-charts-in-angular-4-project-part-2/
   * https://github.com/AnthonyGiretti/Angular4-GoogleCharts/blob/master/src/app/Dashboard/dashboard.component.ts
   * https://developers.google.com/chart/interactive/docs/gallery/piechart
   */
  private _initPieChart() {
    this.data = [['Task', 'Hours per Day'],
    ['Eat',      3],
    ['Commute',  2],
    ['Watch TV', 5],
    ['Video games', 4],
    ['Sleep',    10]];

    this.config = new PieChartConfig('My Daily Activities at 20 years old', 0.4);
    this.elementId = 'myPieChart1';
  }

    private _initLineChart() {
        this.columnNames = ['azer', 'tyuiop'];
        this.rows = [
            [0, 0, 0],
            [1, 10, 5],
            [2, 23, 15],
            [3, 17, 9],
            [4, 18, 10],
            [5, 9, 5],
            [6, 11, 3],
            [7, 27, 19],
            [8, 33, 25],
            [9, 40, 32],
            [10, 32, 24],
            [11, 35, 27],
            [12, 30, 22],
            [13, 40, 32],
            [14, 42, 34],
            [15, 47, 39],
            [16, 44, 36],
            [17, 48, 40],
            [18, 52, 44],
            [19, 54, 46],
            [20, 42, 34],
            [21, 55, 47],
            [22, 56, 48],
            [23, 57, 49],
            [24, 60, 52],
            [25, 50, 42],
            [26, 52, 44],
            [27, 51, 43],
            [28, 49, 41],
            [29, 53, 45],
            [30, 55, 47],
            [31, 60, 52],
            [32, 61, 53],
            [33, 59, 51],
            [34, 62, 54],
            [35, 65, 57],
            [36, 62, 54],
            [37, 58, 50],
            [38, 55, 47],
            [39, 61, 53],
            [40, 64, 56],
            [41, 65, 57],
            [42, 63, 55],
            [43, 66, 58],
            [44, 67, 59],
            [45, 69, 61],
            [46, 69, 61],
            [47, 70, 62],
            [48, 72, 64],
            [49, 68, 60],
            [50, 66, 58],
            [51, 65, 57],
            [52, 67, 59],
            [53, 70, 62],
            [54, 71, 63],
            [55, 72, 64],
            [56, 73, 65],
            [57, 75, 67],
            [58, 70, 62],
            [59, 68, 60],
            [60, 64, 56],
            [61, 60, 52],
            [62, 65, 57],
            [63, 67, 59],
            [64, 68, 60],
            [65, 69, 61],
            [66, 70, 62],
            [67, 72, 64],
            [68, 75, 67],
            [69, 80, 72]
        ];

        this.lineChartConfig = new LineChartConfig('mon titre', 'toto', 'titi', ['blue', 'red']);
        this.elementIdLine = 'myLineChart1';
    }

}
