
//Thanks to https://github.com/vjrantal/bot-sample/blob/master/index.js

import { serverTypes } from "../contract/systemEntities";

export class serverHelper {
    public getServerType(): serverTypes {
        if (process.env.FUNCTIONS_EXTENSION_VERSION) {
            // If we are in the Azure Functions runtime.
            return serverTypes.AzureFunctions
        // } else if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
        //     // If we are in the Serverless runtime.
            
         } else {
            // On other environments, use restify for handling requests.
            return serverTypes.Local
        }
    }
}
