import { Ingredient } from './Ingredient.types';

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
              <button onClick={() => deleteIngredient(ingredient.id)}>
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientList;
