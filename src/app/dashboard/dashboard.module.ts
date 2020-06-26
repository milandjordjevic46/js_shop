import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/modules/angular-material/angular-material.module';
import { ToolbarModule } from '../shared/components/toolbar/toolbar.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { DashboardService, DashboardServiceImpl } from './dashboard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SingleProductComponent } from './single-product/single-product.component';
import { MyInterceptor } from '../shared/interceptor/httpconfig.interceptor';
import {
  UserInfoService,
  UserInfoServiceImpl,
} from '../shared/services/user-info.service';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersComponent } from './protected/orders/orders.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { SnackBarService } from '../shared/services/snack-bar.service';

const routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/:id',
        component: SingleProductComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { redirectTo: 'dashboard' },
  },
];
@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    SingleProductComponent,
    CartComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    ToolbarModule,
    SidebarModule,
    HttpClientModule,
    DirectivesModule,
  ],
  providers: [
    AuthGuard,
    SnackBarService,
    { provide: DashboardService, useClass: DashboardServiceImpl },
    { provide: UserInfoService, useClass: UserInfoServiceImpl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
  ],
})
export class DashboardModule {}
