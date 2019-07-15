import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WebUI';



  xMin = 0;
  xMax = 75;
  yMin = 20;
  yMax = 100;
  xScale = 200;
  yScale = 100;
  xTickScale = 5;
  yTickScale = 5;
  xLabelScale = 4;
  yLabelScale = 3;

  xGridlines = [0, 10,20,30,40,50,60,70, 80, 90, 100];
  yGridlines = [0,10,20,30,40,50,60,70, 80, 90, 100];

  wins = [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 10];
  played = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  gameNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

}

