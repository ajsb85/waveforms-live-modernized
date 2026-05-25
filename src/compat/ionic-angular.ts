import {
  ApplicationRef,
  Component,
  ComponentRef,
  EnvironmentInjector,
  Injector,
  Input,
  ModuleWithProviders,
  NgModule,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef,
  createComponent
} from '@angular/core';
import { CommonModule } from '@angular/common';

export class NavParams {
  constructor(public readonly data: Record<string, any> = {}) {}

  get<T = any>(key: string): T {
    return this.data?.[key] as T;
  }

  get dataObject(): Record<string, any> {
    return this.data;
  }
}

export class ViewController {
  public willDismissHandlers: Array<(data?: any) => void> = [];
  public didDismissHandlers: Array<(data?: any) => void> = [];

  constructor(public readonly dismissCallback: (data?: any) => void = () => {}) {}

  dismiss(data?: any): Promise<any> {
    this.willDismissHandlers.forEach(handler => handler(data));
    this.dismissCallback(data);
    this.didDismissHandlers.forEach(handler => handler(data));
    return Promise.resolve(data);
  }

  onWillDismiss(handler: (data?: any) => void): void {
    this.willDismissHandlers.push(handler);
  }

  onDidDismiss(handler: (data?: any) => void): void {
    this.didDismissHandlers.push(handler);
  }
}

export class Platform {
  ready(): Promise<string> {
    return Promise.resolve('dom');
  }

  is(platformName: string): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    switch (platformName) {
      case 'ios':
        return /iphone|ipad|ipod/.test(userAgent) || (platform === 'macintel' && navigator.maxTouchPoints > 1);
      case 'android':
        return userAgent.includes('android');
      case 'mobile':
      case 'mobileweb':
        return matchMedia('(pointer: coarse)').matches || /iphone|ipad|ipod|android/.test(userAgent);
      case 'cordova':
      case 'capacitor':
        return Boolean((window as any).cordova || (window as any).Capacitor);
      default:
        return false;
    }
  }
}

export class MenuController {
  close(): Promise<void> {
    document.querySelectorAll('ion-menu').forEach(menu => ((menu as HTMLElement).style.display = 'none'));
    return Promise.resolve(undefined);
  }

  open(): Promise<void> {
    document.querySelectorAll('ion-menu').forEach(menu => ((menu as HTMLElement).style.display = ''));
    return Promise.resolve(undefined);
  }
}

export class App {
  setTitle(title: string): void {
    document.title = title ? `${title} - WaveForms Live` : 'WaveForms Live';
  }
}

export class Events {
  public listeners = new Map<string, Array<(...args: any[]) => any>>();

  subscribe(topic: string, handler: (...args: any[]) => any): void {
    const handlers = this.listeners.get(topic) ?? [];
    handlers.push(handler);
    this.listeners.set(topic, handlers);
  }

  unsubscribe(topic: string, handler?: (...args: any[]) => any): void {
    if (!handler) {
      this.listeners.delete(topic);
      return;
    }

    const handlers = this.listeners.get(topic) ?? [];
    this.listeners.set(topic, handlers.filter(candidate => candidate !== handler));
  }

  publish(topic: string, ...args: any[]): any[] {
    return (this.listeners.get(topic) ?? []).map(handler => handler(...args));
  }
}

export class NavController {
  public nav?: Nav;

  attach(nav: Nav): void {
    this.nav = nav;
  }

  setRoot(component: Type<any>, params?: Record<string, any>): Promise<void> {
    return this.nav?.setRoot(component, params) ?? Promise.resolve(undefined);
  }

  push(component: Type<any>, params?: Record<string, any>): Promise<void> {
    return this.nav?.push(component, params) ?? Promise.resolve(undefined);
  }

  pop(): Promise<void> {
    return this.nav?.pop() ?? Promise.resolve(undefined);
  }
}

@Component({
    standalone: false,
  selector: 'ion-nav',
  template: '<ng-template #outlet></ng-template>'
})
export class Nav implements OnDestroy {
  @Input() root?: Type<any>;
  @ViewChild('outlet', { read: ViewContainerRef, static: true }) outlet!: ViewContainerRef;

  public stack: Array<{ component: Type<any>; params?: Record<string, any> }> = [];
  public activeRef?: ComponentRef<any>;

  constructor(
    public readonly navController: NavController,
    public readonly injector: Injector,
    public readonly environmentInjector: EnvironmentInjector
  ) {
    this.navController.attach(this);
  }

  ngAfterViewInit(): void {
    if (this.root) {
      void this.setRoot(this.root);
    }
  }

  ngOnDestroy(): void {
    this.activeRef?.destroy();
  }

  setRoot(component: Type<any>, params?: Record<string, any>): Promise<void> {
    this.stack = [{ component, params }];
    this.renderTop();
    return Promise.resolve(undefined);
  }

  push(component: Type<any>, params?: Record<string, any>): Promise<void> {
    this.stack.push({ component, params });
    this.renderTop();
    return Promise.resolve(undefined);
  }

  pop(): Promise<void> {
    if (this.stack.length > 1) {
      this.stack.pop();
      this.renderTop();
    }
    return Promise.resolve(undefined);
  }

  public renderTop(): void {
    const next = this.stack[this.stack.length - 1];
    if (!next) {
      return;
    }

    this.outlet.clear();
    const navParams = new NavParams(next.params);
    const viewController = new ViewController(() => void this.pop());
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: NavParams, useValue: navParams },
        { provide: ViewController, useValue: viewController }
      ]
    });
    this.activeRef = this.outlet.createComponent(next.component, {
      injector,
      environmentInjector: this.environmentInjector
    });
  }
}

@Component({
    standalone: false,
  selector: 'ion-slides',
  template: '<ng-content></ng-content>',
  host: {
    class: 'wfl-slides'
  }
})
export class Slides {
  activeIndex = 0;
  public locked = false;

  getSlider(): this {
    return this;
  }

  lockSwipes(): void {
    this.locked = true;
  }

  unlockSwipes(): void {
    this.locked = false;
  }

  slideTo(index: number, _speed?: number): Promise<void> {
    if (!this.locked) {
      this.activeIndex = index;
    }
    return Promise.resolve(undefined);
  }

  isBeginning(): boolean {
    return this.activeIndex <= 0;
  }
}

export class Loading {
  public element?: HTMLElement;

  constructor(public readonly options: any = {}) {}

  present(): Promise<void> {
    this.element = document.createElement('div');
    this.element.className = 'wfl-loading-overlay';
    this.element.textContent = this.options.content ?? this.options.message ?? 'Loading...';
    document.body.appendChild(this.element);
    return Promise.resolve(undefined);
  }

  dismiss(): Promise<void> {
    this.element?.remove();
    return Promise.resolve(undefined);
  }
}

export class LoadingController {
  create(options: any = {}): Loading {
    return new Loading(options);
  }
}

class MessageOverlay {
  public willDismissHandlers: Array<(data?: any) => void> = [];
  public element?: HTMLElement;

  constructor(public readonly options: any = {}, public readonly className: string) {}

  setTitle(title: string): void {
    this.options.title = title;
  }

  addButton(button: any): void {
    this.options.buttons = [...(this.options.buttons ?? []), button];
  }

  onWillDismiss(handler: (data?: any) => void): void {
    this.willDismissHandlers.push(handler);
  }

  present(): Promise<void> {
    this.element = document.createElement('div');
    this.element.className = this.className;
    this.element.textContent = this.options.title ?? this.options.message ?? this.options.subTitle ?? '';
    document.body.appendChild(this.element);

    const duration = this.options.duration;
    if (typeof duration === 'number' && duration > 0) {
      window.setTimeout(() => void this.dismiss(), duration);
    }

    return Promise.resolve(undefined);
  }

  dismiss(data?: any): Promise<void> {
    this.willDismissHandlers.forEach(handler => handler(data));
    this.element?.remove();
    return Promise.resolve(undefined);
  }
}

export class ToastController {
  create(options: any = {}): MessageOverlay {
    return new MessageOverlay(options, 'wfl-toast');
  }
}

export class AlertController {
  create(options: any = {}): MessageOverlay {
    return new MessageOverlay(options, 'wfl-alert');
  }
}

class ComponentOverlay {
  instance: any;
  public componentRef?: ComponentRef<any>;
  public host?: HTMLElement;
  public viewController: ViewController;
  public willDismissHandlers: Array<(data?: any) => void> = [];
  public didDismissHandlers: Array<(data?: any) => void> = [];

  constructor(
    public readonly component: Type<any>,
    public readonly params: Record<string, any> | undefined,
    public readonly appRef: ApplicationRef,
    public readonly injector: Injector,
    public readonly environmentInjector: EnvironmentInjector,
    public readonly className: string
  ) {
    this.viewController = new ViewController(data => void this.dismiss(data));
  }

  present(_options?: any): Promise<void> {
    if (this.componentRef) {
      return Promise.resolve(undefined);
    }

    this.host = document.createElement('div');
    this.host.className = this.className;
    document.body.appendChild(this.host);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: NavParams, useValue: new NavParams(this.params) },
        { provide: ViewController, useValue: this.viewController }
      ]
    });

    this.componentRef = createComponent(this.component, {
      environmentInjector: this.environmentInjector,
      elementInjector: injector
    });
    this.instance = this.componentRef.instance;
    this.appRef.attachView(this.componentRef.hostView);
    this.host.appendChild(this.componentRef.location.nativeElement);
    return Promise.resolve(undefined);
  }

  dismiss(data?: any): Promise<void> {
    this.willDismissHandlers.forEach(handler => handler(data));
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
    this.host?.remove();
    this.didDismissHandlers.forEach(handler => handler(data));
    return Promise.resolve(undefined);
  }

  onWillDismiss(handler: (data?: any) => void): void {
    this.willDismissHandlers.push(handler);
  }

  onDidDismiss(handler: (data?: any) => void): void {
    this.didDismissHandlers.push(handler);
  }
}

export class ModalController {
  constructor(
    public readonly appRef: ApplicationRef,
    public readonly injector: Injector,
    public readonly environmentInjector: EnvironmentInjector
  ) {}

  create(component: Type<any>, params?: Record<string, any>, _options?: any): ComponentOverlay {
    return new ComponentOverlay(component, params, this.appRef, this.injector, this.environmentInjector, 'wfl-modal');
  }
}

export class PopoverController {
  constructor(
    public readonly appRef: ApplicationRef,
    public readonly injector: Injector,
    public readonly environmentInjector: EnvironmentInjector
  ) {}

  create(component: Type<any>, params?: Record<string, any>, _options?: any): ComponentOverlay {
    return new ComponentOverlay(component, params, this.appRef, this.injector, this.environmentInjector, 'wfl-popover');
  }
}

@Component({
    standalone: false,
  selector: 'ion-app',
  template: '<ng-content></ng-content>'
})
export class IonicApp {}

@NgModule({
  imports: [CommonModule],
  declarations: [Nav, Slides, IonicApp],
  exports: [CommonModule, Nav, Slides, IonicApp]
})
export class IonicModule {
  static forRoot(_root?: Type<any>): ModuleWithProviders<IonicModule> {
    return {
      ngModule: IonicModule,
      providers: [
        App,
        AlertController,
        Events,
        LoadingController,
        MenuController,
        {
          provide: ModalController,
          deps: [ApplicationRef, Injector, EnvironmentInjector],
          useFactory: (appRef: ApplicationRef, injector: Injector, environmentInjector: EnvironmentInjector) =>
            new ModalController(appRef, injector, environmentInjector)
        },
        NavController,
        Platform,
        {
          provide: PopoverController,
          deps: [ApplicationRef, Injector, EnvironmentInjector],
          useFactory: (appRef: ApplicationRef, injector: Injector, environmentInjector: EnvironmentInjector) =>
            new PopoverController(appRef, injector, environmentInjector)
        },
        ToastController,
        { provide: NavParams, useValue: new NavParams() },
        { provide: ViewController, useValue: new ViewController() }
      ]
    };
  }
}
