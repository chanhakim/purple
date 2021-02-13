import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { TemplateRoutingModule } from './template/template-routing.component';
import { LocalIssuesComponent } from './local-issues/local-issues.component';
import { LocalIssuesRoutingModule } from './local-issues/local-issues-routing.component';
import { ZipCodeComponent } from './zip-code/zip-code.component';
import { ZipCodeRoutingModule } from './zip-code/zip-code-routing.component';
import { appReducers } from './store/reducers/app.reducers';
import { TemplateEditorComponent } from './template/template-editor/template-editor.component';
import { RenderTemplateComponent } from './render-template/render-template.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    LocalIssuesComponent,
    ZipCodeComponent,
    TemplateEditorComponent,
    RenderTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ZipCodeRoutingModule,
    TemplateRoutingModule,
    LocalIssuesRoutingModule,
    StoreModule.forRoot(appReducers),
    AngularEditorModule,
    // StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
