import {T1CClient} from '../T1CSdk';
import Certificate from 'pkijs/src/Certificate';

export interface AbstractCore {
  // async
  getConsent(
    title: string,
    codeWord: string,
    durationInDays?: number,
    alertLevel?: string,
    alertPosition?: string,
    type?: string,
    timeoutInSeconds?: number
  ): Promise<BoolDataResponse>;

  getImplicitConsent(
    codeWord: string,
    durationInDays?: number,
    type?: string
  ): Promise<BoolDataResponse>;

  info(): void | Promise<InfoResponse>;

  infoBrowser(): Promise<BrowserInfoResponse> | undefined;

  pollCardInserted(
    secondsToPollCard?: number,
    connectReader?: () => void,
    insertCard?: () => void,
    cardTimeout?: () => void
  ): Promise<CardReader>;

  pollReadersWithCards(
    secondsToPollCard?: number,
    connectReader?: () => void,
    insertCard?: () => void,
    cardTimeout?: () => void
  ): Promise<CardReadersResponse>;

  pollReaders(
    secondsToPollReader?: number,
    connectReader?: () => void,
    readerTimeout?: () => void
  ): Promise<CardReadersResponse>;

  reader(reader_id: string): Promise<SingleReaderResponse>;

  readers(): Promise<CardReadersResponse>;

  readersCardAvailable(): Promise<CardReadersResponse>;

  readersCardsUnavailable(): Promise<CardReadersResponse>;

  // sync
  getUrl(): string;

  infoBrowserSync(): BrowserInfoResponse;

  checkGclVersion(
    client: T1CClient,
    gclVersion?: string
  ): Promise<CheckGclVersionResponse>;

  // t1c-lib-info
  version(): Promise<string>;
}

export class T1CResponse {
  constructor(public success: boolean, public data: any) {}
}

export class BoolDataResponse extends T1CResponse {
  constructor(public data: boolean, public success: boolean) {
    super(success, data);
  }
}

export class DataResponse extends T1CResponse {
  constructor(public data: string, public success: boolean) {
    super(success, data);
  }
}

export class DataArrayResponse extends T1CResponse {
  constructor(public data: any[], public success: boolean) {
    super(success, data);
  }
}

export class DataObjectResponse extends T1CResponse {
  constructor(public data: {[key: string]: any}, public success: boolean) {
    super(success, data);
  }
}

export class InfoResponse extends T1CResponse {
  constructor(public data: T1CInfo, public success: boolean) {
    super(success, data);
  }
}

export class T1CInfo {
  constructor(
    public activated: boolean,
    public citrix: boolean,
    public managed: boolean,
    public arch: string,
    public os: string,
    public uid: string,
    public containers: T1CContainer[],
    public version: string
  ) {}
}

export class T1CContainer {
  constructor(
    public name: string,
    public version: string,
    public status: string
  ) {}
}

export class T1CContainerid {
  constructor(public name: string) {}
}

export class BrowserInfoResponse extends T1CResponse {
  constructor(public data: BrowserInfo, public success: boolean) {
    super(success, data);
  }
}

export class BrowserInfo {
  constructor(
    public browser: {name: string; version: string},
    public manufacturer: string,
    public os: {name: string; version: string; architecture: string},
    public ua: string
  ) {}
}

export class SmartCard {
  constructor(public atr?: string, public description?: string[]) {}
}

export class CardReader {
  constructor(
    public id: string,
    public name: string,
    public pinpad: boolean,
    public card?: SmartCard
  ) {}
}

export class CardReadersResponse extends T1CResponse {
  constructor(public data: CardReader[], public success: boolean) {
    super(success, data);
  }
}

export class CertificateResponse extends T1CResponse {
  constructor(public data: T1CCertificate, public success: boolean) {
    super(success, data);
  }
}

export class CertificatesResponse extends T1CResponse {
  constructor(public data: T1CCertificate[], public success: boolean) {
    super(success, data);
  }
}

export class T1CCertificate {
  constructor(
    public base64: string,
    public id?: string,
    public parsed?: Certificate
  ) {}
}

export class SingleReaderResponse extends T1CResponse {
  constructor(public data: CardReader, public success: boolean) {
    super(success, data);
  }
}

export class CheckGclVersion {
  constructor(public outDated: boolean, public downloadLink?: string) {}
}

export class CheckGclVersionResponse extends T1CResponse {
  constructor(public data: CheckGclVersion, public success: boolean) {
    super(success, data);
  }
}
