import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { Base } from '../types';
import { baseDefaults } from '../defaults';

type BaseContentType = {
  bases: Base[];
  selectedBase: Base;
  setSelectedBase: (arg: Base) => void;
  loading: boolean;
  error: string;
  currentStep: number;
  setCurrentStep: (arg: number) => void;
  activeScreen: number;
  setActiveScreen: (arg: number) => void;
};

export const BaseContext = createContext<BaseContentType>({
  bases: [],
  selectedBase: baseDefaults,
  setSelectedBase: () => {},
  loading: false,
  error: '',
  currentStep: 1,
  setCurrentStep: () => {},
  activeScreen: 1,
  setActiveScreen: () => {},
});

export const BaseProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bases, setBases] = useState<Base[]>([]);
  const [selectedBase, setSelectedBase] = useState<Base>(baseDefaults);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeScreen, setActiveScreen] = useState<number>(1);

  const getBases = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://fet.app.fsd.rs/api/bases', {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTQxODEyNTYsImV4cCI6MTY5NTA0NTI1Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibGlkdmFubG9sQGdtYWlsLmNvbSJ9.tTXab33fRbMaLoU-IjsRsTMkrFdMVp3DOoCJD8QYYPXwRJ9f4rObvu710g6r2YaVz9O1XNNVEQVoVTb4rt45tkSxVX-_S584dz5TBSD3hhlEWQDA1kCs0jETGaMnj1SBklbAp98AmLIFpUyVPa0uxz419LqEuBjPKXWE7MOOfEa8nRHZYW2pu9AwtZCZvTHmPaYtLO1yJhXi6-j9eZbFwKcVjqiJtqEq6E0XcZsjl4aAp68S6fKtsvXlRgn7u2Qr1c9y-X6LyrLbEArFcewCyMmym9FUf629uFlA68jnO2d9lBVj7arcTd5yHUfMIOXAzQ4l3hEmyA_5VMIw-q2xLA',
        },
      });
    
      if (res) {
        setBases(res.data.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    getBases();
  }, []);

  return (
    <BaseContext.Provider
      value={{
        bases,
        selectedBase,
        setSelectedBase,
        loading,
        error,
        currentStep,
        setCurrentStep,
        activeScreen,
        setActiveScreen,
      }}>
      {children}
    </BaseContext.Provider>
  );
};
