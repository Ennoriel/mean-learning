import { BaseChartConfig } from '../models/BaseChartConfig';

export class LineChartConfig extends BaseChartConfig {
    hAxis: {title: string};
    vAxis: {title: string};
    color: string[];

    constructor(title: string, hAxisTitle: string, vAxisTitle: string, color: string[]) {
        super(title);
        this.hAxis = {title: hAxisTitle};
        this.vAxis = {title: vAxisTitle};
        this.color = color;
    }
}
