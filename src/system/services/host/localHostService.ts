
import * as restify from 'restify';

import * as fs from 'fs';
import { IHostService } from "../../contract/contracts";
import { serviceBase, configBase } from "../serviceBase";

export class localHostService extends configBase implements IHostService{

    private _server: restify.Server;

    constructor() {
        super();
    }

    init(){

        this.log("Local Context");

        this._server = restify.createServer();   

        this._server.listen(this.config.port, () => {
            console.log(`${this._server.name} listening to ${this._server.url}`);
        });

        this._server.post('/', (req:restify.Request, res:restify.Response, next:restify.Next)=>{
            
            var buffer = [];

            req.on('data', (chunk:string|Buffer)=>{
                if(chunk instanceof Buffer){
                    buffer.push(chunk);
                }
                console.log("data");
            });

            req.on('end', ()=>{
                
                var result = Buffer.concat(buffer);

                fs.writeFileSync(`C:\\Users\\jak\\demo\\demo20\\test.jpg`, result);
                
                res.send({person:"Jordan"});
                return next();
            });
        });
    }

    public log(message:string){
        console.log(message);
    }

    public get export():any{
        return null;
    }
}