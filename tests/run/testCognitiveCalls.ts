
import test, { TestContext } from 'ava';
import * as sinon from 'sinon';

import * as fs from 'fs';
import * as path from 'path';

import { testBase } from '../testBase';

import * as contracts from "../../src/system/contract/contracts";

class testCognitiveCalls extends testBase{
    
    constructor() {
        super();        
    }

    async testFaceResults(t:TestContext){
        
         var yes = [
             "yes/a.jpg",
             "yes/b.jpg",
             "yes/c.jpg",
             "yes/d.jpg",
             "yes/e.jpg"
         ]

         var no = [
            "no/a.jpg",
            "no/b.jpg",
            "no/c.jpg",
         ];

         var faceService:contracts.IFaceService = this.resolve(contracts.contractSymbols.IFaceService);
         
         var faceKey = this.config.face_key;
         t.truthy(faceKey);

         var basePath = process.cwd();

         for(let i in yes){
             let pathToFile = path.join('./tests/data', yes[i]);
             console.log(pathToFile);
             let f = fs.readFileSync(pathToFile);
             let result = await faceService.validateFaces(f);
             t.true(result.isPositive);
         }
         for(let i in no){
            let pathToFile = path.join('./tests/data', no[i]);
            console.log(pathToFile);
            let f = fs.readFileSync(pathToFile);
            let result = await faceService.validateFaces(f);
            t.false(result.isPositive);
        }
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
test(testClass.testFaceResults.bind(testClass));
