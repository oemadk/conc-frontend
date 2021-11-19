import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalculatorComponent } from './calculator/calculator.component';
import { IcuhomeComponent } from './icuhome/icuhome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { RfaComponent } from './rfa/rfa.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { IcudirectrequestComponent } from './icudirectrequest/icudirectrequest.component';
import { RfafilledComponent } from './rfafilled/rfafilled.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { IcubedsComponent } from './icubeds/icubeds.component';
import { MessaginghomeComponent } from './messaginghome/messaginghome.component';
import { ChatComponent } from './chat/chat.component';
import { PatientlistingComponent } from './patientlisting/patientlisting.component';
import * as $ from 'jquery';
import { PopupComponent } from './popup/popup.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { YashfitemplateComponent } from './yashfitemplate/yashfitemplate.component';
import { LocalstorageComponent } from './localstorage/localstorage.component';
import { YashfitabsComponent } from './yashfitabs/yashfitabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomepageComponent,
    CalculatorComponent,
    IcuhomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    UserComponent,
    BoardUserComponent,
    RfaComponent,
    UploadFilesComponent,
    IcudirectrequestComponent,
    RfafilledComponent,
    IcubedsComponent,
    MessaginghomeComponent,
    ChatComponent,
    PatientlistingComponent,
    PopupComponent,
    YashfitemplateComponent,
    LocalstorageComponent,
    YashfitabsComponent
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgbModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
