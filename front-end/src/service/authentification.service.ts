import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {serverBack} from "../config/server.config";
import {CodeAcces} from "../models/codeAcces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private correctAccessCode: string | undefined;

  constructor(private httpClient: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    this.fetchAccessCode().subscribe((code) => {
      this.correctAccessCode = code.code;
    });
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
    this.isAuthenticated = true;
  }

  getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }

  getCorrectAccessCode(): string | undefined {
    return this.correctAccessCode;
  }

}
