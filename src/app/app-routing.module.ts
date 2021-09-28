import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { IcuhomeComponent } from './icuhome/icuhome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { RfaComponent } from './rfa/rfa.component';
import { IcudirectrequestComponent } from './icudirectrequest/icudirectrequest.component';
import { RfafilledComponent } from './rfafilled/rfafilled.component';
import { IcubedsComponent } from './icubeds/icubeds.component';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  { path: 'welcome', component: WelcomepageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'rfafilled/:id', component: RfafilledComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'icuhome', component: FooterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'rfa', component: RfaComponent },
  { path: 'icubeds', component: IcubedsComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'icuhome1', component: IcuhomeComponent },
  { path: 'icudirectrequest', component: IcudirectrequestComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
