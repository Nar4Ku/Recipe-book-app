import { Ingredient } from '../../shared/ingredient.model';
import {
    ShoppingListActions,
    ADD_INGREDIENT,
    ADD_INGREDIENTS,
    UPDATE_INGREDIENT,
    DELETE_INGREDIENT,
    START_EDIT,
    STOP_EDIT
} from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.payload] };

        case ADD_INGREDIENTS:
            return { ...state, ingredients: [...state.ingredients, ...action.payload] };

        case UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updateIngredient = { ...ingredient, ...action.payload };
            const updateIngredients = [...state.ingredients];

            updateIngredients[state.editedIngredientIndex] = updateIngredient;

            return { ...state, ingredients: updateIngredients, editedIngredient: null, editedIngredientIndex: -1 };

        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => igIndex !== state.editedIngredientIndex),
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case START_EDIT:
            return {
                ...state, editedIngredientIndex: action.payload, editedIngredient: { ...state.ingredients[action.payload] }
            };

        case STOP_EDIT:
            return {
                ...state, editedIngredientIndex: -1, editedIngredient: null
            };

        default:
            return state;
    }
}
