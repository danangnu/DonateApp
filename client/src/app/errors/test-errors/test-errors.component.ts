import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Smsmain } from 'src/app/_models/smsmain';
import { SmsParams } from 'src/app/_models/smsparams';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/'
  validationErrors: string[] = [];
  //smsmain: Smsmain;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    /*for (let i = 0; i < 100; i++) {
      const smsparams: SmsParams = {};
      const smsmain: Smsmain = {};
      smsparams.login = 'admin';
      smsparams.pass = 'password';
      smsparams.to = '+61400252637';
      smsparams.message = (i+1).toString();
      smsmain.method = 'sms.send_sms';
      smsmain.params = smsparams;
      console.log(JSON.stringify(smsmain));
      this.http.post<Smsmain>('https://192.168.18.43/index.php/jsonrpc/sms', JSON.stringify(smsmain)).subscribe(data => {
        console.log(data);
      });
    }*/
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }
}
