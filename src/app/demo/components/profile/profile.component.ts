import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/demo/service/user.service';
import { User } from '../../api/user-detail/User';
import { HttpClient } from '@angular/common/http';
@Component({
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  currentUser = {};

  user = new User();
  UserUpdateForm: FormGroup;
  PasswordUpdateForm: FormGroup;
  constructor(private location: Location,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient
              ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
    this.loadUserDetail();
    this.loadUserUpdateForm();
  }
  loadUserDetail() {
    this.userService.getByName(this.currentUser['username']).subscribe(
      res => {
        this.user = res;
        this.loadUserUpdateForm();
      },
      error => {
        this.LoadBackPage();
      }
    );

  }

  loadUserUpdateForm(){
    this.UserUpdateForm = this.formBuilder.group({
    'username':       [this.user.username, [Validators.required]],
    'firstname':      [this.user.firstname, [Validators.required]],
    'lastname':       [this.user.lastname, [Validators.required]],
    'email':          [this.user.email, [Validators.required, Validators.email]],
    'address':        [this.user.address , [Validators.required]],
    'city':           [this.user.city , [Validators.required]],
    'state':          [this.user.state , [Validators.required]],
    'zip':            [this.user.zip , [Validators.required]],
    'about':          [this.user.about , [Validators.required]],
    'university':     [this.user.university , [Validators.required]],
    'facebook':       [this.user.facebook , [Validators.required]],
    'instagram':      [this.user.instagram , [Validators.required]],
    'twitter':        [this.user.twitter , [Validators.required]],
    });
  }
  LoadBackPage() {
    this.location.back();
  }

  goToLink(url: string){
    window.open(url);
}
}
