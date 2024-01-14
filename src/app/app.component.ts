import { Component, OnInit } from '@angular/core';
import { UserModel } from './shared/models/user.model';
import { LoadingService } from './shared/services/loading-service/loading-service.service';
import { Store } from '@ngrx/store';
import { selectIsAuth } from './store/auth/auth.selectors';
import * as AuthActions from './store/auth/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';
  isAuth = false;
  courseId!: string;
  courseName!: string;
  user!: UserModel;

  constructor(
    readonly loadingService: LoadingService,
    private readonly store: Store,
  ) {}
  ngOnInit(): void {
    const token=localStorage.getItem('token');
    if(token){
      this.store.dispatch(AuthActions.getUser())
      this.store.select(selectIsAuth).subscribe((isAuth)=>{
        if(isAuth){
          this.store.dispatch(AuthActions.getUser())
        }
        this.isAuth=isAuth
      })
    }
  }
}
