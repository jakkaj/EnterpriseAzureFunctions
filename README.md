# BotBoiler
*Boilerplate code for Typescript based bots built with the Microsoft Botbuilder framework*

BotBoiler is base code to get you started with an enterprise scale Node+Typescript based bot that uses the Microsoft Bot Framework and the Botbuilder package. Works with ```restify``` (for local development), Azure Functions and soon AWS Lambda.

It's core tenets are that it must be composable, testable, extensible, adhere to separation of concerns and above all be simple, elegant and maintainable.

Create injectable [components](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/model/components/samples/qnaComponent.ts) that can be used by [composable dialogs](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/dialogs/samples/qnaDialog.ts). 

Create dialogs, use LUIS or QnA maker, call databases and other services, add authentication and a range of other bot functionality in a nice loosely coupled composable way. 

Inject functionality in to your dialogs as required to reduce complexity and increase testability. 

```typescript
@injectable()
export default class qnaDialog extends serviceBase implements contracts.IDialog{
    private _qnaMaker: modelContracts.IQnaComponent; 

    constructor(@inject(modelContracts.modelSymbols.IQnaComponent)qnaMaker: modelContracts.IQnaComponent) {
        super();        
        this._qnaMaker = qnaMaker;        
    }
    ...
    var result = await this._qnaMaker.getAnswer(question);
```

Once dialogs are registered on the IOC container, they will be [automatically added](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/startup.ts#L56) to the bot. Add them to the IOC container by exposing them via [the dialogIndex module](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/dialogs/dialogIndex.ts). 



Unit test using the [Ava](https://github.com/avajs/ava) framework and stub and spy the Bot Framework with [Sinon](http://sinonjs.org/). 

```typescript
testStep1_hasEntity(t: TestContext) {
    ...
    var next = sinon.spy();
    var textSpy = sinon.spy(builder.Prompts, 'text');
    var session: builder.Session = sinon.createStubInstance(builder.Session);
    func(session, args, next);
    textSpy.restore();
    t.true(next.calledOnce);
    t.is(textSpy.callCount, 0);
```

**Note:** This is a work in progress, so much more to come. Please create issues / PRs if you find problems or can think of improvements. 

Thanks to [@geektrainer](https://github.com/GeekTrainer?tab=repositories) and others in the [Bot Builder Generator](https://github.com/MicrosoftDX/generator-botbuilder/) for the inspiration. 

## What's here

Read this readme first to get started and fire up the code. Then proceed through these next steps:

- [Create a Dialog](https://github.com/MSFTAuDX/BotBoiler/blob/master/docs/createDialog.md)
- [Create an Injectable Component](https://github.com/MSFTAuDX/BotBoiler/blob/master/docs/createInjectableComponent.md)
- [Unit Testing Dialogs with Spies and Stubs](https://github.com/MSFTAuDX/BotBoiler/blob/master/docs/testableDialogs.md)


## Prerequisites

Before you begin, it's recommended that you're across the following:

- [Bot Builder and the Bot Framework](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart)
- Get an idea of how bot conversations work with [dialogs](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-dialog-manage-conversation-flow)
- Read up on using Typescript in Visual Studio Code: [Visual Studio code and Typescript](https://code.visualstudio.com/docs/languages/typescript)
- [the Ava Javascript Unit Testing Framework](https://github.com/avajs/ava)
- Learn about stubs and spies using [Sinon](http://sinonjs.org/)
- Dependency Injection with [Inversify](http://inversify.io/)



## Getting Started

*Note* We are working on a [generator](https://github.com/MSFTAuDX/generator-botboiler) to help get started quickly which will be available soon. 

Clone [this](https://github.com/MSFTAuDX/BotBoiler) GitHub repo and launch VS Code from the base directory of the project. 

Don't forget to run ```npm install```!

### Environment Settings

During development, you can place your settings in the ```.env``` file located in the root of the project. There are some placholders there already, and you can add more as you please. You'll have to edit ```_prepConfig()``` in ```startup.cs``` to add the mappings for any new settings. 

```typescript
 private _prepConfig(): IConfig {

    var sh = new serverHelper();

    this._config = {
        port: process.env.port || process.env.PORT || 3978,
        microsoftAppId: process.env.MICROSOFT_APP_ID,
        microsoftAppPassword: process.env.MICROSOFT_APP_PASSWORD,
        luisModelUrl: process.env.LUIS_MODEL_URL,
        serverType: sh.getServerType(),
        KBID: process.env.KBID,
        subscription: process.env.SUBSCRIPTION_KEY
    }

    return this._config;
}

```

### Set up a new bot 

You'll need to set up a new bot on the [Microsoft Bot Framework developer](https://dev.botframework.com/) site. You can get started with some basic code, but before long you'll need to register for a bot and get your AppId and Password.  Creating this is outside the scope of this document. 

Once created, pop your AppId and Password in both the ```.env``` file and use them to connect in the emulator. 

### Deployment

This framework will detect whether it's running on your local machine, in Azure Functions or AWS Lambda. 

The system will adjust the host service that gets registered with ```Inversify``` to the current platform. The code that does that is [here](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/startup.ts#L76). 

For local development, see the steps listed in the next section of this document. 

#### Azure Functions / Azure App Service

This framework will automatically detect and adjust to run inside Azure Functions. If the host service that it gets back does not return a null value for the ```export``` function it will export that function so Azure Functions can fire requests in. You can see the code that does this is [here](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/app.ts#L23). 

- [Local Host Service](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/system/services/host/localHostService.ts)
- [Azure Functions Host Service](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/system/services/host/azureFunctionsHost.ts)
- AWS Lamda Host Service

To deploy you can use [Git Deployment](https://github.com/GeekTrainer/help-desk-bot-lab/blob/master/Node/exercise5-Deployment.md), or you can use [k-scratch](https://github.com/jakkaj/k-scratch-node) to update your remote Function code immediately as you edit the system (run ```ks -m -l``` from ./output/run once you have downloaded your publish profile).

[This](https://github.com/MSFTAuDX/BotBoiler/blob/master/src/system/services/host/azureFunctionsHost.ts#L22) is the method that is called by Azure Functions each call. 

#### AWS Lambda

*Coming soon :)*

### Debugging your bot using the Bot Framework Emulator

Using the various methods below you can connect to your bot for local debugging. Using one of F5 Debugging in code or "Normal Dev Iteration" using ```tsc``` watch and ```nodemon``` you can connect to your bot using the [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator) on the default port of ```3978```.

For more info on the emulator [here](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator) and downloads for Windows, Mac and Linux [here](https://github.com/Microsoft/BotFramework-Emulator/releases).

## Working with the framework

This project and documentation is based on [Visual Studio Code](https://code.visualstudio.com/) but you can of course use any tool that works well with Node and Typescript!

There are a few modes of development you might like to choose depending on your development phase. 

### Normal Dev Iteration

*Watch mode. You're working away and you want the code to recompile and the test bot server always be up to date.*

This mode is simple to start (instructions are for [Visual Studio Code](https://code.visualstudio.com/))

- Kick off a build using ```ctrl-shift-b```. On the output screen you should see something like ```10:14:11 AM - Compilation complete. Watching for file changes.```
- Open a new terminal window (```ctrl-~``` is the default shortcut to bring this up.)
- Type ```npm run outputwatch``` to watch output file changes using nodemon. 
- Edit your files, connect to your bot and off you go!

By using ```tsc``` in watch mode your Typescript code will be transpiled to the output/run directory. This will then cause ```nodemon``` to restart your server with the latest changes every time you save. Nice!  You'll see outputs to this effect in your terminal window. 

<img src="https://user-images.githubusercontent.com/5225782/27891601-0cfaae16-623e-11e7-94c8-cf656789258e.gif" width="640" alt="nodemon"/>

**Note on working with many terminal windows in VS Code** When working with multiple terminals, it can become cumbersome to need to switch between them with the mouse all the time. Luckily you can add a keyboard short cuts. Press ```ctrl-shift-p```, type ```keyboard``` and select ```Preferences: Open Keyboard Shortcuts File```. Add the following shortcuts:

```json
// Place your key bindings in this file to overwrite the defaults
[
    {
        "key": "ctrl-alt-left",
        "command": "workbench.action.terminal.focusPrevious"
    },
    {
        "key": "ctrl-alt-right",
        "command": "workbench.action.terminal.focusNext"
    }
]
```

**Note** Pressing ```ctrl-shift-b``` in VS Code will kick off a build that will never stop - i.e. runs ```tsc``` in watch mode which will never exit until you break out. You'll know this is the case because of the "spinny thing" &trade; in the bottom left hand corner. To kill it, just run the build again - a message at the top of the screen will ask if you want to terminate it. 

![spinnything](https://user-images.githubusercontent.com/5225782/27891293-5c4e6554-623c-11e7-8834-9921633ddbb8.gif)

### Debug Dev

*Debug mode. You've been working away, and have a bug that you need to debug.* 

**Note** Make sure other build / monitor processes are not running by switching to the terminal tabs and pressing ```ctrl-c``` e.g. you've run ```tsc``` and ```nodemon``` using the steps outlined above. See the note above about the spinny thing and breaking out of a ```tsc``` watch. Also make sure that test monitors are not running as this might cause unknown stuff to occur. 

Just press ```F5``` and the app should build, and a debugger will attach ready for you to debug. Thanks to [source maps](https://code.visualstudio.com/docs/languages/typescript#_javascript-source-map-support) you create all your breakpoints in your TS files and VS Code will manage breaking the right spot (even though it's running the transpiled .js files)

<img src="https://user-images.githubusercontent.com/5225782/27891765-09a6a570-623f-11e7-9c5d-daab48561598.PNG" width="720" alt="debugging in code"/>

### Normal Test

*You're working on unit/integration tests. You want them to just run as you work.*

**Note** See the section on unit testing for more info here, this is just the getting started bit.

This is the fun part. It's a bit like the "Normal Dev Iteration" above where it runs ```tsc``` in watch mode, but this time instead of ```nodemon``` firing up a server, we use ```ava``` in watch mode to automatically run your tests - when ever you save. 

Make sure the build isn't running (yep - spinny thing no no). 

You'll need two terminals for this. In the first one, type ```npm run testwatchbuild```. This will kick off ```tsc``` in watch mode for the tests sub folder which outputs to output/test/tests. It will also publish the other src folder under output/test because it is a dependency.

The next thing is to start ```ava``` in watch mode. Type ```npm run testwatchava```. Ava will now wait for changes on the transpiled files and will automatically run your tests. 

<img width="320" src="https://user-images.githubusercontent.com/5225782/27892089-00f38b1c-6241-11e7-8b6f-fa5b034fdeb7.gif"/>

### Debug Test

*Unit/integration tests are not behaving. You need some help debugging them*

You can connect a debugger for your tests. The way ava works, you cannot simply set your startup file as usual and attach the code debugger. We have however set up a launch task that does the special ava way. 

First, you need to select which test file to attach to. Open ```launch.json``` and find the task named "Launch Test". Edit the args to point to the **transpiled** file location. Don't worry, you can still set breakpoints in your original TS files - VS Code handles all that for you again thanks to [source maps](https://code.visualstudio.com/docs/languages/typescript#_javascript-source-map-support). 

```json
"args": [
    "${workspaceRoot}/output/test/tests/run/samples/dialog/testLuisDialog.js"
],
```

From the debug menu ![bot_debugbutton](https://user-images.githubusercontent.com/5225782/27892175-6e35a9a8-6241-11e7-82e1-050fc99f7bf8.PNG)
 in VS Code select "Launch Test" from the drop down and press ```F5```. 

 **Note** Sometimes the break points can get a bit out of wack - especially with async code. If this is the case, then use ```debugger;``` in your code to do it manually - that seems to work better!

## Next Steps

Now you're ready to [create your first dialog](https://github.com/MSFTAuDX/BotBoiler/blob/master/docs/createDialog.md).

## Links

- [BotBoiler on GitHub](https://github.com/MSFTAuDX/BotBoiler)
- [Getting started with the Bot Builder and the Bot Framework](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart)
- [Manage conversation flow with dialogs](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-dialog-manage-conversation-flow)
- [Getting started with the Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)
    - [Bot Framework Emulator Downloads](https://github.com/Microsoft/BotFramework-Emulator/releases)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio Code and Typescript](https://code.visualstudio.com/docs/languages/typescript)
- [Ava](https://github.com/avajs/ava) JavaScript Unit Testing Framework
- [Sinon](http://sinonjs.org/) for JavaScript Stubs and Spies
- [Inversify](http://inversify.io/) IOC Container
- [Microsoft QnA Maker](https://docs.microsoft.com/en-au/azure/cognitive-services/qnamaker/home)
