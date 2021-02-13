import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZipCodeComponent } from '../zip-code/zip-code.component';

const routes: Routes = [
    { path: 'zipcode', component: ZipCodeComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class ZipCodeRoutingModule {

}