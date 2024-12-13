import { NgModule } from '@angular/core'
import {
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
  // PathLocationStrategy,
} from '@angular/common'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AppLayoutModule } from './layout/app.layout.module'
import { NotfoundComponent } from './demo/components/notfound/notfound.component'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor'
import { httpInterceptor } from './core/interceptors/http.interceptor'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent,NotfoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
  ],
  providers: [
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptors([errorHandlerInterceptor, httpInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
