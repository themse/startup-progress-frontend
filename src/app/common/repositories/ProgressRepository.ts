import { v4 as uuidv4 } from 'uuid';

import { LocalStorageRepository } from 'services/repositories/LocalStorageRepository';
import { getErrorMessage } from 'services/utils/getErrorMessage';
import { ProgressEntity, Steps } from '../entities/Progress';

export class ProgressRepository extends LocalStorageRepository<ProgressEntity> {
  protected mapRawValueToData(
    value: object | string | unknown
  ): ProgressEntity {
    const defaultData: ProgressEntity = {
      step: Steps.NONE,
      task: 'N/A',
      priority: -1,
      isChecked: false,

      id: uuidv4(),
    };

    switch (typeof value) {
      case 'object': {
        if (value === null) {
          throw new Error(`Input value is incorrect`);
        }
        return this.mapObjectToData(value, defaultData);
      }
      case 'string': {
        try {
          const newObject = this.toObject(value);

          return this.mapObjectToData(newObject, defaultData);
        } catch (error) {
          const message = getErrorMessage(error);

          throw new Error(
            `Input value: ${value} is incorrect. Error: ${message}`
          );
        }
      }
      default: {
        throw new Error(`Input value: ${value} is incorrect`);
      }
    }
  }
}
