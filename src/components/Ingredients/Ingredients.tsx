import { useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Ingredient } from '@/components/Ingredients/Ingredient.types';
import IngredientsList from '@/components/Ingredients/IngredientsList';
import AddIngredient from '@/components/Ingredients/AddIngredient';
import IngredientsInfoHelper from '@/components/Ingredients/IngredientsInfoHelper';

const initialIngredients = [
  {
    id: nanoid(),
    name: '500g Chicken Breasts',
  },
  {
    id: nanoid(),
    name: '300ml Milk',
  },
  {
    id: nanoid(),
    name: '1 tbsp salt',
  },
];

const Ingredients = () => {
  console.log('Ingredients rendered');

  const [ingredients, setIngredients] =
    useState<Ingredient[]>(initialIngredients);

  const addIngredient = (ingredient: string) => {
    setIngredients((ingredients) => [
      ...ingredients,
      {
        name: ingredient,
        id: nanoid(),
      },
    ]);
  };

  const deleteIngredient = useCallback((id: string) => {
    console.log('Delete Ingredient is re-created');
    setIngredients((ingredients) => ingredients.filter((ing) => ing.id !== id));
  }, []);

  const createIngredientsHeaderText = useMemo(() => {
    console.log('IngredientsHeaderText called');
    return (
      <h2 className='mb-4 font-semibold'>Ingredients ({ingredients.length})</h2>
    );
  }, [ingredients.length]);

  return (
    <div className='mt-8 max-w-[20rem] mx-auto'>
      <div className='flex justify-between'>
        {createIngredientsHeaderText}
        <IngredientsInfoHelper />
      </div>

      <div className='space-y-4'>
        <IngredientsList
          ingredients={ingredients}
          deleteIngredient={deleteIngredient}
        />
        <AddIngredient addIngredient={addIngredient} />
      </div>
    </div>
  );
};

export default Ingredients;
