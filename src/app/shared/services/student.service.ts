import { Injectable } from '@angular/core';
import { BaseHttp } from './base.http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseHttp {

  constructor(public http: HttpClient) {
    super(http, 'students');
  }
}
