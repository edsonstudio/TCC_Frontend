import { Component, OnInit } from '@angular/core';
import { faPlayCircle, faStar } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faPlayCircle = faPlayCircle;
  faStar = faStar;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;

  constructor(private route: Router) {}

  ngOnInit(): void {
  }

  startNavigate(): void{
    this.route.navigateByUrl('/Inicio');
  }

}
