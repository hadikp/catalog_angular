import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Catalog } from '../../common/catalog';
import { CatalogService } from '../../services/catalog-service';
import { CatalogItemService } from '../../services/catalog-item-service';
import { MatDialog } from '@angular/material/dialog';
import { HistoryDialog  } from '../../components/history-dialog/history-dialog';

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

  constructor(private route: ActivatedRoute, private router: Router, private catalogService: CatalogService,
     private catalogItemService: CatalogItemService, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.catalogId = Number(this.route.snapshot.paramMap.get('id'));
    this.catalogService.getCatalogById(this.catalogId).subscribe(data => {this.catalog = data});
  }

  goBack() {
    this.router.navigate(['/catalog']);
  }

  removeItem(index: number): void {
    const item = this.catalog.items[index];
    if (item.id !== 0) {
      this.catalogItemService.deleteItem(item.id).subscribe({
        next: () => {
          this.catalog.items.splice(index, 1);
          alert('Elem törölve az adatbázisból!');
        },
        error: (err) => console.error('Hiba történt a törlés során!', err)
      });
    } else {
      this.catalog.items.splice(index, 1);
    }
  }

  addItem(): void {
    this.catalog.items.push({id: 0, value: '', name: '' });
  }

  saveChanges(): void {
    const newItems = this.catalog.items.filter(item => item.id === 0);
    if (newItems.length === 0) {
      alert('Nincs új elem mentésre.');
      return;
    }

    // Teljes lista összegyűjtése
    const currentItemsList = this.catalog.items.map(item => ({ name: item.name, value: item.value }));

    newItems.forEach(item => {
      const payload = { ...item, catalogId: this.catalogId, currentItems: currentItemsList }
      this.catalogItemService.createItem(payload).subscribe({
        next: (resp) => {
          item.id = resp.id;
        },
        error: (err) => console.log('Hiba történt a mentés során!', err)
      });
    });
    alert('Új elem létrehozva!');
  }

  openHistory(): void {
    const id = this.catalogId;
    // 1. Lekérjük a listát a backendről
    if (!id) return;
    this.catalogItemService.getHistory(id).subscribe({
      next: (resp) => {
        // resp = [ {name: 'Email', value: '1'}, ... ] (a JSON tömb)
        const dialogRef = this.dialog.open(HistoryDialog, {
          width: '900px',
          data: resp, // Ez megy a táblázatba
        });
      },
      error: (err) => console.error(err)
      });
  }

}
