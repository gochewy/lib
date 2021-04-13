export declare type Answers = {
    isAppsmith: boolean;
    isRabbitMQ: boolean;
};
export declare const checkFile: () => any;
export declare const help: () => string;
export declare const envCreator: (dir: string, subdir: string) => void;
export declare const fileGenerator: (answers: Answers, dir: string) => void;
