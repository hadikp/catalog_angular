import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogList } from './components/catalog-list/catalog-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CatalogList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catalog_angular');
}
