import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './dialog/view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageShopComponent } from './manage-shop/manage-shop.component';


export const MaterialRoutes: Routes = [
    {
        path: 'category',
        component: ManageCategoryComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'product',
        component: ManageProductComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'order',
        component: ManageOrderComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'user']
        }
    },
    {
        path: 'user',
        component: ManageUserComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'shop',
        component: ManageShopComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    }
];
