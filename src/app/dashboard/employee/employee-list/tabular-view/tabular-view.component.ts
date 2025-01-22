import { Component, DestroyRef, inject, input, output, ViewChild } from '@angular/core';
import { Employee, EmployeeColumns } from '../../employee/employee.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../../../services/employee.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';

// import DUMMY_DATA from "../dummy.json"
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../dialog/dialog.component';

@Component({
  selector: 'app-tabular-view',
  imports: [MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatSelectModule, RouterLink],
  templateUrl: './tabular-view.component.html',
  styleUrl: './tabular-view.component.css'
})
export class TabularViewComponent {

  filter = input.required<string>();
  canDelete = input.required<boolean>();
  delete = output<number>();

  router = inject(Router);
  employeeService = inject(EmployeeService);
  destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);

  currentPage = 0;
  currentPageSize = 10;
  Id = '';
  isLoading = true;
  isErrorOccured = false;
  displayedColumns = EmployeeColumns;
  EMPLOYEEE_DATA = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges() {
    this.EMPLOYEEE_DATA.filter = this.filter();
    this.EMPLOYEEE_DATA.paginator = this.paginator;
    this.EMPLOYEEE_DATA.sort = this.sort;
  }

  getEmployee() {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.EMPLOYEEE_DATA = new MatTableDataSource<Employee>(data);
        this.EMPLOYEEE_DATA.paginator = this.paginator;
      },
      error: (err) => {
        this.isLoading = false;
        this.isErrorOccured = true;
      }
    })
  }

  ngOnInit() {
    this.getEmployee();
    const subscription = this.employeeService.deleteStatus.subscribe({
      next: () => {
        this.getEmployee();
      }
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.EMPLOYEEE_DATA.paginator = this.paginator;
    this.currentPage = pageEvent.pageIndex;
    this.currentPageSize = pageEvent.pageSize;
  }

  ngAfterViewInit() {
    this.EMPLOYEEE_DATA.paginator = this.paginator;
    if (this.EMPLOYEEE_DATA.paginator) {
      this.EMPLOYEEE_DATA.paginator.firstPage();
    }
  }

  toggleId(id: string) {
    this.Id = (this.Id === id) ? '' : id;
  }

  toggleDeleteIds(userId: number) {
    this.delete.emit(userId);
  }

  onDelete(userId: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { success: "Delete", cancel: "Cancel", content: "Do you want to Delete the selected?" }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.isLoading = true
          this.employeeService.deleteEmployee(userId).subscribe({
            next: () => {
              this.getEmployee();
              this.EMPLOYEEE_DATA.paginator = this.paginator;
            },
            error: (err) => console.log(err)
          })
        }
        this.isLoading = false;
      }
    )
  }
}
