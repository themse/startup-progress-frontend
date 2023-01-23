import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AlertType, AlertState, CLOSING_TIMER_MS } from './types';
import { noop } from 'app/common/helpers';

const initialState: AlertState = {
  alertList: [],

  pushAlert: noop,
  shiftAlert: noop,
};

const AlertContext = createContext<AlertState>(initialState);

type Props = {
  children: ReactNode;
};

export const AlertProvider: FC<Props> = ({ children }) => {
  const [alertList, setAlertList] = useState(initialState.alertList);

  const pushAlert = useCallback((alertItem: AlertType): void => {
    setAlertList((prev) => [...prev, alertItem]);
  }, []);

  const shiftAlert = (): void => {
    setAlertList((prev) => prev.slice(1));
  };

  useEffect(() => {
    // Shift alert on timer

    let timeoutID: number | null = null;

    if (alertList.length > 0) {
      timeoutID = window.setTimeout(() => {
        shiftAlert();
      }, CLOSING_TIMER_MS);
    } else {
      timeoutID && clearTimeout(timeoutID);
    }

    return () => {
      timeoutID && clearTimeout(timeoutID);
    };
  }, [alertList]);

  return (
    <AlertContext.Provider
      value={{
        alertList,

        pushAlert,
        shiftAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertState => useContext(AlertContext);
