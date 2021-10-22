import { classToPlain } from "class-transformer";


export class ControllerSettings {

  secondsEarly: number;
  dataAnalysisWindow: number;
  lastCompletedStorageDay: number;

  constructor(secondsEarly: number, dataAnalysisWindow: number, lastCompletedStorageDay: number) {
    this.secondsEarly = secondsEarly;
    this.dataAnalysisWindow = dataAnalysisWindow;
  }

  saveObject(): Record<string, any> {
    return classToPlain(this);
  }
  
}

export default ControllerSettings;