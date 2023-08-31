import { Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-test1,[app-test1],[appTest1]',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component {
  private _isActive =  false

  private _appTest1 = '';

  @Input()
  set appTest1(value: string) {
    this._isActive = Boolean(value);
    this._appTest1 = value;
  }


  @HostBinding('class.active')
  get activeClass() {
    return this._isActive;
  }

  get appTest1(): string {
    return this._appTest1;
  }
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  // ngAfterViewInit() {
  //   // Get a reference to the button element using the ElementRef
  //   const buttonElement = this.el.nativeElement.querySelector('textArea');
  //   console.log(buttonElement, 'what is this');
  //   // Attach a click event listener using Renderer2
  //   this.renderer.listen(buttonElement, 'click', () => {
  //     // Change the background color of the button
  //     this.renderer.setStyle(buttonElement, 'background-color', 'blue');
  //     this.renderer.addClass(buttonElement, this.appTest1);
  //   });

  //   console.log('i am called');
  // }
}
