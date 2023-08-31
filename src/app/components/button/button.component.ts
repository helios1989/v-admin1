import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';

import { useHostRenderer } from '../../cdk/dom';
import { NgIf, NgClass, CommonModule } from '@angular/common';

export type ThyButtonType =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'outline-primary'
  | 'outline-default'
  | 'danger'
  | 'link'
  | 'link-secondary'
  | 'warning'
  | 'outline-warning'
  | 'success'
  | 'outline-success'
  | 'outline-info'
  | 'outline-danger'
  | 'link-danger-weak'
  | 'link-danger'
  | 'link-success';

const btnTypeClassesMap = {
  primary: ['btn-primary'],
  secondary: ['btn-primary', 'btn-md'],
  info: ['btn-info'],
  warning: ['btn-warning'],
  danger: ['btn-danger'],
  'outline-primary': ['btn-outline-primary'],
  'outline-default': ['btn-outline-default'],
  link: ['btn-link'], // 链接按钮
  'link-info': ['btn-link', 'btn-link-info'], // 幽灵链接按钮
  'link-secondary': ['btn-link', 'btn-link-primary-weak'], // 幽灵链接按钮
  'link-danger-weak': ['btn-link', 'btn-link-danger-weak'], // 幽灵危险按钮
  'link-danger': ['btn-link', 'btn-link-danger'], // 危险按钮
  'link-success': ['btn-link', 'btn-link-success'] // 成功按钮
} as const;

const iconOnlyClass = 'thy-btn-icon-only';

/**
* Operation button, support components `thy-button` and `thyButton` directive two forms
* @name thy-button,[thy-button],[thyButton]
* @order 10
*/
@Component({
  selector: 'thy-button,[thy-button],[thyButton]',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
      class: 'thy-btn btn'
  },
})
export class ButtonComponent implements OnInit, AfterViewInit {
  private _initialized = false;

  private _originalText: string = '';

  private _type: string = '';

  private _size: string = '';

  private _icon: string = '';

  private _loadingText: string = '';

  // 圆角方形
  _isRadiusSquare = false;

  iconClass: string[] | null = [];

  svgIconName: string | null = '';

  private get nativeElement(): HTMLElement {
      return this.elementRef.nativeElement;
  }

  private hostRenderer = useHostRenderer();


  @Input()
  set thyButton(value: ThyButtonType) {
      this.setBtnType(value);
  }


  @Input()
  set thyType(value: ThyButtonType) {
      this.setBtnType(value);
  }

  @Input()
  set thySize(size: string) {
      this._size = size;
      if (this._initialized) {
          this.updateClasses();
      }
  }

  @Input()
  set thyIcon(icon: string) {
      this._icon = icon;
      if (this._icon) {
          if (icon.includes('wtf')) {
              const classes = this._icon.split(' ');
              if (classes.length === 1) {
                  classes.unshift('wtf');
              }
              this.iconClass = classes;
              this.svgIconName = null;
          } else {
              this.svgIconName = icon;
          }
      } else {
          this.iconClass = null;
          this.svgIconName = null;
      }
  }

  /**
   * 按钮整块展示
   * @default false
   */
  @HostBinding(`class.btn-block`)
  @Input()
  thyBlock: boolean = false;

  private setBtnType(value: ThyButtonType) {
      if (value) {
          if (value.includes('-square')) {
              this._type = value.replace('-square', '');
              this._isRadiusSquare = true;
          } else {
              this._type = value;
          }

          if (this._initialized) {
              this.updateClasses();
          }
      }
  }

  private setLoadingText(text: string) {
      const spanElement = this.nativeElement.querySelector('span');
      if (spanElement) {
          this.renderer.setProperty(spanElement, 'innerText', text);
      }
  }

  private setLoadingStatus() {
      const innerText =  this._originalText;
      this.updateClasses();
  }

  private updateClasses() {
      let classNames: string[] = [];
      console.log(this._type, 'type of button');
      if (btnTypeClassesMap[this._type as keyof typeof btnTypeClassesMap]) {
          classNames = [...btnTypeClassesMap[this._type as keyof typeof btnTypeClassesMap]];
      } else {
          if (this._type) {
              classNames.push(`btn-${this._type}`);
          }
      }
      if (this._size) {
          classNames.push(`btn-${this._size}`);
      }
      if (this._isRadiusSquare) {
          classNames.push('btn-square');
      }
      this.hostRenderer.updateClass(classNames);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
      this.updateClasses();
      this._initialized = true;
  }

  ngAfterViewInit() {
     this.hostRenderer.removeClass(iconOnlyClass);
      this.wrapSpanForText(this.nativeElement.childNodes);
  }

  private wrapSpanForText(nodes: NodeList): void {
      nodes.forEach(node => {
          if (node.nodeName === '#text') {
              const span = this.renderer.createElement('span');
              const parent = this.renderer.parentNode(node);
              this.renderer.addClass(span, 'thy-btn-wrap-span');
              this.renderer.insertBefore(parent, span, node);
              this.renderer.appendChild(span, node);
          }
      });
      console.log('called me');
  }
}
