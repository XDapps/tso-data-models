import DataPoint from '../data-point/DataPoint';
export interface ExchangeInterface {
  processResponse(responseData: Record<string, any>, baseCurrencies: string[], quoteCurrencies: string[]): DataPoint[];
}
export default ExchangeInterface