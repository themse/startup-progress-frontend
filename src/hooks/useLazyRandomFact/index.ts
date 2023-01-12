import { useCallback, useReducer } from 'react';

import { getRandomFact } from 'services/api/random-fact';
import { getErrorMessage } from 'services/utils/getErrorMessage';
import {
  reducer as factReducer,
  initialState as factInitialState,
  ReducerActionKind as FactReducerActionKind,
} from './state';

type DataReturn = {
  isLoading: boolean;
  err: string | null;

  fact?: string | null;

  getFact: () => Promise<string | undefined>;
};

export const useLazyRandomFact = (): DataReturn => {
  const [{ fact, isLoading, err }, dispatch] = useReducer(
    factReducer,
    factInitialState
  );

  const getFact = useCallback(async () => {
    try {
      dispatch({ type: FactReducerActionKind.FETCH_FACT });

      const data = await getRandomFact();

      dispatch({
        type: FactReducerActionKind.SUCCESS_FACT,
        payload: data.text,
      });

      return data.text;
    } catch (error) {
      const message = getErrorMessage(error);

      dispatch({ type: FactReducerActionKind.FAILED_FACT, payload: message });
    }
  }, []);

  return { getFact, fact, isLoading, err };
};
