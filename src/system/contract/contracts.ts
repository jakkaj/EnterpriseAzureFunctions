

import { CognitiveFace, CognitiveFaceResult } from "../services/cognitive/cognitiveContract";

export interface ILogService {
    log(logMessage: string);
    setLogCallback(callback:(logMessage:string) => any);
}

export interface INetClient{
    postJson<TUpload, TResult>(url:string, path:string, postData:TUpload, headers?:any):Promise<TResult>;
}

export interface IHostService{
    init();
    export:any;
    log(message:string);
}

export interface ICognitiveService{
    postJson<TUpload, TResult>(path:string, postData:TUpload, key:string):Promise<TResult>;
}

export interface IFaceService{
    detectFaces(face:Buffer):Promise<CognitiveFace[]>;
    validateFaces(face:Buffer):Promise<CognitiveFaceResult>;
}

export interface IUploadService{
    checkImage(image: Buffer): Promise<checkFaceResult>;
}

export interface checkFaceResult{
    Faces:CognitiveFace[];
    IsResult:boolean;
}

let contractSymbols = {
    ILogService: Symbol("ILogService"),    
    IConfig: Symbol("IConfig"),
    IHostService: Symbol("IHostService"),  
    INetClient: Symbol("INetClient"),
    ICognitiveService: Symbol("ICognitiveService"),
    IFaceService: Symbol("IFaceService"),
    IUploadService: Symbol("IUploadService")
  
}

export {contractSymbols};