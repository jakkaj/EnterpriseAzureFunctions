
import { injectable, inject } from "inversify";

import { serviceBase } from './serviceBase';
import * as contracts  from './../contract/contracts';

import * as cogContracts from './cognitive/cognitiveContract';

export class uploadService extends serviceBase implements contracts.IUploadService {

    private _faceService: contracts.IFaceService;

    /**
     *
     */
    constructor(@inject(contracts.contractSymbols.IFaceService) faceService: contracts.IFaceService) {
        super();        
        this._faceService = faceService;

    }

    public async checkImage(image: Buffer): Promise<contracts.checkFaceResult> {       
        

        var result = await Promise.all([this._faceService.detectFaces(image)]);

        var faceResult = result[0]

        var thisResult:contracts.checkFaceResult = {
           Faces:faceResult 
        };

        return thisResult;

    }
    
}