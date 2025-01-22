import { Component, inject, signal, } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { TabularViewComponent } from "./tabular-view/tabular-view.component";
import { CrudFunctionComponent } from "./crud-function/crud-function.component";
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../dialog/dialog.component';


@Component({
  selector: 'app-employee-list',
  // imports: [RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  imports: [TabularViewComponent, CrudFunctionComponent]
})

export class EmployeeListComponent {
  employeeService = inject(EmployeeService);
  filterText = signal<string>('');
  canDelete = signal<boolean>(false);
  deleteIds: number[] = [];
  private toast = inject(ToastrService)
  readonly dialog = inject(MatDialog);

  handleDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { success: "Delete", cancel: "Cancel", content: "Do you want to Delete the selected?" }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.employeeService.deleteEmployees(this.deleteIds).subscribe({
          next: (data) => {
            this.deleteIds = [];
            this.canDelete.set(false);
            this.employeeService.successDelete();
            this.toast.show(
              "Success",
              "Successfully Deleted",
              {
                timeOut: 2500,
                closeButton: true,
                toastClass: 'ngx-toastr toast-blue'
              },
              'toast-success'
            )
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          }

        })
      }
    })
  }

  toggleDeleteIds(userId: number) {
    if (this.deleteIds.find(id => id === userId)) {
      this.deleteIds = this.deleteIds.filter(id => id != userId);
    }
    else {
      this.deleteIds.push(userId);
    }
    if (this.deleteIds.length == 0) {
      this.canDelete.set(false);
    }
    else {
      this.canDelete.set(true);
    }
  }

  applyFilter(filter: string) {
    this.filterText.set(filter)
  }
}