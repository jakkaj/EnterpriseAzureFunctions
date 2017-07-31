
import test, { TestContext } from 'ava';
import * as sinon from 'sinon';

import * as fs from 'fs';

import { testBase } from '../testBase';

import * as contracts from "../../src/system/contract/contracts";

class testCognitiveCalls extends testBase{
    
    constructor() {
        super();        
    }

    async testFace(t:TestContext){
      
        var faceService:contracts.IFaceService = this.resolve(contracts.contractSymbols.IFaceService);

        var faceKey = this.config.face_key;
        t.truthy(faceKey);

        var f = fs.readFileSync('./tests/data/onedoesnot.jpg');
        t.truthy(f);

        var result = await faceService.detectFaces(f);
        t.truthy(result);
        t.true(result.length > 0);

        t.truthy(result[0].faceAttributes);
        t.truthy(result[0].faceRectangle);
        
        t.true(result[0].faceAttributes.smile > 0);

        t.true(true);

    }
}
var testClass = new testCognitiveCalls();

test(testClass.testFace.bind(testClass));
