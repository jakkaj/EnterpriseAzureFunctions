require('dotenv').config();

import "reflect-metadata";
import { Container, interfaces } from "inversify"
import * as contracts from "./system/contract/contracts";

import { logService } from "./system/services/logService";
import { serverHelper } from "./system/helpers/serverHelper";

import { localHostService } from "./system/services/host/localHostService";
import { azureFunctionsHostService } from './system/services/host/azureFunctionsHost';

import { IConfig, serverTypes } from "./system/contract/systemEntities";

import { netClient } from "./system/helpers/netClient";

import { configBase } from "./system/services/serviceBase";
import cognitiveService from "./system/services/cognitive/cognitiveService";
import faceService from "./system/services/cognitive/faceService";

/**
 * Main startup class. Composes the app components in to the inversify IOC container
 */
export default class startup {

    public _container: Container;
    private _config: IConfig;

    constructor() {
        this._container = new Container();
        configBase.Container = this._container;
        this._setupSystemServices();
        this._setupHostService();
        this._registerCustomComponents();
    }

    /**
     * Add any custom components you write to the container here
     */
    private _registerCustomComponents() {
        //Your services registered here   

    }

    /**
     * Detect the current host (local, AWS or Functions) and register the appropriate service on the container
     */
    private _setupHostService() {

        if (this._config.serverType == serverTypes.AzureFunctions) {
            this._container.bind<contracts.IHostService>(contracts.contractSymbols.IHostService)
                .to(azureFunctionsHostService).inSingletonScope();
        }
        else if (this._config.serverType == serverTypes.AWSLambda) {
            throw ("AWS NOT DONE YET :)");
        } else {
            this._container.bind<contracts.IHostService>(contracts.contractSymbols.IHostService)
                .to(localHostService).inSingletonScope();
        }
    }

    /**
     * Registers a bunch of services needed by the system on the container
     */
    private _setupSystemServices() {
        this._container.bind<IConfig>(contracts.contractSymbols.IConfig)
            .toConstantValue(this._prepConfig());

        this._container.bind<contracts.ILogService>(contracts.contractSymbols.ILogService)
            .to(logService).inSingletonScope();

        this._container.bind<contracts.INetClient>(contracts.contractSymbols.INetClient)
            .to(netClient).inSingletonScope();

        this._container.bind<contracts.ICognitiveService>(contracts.contractSymbols.ICognitiveService)
            .to(cognitiveService).inSingletonScope();

        this._container.bind<contracts.IFaceService>(contracts.contractSymbols.IFaceService)
            .to(faceService).inSingletonScope();

    }
    /**
     * Imports the config from environment vars to the strongly typed IConfig object
     * @returns IConfig
     */
    private _prepConfig(): IConfig {

        var sh = new serverHelper();

        this._config = {
            port: process.env.port || process.env.PORT || "8082",
            face_key: process.env.FACE_KEY,
            vision_key: process.env.VISION_KEY,
            cog_services_base: process.env.COG_SERVICES_BASE
        }

        return this._config;
    }

    /**
     * Property to access the IOC container
     * @returns Container
     */
    public get container(): Container {
        return this._container;
    }

    /**
     * Property to access the IConfig object
     * @returns IConfig
     */
    public get config(): IConfig {
        return this._config;
    }
}