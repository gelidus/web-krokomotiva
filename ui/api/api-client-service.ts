/* tslint:disable */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  HealthCheckResponseServingStatus,
  CoreHealthCheckResponse,
  TripVersion,
} from '.';

interface HttpOptions {
  headers?: HttpHeaders,
  params?: HttpParams,
  reportProgress?: boolean,
  withCredentials?: boolean,
}

/**
 * Created with ngx-swagger-client-generator (https://github.com/flowup/ngx-swagger-client-generator)
 */
@Injectable()
export class ApiClientService {

  readonly options: HttpOptions;
  private domain = 'http://localhost:8080';

  constructor(private http: HttpClient,
              @Optional() @Inject('domain') domain: string,
              @Optional() @Inject('httpOptions') options: HttpOptions) {
    if (domain) {
      this.domain = domain;
    }

    this.options = {
      headers: options && options.headers ? options.headers : new HttpHeaders(),
      params: options && options.params ? options.params : new HttpParams()
    };
  }

  getVersion(options?: HttpOptions): Observable<TripVersion> {
    const path = `/version`;
    options = {...this.options, ...options};

    return this.sendRequest<TripVersion>('GET', path, options);
  }

  private sendRequest<T>(method: string, path: string, options: HttpOptions, body?: any): Observable<T> {
    if (method === 'GET') {
      return this.http.get<T>(`${this.domain}${path}`, options);
    } else if (method === 'PUT') {
      return this.http.put<T>(`${this.domain}${path}`, body, options);
    } else if (method === 'POST') {
      return this.http.post<T>(`${this.domain}${path}`, body, options);
    } else if (method === 'DELETE') {
      return this.http.delete<T>(`${this.domain}${path}`, options);
    } else {
      console.error('Unsupported request: ' + method);
      return Observable.throw('Unsupported request: ' + method);
    }
  }
}
