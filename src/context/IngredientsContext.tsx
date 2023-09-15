import React, { useEffect, useMemo, useState, createContext } from 'react';
import { Ingredient } from '../types';
import axios from 'axios';
import { ingredientsDefaults } from '../defaults';

type IngredientsContextType = {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  setSelectedIngredients: (arg: Ingredient[]) => void;
  loading: boolean;
  error: string;
  maximumIngredientsPerSize: number;
  setMaximumIngredientsPerSize: (arg: number) => void;
  isReachedMaxNumbersOfIngrediants: boolean;
};

export const IngredientsContext = createContext<IngredientsContextType>({
  ingredients: ingredientsDefaults,
  selectedIngredients: [],
  setSelectedIngredients: () => {},
  loading: false,
  error: '',
  maximumIngredientsPerSize: 0,
  setMaximumIngredientsPerSize: () => {},
  isReachedMaxNumbersOfIngrediants: false,
});

export const IngredientsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(ingredientsDefaults);
  const [error, setError] = useState<string>('');
  const [maximumIngredientsPerSize, setMaximumIngredientsPerSize] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getIngredients = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://fet.app.fsd.rs/api/ingredients', {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTQxODEyNTYsImV4cCI6MTY5NTA0NTI1Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibGlkdmFubG9sQGdtYWlsLmNvbSJ9.tTXab33fRbMaLoU-IjsRsTMkrFdMVp3DOoCJD8QYYPXwRJ9f4rObvu710g6r2YaVz9O1XNNVEQVoVTb4rt45tkSxVX-_S584dz5TBSD3hhlEWQDA1kCs0jETGaMnj1SBklbAp98AmLIFpUyVPa0uxz419LqEuBjPKXWE7MOOfEa8nRHZYW2pu9AwtZCZvTHmPaYtLO1yJhXi6-j9eZbFwKcVjqiJtqEq6E0XcZsjl4aAp68S6fKtsvXlRgn7u2Qr1c9y-X6LyrLbEArFcewCyMmym9FUf629uFlA68jnO2d9lBVj7arcTd5yHUfMIOXAzQ4l3hEmyA_5VMIw-q2xLA',
        },
      });

      if (res) {
        setIngredients(res.data.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError('Something went wrong!');
    }
  };

  const removeIngredientsByMaximumNumber = () => {
    if (selectedIngredients.length > maximumIngredientsPerSize) {
      setSelectedIngredients((prev) => prev.slice(0, maximumIngredientsPerSize));
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const isReachedMaxNumbersOfIngrediants = useMemo(
    () => Boolean(selectedIngredients.length >= maximumIngredientsPerSize),
    [selectedIngredients, maximumIngredientsPerSize]
  );

  useEffect(() => {
    removeIngredientsByMaximumNumber();
  }, [maximumIngredientsPerSize]);

  return (
    <IngredientsContext.Provider
      value={{
        ingredients,
        selectedIngredients,
        setSelectedIngredients,
        loading,
        error,
        maximumIngredientsPerSize,
        setMaximumIngredientsPerSize,
        isReachedMaxNumbersOfIngrediants,
      }}>
      {children}
    </IngredientsContext.Provider>
  );
};
