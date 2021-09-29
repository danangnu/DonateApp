import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MissingDetailComponent } from './missing/missing-detail/missing-detail.component';
import { MissingListComponent } from './missing/missing-list/missing-list.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'missing', component: MissingListComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'missing/:id', component: MissingDetailComponent},
      {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
