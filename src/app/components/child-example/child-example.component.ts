// app-child.component.ts
import { Component, AfterContentInit, ContentChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div>
      <h2>Child Component</h2>
      <ng-content></ng-content>
    </div>
  `,
})
export class ChildExampleComponent implements AfterContentInit {
  @ContentChild('projectedContent', { static: false }) projectedContentRef?: ElementRef;
  constructor(private renderer: Renderer2) {}
  ngAfterContentInit(): void {
    if (this.projectedContentRef) {
      console.log(this.projectedContentRef?.nativeElement);
      this.renderer.setStyle(this.projectedContentRef?.nativeElement, 'background-color', 'blue')
    }
  }

  // ngAfterViewInit() {
  //   this.renderer.setStyle(this.projectedContentRef?.nativeElement, 'background-color', 'blue')
  // }
}
