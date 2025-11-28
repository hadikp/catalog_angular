import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Catalog } from '../../common/catalog';
import { CatalogService } from '../../services/catalog-service';

@Component({
  selector: 'app-catalog-list-item',
  imports: [FormsModule],
  templateUrl: './catalog-list-item.html',
  styleUrl: './catalog-list-item.css',
})
export class CatalogListItem implements OnInit {

  catalogId: number | undefined;
  items: any[] = [];

  catalog: Catalog = {
    items: [],
    id: 0,
    name: '',
    description: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogId = Number(this.route.snapshot.paramMap.get('id'));
    this.catalogService.getCatalogById(this.catalogId).subscribe(data => {this.catalog = data});
  }

  goBack() {
    this.router.navigate(['/catalog']);
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  addItem(): void {
    this.catalog.items.push({
      name: '', 
      value: '',
      id: 0
    });
  }

  saveChanges() {
    this.catalogService.updateCatalog(this.catalogId!, this.catalog!).subscribe(() => {
      alert('Mentve');
      this.goBack();
    })
  }

}
