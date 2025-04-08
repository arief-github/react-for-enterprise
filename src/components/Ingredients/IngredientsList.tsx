import { Ingredient } from './Ingredient.types';
import { memo } from 'react';

type IngredientsListProps = {
  ingredients: Ingredient[];
  deleteIngredient: (id: string) => void;
};

const IngredientList = (props: IngredientsListProps) => {
  console.log('Ingredient List Rendered');

  const { ingredients, deleteIngredient } = props;

  return (
    <div className='text-left'>
      <ul className='divide-y divide-gray-300'>
        {ingredients.map((ingredient) => {
          return (
            <li
              key={ingredient.id}
              className='py-3 flex justify-between items-center'
            >
              <span>{ingredient.name}</span>
              <button
                onClick={() => {
                  console.log(
                    'DeleteIngredient Recreated from Ingredient List'
                  );
                  deleteIngredient(ingredient.id);
                }}
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// commenting on when to use props equation props in memo
// export default memo(
//   IngredientList,
//   (prevProps, nextProps) => prevProps.ingredients === nextProps.ingredients
// );

export default memo(IngredientList);
