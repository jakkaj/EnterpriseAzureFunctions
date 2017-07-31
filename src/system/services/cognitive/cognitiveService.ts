
import { injectable, inject } from "inversify";
import * as request from 'request';

import { serviceBase } from '../serviceBase';
import * as contracts  from '../../contract/contracts';

/**
 * Generic class that can be used to call various cognitive services. 
 */
@injectable()
export default class cognitiveService extends serviceBase implements contracts.ICognitiveService{
    
    /**
     *
     */
    constructor() {
        super();       
    }
    
    /**
     * Upload generic TUpload type to server and return back TResult all in awaitable form.      * 
     * @param  {string} path - API to call, e.g. face/v1.0/detect?returnFaceId=false
     * @param  {TUpload} postData - data to post, e.g. a buffer of the face. 
     * @param  {string} key - sent as Ocp-Apim-Subscription-Key 
     * @returns Promise
     */
    public async postJson<TUpload, TResult>(path:string, postData:TUpload, key:string):Promise<TResult>{
        return new Promise<TResult>((good, bad)=>{
            
            var url = `${this.config.cog_services_base}${path}`;
            
            var options:request.Options = {
                uri: url,
                method:'POST', 
                body: postData, 
                headers: {
                    'Ocp-Apim-Subscription-Key':key, 
                    'Content-Type': 'application/octet-stream', 
                    'Accept': 'application/json'
                }
            }
            this.logger.log(`Posting to ${url}`);
            var r = request.post(options, (error:any, response:request.RequestResponse, body:any)=>{
                if(error){
                    bad(error);
                    return;
                }

                if(response.statusCode != 200){
                    bad(response.body);
                    return;
                }
                //console.log(body);
                var result:TResult = JSON.parse(body);

                good(result);
            });

            
        });
    }


}