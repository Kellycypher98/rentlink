import { Snackbar } from '../../src/designSystem/providers/snackbar';
import { ConfigProvider } from 'antd';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ThemeLight } from './theme/theme.light';

import './style/main.scss';



const DesignSystemContext = createContext<DesignSystemContext>({
  isMobile: false,
});

export const useDesignSystem = () => {
  return useContext(DesignSystemContext);
};


export const DesignSystem = {
  Provider: ({ children }) => {
    const [isMobile, setMobile] = useState(false);

    const isWindow = typeof window !== 'undefined';

    const theme = ThemeLight ;

    useEffect(() => {
      if (!isWindow) {
        return;
      }

      setMobile(window.innerWidth < 992);

      const handleResize = () => {
        setMobile(window.innerWidth < 992);
      };

      // Attach the event listener
      window.addEventListener('resize', handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        if (!isWindow) {
          return;
        }

        window.removeEventListener('resize', handleResize);
      };
    }, [isWindow]);

    return (
      <ConfigProvider theme={theme}>
        <Snackbar.Provider>
          <DesignSystemContext.Provider value={{ isMobile }}>
            {children}
          </DesignSystemContext.Provider>
        </Snackbar.Provider>
      </ConfigProvider>
    );
  },
};
