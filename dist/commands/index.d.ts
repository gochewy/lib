import { Answers } from "../files/constants";
export declare const initGitRepo: (directory: string) => void;
export declare const addSubtrees: (directory: string, module: string, url: string) => void;
export declare const installMinimalProject: (answers: Answers) => Promise<void>;
export declare const installAllApps: (answers: Answers) => Promise<void>;
export declare const installCustomApps: (answers: Answers) => Promise<void>;
export declare const dockerCommandRunner: (cmd: string) => void;
export declare const startDocker: () => void;
export declare const stopDocker: () => void;
