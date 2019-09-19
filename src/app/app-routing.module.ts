import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from  './guards/guard.guard';
const routes: Routes = [
  {       //this define below
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',canActivate: [GuardGuard] },
  {path: 'home',loadChildren: './home/home.module#HomePageModule',canActivate: [GuardGuard]
    // loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'trips-list',loadChildren: './list/list.module#ListPageModule',canActivate: [GuardGuard]
   // loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule',canActivate: [GuardGuard] },
  { path: 'trip-detail/:tripid', loadChildren: './trip-detail/trip-detail.module#TripDetailPageModule',canActivate: [GuardGuard] },
  { path: 'driver-detail/:driverid', loadChildren: './driver-detail/driver-detail.module#DriverDetailPageModule',canActivate: [GuardGuard] },
  { path: 'freeride', loadChildren: './freeride/freeride.module#FreeridePageModule',canActivate: [GuardGuard] },
  { path: 'payments', loadChildren: './payments/payments.module#PaymentsPageModule',canActivate: [GuardGuard] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' ,canActivate: [GuardGuard]},
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule',canActivate: [GuardGuard] },  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsPageModule' },
  { path: 'safety', loadChildren: './safety/safety.module#SafetyPageModule' },
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyPageModule' },
  { path: 'security', loadChildren: './security/security.module#SecurityPageModule' },
  { path: 'twostepvarivication', loadChildren: './twostepvarivication/twostepvarivication.module#TwostepvarivicationPageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'chek-risk', loadChildren: './chek-risk/chek-risk.module#ChekRiskPageModule' },
  { path: 'profile-modal', loadChildren: './profile-modal/profile-modal.module#ProfileModalPageModule' }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
