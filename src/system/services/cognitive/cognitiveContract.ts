




export interface FaceRectangle {
    top: number;
    left: number;
    width: number;
    height: number;
}

export interface FacialHair {
    moustache: number;
    beard: number;
    sideburns: number;
}

export interface Emotion {
    anger: number;
    contempt: number;
    disgust: number;
    fear: number;
    happiness: number;
    neutral: number;
    sadness: number;
    surprise: number;
}

export interface Makeup {
    eyeMakeup: boolean;
    lipMakeup: boolean;
}

export interface HairColor {
    color: string;
    confidence: number;
}

export interface Hair {
    bald: number;
    invisible: boolean;
    hairColor: HairColor[];
}

export interface FaceAttributes {
    smile: number;
    gender: string;
    age: number;
    facialHair: FacialHair;
    glasses: string;
    emotion: Emotion;
    makeup: Makeup;
    accessories: any[];
    hair: Hair;
}

export interface CognitiveFace {
    faceRectangle: FaceRectangle;
    faceAttributes: FaceAttributes;
}



