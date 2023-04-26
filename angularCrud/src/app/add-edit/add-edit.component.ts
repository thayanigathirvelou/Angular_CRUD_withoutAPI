import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditUserComponent implements OnInit {
  addUserForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEditUserComponent>, 
    public userService: UserService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public incomingData: any
  ) { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({  
        id: new FormControl(''),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        contact: new FormControl('', Validators.required)
    })
    this.addUserForm.patchValue(this.incomingData);
  }

  public closePopup() {
    this.dialogRef.close();
    this.addUserForm.reset();
  }

  public addUser() {
    if (this.incomingData && this.incomingData.action && this.incomingData.action === 'edit') {
      this.userService.editUser(this.incomingData.id, this.addUserForm.value);
      this.dialogRef.close();
    } else {
      this.userService.addUser(this.addUserForm.value);
      this.dialogRef.close();
    }
  }

  public deleteUser() {
    this.dialogRef.close(true);
  }

  public cancelDelete() {
    this.dialogRef.close(false);
  }
}