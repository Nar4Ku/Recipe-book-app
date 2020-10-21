import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipesService } from '../../recipes/services/recipes.service';
import { Recipe } from '../../recipes/recipe.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.firebaseDbEndPoint, recipes)
      .subscribe(res => console.log(res));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${environment.firebaseDbEndPoint}/recipes.json`)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => this.recipeService.setRecipes(recipes))
      );
  }
}
