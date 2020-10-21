import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Recipe } from '../../recipes/recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }

    @Effect()
    fecthRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => this.http.get<Recipe[]>(environment.firebaseDbEndPoint)),
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            });
        }),
        map(recipes => new RecipesActions.SetRecipes(recipes))
    );

    @Effect({ dispatch: false })
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(environment.firebaseDbEndPoint, recipesState.recipes);
        }),
    );
}
