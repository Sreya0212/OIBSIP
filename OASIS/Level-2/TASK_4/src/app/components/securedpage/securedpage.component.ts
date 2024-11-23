import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-securedpage',
  templateUrl: './securedpage.component.html',
  styleUrls: ['./securedpage.component.css']
})
export class SecuredpageComponent implements OnInit{
  constructor(private cookie:CookieService, private router:Router){}
  
  public UserName:string = '';
  ngOnInit(): void {
    this.UserName = this.cookie.get('Username');
  }

  public signOut(){
    this.cookie.delete('Username');

    this.router.navigate(['/login']);
  }
}
