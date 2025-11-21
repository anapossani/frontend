export interface Categoria {
  id: number;
  nome: string;
  descricao: string | null;
}

export interface CategoriaCreateDto {
  nome: string;
}