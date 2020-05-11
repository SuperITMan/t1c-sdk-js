import {T1CClient} from '../T1CSdk';
import {ObjectUtil} from '../../util/ObjectUtil';

/**
 * Generic T1CLib exception
 */
export class T1CLibException {
  constructor(
    public status: number,
    public code: string,
    public description: string,
    public client?: T1CClient
  ) {
    // remove null and undefined fields during construction
    ObjectUtil.removeNullAndUndefinedFields(this);
  }
}