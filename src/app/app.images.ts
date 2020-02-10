import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './app.images.html',
  styleUrls: ['./app.images.css']
})
export class AppImages {
  @Input()
  imageSrc: string;

  @Input()
  movieTitle: string;

  @Input()
  noImage: boolean;

  constructor(){
      
  }

}
