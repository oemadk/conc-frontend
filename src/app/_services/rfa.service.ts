import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'https://concolio.eastus.cloudapp.azure.com/api/rfa';
// const AUTH_API = 'http://localhost:8080/api/rfa';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RfaService {

  constructor(private http: HttpClient) {

  }

  rfaAdmission(name: string,
               date_of_birth: string,
               age: string,
               gender: string,
               height: string,
               weight: string,
               department: string,
               date_of_admission: string,
               original_diagnosis: string,
               shortness_of_breath: boolean,
               altered_state_of_mind: boolean,
               chest_pain: boolean,
               hypotension: boolean,
               cardiac_arrest: boolean,
               bleeding: boolean,
               arrhythmia: boolean,
               seizure: boolean,
               focal_deficit: boolean,
               posto: boolean,
               other: boolean,
               clinical: boolean,
               lab: boolean,
               xray: boolean,
               cat: boolean,
               mri: boolean,
               ultrasound: boolean,
               clinical2: boolean,
               lab2: boolean,
               xray3: boolean,
               cat4: boolean,
               mri5: boolean,
               ultrasound6: boolean,
               voice_notes: string,
               status: string
  ): Observable<any> {
    return this.http.post(AUTH_API, {
      name,
      date_of_birth,
      age,
      gender,
      height,
      weight,
      department,
      date_of_admission,
      original_diagnosis,
      shortness_of_breath,
      altered_state_of_mind,
      chest_pain,
      hypotension,
      cardiac_arrest,
      bleeding,
      arrhythmia,
      seizure,
      focal_deficit,
      posto,
      other,
      clinical,
      lab,
      xray,
      cat,
      mri,
      ultrasound,
      clinical2,
      lab2,
      xray3,
      cat4,
      mri5,
      ultrasound6,
      voice_notes,
      status
    }, httpOptions);
  }
  getPending(): Observable<any> {
    return this.http.get(`${AUTH_API}/pending`);
  }
  getAccepted(): Observable<any> {
    return this.http.get(`${AUTH_API}/accepted`);
  }
  getDeclined(): Observable<any> {
    return this.http.get(`${AUTH_API}/declined`);
  }
  getRfa(id: string): Observable<any> {
    return this.http.get(`${AUTH_API}/${id}`);
  }
  declineRfa(id: string, reasons: string): Observable<any> {
    return this.http.post(`${AUTH_API}/${id}/decline`, {id, reasons}, httpOptions);
  }
  acceptRfa(id: string): Observable<any> {
    return this.http.post(`${AUTH_API}/${id}/accept`, {id}, httpOptions);
  }
}
