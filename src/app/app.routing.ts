import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ProductsComponent} from './products/products.component';
import { CategoriesComponent} from './categories/categories.component';
export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full'
      },
      {
        path: 'material',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'icons',
        loadChildren: './icons/mat-icon.module#IconsModule'
      },
      {
        path:'products',
        component:ProductsComponent
      },
      {
        path:'categories',
        component:CategoriesComponent
      }
    ]
  }
];
