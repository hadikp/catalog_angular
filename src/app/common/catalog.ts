import { CatalogItem } from './catalog-item';

export class Catalog {

  constructor(public id: number, public name: string, public description: string, public items: CatalogItem[] = []){}
}
