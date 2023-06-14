import { HttpHeaders } from '@angular/common/http';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const serverUrl = 'http://localhost:4200/';
export const serverBack = 'http://localhost:9428/api/';

