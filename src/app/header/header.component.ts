import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService) {  }


  isAdmin: any;

  adminArray = [
    { id: "1", title: "Nav1", url: "url1", admin: "true"},
    { id: "2", title: "Nav2", url: "url2", admin: "true"},
    { id: "3", title: "Nav3", url: "url3", admin: "true"},
    { id: "4", title: "Nav3", url: "url4", admin: "true"},
    { id: "5", title: "Nav4", url: "url5", admin: "true"},
    { id: "6", title: "Nav5", url: "url6", admin: "false"},
    { id: "7", title: "Nav5", url: "url7", admin: "false"}
  ];

  userArray: any;

  ngOnInit() {

    this.isAdmin = true;

    if(!this.isAdmin){
      this.userArray = this.getUserArray();
    }

  }
  getUserArray(){

    var tempArray = [];
    this.adminArray.forEach(function (a) {
      if (a.admin === "false"){
        tempArray.push(a);
      }
    });

    return tempArray;
  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}
