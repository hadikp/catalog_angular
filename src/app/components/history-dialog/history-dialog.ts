import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


export interface HistoryDialogData {
  id: number;
  name: string;
  parameter: string;       // Ez a stringesített JSON ("{...}")
  modified: string;        // Dátum string
  historyList: any[];      // A lista
  description?: string;
}

@Component({
  selector: 'app-history-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './history-dialog.html',
  styleUrl: './history-dialog.css',
})
export class HistoryDialog implements OnInit {

  meta: any;

  parameters: any[] = [];
  // alsó panelek
  oldValue = ''; // jobb panel (Erről módosult)
  newValue = ''; // bal panel (Módosítás erre)


  constructor(public dialogRef: MatDialogRef<HistoryDialog>, @Inject(MAT_DIALOG_DATA) public data: HistoryDialogData){}

  ngOnInit(): void {

    // 1. Metaadatok és lista betöltése a backend válaszból
    this.meta = {
      modifiedAt: this.data.modified,
      modifiedBy: 'hadikp', // Ez fix, ahogy kérted (vagy this.data.modifiedBy ha jönne)
      name: this.data.name  // A katalógus neve
    };

    let rawList = this.data.historyList || [];

    rawList.sort((a: any, b:any) => {
      const dateA = new Date(a.modifiedAt).getTime();
      const dateB = new Date(b.modifiedAt).getTime();
      return dateB - dateA;
    });

    this.parameters = rawList.map((item: any) => {
      return { ...item, formattedText: this.formatToList(item.parameter) };
    });

    if (this.parameters.length > 0) {
      // 2. Panelek kitöltése (JSON formázással)
      // BAL OLDAL (Új/Jelenlegi): A gyökér objektum 'parameter' mezője
      this.newValue = this.formatJson(this.parameters[0].parameter);

      // JOBB OLDAL (Régi/Előző): A historyList legfrissebb eleme (0. index)
      if (this.parameters.length > 1) {
        this.oldValue = this.formatJson(this.parameters[1].parameter);
      } else {
        this.oldValue = 'Nincs előzmény adat.';
      }
    } else {
      this.newValue = 'Nincs negjeleníthető adat.';
      this.oldValue = '';
    }

  }

  private formatToList(jsonString: string): string {
    if (!jsonString) return '';
    try { 
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => `${item.value} ${item.name}`).join('\n');
      } else if (typeof parsed === 'object') {
        return `${parsed.value} ${parsed.name}`;
      }
      return jsonString;
      } catch (e) {
        return jsonString;
      }
    }
  

    // Segédfüggvény: String -> Szép JSON
    private formatJson(rawString: string): string {
      if (!rawString) return '';
      try {
        // 1. Stringből objektum
        const parsed = JSON.parse(rawString);
        // 2. Objektumból szép string (2 szóköz behúzással)
        return JSON.stringify(parsed, null, 2);
      } catch (e) {
        return rawString; // Ha nem JSON, visszaadjuk eredetiben
      }
    }
 
}
