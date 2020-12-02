import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Profile } from 'src/app/models/User';
import { ChatService } from 'src/app/services/Chat/chat.service';

@Component({
  selector: 'app-psidebar',
  templateUrl: './psidebar.component.html',
  styleUrls: ['./psidebar.component.scss']
})
export class PsidebarComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private chatService: ChatService,
    private router: Router
  ) { }

  private _visibleSidebar;
  public get visibleSidebar() {
    return this._visibleSidebar;
  }
  @Input() public set visibleSidebar(value) {
    this._visibleSidebar = value;
  }
  uniqueID: string;
  profile: Profile;
  banners = [
    { src: '../../../assets/nav/amd.jpg', alt: 'Logo AMD' },
    { src: '../../../assets/nav/intel.jpg', alt: 'Logo Intel' },
    { src: '../../../assets/nav/kingston.jpg', alt: 'Logo Kingston' },
    { src: '../../../assets/nav/nvidia.jpg', alt: 'Nvidia' }
  ];

  responsiveOptions = [
    {
        breakpoint: '400px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.chatService.LocalStorage.getUser()){
      this.profile = this.chatService.LocalStorage.getUser();
    }
  }

  navigateToChat(){
    this.visibleSidebar = false;
    this.router.navigate(['Inicio/suporte/chat']);
  }

  navigateToLogin(){
    this.visibleSidebar = false;
    this.router.navigate(['Inicio/conta/entrar']);
  }

  montagem(){
    this.visibleSidebar = false;
    this.router.navigate(['Inicio/produtos/meu-setup']);
  }

}
