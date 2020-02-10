import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.about.html',
  styleUrls: ['./app.about.css']
})
export class AppAbout {
  title = 'About';
  name: string;

  constructor(){
      this.name = "Fernando M Araujo"
  }

}
