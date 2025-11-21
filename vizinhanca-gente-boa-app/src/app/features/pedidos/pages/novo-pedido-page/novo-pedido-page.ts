import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { PedidoAjudaService } from '@core/services/pedido-ajuda';
import { CategoriaAjudaService } from '@core/services/categoria-ajuda';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIcon } from "@angular/material/icon";

interface Categoria { id: number; nome: string; }

@Component({
  selector: 'app-novo-pedido-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIcon
],
  templateUrl: './novo-pedido-page.html',
  styleUrl: './novo-pedido-page.css'
})
export class NovoPedidoPage implements OnInit {
  novoPedidoForm!: FormGroup;
  todasCategorias: Categoria[] = [];
  categoriasFiltradas$!: Observable<(Categoria | string)[]>;
  isLoading = false;  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoriaService: CategoriaAjudaService,
    private pedidoAjudaService: PedidoAjudaService,
    private snackBar: MatSnackBar
  ) {}

ngOnInit(): void {
  this.novoPedidoForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(10)]],
    descricao: ['', [Validators.required, Validators.minLength(20)]],
    categoria: ['', Validators.required] 
  });

  this.categoriaService.getCategorias().subscribe(categoriasRecebidas => {
    this.todasCategorias = categoriasRecebidas;
  });

  this.categoriasFiltradas$ = this.novoPedidoForm.get('categoria')!.valueChanges.pipe(
    startWith(''),
    map(value => (typeof value === 'string' ? value : value.nome)),
    map(nome => (nome ? this._filterCategorias(nome) : this.todasCategorias.slice()))
  );
}

private _filterCategorias(nome: string): (Categoria | string)[] {
  const nomeFiltrado = nome.toLowerCase();
  const resultados = this.todasCategorias.filter(cat => 
    cat.nome.toLowerCase().includes(nomeFiltrado)
  );

  const matchExato = this.todasCategorias.some(cat => cat.nome.toLowerCase() === nomeFiltrado);
  
  if (resultados.length === 0 && !matchExato) {
    return [`Criar nova categoria: "${nome}"`];
  }
  
  return resultados;
}

displayCategoria(cat: Categoria): string {
  return cat && cat.nome ? cat.nome : '';
}

onCategoriaSelected(event: MatAutocompleteSelectedEvent): void {
  const selecao = event.option.value;

  if (typeof selecao === 'string' && selecao.startsWith('Criar')) {
    
    const textoCompleto: string = selecao;

    const match = textoCompleto.match(/"([^"]*)"/);
    
    const nomeDaNovaCategoria = match ? match[1] : '';

    if (!nomeDaNovaCategoria) {
      this.snackBar.open('Erro ao extrair nome da categoria.', 'Fechar');
      return;
    }

    this.novoPedidoForm.get('categoria')?.setValue(''); 

    this.categoriaService.createCategoria({ nome: nomeDaNovaCategoria }).subscribe({
      next: (categoriaCriada) => {
        this.snackBar.open(`Categoria "${categoriaCriada.nome}" criada!`, 'OK', { duration: 2000 });
        this.todasCategorias.push(categoriaCriada);
        this.novoPedidoForm.get('categoria')?.setValue(categoriaCriada);
      },
      error: () => {
        this.snackBar.open('Erro ao criar a categoria.', 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
        this.novoPedidoForm.get('categoria')?.setValue('');
      }
    });
  }
}

  onSubmit(): void {
    if (this.novoPedidoForm.invalid || this.isLoading) {
      return;
    }

    const formValue = this.novoPedidoForm.value;
    if (typeof formValue.categoria !== 'object' || !formValue.categoria.id) {
      this.snackBar.open('Por favor, selecione uma categoria válida ou crie uma nova.', 'Fechar', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    const pedidoParaEnviar = {
      titulo: formValue.titulo,
      descricao: formValue.descricao,
      categoriaId: formValue.categoria.id 
    };

    this.pedidoAjudaService.createPedido(pedidoParaEnviar).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (novoPedido) => {
        this.snackBar.open('Seu pedido de ajuda foi publicado!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.snackBar.open('Falha ao publicar o pedido. Tente novamente.', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('Erro ao criar pedido:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}