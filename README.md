# Injectable, Composable, Testable TypeScript Azure Functions

... That also run locally and could run in AWS Lamba. 

This project is a sample of how one might go about building a nicely composed TypeScript based, testable, IOC based codebase for working with Azure Functions or other similar technologies. 

Most samples are basic. Sure they get the job done, but in reality when we want to write production code, we may like to follow some of the regular tenets of software design like SOLID, IOC and importantly testability + what ever other acronym or initialism you may like to throw at it.

This code sample is meant to be a starter project to help with that. 

It has a single HttpTrigger that will take an image and run it against some Microsoft Cognitive Services. Super simple, but it gets the point across. 

It has:

- Loosly coupled dependencies that are exposed via Dependency Injection using [Inversify](https://github.com/inversify/InversifyJS) 
- Some basic tests using [Ava](https://github.com/avajs/ava) that support mocking and stubbing using [Sinon](http://sinonjs.org/)
- Neat workflows using TSC watchmode, [Nodemon](https://github.com/remy/nodemon) and Ava watch mode. 
- Code adapts to run inside Azure Functions or locally using Restify. Loggers etc will work becasue dependencies will reflect where the code is running. 

The DI container is built in [startup.ts](https://github.com/jakkaj/EnterpriseAzureFunctions/blob/master/src/startup.ts) and run via [CognitiveRun/app.ts](https://github.com/jakkaj/EnterpriseAzureFunctions/blob/master/src/CognitiveRun/app.ts) which will be exposed as an Azure Function when deployed. 

You can add your own services in ```startup.ts```. For a good example of a injectable component see [netClient.ts](https://github.com/jakkaj/EnterpriseAzureFunctions/blob/master/src/system/helpers/netClient.ts). It gets registered [here in startup.ts](https://github.com/jakkaj/EnterpriseAzureFunctions/blob/master/src/startup.ts#L73). Don't forget to add interfaces and Symbols (needed fro Inversify) in [contracts.ts](https://github.com/jakkaj/EnterpriseAzureFunctions/blob/master/src/system/contract/contracts.ts).

I prefer to edit/run/edit using TSC watch mode and ```nodemon```. 

Open a terminal and run ```npm run watch``` to fire up TSC watch. This will output things to ```output/run```. 

Open another terminal and run ```npm run outputwatch```. This will fire up the system with ```nodemon``` which will check for changes and restart the app as needed. 

Open yet another terminal and run ```npm run testwatchbuild``` which will run a TSC watch on the test src files. 

Now in a final termianl (or a separate powershell window on another screen perhaps) run ```npm run testwatchava``` which will auto run tests on changed files as you edit them. 

Now you can run your code in ```postman``` and you can also do some TDD, or just write test to help you dev - however you like to work :)


