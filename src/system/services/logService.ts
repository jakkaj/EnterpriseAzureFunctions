
import { ILogService } from "../contract/contracts";
import { injectable, inject } from "inversify";
import * as contracts from "../contract/contracts";
/**
 * Service to abstract logging so it will work across platforms (i.e local console, or context.log in Azure Functions)
 */
@injectable()
class logService implements ILogService {
    
    private _logCallback:(logMessage:string) => any;
    
    constructor() {
        this._logCallback = (logMessage)=>{
            console.log(logMessage);
        }        
    }

    public setLogCallback(callback:(logMessage:string) => any){
        this._logCallback = callback;    
    }

    public log(logMessage:string){
        this._logCallback(logMessage);
    }
}

export {logService};