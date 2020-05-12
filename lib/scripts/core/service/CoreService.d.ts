import { LocalAuthConnection } from '../client/Connection';
import { AbstractCore, BoolDataResponse, BrowserInfoResponse, CardReader, CardReadersResponse, CheckGclVersionResponse, DataResponse, InfoResponse, SingleReaderResponse } from './CoreModel';
import { T1CClient } from '../../..';
export declare class CoreService implements AbstractCore {
    private url;
    private connection;
    constructor(url: string, connection: LocalAuthConnection);
    private static cardInsertedFilter;
    private static platformInfo;
    getConsent(title: string, codeWord: string, durationInDays?: number, alertLevel?: string, alertPosition?: string, type?: string, timeoutInSeconds?: number): Promise<BoolDataResponse>;
    getImplicitConsent(codeWord: string, durationInDays?: number, type?: string): Promise<BoolDataResponse>;
    info(): Promise<InfoResponse>;
    infoBrowser(): Promise<BrowserInfoResponse> | undefined;
    retrieveEncryptedUserPin(): Promise<DataResponse>;
    pollCardInserted(secondsToPollCard?: number, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): Promise<CardReader>;
    pollReadersWithCards(secondsToPollCard?: number, connectReaderCb?: () => void, insertCardCb?: () => void, cardTimeoutCb?: () => void): Promise<CardReadersResponse>;
    pollReaders(secondsToPollReader?: number, connectReaderCb?: () => void, readerTimeoutCb?: () => void): Promise<CardReadersResponse>;
    reader(reader_id: string): Promise<SingleReaderResponse>;
    readers(): Promise<CardReadersResponse>;
    readersCardAvailable(): Promise<CardReadersResponse>;
    readersCardsUnavailable(): Promise<CardReadersResponse>;
    infoBrowserSync(): BrowserInfoResponse;
    getUrl(): string;
    checkGclVersion(client: T1CClient, gclVersion?: string): Promise<CheckGclVersionResponse>;
    version(): Promise<string>;
}
