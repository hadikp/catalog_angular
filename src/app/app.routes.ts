import { Routes } from '@angular/router';
import { CatalogListItem } from './components/catalog-list-item/catalog-list-item';
import { CatalogList } from './components/catalog-list/catalog-list';

export const routes: Routes = [
  { path: 'catalog', component: CatalogList },
  { path: 'catalog/:id', component: CatalogListItem },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: '**', redirectTo: '/catalog'}
];
