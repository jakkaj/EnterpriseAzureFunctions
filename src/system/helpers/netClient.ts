import * as restify from 'restify';
import * as contracts from "../contract/contracts";
import { injectable } from "inversify";

/**
 * Injectable generic service to post and get back JSON data from services. 
 */
@injectable()
export class netClient implements contracts.INetClient{
    
    /**
     * Post data to a URL and get the result
     * @param  {string} url - Base URL
     * @param  {string} path - Path offset from base URL
     * @param  {TUpload} postData - Generic data type to post
     * @param  {any} headers? - JS Object of headers
     * @returns Promise - TResult is the object type to return as. 
     */
    public async postJson<TUpload, TResult>(url:string, path:string, postData:TUpload, headers?:any):Promise<TResult>{
        return new Promise<TResult>((good, bad)=>{
            
            var clientOptions:restify.ClientOptions = {
                url: url
            }

            if(headers){
                clientOptions.headers = headers;
            }
            
            var jsonClient = restify.createJsonClient(clientOptions); 
           
            jsonClient.post(path, postData,(err, req, res, obj: TResult)=>{
                if(err){
                    bad(err);
                    return;
                }
                good(obj);
            })
        });
    }
}