import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsPage } from './friends.page';

const routes: Routes = [
  {
    path: '',
    component: FriendsPage
  },
  {
    path: 'add-friend',
    loadChildren: () => import('./add-friend/add-friend.module').then( m => m.AddFriendPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsPageRoutingModule {}
