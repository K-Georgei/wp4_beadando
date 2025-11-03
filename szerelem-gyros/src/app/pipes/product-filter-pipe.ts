import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@models/product'; // Make sure this path is correct

@Pipe({
  name: 'productFilter',
  standalone: true,
})
export class ProductFilterPipe implements PipeTransform {
  transform(
    products: Product[] | null,
    searchTerm: string,
    filters: string[]
  ): Product[] {
    if (!products) {
      return [];
    }

    let filteredProducts = products;

    // 1. Filter by search term (checks title and description)
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description?.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // 2. Filter by selected tags
    if (filters.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.every((filter) => product.tags?.includes(filter))
      );
    }

    return filteredProducts;
  }
}
