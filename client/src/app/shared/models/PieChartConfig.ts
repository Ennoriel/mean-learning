import { BaseChartConfig } from '../models/BaseChartConfig';

export class PieChartConfig extends BaseChartConfig {
    pieHole: number;

    constructor(title: string, pieHole: number) {
        super(title);
        this.pieHole = pieHole;
    }
}
