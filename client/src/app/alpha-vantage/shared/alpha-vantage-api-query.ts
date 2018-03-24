const functionName = 'TIME_SERIES_INTRADAY';

export class AVIntradaySeries {
    constructor(
      /**
       * The name of the equity
       */
      public symbol: string = 'AAPL',
      /**
       * Time interval between two consecutive data points in the time series:
       * 1min, 5min, 15min, 30min, 60min
       */
      public interval: string = '60min',
      /**
       * The output size:
       *  -compact returns only the latest 100 data points in the intraday time series;
       *  -full returns the full-length intraday time this.
       */
      public outputsize: string = 'compact',
      /**
       * The format:
       *  -json returns the intraday time series in JSON format;
       *  -csv returns the time series as a CSV (comma separated value) file.
       */
      public datatype: string = 'json',
    ) {}

    getQuery = function(apiKey) {
      return ('function=' + functionName) + '&' +
      ('symbol=' + this.symbol) + '&' +
      ('interval=' + this.interval) + '&' +
      ('outputsize=' + this.outputsize) + '&' +
      ('datatype=' + this.datatype) + '&' +
      ('apikey=' + apiKey);
    };
}


// *  -TIME_SERIES_DAILY
// *  -TIME_SERIES_DAILY_ADJUSTED
// *  -TIME_SERIES_WEEKLY
// *  -TIME_SERIES_WEEKLY_ADJUSTED
// *  -TIME_SERIES_MONTHLY
// *  -TIME_SERIES_MONTHLY_ADJUSTED
// *  -BATCH_STOCK_QUOTES
