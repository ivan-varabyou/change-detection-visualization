import {
  AfterContentInit,
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentConfig, config } from '../../zone.config';
import { DefaultComponent } from '../components/zone/default.component';
import { RootComponent } from '../components/zone/root.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootComponent],
  template: ` <ng-container #parentCcontainer></ng-container> `,
})
export class DynamicComponent implements AfterViewInit {
  @ViewChild('parentCcontainer', { read: ViewContainerRef })
  parentContainer!: ViewContainerRef;

  constructor(protected app: ApplicationRef) {}

  ngOnInit(): void {
    console.group('AppComponent');
  }

  ngAfterViewInit(): void {
    this.renderComponents(config, this.parentContainer, DefaultComponent);
    console.groupEnd();
  }

  runZone() {
    this.app.tick();
  }

  renderComponents(
    config: ComponentConfig,
    container: ViewContainerRef,
    componentType: Type<DefaultComponent>
  ): void {
    const component = container.createComponent(componentType, {
      projectableNodes: [
        [
          ...config.children!.map((config0) => {
            const childrenCompoent = container.createComponent(componentType, {
              projectableNodes: [
                [
                  ...config0.children!.map((config1) => {
                    const childrenCompoent0 = container.createComponent(
                      componentType,
                      {
                        projectableNodes: [
                          [
                            ...config1.children!.map((config2) => {
                              const childrenCompoent1 =
                                container.createComponent(componentType, {});

                              return this.getNativeElement(
                                childrenCompoent1,
                                config2,
                                'children1'
                              );
                            }),
                          ] || [],
                        ],
                      }
                    );
                    ('children0');
                    return this.getNativeElement(
                      childrenCompoent0,
                      config1,
                      'children0'
                    );
                  }),
                ] || [],
              ],
            });

            return this.getNativeElement(childrenCompoent, config0, 'children');
          }),
        ] || [],
      ],
    });
    console.groupEnd();

    component.instance.componentName = config.componentName;
    component.instance.style = config.style;
  }
  i = 0;
  getNativeElement(
    component: ComponentRef<DefaultComponent>,
    config: ComponentConfig,
    classes: string
  ) {
    console.log(config);
    component.instance.componentName = config.componentName;
    component.instance.style = config.style;
    component.instance.value = this.i;
    component.location.nativeElement.class = classes;
    return component.location.nativeElement;
  }
}
