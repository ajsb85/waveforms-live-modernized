import { Observable } from 'rxjs';
import { catchError, map, mergeMap, retryWhen, timeout } from 'rxjs/operators';

declare module 'rxjs' {
  interface Observable<T> {
    catch(selector: (...args: any[]) => any): Observable<any>;
    flatMap(project: (...args: any[]) => any): Observable<any>;
    map(project: (...args: any[]) => any): Observable<any>;
    retryWhen(notifier: (errors: Observable<any>) => any): Observable<any>;
    timeout(due: number | Date): Observable<any>;
  }
}

type LegacyObservable<T = any> = Observable<T> & {
  catch?: (selector: (...args: any[]) => any) => Observable<any>;
  flatMap?: (project: (...args: any[]) => any) => Observable<any>;
  map?: (project: (...args: any[]) => any) => Observable<any>;
  retryWhen?: (notifier: (errors: Observable<any>) => any) => Observable<any>;
  timeout?: (due: number | Date) => Observable<any>;
};

const proto = Observable.prototype as LegacyObservable;

if (typeof (Observable as any).create !== 'function') {
  (Observable as any).create = <T>(subscribe: any) => new Observable<T>(subscribe);
}

if (typeof proto.flatMap !== 'function') {
  proto.flatMap = function legacyFlatMap(project) {
    return this.pipe(mergeMap(project as any));
  };
}

if (typeof proto.map !== 'function') {
  proto.map = function legacyMap(project) {
    return this.pipe(map(project as any));
  };
}

if (typeof proto.catch !== 'function') {
  proto.catch = function legacyCatch(selector) {
    return this.pipe(catchError(selector as any));
  };
}

if (typeof proto.retryWhen !== 'function') {
  proto.retryWhen = function legacyRetryWhen(notifier) {
    return this.pipe(retryWhen(notifier as any));
  };
}

if (typeof proto.timeout !== 'function') {
  proto.timeout = function legacyTimeout(due) {
    return this.pipe(timeout({ first: due as any }));
  };
}

export { Observable };
