import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;
  title = 'Angular';

  ngOnInit(): void {
    // if(this.isLoggedIn){
    //   const user = this
    // }
  }
}
