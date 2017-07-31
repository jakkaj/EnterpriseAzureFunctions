
import { injectable, inject } from "inversify";

import { serviceBase } from './serviceBase';
import * as contracts  from './../contract/contracts';

import * as cogContracts from './cognitive/cognitiveContract';
/**
 * Service that takes the file sent by the client and routes it to the cognitive services before judging the result
 */
export class uploadService extends serviceBase implements contracts.IUploadService {

    private _faceService: contracts.IFaceService;

    /**
     * 
     */
    constructor(@inject(contracts.contractSymbols.IFaceService) faceService: contracts.IFaceService) {
        super();        
        this._faceService = faceService;

    }
    /**
     * Run a cognitive check against services
     * @param  {Buffer} image - the image to check against face and vision services
     * @returns Promise
     */
    public async checkImage(image: Buffer): Promise<contracts.checkFaceResult> {       
        
        this.logger.log("Starting check image");
        var result = await Promise.all([this._faceService.detectFaces(image)]);
        this.logger.log("Checking complete");
        var faceResult = result[0]

        var thisResult:contracts.checkFaceResult = {
           Faces:faceResult,
           IsResult: true           
        };

        return thisResult;

    }
    
}