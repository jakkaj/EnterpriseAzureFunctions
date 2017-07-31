
import * as restify from 'restify';

import {HttpContext, IFunctionRequest, HttpStatusCodes} from 'azure-functions-typescript'

import * as contracts from "../../contract/contracts";
import { serviceBase } from "../serviceBase";
import { injectable, inject } from "inversify";


export class azureFunctionsHostService extends serviceBase implements contracts.IHostService{

    private _uploadService:contracts.IUploadService;

    /**
     *
     */
    constructor(@inject(contracts.contractSymbols.IUploadService) uploadService:contracts.IUploadService) {
        super();
        this._uploadService = uploadService;
    }

    private _context:HttpContext;
    private _listener; 

    init(){
        
    }

    private _azureFunctionsHead(context:HttpContext, req:IFunctionRequest):any{
        this._context = context;
        this.log("Azure Context");        
        var b:Buffer = req.body;

        var f = async ()=>{
            context.log("Calling up to teh serverz");
            try{
                var result = await this._uploadService.checkImage(b);
                context.log("Call complete");
                context.res = {
                    status:200, 
                    body:result
                }
               
            }catch(e){
                context.log(`Error: ${e}`);
                context.res = {
                    status:500, 
                    body:e
                }                
            }finally{
                context.done();
            }
            
        }
        f();
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