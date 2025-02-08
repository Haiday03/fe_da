import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './general/api.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelApiService {
  baseURL=environment.API_BASE_PATH;

  constructor(private apiService: ApiService,
              private http: HttpClient) { }
             
  exportToExcel(): Observable<void> {
    return this.http.get(this.baseURL + 'api/borrow/export/excel', {
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      map((response: HttpResponse<Blob>) => {
        const blob = new Blob([!!response.body ? response.body : new Uint8Array()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'danh_sach_muon_tra.xlsx');
      })
    );
  }
}

