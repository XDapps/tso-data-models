export class DataPoint {
  baseCurrency?: string;
  quoteCurrency?: string;
  price = 0;
  time = 0;
  exchange?: string;

  constructor() {

  }

  getObjectToSave() {
    if (this.baseCurrency && this.quoteCurrency && this.exchange) {
      return {
        baseCurrency: this.baseCurrency,
        quoteCurrency: this.quoteCurrency,
        price: this.price,
        time: this.time,
        exchange: this.exchange
      }

    } else {
      return {};
    }
  }

  getAssetLTSArchivePath(): string {
    const time: Date = new Date(this.time);
    const year: number = time.getUTCFullYear();
    let month: number = time.getUTCMonth() + 1;
    month = month === 13 ? 12 : month;
    const day: number = time.getUTCDate();
    //  return `${this.exchange.toLowerCase()}_${year}_${month}_${day}_${this.baseCurrency.toLowerCase()}.csv`;
    return '';
  }


  symbolMatches(symbol: string): boolean {
    if (symbol.length > 0 && this.baseCurrency) {
      return this.baseCurrency.toUpperCase() === symbol.toUpperCase();
    } else {
      return false;
    }
  }

  exchangeMatches(exchange: string): boolean {
    if (this.exchange) {
      return this.exchange.toLowerCase() === exchange.toLowerCase();
    }
    else {
      return false;
    }
  }

  dpTimestampIsBefore(timestamp: number): boolean {
    return this.time <= timestamp;
  }

  dpTimestampIsAfter(timestamp: number): boolean {
    return this.time >= timestamp;
  }

  isToday(): boolean {
    const dpDay = new Date(this.time).getDay();
    const currentDay = new Date().getDay();
    return currentDay === dpDay;
  }


  dataPointIsInList(listToCheck: DataPoint[]): boolean {
    for (let i = 0; i < listToCheck.length; i++) {
      const dp: DataPoint = listToCheck[i];
      const tsMatches = this.time === dp.time;
      const baseMatches = this.baseCurrency === dp.baseCurrency;
      const quotedMatches = this.quoteCurrency === dp.quoteCurrency;
      if (tsMatches && baseMatches && quotedMatches) {
        return true;
      }
    }
    return false;
  }

}

export default DataPoint


export class DataPointFactory {
  static fromFTXAPIResponseObject(jsonData: Record<string, any>, ts: number): DataPoint {
    const itemToReturn: DataPoint = new DataPoint();
    itemToReturn.baseCurrency = jsonData.baseCurrency;
    itemToReturn.quoteCurrency = jsonData.quoteCurrency;
    itemToReturn.price = parseFloat(jsonData.price);
    itemToReturn.time = ts;
    itemToReturn.exchange = "FTX";
    return itemToReturn;
  }
  static fromKuCoinAPIResponseObject(jsonData: Record<string, any>, base: string, quoted: string, ts: number): DataPoint {
    const itemToReturn: DataPoint = new DataPoint();
    itemToReturn.baseCurrency = base;
    itemToReturn.quoteCurrency = quoted;
    itemToReturn.price = parseFloat(jsonData.averagePrice);
    itemToReturn.time = ts;
    itemToReturn.exchange = "KuCoin";
    return itemToReturn;
  }
  static fromHuobiAPIResponseObject(jsonData: Record<string, any>, base: string, quoted: string, ts: number): DataPoint {
    const itemToReturn: DataPoint = new DataPoint();
    const price = (jsonData.bid + jsonData.ask) / 2;
    itemToReturn.baseCurrency = base;
    itemToReturn.quoteCurrency = quoted;
    itemToReturn.price = parseFloat(price.toString());
    itemToReturn.time = ts;
    itemToReturn.exchange = "Huobi";
    return itemToReturn;
  }
  static fromBinanceAPIResponseObject(jsonData: Record<string, any>, base: string, quoted: string, ts: number): DataPoint {
    const itemToReturn: DataPoint = new DataPoint();
    itemToReturn.baseCurrency = base;
    itemToReturn.quoteCurrency = quoted;
    itemToReturn.price = parseFloat(jsonData.price);
    itemToReturn.time = ts;
    itemToReturn.exchange = "Binance";
    return itemToReturn;
  }
  static fromBitrueAPIResponseObject(jsonData: Record<string, any>, base: string, quoted: string, ts: number): DataPoint {
    const itemToReturn: DataPoint = new DataPoint();
    itemToReturn.baseCurrency = base;
    itemToReturn.quoteCurrency = quoted;
    itemToReturn.price = parseFloat(jsonData.price);
    itemToReturn.time = ts;
    itemToReturn.exchange = "Binance";
    return itemToReturn;
  }
  static fromBittrexAPIResponseObject(jsonData: Record<string, any>, base: string, quoted: string): DataPoint {
    const itemToReturn: DataPoint = new DataPoint();
    itemToReturn.baseCurrency = base;
    itemToReturn.quoteCurrency = quoted;
    itemToReturn.price = parseFloat(jsonData.Last);
    itemToReturn.exchange = "Bittrex";
    return itemToReturn;
  }
  static fromCSVRow(rowOfData: any[]): DataPoint {
    const itemToReturn: DataPoint = new DataPoint();
    itemToReturn.exchange = rowOfData[0];
    itemToReturn.baseCurrency = rowOfData[1];
    itemToReturn.quoteCurrency = rowOfData[2];
    itemToReturn.price = parseFloat(rowOfData[3]);
    itemToReturn.time = parseInt(rowOfData[4]);
    return itemToReturn;
  }
  static fromCSVRows(rowsOfData: any[]): DataPoint[] {
    const listToReturn: DataPoint[] = [];
    for (let i = 0; i < rowsOfData.length; i++) {
      const csvRow = rowsOfData[i];
      const dp = DataPointFactory.fromCSVRow(csvRow);
      listToReturn.push(dp);
    }
    return listToReturn;
  }

  static listFromFirebase(listOfRecords: Record<string, any>[]): DataPoint[] {
    const listToReturn: DataPoint[] = [];
    for (let i = 0; i < listOfRecords.length; i++) {
      const jsonData = listOfRecords[i];
      const itemToReturn: DataPoint = new DataPoint();
      itemToReturn.baseCurrency = jsonData.baseCurrency;
      itemToReturn.quoteCurrency = jsonData.quoteCurrency;
      itemToReturn.price = parseFloat(jsonData.price);
      itemToReturn.time = jsonData.time;
      itemToReturn.exchange = jsonData.exchange;
      listToReturn.push(itemToReturn);
    }
    return listToReturn;
  }

  static fromFirebaseDoc(record: Record<string, any>): DataPoint {
      const itemToReturn: DataPoint = new DataPoint();
    itemToReturn.baseCurrency = record.baseCurrency;
    itemToReturn.quoteCurrency = record.quoteCurrency;
    itemToReturn.price = parseFloat(record.price);
    itemToReturn.time = record.time;
    itemToReturn.exchange = record.exchange;
    return itemToReturn;
  }
}