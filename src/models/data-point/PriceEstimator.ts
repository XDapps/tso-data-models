import DataPoint from "./DataPoint";



class PriceEstimator {
  listOfDataPoints: DataPoint[];
  oldestAcceptedRecord: number;
  symbol: string

  constructor(listOfDataPoints: DataPoint[], oldestAcceptedRecord: number, symbol: string) {
    this.listOfDataPoints = listOfDataPoints;
    this.oldestAcceptedRecord = oldestAcceptedRecord;
    this.symbol = symbol;
  }

  getEstimatedPrice(): number {
    let valueToReturn: number = 0;
    let totalPrices: number = 0;
    let numberOfItems: number = 0;
    const tempList: DataPoint[] = [];
    for (let i = 0; i < this.listOfDataPoints.length; i++) {
      const dataPoint: DataPoint = this.listOfDataPoints[i];
      const matchesSymbol: boolean = dataPoint.symbolMatches(this.symbol);
      const withinTimeWindow: boolean = dataPoint.dpTimestampIsAfter(this.oldestAcceptedRecord);
      if (withinTimeWindow && matchesSymbol) {
        tempList.push(dataPoint);
        totalPrices = totalPrices + dataPoint.price;
        numberOfItems = numberOfItems + 1;
      }
    }
    if (totalPrices > 0) {
      valueToReturn = (totalPrices / numberOfItems);
    }
    return valueToReturn;
  }
}
export default PriceEstimator;

export class PriceEstimatorFactory {
  static fromDataPointsWithSymbol(listOfDataPoints: DataPoint[], oldestAcceptedRecord: number, symbol: string): number {
    const estimator: PriceEstimator = new PriceEstimator(listOfDataPoints, oldestAcceptedRecord, symbol);
    return estimator.getEstimatedPrice();
  }
}