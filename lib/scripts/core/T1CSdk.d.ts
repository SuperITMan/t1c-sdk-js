import { CoreService } from './service/CoreService';
import { DataResponse } from './service/CoreModel';
import { T1CConfig } from './T1CConfig';
export declare class T1CClient {
    private _gclInstalled;
    private localConfig;
    private coreService;
    private connection;
    private authConnection;
    private authAdminConnection;
    private adminConnection;
    private remoteConnection;
    private remoteApiKeyConnection;
    private localTestConnection;
    constructor(cfg: T1CConfig, automatic: boolean);
    static checkPolyfills(): void;
    static initialize(cfg: T1CConfig): Promise<T1CClient>;
    core: () => CoreService;
    config: () => T1CConfig;
    set gclInstalled(value: boolean);
    retrieveEncryptedUserPin(): Promise<DataResponse>;
}
