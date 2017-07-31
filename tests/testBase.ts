
import * as sinon from 'sinon';

import startup from '../src/startup';
import { IConfig } from "../src/system/contract/systemEntities";


export class testBase{
    
    protected _startup:startup;

    constructor() {
        this._startup = new startup();        
    }

    public get config():IConfig{
        return this._startup.config;
    }

    public resolve<T>(symbol:symbol){
        return this._startup.container.get<T>(symbol);
    }    
}