import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,FormsModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
  username ='';
  password='';

  Submit(){
    console.log("Submit button clicked");
    console.log("Username: ", this.username);
    console .log("Password: ", this.password);

    this.username='';
    this.password='';
  }
}
