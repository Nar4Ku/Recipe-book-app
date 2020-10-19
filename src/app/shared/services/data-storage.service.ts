import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipesService } from '../../recipes/services/recipes.service';
import { Recipe } from '../../recipes/recipe.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-app-73def.firebaseio.com/recipes.json', recipes)
      .subscribe(res => console.log(res));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-book-app-73def.firebaseio.com/recipes.json')
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
