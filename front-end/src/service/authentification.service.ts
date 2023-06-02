import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {serverBack} from "../config/server.config";
import {CodeAcces} from "../models/codeAcces.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private correctAccessCode: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {
    this.fetchAccessCode().subscribe((code) => {
      this.correctAccessCode.next(code.code);
    });
  }

  async ngOnInit(): Promise<void> {
  }

  fetchAccessCode(): Observable<CodeAcces> {
    return this.httpClient.get<CodeAcces[]>(`${serverBack}/codeAcces`).pipe(
      map(codes => {
        if (codes.length > 0) {
          // we are only interested in the first code
          return codes[0];
        } else {
          throw new Error('No access code found');
        }
      })
    );
  }

  toggleAuthenticate(): void {
    this.isAuthenticated = !this.isAuthenticated;
  }

  getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }

  getCorrectAccessCode(): Observable<string> {
    return this.correctAccessCode.asObservable();
  }

}
