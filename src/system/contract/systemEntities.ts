export interface IConfig{
    port: string,   
    serverType?: serverTypes, 
    cog_services_base?:string,
    face_key?:string,
    vision_key?:string
}

export enum serverTypes {
    AzureFunctions,
    AWSLambda,
    Local
} 