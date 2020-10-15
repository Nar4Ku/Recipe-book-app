import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit([...this.ingredients]);
  }

  addIngredients(ingredientsList: Ingredient[]) {
    this.ingredients.push(...ingredientsList);
    this.ingredientsChange.emit([...this.ingredients]);
  }
}
