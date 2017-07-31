

import startup from '../startup';
import * as contracts from "../system/contract/contracts";
import { serverTypes } from "../system/contract/systemEntities";


class App {
    run():startup {        
        var appStartup:startup = new startup();       
        return appStartup;    
    }
}

const app = new App();
var appStartup:startup = app.run();

//export the module nicely so it works with the serverless technologies
//do nothing if using restify - the startup process handles firing up that server type

var serverHost = appStartup.container.get<contracts.IHostService>(contracts.contractSymbols.IHostService);

if(serverHost.export){
    module.exports = serverHost.export.bind(serverHost);
}else{
    serverHost.init();
}
