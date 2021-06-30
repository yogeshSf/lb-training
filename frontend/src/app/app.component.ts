import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Role, UserI} from './core/models/user.model';
import {UserService} from './core/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  angForm: FormGroup;
  roles = [Role.Admin, Role.SuperAdmin, Role.User, Role.Subscriber]

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {this.angForm = new FormGroup({users: new FormArray([])});}

  ngOnInit() {this.getUsers();}

  get users(): FormArray {return this.angForm.get('users') as FormArray;}

  addNameField(user: (UserI | null)) {
    this.users.push(this.fb.group({
      id: [user?.id || null],
      firstName: [user?.firstName || null, Validators.required],
      lastName: [user?.lastName || null, Validators.required],
      middleName: [user?.middleName || null,],
      email: [user?.email || null, [Validators.email]],
      address: [user?.address || null,],
      phoneNumber: [user?.phoneNumber || null,],
      role: [user?.role || null,],
      // createdOn: [user?.createdOn || null,],
      // modifiedOn: [user?.modifiedOn || null,],
      isEditable: [user ? false : true],
    }));
  }

  getUsers(): void {
    this.userService.getAll().subscribe((data: UserI[]) =>
      data.forEach(ele => this.addNameField(ele)));
  }

  onFormSubmit(): void {
    for (let i = 0; i < this.users.length; i++) {
      console.log(this.users.at(i).value);
    }
  }

  createUser = (user: UserI, index: number): void => {
    delete user.id;
    delete user.isEditable;
    this.userService.create(user).subscribe((data: UserI) => {
      this.users.at(index).patchValue({...data, isEditable: false});
    });
  }

  updateUser(user: UserI, index: number): void {
    delete user.isEditable;
    this.userService.update(user.id, user).subscribe((data: UserI) => {
      this.users.at(index).patchValue({...data, isEditable: false});
    });
  }

  eidtRow = (user: UserI, index: number): void =>
    this.users.at(index).patchValue({...user, isEditable: !user.isEditable});

  deleteUser(user: UserI, index: number): void {
    this.userService.delete(user.id).subscribe(() => this.users.removeAt(index));
  }
}


// import { Component } from '@angular/core';
// import { UserI } from './core/models/user.model';
// import { UserService } from './core/service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {

//   users: UserI[] = [];

//   constructor(
//     private userService: UserService,
//   ) {
//     this.getUsers();
//   }

//   getUsers(): void {
//     this.userService.get().subscribe((data: UserI[]) => this.users = data);
//   }

//   createUser(user: UserI): void {
//     this.userService.create(user).subscribe((data: UserI) => this.users.push(data));
//   }

//   updateUser(user: UserI): void {
//     this.userService.create(user).subscribe((data: UserI) => { this.getUsers(); });
//   }

//   deleteUser(id: Number): void {
//     this.userService.delete(id).subscribe(() => { this.getUsers(); });
//   }
// }
