import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import * as fromComponents from "./components/index";
import {HomeRoutingModule} from "./home-routing.module";
import {SideNavComponent} from "./components";
import {FormatDatePipe} from "./pipes/format-date.pipe";

@NgModule({
  declarations: [
    ...fromComponents.components,
  ],
  exports: [
    SideNavComponent
  ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        SharedModule,
        FormatDatePipe,

    ]
})
export class HomeModule {
}
