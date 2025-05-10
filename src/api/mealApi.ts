import api from './api';
import { ApiRequestConfig } from './api.types';

const URLS = {
  getMeal: 'search.php',
};

export type Meal = {
  idMeal: string;
  strMeal: string;
};

type MealResponse = {
  meals: Meal[];
};

// export const fetchMeals = (query: string) => {
//   return api
//     .get<FetchMealsResult>('search.php', {
//       baseURL: 'https://www.themealdb.com/api/json/v1/1/',
//       params: {
//         s: query,
//       },
//     })
//     .then((res) => res.data.meals);
// };

export const searchMeals = (
  query: string,
  config: ApiRequestConfig
): Promise<Meal[]> => {
  return api
    .get<MealResponse>(URLS.getMeal, {
      baseURL: 'https://www.themealdb.com/api/json/v1/1/',
      params: {
        s: query,
      },
      ...config,
    })
    .then((res) => res.data.meals);
};
