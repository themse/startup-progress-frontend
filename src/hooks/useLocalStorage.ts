import { useMemo } from 'react';

import {
  ProgressRepository,
  REPOSITORY_PREFIX as progressRepoPrefix,
} from 'app/common/repositories/ProgressRepository';

const repositoryFactory = (prefixKey: string): ProgressRepository | never => {
  if (prefixKey === progressRepoPrefix) {
    return ProgressRepository.getInstance();
  }
  throw new Error(`Repository with prefix [${prefixKey}] not found`);
};

type DataReturn = {
  repository: ProgressRepository;
};

export const useLocalStorage = (prefixKey: string): DataReturn => {
  const repository = useMemo(() => repositoryFactory(prefixKey), [prefixKey]);

  // implement additional logic if it's necessary

  return { repository };
};
