import { Component, OnInit, Input, HostBinding, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-graph-x-gridline',
  templateUrl: './graph-x-gridline.component.html',
  styleUrls: ['./graph-x-gridline.component.scss']
})
export class GraphXGridlineComponent implements OnInit, AfterViewInit  {

  constructor(private elRef: ElementRef) {}

  @Input() public x: number;

  public classes: string;

  public get isValid(): boolean {
    return true;
  }

  ngOnInit() {
    let observer = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {
        this.classes = (mutation.target as HTMLElement).classList.value;
      });
    });
    var config = { attributes: true, childList: false, characterData: false };

    observer.observe(this.elRef.nativeElement, config);
  }

  ngAfterViewInit(): void {
    let observer = new MutationObserver(mutations => {
      mutations.forEach(function (mutation) {
        console.log(mutation.type);
      });
    });
    var config = { attributes: true, childList: true, characterData: true };

    observer.observe(this.elRef.nativeElement, config);
  
  }

}
