
export interface IPagination {
  count: number;
  next: string;
  previous: string;
}

export class Pagination implements IPagination {
  count: number;
  next: string;
  previous: string;

  constructor( count = 0, next = '', previous ='') {
    this.count = count;
    this.next = next;
    this.previous = previous
  }
}

export interface IListResponse<T> {
  data: T[];
  pagination: Pagination;
}
