import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DemoComponent } from './demo/demo.component';
import { SqrtPipe } from './app.sqrt';
import { DateserviceService} from './dateservice.service';
@NgModule({
  declarations: [
    SqrtPipe,
    FormsModule,
    BrowserAnimationsModule,
    AppComponent,
    LoginComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path : 'app-demo',
        component :DemoComponent
      }
    ])
  ],
  providers: [DateserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule{}
