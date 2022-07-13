import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,private authService: SocialAuthService){}

  ngOnInit(): void {
  }
  clear(){
    localStorage.clear();
    // this.authService.signOut();
    this.router.navigateByUrl('/login');
  }

}
