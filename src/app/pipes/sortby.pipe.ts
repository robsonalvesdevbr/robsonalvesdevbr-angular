import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortby',
  standalone: true,
})
export class SortbyPipe implements PipeTransform {
  transform<T>(
    array: T[],
    field?: keyof T,
    order: 'asc' | 'desc' = 'asc'
  ): T[] {
    if (!Array.isArray(array)) {
      return array;
    }

    if (field === undefined) {
      return this.sortString(array as string[], order) as T[];
    }

    return [...array].sort(this.getSortFn(field, order));
  }

  private getSortFn<T>(
    field?: keyof T,
    order: 'asc' | 'desc' = 'asc'
  ): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      const comparison = this.compareValues(a, b, field);

      return order === 'asc' ? comparison : -comparison;
    };
  }

  private compareValues<T>(a: T, b: T, field?: keyof T): number {
    const valueA = field ? a[field] : a;
    const valueB = field ? b[field] : b;

    if (valueA > valueB) {
      return 1;
    } else if (valueA < valueB) {
      return -1;
    } else {
      return 0;
    }
  }

  // Crie uma função para ordenar um array de string
  // A função deve receber um array de string e um parâmetro que indica a ordem da ordenação
  // A função deve retornar o array ordenado
  // Se a ordem for 'asc', o array deve ser ordenado de forma crescente
  // Se a ordem for 'desc', o array deve ser ordenado de forma decrescente
  // A função deve ser chamada sortString
  // Dica: use o método sort do array
  sortString(array: string[], order: 'asc' | 'desc'): string[] {
    return [...array].sort((a, b) =>
      order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
  }
}
