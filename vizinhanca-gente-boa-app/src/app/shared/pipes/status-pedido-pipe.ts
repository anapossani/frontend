import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPedido',
  standalone: true,
})
export class StatusPedidoPipe implements PipeTransform {
  private statusMap: { [key: number]: string } = {
    0: 'Aberto',
    1: 'Em Andamento',
    2: 'Concluído',
    3: 'Cancelado',
  };

  transform(value: number): string {
    return this.statusMap[value] || 'Desconhecido';
  }
}