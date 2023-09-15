import React, { useEffect, useState, createContext } from 'react';
import { Sauce } from '../types';
import axios from 'axios';
import { sauceDefaults } from '../defaults';

type SauceContextType = {
  sauces: Sauce[];
  selectedSauce: Sauce;
  setSelectedSauce: (arg: Sauce) => void;
  loading: boolean;
  error: string;
};

export const SauceContext = createContext<SauceContextType>({
  sauces: [],
  selectedSauce: sauceDefaults,
  setSelectedSauce: () => {},
  loading: false,
  error: '',
});

export const SauceProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sauces, setSauces] = useState<Sauce[]>([]);
  const [selectedSauce, setSelectedSauce] = useState<Sauce>(sauceDefaults);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getSauces = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://fet.app.fsd.rs/api/sauces', {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTQxODEyNTYsImV4cCI6MTY5NTA0NTI1Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibGlkdmFubG9sQGdtYWlsLmNvbSJ9.tTXab33fRbMaLoU-IjsRsTMkrFdMVp3DOoCJD8QYYPXwRJ9f4rObvu710g6r2YaVz9O1XNNVEQVoVTb4rt45tkSxVX-_S584dz5TBSD3hhlEWQDA1kCs0jETGaMnj1SBklbAp98AmLIFpUyVPa0uxz419LqEuBjPKXWE7MOOfEa8nRHZYW2pu9AwtZCZvTHmPaYtLO1yJhXi6-j9eZbFwKcVjqiJtqEq6E0XcZsjl4aAp68S6fKtsvXlRgn7u2Qr1c9y-X6LyrLbEArFcewCyMmym9FUf629uFlA68jnO2d9lBVj7arcTd5yHUfMIOXAzQ4l3hEmyA_5VMIw-q2xLA',
        },
      });

      if (res) {
        setSauces(res.data.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    getSauces();
  }, []);

  return (
    <SauceContext.Provider value={{ sauces, selectedSauce, setSelectedSauce, loading, error }}>
      {children}
    </SauceContext.Provider>
  );
};
