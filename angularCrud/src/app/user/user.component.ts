
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditUserComponent } from '../add-edit/add-edit.component';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['Id','First Name', 'Last Name', 'Email', 'Contact', 'Action'];
  userDetails!: MatTableDataSource<Element>

  

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userDetails = new MatTableDataSource<Element>(this.userService.getUser());
  }

  public openPopup() {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  public editUser(index: any, data: { id: any; action: string; }) {
    data.id = index;
    data.action = 'edit';
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  public deleteUser(index: number) {
    const data = {
      action: 'delete'
    }
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(index);
        this.getUsers();
      }
    });
  }
}