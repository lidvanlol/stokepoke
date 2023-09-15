import React, { useEffect, createContext, useState } from 'react';
import { ExtraIngredient } from '../types';
import axios from 'axios';
import { extraIngredientsDefaults } from '../defaults';

type ExtraIngredientsContextType = {
  extraIngredients: ExtraIngredient[];
  selectedExtraIngredients: ExtraIngredient[];
  setSelectedExtraIngredients: (arg: ExtraIngredient[]) => void;
  loading: boolean;
  error: string;
};

export const ExtraIngredientsContext = createContext<ExtraIngredientsContextType>({
  extraIngredients: extraIngredientsDefaults,
  selectedExtraIngredients: [],
  setSelectedExtraIngredients: () => {},
  loading: false,
  error: '',
});

export const ExtraIngredientsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [extraIngredients, setExtraIngredients] =
    useState<ExtraIngredient[]>(extraIngredientsDefaults);
  const [selectedExtraIngredients, setSelectedExtraIngredients] = useState<ExtraIngredient[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getExtraIngredients = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://fet.app.fsd.rs/api/extra_ingredients', {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTQxODEyNTYsImV4cCI6MTY5NTA0NTI1Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibGlkdmFubG9sQGdtYWlsLmNvbSJ9.tTXab33fRbMaLoU-IjsRsTMkrFdMVp3DOoCJD8QYYPXwRJ9f4rObvu710g6r2YaVz9O1XNNVEQVoVTb4rt45tkSxVX-_S584dz5TBSD3hhlEWQDA1kCs0jETGaMnj1SBklbAp98AmLIFpUyVPa0uxz419LqEuBjPKXWE7MOOfEa8nRHZYW2pu9AwtZCZvTHmPaYtLO1yJhXi6-j9eZbFwKcVjqiJtqEq6E0XcZsjl4aAp68S6fKtsvXlRgn7u2Qr1c9y-X6LyrLbEArFcewCyMmym9FUf629uFlA68jnO2d9lBVj7arcTd5yHUfMIOXAzQ4l3hEmyA_5VMIw-q2xLA',
        },
      });

      if (res) {
        setExtraIngredients(res.data.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    getExtraIngredients();
  }, []);

  return (
    <ExtraIngredientsContext.Provider
      value={{
        extraIngredients,
        selectedExtraIngredients,
        setSelectedExtraIngredients,
        loading,
        error,
      }}>
      {children}
    </ExtraIngredientsContext.Provider>
  );
};
