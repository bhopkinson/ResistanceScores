import { Component } from '@angular/core';

interface SvgLine {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface Coordinate {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WebUI';

  buffer = 1;
  svgHeight = 100;
  svgWidth = 100;

  xMin = 0;
  xMax = 25;
  yMin = 0;
  yMax = 1;

  wins = [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 10];
  played = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  gameNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  get dataPath(): string {
    const xData = this.gameNo;
    const yData = this.wins.map((win, ind) => win / this.played[ind]);
    const coordinates = this.dataCoords(xData, yData);

    //console.log(xData);
    //console.log(yData);
    //console.log(coordinates);
    //console.log(this.coordsToPathD(coordinates));


    return this.coordsToPathD(coordinates);
  }

  coordsToPathD(coords: Coordinate[]): string {
    const first = coords.shift();
    let dString = `M${first.x} ${first.y}`;
    coords.forEach(coord => dString += ` L${coord.x} ${coord.y}`);
    return dString;
  }

  dataCoords(xData: number[], yData: number[]): Coordinate[] {
    if (xData.length !== yData.length) {
      console.error("Aw fuck");
      return [];
    }

    const xyData = [];

    xData.forEach((xDatum, index) => {
      const xyDatum = {
        x: this.getXProportion(xDatum),
        y: this.getYProportion(yData[index])
      };
      xyDatum.y = this.svgHeight + this.buffer - xyDatum.y;
      xyData.push(xyDatum);
    })

    return xyData
  }

  viewBox = `0 0 ${this.svgWidth + this.buffer * 2} ${this.svgHeight + this.buffer * 2}`;

  get xGridlines(): SvgLine[] {
    const xGridlineCount = 5;
    const xGridlines = [];
    for (var i = 0; i < xGridlineCount; i++) {
      const fraction = i / xGridlineCount;
      xGridlines.push(this.getXGridline(fraction * this.svgWidth))
    }
    return xGridlines;
  }

  get yGridlines(): SvgLine[] {
    const yGridlineCount = 5;
    const yGridlines = [];
    for (var i = 0; i < yGridlineCount; i++) {
      const fraction = i / yGridlineCount;
      yGridlines.push(this.getYGridline(fraction * this.svgHeight))
    }
    return yGridlines;
  }

  get xTicks(): SvgLine[] {
    const xTickCount = 5;
    const xTicks = [];
    for (var i = 0; i < xTickCount; i++) {
      const fraction = i / xTickCount;
      xTicks.push(this.getXTick(fraction * this.svgWidth))
    }
    return xTicks;
  }

  get yTicks(): SvgLine[] {
    const yGridlineCount = 5;
    const yGridlines = [];
    for (var i = 0; i < yGridlineCount; i++) {
      const fraction = i / yGridlineCount;
      yGridlines.push(this.getYGridline(fraction * this.svgHeight))
    }
    return yGridlines;
  }

  getXTick(xCoord: number): SvgLine {
    const gridLine = {
      x1: this.buffer + xCoord,
      x2: this.buffer + xCoord,
      y1: 0,
      y2: this.buffer + this.buffer
    };

    return this.yFlip(gridLine);
  }

  getYTick(yCoord: number): SvgLine {
    const gridLine = {
      x1: 0,
      x2: this.buffer,
      y1: this.buffer + yCoord,
      y2: this.buffer + yCoord
    };

    return this.yFlip(gridLine);
  }

  getXGridline(xCoord: number): SvgLine {
    const gridLine = {
      x1: this.buffer + xCoord,
      x2: this.buffer + xCoord,
      y1: this.buffer,
      y2: this.buffer + this.svgHeight
    };

    return this.yFlip(gridLine);
  }

  getYGridline(yCoord: number): SvgLine {
    const gridLine = {
      x1: this.buffer,
      x2: this.buffer + this.svgWidth,
      y1: this.buffer + yCoord,
      y2: this.buffer + yCoord
    };

    return this.yFlip(gridLine);
  }

  yFlip(path: SvgLine): SvgLine {
    path.y1 = this.svgHeight + this.buffer * 2 - path.y1;
    path.y2 = this.svgHeight + this.buffer * 2 - path.y2;
    return path;
  }

  getXProportion(x: number): number {
    const xMin = this.xMin;
    const xMax = this.xMax;

    return (x - xMin) * this.svgWidth / (xMax - xMin);
  }

  getYProportion(y: number): number {
    const yMin = this.yMin;
    const yMax = this.yMax;

    return (y - yMin) * this.svgHeight / (yMax - yMin);
  }

}

