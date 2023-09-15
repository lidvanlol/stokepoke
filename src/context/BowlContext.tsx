import { createContext, useEffect, useState } from 'react';
import { Bowl } from '../types';
import axios from 'axios';
import { bowlDefaults } from '../defaults';

type BowlContextType = {
  bowls: Bowl[];
  loading: boolean;
  error: string;
  selectedBowl: Bowl;
  setSelectedBowl: (arg: Bowl) => void;
};

export const BowlContext = createContext<BowlContextType>({
  bowls: [],
  loading: false,
  error: '',
  selectedBowl: bowlDefaults,
  setSelectedBowl: () => {},
});

export const BowlProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [selectedBowl, setSelectedBowl] = useState<Bowl>(bowlDefaults);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const getBowls = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://fet.app.fsd.rs/api/bowls", {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTQxODEyNTYsImV4cCI6MTY5NTA0NTI1Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibGlkdmFubG9sQGdtYWlsLmNvbSJ9.tTXab33fRbMaLoU-IjsRsTMkrFdMVp3DOoCJD8QYYPXwRJ9f4rObvu710g6r2YaVz9O1XNNVEQVoVTb4rt45tkSxVX-_S584dz5TBSD3hhlEWQDA1kCs0jETGaMnj1SBklbAp98AmLIFpUyVPa0uxz419LqEuBjPKXWE7MOOfEa8nRHZYW2pu9AwtZCZvTHmPaYtLO1yJhXi6-j9eZbFwKcVjqiJtqEq6E0XcZsjl4aAp68S6fKtsvXlRgn7u2Qr1c9y-X6LyrLbEArFcewCyMmym9FUf629uFlA68jnO2d9lBVj7arcTd5yHUfMIOXAzQ4l3hEmyA_5VMIw-q2xLA",
        },
      });

      

      if (res) {
        setBowls(res.data.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    getBowls();
  }, []);

  return (
    <BowlContext.Provider value={{ bowls, loading, error, selectedBowl, setSelectedBowl }}>
      {children}
    </BowlContext.Provider>
  );
};
