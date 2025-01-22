import { Component, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-function',
  standalone: true,
  templateUrl: './crud-function.component.html',
  styleUrl: './crud-function.component.css',
  imports: [RouterModule]
})
export class CrudFunctionComponent {
  router = inject(Router);
  filter = output<string>();
  canDelete = input<boolean>();
  delete = output();
  activeRoute = inject(ActivatedRoute);

  applyFilter(event: Event) {
    const filterString = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filter.emit(filterString);
    console.log(this.canDelete());

  }

  handleDelete() {
    if (this.canDelete()) {
      this.delete.emit();
    }
  }

  createNew() {
    this.router.navigate(['../new'], {
      relativeTo: this.activeRoute,
    });
  }
}
