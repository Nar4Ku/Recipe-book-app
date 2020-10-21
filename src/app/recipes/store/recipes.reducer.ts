import { Recipe } from '../recipe.model';
import { RecipesActions, SET_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from './recipes.actions';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state: State = initialState, action: RecipesActions) {
    switch (action.type) {
        case SET_RECIPES:
            return { ...state, recipes: [...action.payload] };

        case ADD_RECIPE:
            return { ...state, recipes: [...state.recipes, action.payload] };

        case UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.recipe
            };

            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;

            return { ...state, recipes: updatedRecipes };

        case DELETE_RECIPE:
            return { ...state, recipes: state.recipes.filter((recipe, index) => index !== action.payload) };

        default:
            return state;
    }
}
