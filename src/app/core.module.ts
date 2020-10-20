import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RecipesService } from './recipes/services/recipes.service';
import { ShoppingListService } from './shopping-list/services/shopping-list.service';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
})
export class CoreModule { }
