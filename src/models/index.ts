export interface PageQueryDto {
  currentPage: number;
  perPage: number;
}
export interface PageMetaDto {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  from?: number;
  to?: number;
}
export interface PaginatedResponseDto<TData> {
  results: TData[];
  pagination: PageMetaDto;
}
export interface Dish {
  name: string;
  ingredients: string[];
  diet: string;
  prep_time: number;
  cook_time: number;
  course: string;
  flavor_profile: string | number;
  state: string | number;
  region: string | number;
}
