export declare type Answers = {
    isAppsmith: boolean;
    isRabbitMQ: boolean;
    isContent: boolean;
};
export declare const checkFile: () => any;
export declare const getDirName: () => any;
export declare const createConfig: (dir: any) => void;
export declare const envCreator: (dir: string, subdir: string) => void;
export declare const configFileGenerator: (answers: Answers, dir: string) => void;
export declare const createProjectDirectory: (directory: any) => void;
