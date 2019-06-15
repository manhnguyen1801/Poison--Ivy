import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { UserProfileModule } from './user-profile/user-profile.module';
import { BlogsModule } from './blogs/blogs.module';

import { AppReducer } from './state/app.reducer';
import { AuthenticationModule } from './authentication/auth.module';
import { AppRoutingModule } from './app.routing.module';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppInterceptor } from './interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreModule.forRoot({
      app: AppReducer
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Poison Ivy Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
    BrowserAnimationsModule,
    BlogsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
