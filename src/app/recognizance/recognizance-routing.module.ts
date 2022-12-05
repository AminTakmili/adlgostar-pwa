import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./recognizance/recognizance.module').then( m => m.RecognizancePageModule)
  },
  {
    path: 'template',
    loadChildren: () => import('./recognizance-template/recognizance-template.module').then( m => m.RecognizanceTemplatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecognizancePageRoutingModule {}
