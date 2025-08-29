import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

export interface PaginationConfig {
  id: string;
  itemsPerPage: number;
  currentPage: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private configs = new Map<string, WritableSignal<PaginationInstance>>();

  createPaginationConfig(id: string, itemsPerPage: number = 5): WritableSignal<PaginationInstance> {
    if (this.configs.has(id)) {
      return this.configs.get(id)!;
    }

    const config = signal<PaginationInstance>({
      id,
      itemsPerPage,
      currentPage: 1
    });

    this.configs.set(id, config);
    return config;
  }

  getPaginationConfig(id: string): WritableSignal<PaginationInstance> | undefined {
    return this.configs.get(id);
  }

  setCurrentPage(id: string, page: number): void {
    const config = this.configs.get(id);
    if (config) {
      config().currentPage = page;
    }
  }

  resetPage(id: string): void {
    const config = this.configs.get(id);
    if (config) {
      config().currentPage = 1;
    }
  }

  getAbsoluteIndex(id: string, indexOnPage: number): number {
    const config = this.configs.get(id);
    if (!config) return indexOnPage + 1;
    
    const pagination = config();
    return pagination.itemsPerPage * (pagination.currentPage - 1) + indexOnPage + 1;
  }

  createComputedAbsoluteIndex(config: WritableSignal<PaginationInstance>) {
    return computed(() => (indexOnPage: number) => 
      config().itemsPerPage * (config().currentPage - 1) + indexOnPage + 1
    );
  }
}