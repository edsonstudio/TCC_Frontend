import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { CartService } from 'src/app/services/Cart_Order/cart.service';
import { CommumMethods } from 'src/app/services/commum-methods';
import { LocalStorageUtils } from './../../utils/localstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends CommumMethods implements OnInit {

  constructor(
    private primeNgConfig: PrimeNGConfig,
    private cartService: CartService,
    private localst: LocalStorageUtils,
    private router: Router
  ) { super(); }
  seeBar = false;
  items;
  logged = false;
  itemsAmount: number;
  admin: boolean;
  actualUrl;
  ngOnInit(): void {
    if (this.localst.getUser()){
        this.logged = true;
        this.cartService.cartAmount().toPromise().then(vl => this.itemsAmount = vl);
    }
    this.admin = this.isAdmin();
    if (this.router.url === '/Inicio/suporte/chat') { this.actualUrl = 'chat'; }
    if (this.router.url === '/Inicio/admin') { this.actualUrl = 'admin'; }
    if (this.router.url === '/Inicio/produtos/todos') { this.actualUrl = 'products'; }
    if (this.router.url === '/Inicio/produtos/meu-setup') { this.actualUrl = 'personalized'; }
    if (this.router.url.includes('/Inicio/conta')) { this.actualUrl = 'account'; }
    if (this.router.url.includes('/Inicio/produtos/pedido')) { this.actualUrl = 'order'; }
    if (this.router.url === '/Inicio') { this.actualUrl = 'home'; }
    this.primeNgConfig.ripple = true;
    this.items = [
      {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-fw pi-plus',
                  items: [
                  {
                      label: 'Bookmark',
                      icon: 'pi pi-fw pi-bookmark'
                  },
                  {
                      label: 'Video',
                      icon: 'pi pi-fw pi-video'
                  },

                  ]
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-trash'
              },
              {
                  separator: true
              },
              {
                  label: 'Export',
                  icon: 'pi pi-fw pi-external-link'
              }
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {
                  label: 'Left',
                  icon: 'pi pi-fw pi-align-left'
              },
              {
                  label: 'Right',
                  icon: 'pi pi-fw pi-align-right'
              },
              {
                  label: 'Center',
                  icon: 'pi pi-fw pi-align-center'
              },
              {
                  label: 'Justify',
                  icon: 'pi pi-fw pi-align-justify'
              },

          ]
      },
      {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-fw pi-user-plus',

              },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-user-minus',

              },
              {
                  label: 'Search',
                  icon: 'pi pi-fw pi-users',
                  items: [
                  {
                      label: 'Filter',
                      icon: 'pi pi-fw pi-filter',
                      items: [
                          {
                              label: 'Print',
                              icon: 'pi pi-fw pi-print'
                          }
                      ]
                  },
                  {
                      icon: 'pi pi-fw pi-bars',
                      label: 'List'
                  }
                  ]
              }
          ]
      },
      {
          label: 'Events',
          icon: 'pi pi-fw pi-calendar',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                  {
                      label: 'Save',
                      icon: 'pi pi-fw pi-calendar-plus'
                  },
                  {
                      label: 'Delete',
                      icon: 'pi pi-fw pi-calendar-minus'
                  },

                  ]
              },
              {
                  label: 'Archieve',
                  icon: 'pi pi-fw pi-calendar-times',
                  items: [
                  {
                      label: 'Remove',
                      icon: 'pi pi-fw pi-calendar-minus'
                  }
                  ]
              }
          ]
      },
      {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off'
      }
  ];
  }

  logout(){
    this.localst.cleanUserLocalData();
    this.router.navigate(['/Inicio']);
    this.ngOnInit();
  }

  navigate(url){
    this.router.navigate([`${url}`]);
    this.ngOnInit();
  }

}
