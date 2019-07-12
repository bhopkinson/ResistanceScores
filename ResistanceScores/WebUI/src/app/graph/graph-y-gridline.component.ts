import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-y-gridline',
  templateUrl: './graph-y-gridline.component.html',
  styleUrls: ['./graph-y-gridline.component.scss']
})
export class GraphYGridlineComponent implements OnInit {

  @Input() public y: number;

  public get isValid(): boolean {
    return true;
  }

  ngOnInit() {
  }

}
