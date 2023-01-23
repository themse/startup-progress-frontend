type State = {
  isLoading: boolean;
  err: string | null;

  fact?: string | null;
};

export const initialState: State = {
  isLoading: false,
  err: null,
};

export enum ReducerActionKind {
  FETCH_FACT,
  SUCCESS_FACT,
  FAILED_FACT,

  CLEAR_FACT,
}

type ReducerAction = {
  type: ReducerActionKind;
  payload?: string;
};

export const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case ReducerActionKind.FETCH_FACT: {
      return {
        ...state,
        fact: null,
        err: null,
        isLoading: true,
      };
    }
    case ReducerActionKind.SUCCESS_FACT: {
      return {
        ...state,
        fact: action.payload,
        err: null,
        isLoading: false,
      };
    }
    case ReducerActionKind.FAILED_FACT: {
      return {
        ...state,
        fact: null,
        err: action.payload ?? 'Something went wrong',
        isLoading: false,
      };
    }

    case ReducerActionKind.CLEAR_FACT: {
      return {
        ...initialState,
        fact: null,
      };
    }

    default: {
      throw new Error(`Unexpected action type: ${action.type}`);
    }
  }
};
