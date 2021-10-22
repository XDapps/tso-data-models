import { DataPoint } from "./DataPoint";

export class DataSet {

  listOfDataPoints: DataPoint[];
  timeStamp = 0;

  constructor(listOfDataPoints: DataPoint[]) {
    this.listOfDataPoints = listOfDataPoints;
    this.timeStamp = Date.now();
  }

  // getAssetLTSArchivePath(): string {
  //   const time: Date = new Date(this.time);
  //   const year: number = time.getUTCFullYear();
  //   let month: number = time.getUTCMonth() + 1;
  //   month = month === 13 ? 12 : month;
  //   const day: number = time.getUTCDate();
  //   return `${this.exchange.toLowerCase()}_${year}_${month}_${day}_${this.baseCurrency.toLowerCase()}.csv`;
  // }


  // symbolMatches(symbol: string): boolean {
  //   if (symbol.length > 0 && this.baseCurrency) {
  //     return this.baseCurrency.toUpperCase() === symbol.toUpperCase();
  //   } else {
  //     return false;
  //   }
  // }

  // exchangeMatches(exchange: string): boolean {
  //   return this.exchange.toLowerCase() === exchange.toLowerCase();
  // }

  // dpTimestampIsBefore(timestamp: number): boolean {
  //   return this.time <= timestamp;
  // }

  // dpTimestampIsAfter(timestamp: number): boolean {
  //   return this.time >= timestamp;
  // }

  // isToday(): boolean {
  //   const dpDay = new Date(this.time).getDay();
  //   const currentDay = new Date().getDay();
  //   return currentDay === dpDay;
  // }

  getObjectToSave() {
    const tempList: any[] = [];
    for (let i = 0; i < this.listOfDataPoints.length; i++) {
      const dataPoint: DataPoint = this.listOfDataPoints[i];
      const jsonForSaving = dataPoint.getObjectToSave();
      tempList.push(jsonForSaving)
    }
    const dataToReturn = {
      listOfDataPoints: tempList,
      timeStamp: this.timeStamp
    }
   // console.log('Date ', dataToReturn)
    return dataToReturn;
  }

  // dataPointIsInList(listToCheck: DataPoint[]): boolean {
  //   for (let i = 0; i < listToCheck.length; i++) {
  //     const dp: DataPoint = listToCheck[i];
  //     const tsMatches = this.time === dp.time;
  //     const baseMatches = this.baseCurrency === dp.baseCurrency;
  //     const quotedMatches = this.quoteCurrency === dp.quoteCurrency;
  //     if (tsMatches && baseMatches && quotedMatches) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

}
export class DataSetFactory {
  // static fromKuCoinAPIResponseObject(jsonData: Record<string, any>, base: string, quoted: string, ts: number): DataPoint {
  //   const itemToReturn: DataPoint = new DataPoint();
  //   itemToReturn.baseCurrency = base;
  //   itemToReturn.quoteCurrency = quoted;
  //   itemToReturn.price = parseFloat(jsonData.averagePrice);
  //   itemToReturn.time = ts;
  //   itemToReturn.exchange = "KuCoin";
  //   return itemToReturn;
  // }
}