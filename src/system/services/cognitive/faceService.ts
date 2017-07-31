

import { injectable, inject } from "inversify";

import { serviceBase } from '../serviceBase';
import * as contracts  from '../../contract/contracts';

import * as cogContracts from './cognitiveContract';

/**
 * Call off to face servcie and check images. 
 */
@injectable()
export default class faceService extends serviceBase implements contracts.IFaceService {
    
    private _cognitiveService:contracts.ICognitiveService;
    
    /**
     *
     */
    constructor(@inject(contracts.contractSymbols.ICognitiveService) cognitiveService:contracts.ICognitiveService) {
        super();
        this._cognitiveService = cognitiveService;
    }

    /**
     * Use the base cognitive service to call off to the face service
     * @param  {Buffer} face
     * @returns Promise
     */
    public async detectFaces(face:Buffer):Promise<cogContracts.CognitiveFace[]>{
        var faceUrl = "/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,facialHair,glasses,emotion,hair,makeup,accessories";
        var result = await this._cognitiveService.postJson<Buffer, cogContracts.CognitiveFace[]>(faceUrl, face, this.config.face_key);
        return result;
    }
}