import { inject } from "inversify";
import * as restify from 'restify';

import * as contracts from "../../contract/contracts";
import { serviceBase, configBase } from "../serviceBase";

/**
 * Service that hosts the app when running locally in development environment or other that requires restify
 */
export class localHostService extends configBase implements contracts.IHostService {

    private _server: restify.Server;
    private _uploadService: contracts.IUploadService;

    constructor( @inject(contracts.contractSymbols.IUploadService) uploadService: contracts.IUploadService) {
        super();
        this._uploadService = uploadService;
    }

    /**
     * Fire up the server and handle the post request to upload the image
     */
    init() {

        this.log("Local Context");

        this._server = restify.createServer();

        this._server.listen(this.config.port, () => {
            console.log(`${this._server.name} listening to ${this._server.url}`);
        });

        this._server.post('/', (req: restify.Request, res: restify.Response, next: restify.Next) => {

            var buffer = [];

            req.on('data', (chunk: string | Buffer) => {
                if (chunk instanceof Buffer) {
                    buffer.push(chunk);
                }
                console.log("data");
            });

            req.on('end', async () => {

                var result = Buffer.concat(buffer);
                var uploadResult = await this._uploadService.checkImage(result);
                res.send(uploadResult);
                return next();
            });
        });
    }

        
    /**
     * Log callback that can be used by other components when this host is in play
     * @param  {string} message
     */
    public log(message: string) {
        console.log(message);
    }
    /**
     * Exports will be exposed as modules if non-null. This one is null so it's not exported. 
     * @returns any
     */
    public get export(): any {
        return null;
    }
}