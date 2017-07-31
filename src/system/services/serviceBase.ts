import { inject, injectable, Container } from "inversify";

import * as contracts from "../contract/contracts";
import { IConfig } from "../contract/systemEntities";

@injectable()
export class configBase{

    @inject(contracts.contractSymbols.IConfig)
    public config:IConfig;       
    
    public static Container:Container;

    public resolve<T>(symbol:symbol){
        return configBase.Container.get<T>(symbol);
    }
}

@injectable()
export class serviceBase extends configBase{    
    @inject(contracts.contractSymbols.ILogService)
    public logger: contracts.ILogService;
}