
import * as restify from 'restify';

import {HttpContext, IFunctionRequest, HttpStatusCodes} from 'azure-functions-typescript'

import { IHostService } from "../../contract/contracts";
import { serviceBase } from "../serviceBase";
import { injectable } from "inversify";


export class azureFunctionsHostService extends serviceBase implements IHostService{

    

    private _context:HttpContext;
    private _listener; 
    init(){
        
    }

    private _azureFunctionsHead(context:HttpContext, req:IFunctionRequest):any{
        this._context = context;
        this.log("Azure Context");        
        this._listener(req, context.res);
    }

    public log(message:string){
        if(this._context){
            this._context.log(message);
        }else{
            console.log(message);
        }   
    }

    public get export():any{
        return this._azureFunctionsHead;
    }
}