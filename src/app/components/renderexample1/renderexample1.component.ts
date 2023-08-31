import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-renderer-example',
  template: `
    <button #myButton>Click Me</button>
  `,
})
export class Renderexample1Component {
  @ViewChild('myButton', { static: true }) myButton!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Access the native element using ViewChild
    const buttonElement = this.myButton.nativeElement;

    // Use Renderer2 to modify the button element
    this.renderer.setStyle(buttonElement, 'background-color', 'blue');
    this.renderer.setStyle(buttonElement, 'color', 'white');

    // Add a click event listener using Renderer2
    this.renderer.listen(buttonElement, 'click', () => {
      this.renderer.setStyle(buttonElement, 'background-color', 'green');
    });
  }
}
