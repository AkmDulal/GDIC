import { ElementRef, EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from './data.service';
// import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';

export interface DialogData {
  baseURL: string,
  image: string
}

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  aClickedEvent: EventEmitter<any> = new EventEmitter<string>();
  aClickedEventMenu: EventEmitter<any> = new EventEmitter<string>();
  aClickedEventLostMenu: EventEmitter<any> = new EventEmitter<string>();
  onMainEvent: EventEmitter<any> = new EventEmitter();
  onBufferEvent: EventEmitter<any> = new EventEmitter();
  rootUrl = environment.API_URL;
  imageUrl = environment.IMAGE_URL;
  environmentObj = environment;
  element = ElementRef
  bearertoken!: string;
  username!: string;
  snackbarInstant!: MatSnackBarRef<SnackBarComponentExampleSnack>;
  mycookie = this.getCookie(this.environmentObj.tokenKey);
  rolelist = [];
  today: Date = new Date();
  position = 'top-right';
  permissionsAll = Array();
  public activeLangList = [];

  constructor(private snackBar: MatSnackBar, private auth: AuthService, public dialog: MatDialog) {

    // if (this.mycookie) {
    //   this.bearertoken = JSON.parse(decodeURIComponent(this.mycookie)).bearertoken;

    // } else {
    //   this.bearertoken = '';

    // }

  }

  checkPermissionAccess(componentClass: string, type: string | number) {
    // let permissionsArr = Array();
    // let storageValu =  JSON.parse(decodeURIComponent(localStorage.getItem(this.environmentObj.allComponentPermission))) || [];
    // let returnVar = false;
    // (this.permissionsAll.length > 0) ? (permissionsArr = this.permissionsAll) : (permissionsArr = storageValu)
    // if(permissionsArr.length > 0) {
    //   let componetOBJ = permissionsArr.find( elment => elment.component ==  componentClass);
    //   let access = componetOBJ.permissions[type];
    //   returnVar = (access == 1) ? true : false;
    // } else {
    //   returnVar = false;
    //   this.auth.logOut();
    // }
    // return returnVar;
  }

  AClicked(msg: string) {
    this.aClickedEvent.emit(msg);
  }

  AClickedMenu(msg: string): void {
    this.aClickedEventMenu.emit(msg);
  }

  openSnackBar(message: string, action: string, className: string): void {

    const snackBarRef = this.snackBar.openFromComponent(SnackBarComponentExampleSnack, {
      duration: 6000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [className],
      data: { message, getIcon: 'highlight_off' }
    });
    this.snackbarInstant = snackBarRef;
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });

  }

  closeSnackBars(): void {
    this.snackbarInstant.dismiss();
  }

  getCookie(cname: string) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  updateCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 9000 * 60 * 9000000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }



  // Angular Validators
  minDigits(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && this.countDigits(control.value) < min) {
        return { 'minDigits': true };
      }
      return null;
    };
  }

  passMatched(pass: string, cpass: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get(pass);
      const confirmPassword = control.get(cpass);
      return password && confirmPassword && password.value !== confirmPassword.value ? { 'passMatched': true } : null;
    }
  }

  // Non-Angular Validators
  stringSlicer(n: number, control: any) {
    if (control.value.length > n) {
      control.setValue(control.value.slice(0, n));
    } else if (isNaN(Number(control.value.slice(-1)))) {
      control.setValue(control.value.slice(0, -1));
    }
  }

  //image function
  // basicSelectedFile: File;
  // basicImageFile!: File;
  // fileUpload!: { extension: any; base64: File; };
  // up_image_data(fileInput: { target: { files: Blob[]; }; }){
  //   const pre = this;
  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = function (e: any) {
  //       pre.basicImageFile = e.target.result;
  //       let img_data={
  //         extension: fileInput.target.files[0].name.split('.').pop(),
  //         base64: pre.basicImageFile
  //       }   
  //       pre.fileUpload = img_data;
  //     }
  //     reader.readAsDataURL(fileInput.target.files[0]);
  //   }
  // }





  // helper functions
  countDigits(n: number) {
    let count = 0;
    if (n >= 1) {
      ++count;
    }
    while (n / 10 >= 1) {
      n /= 10;
      ++count;
    }
    return count;
  }

  mysqlDate(dateTimes: Date) {
    let dateTime = new Date(dateTimes);
    const yyyy = dateTime.getFullYear().toString();
    let mm: string = (dateTime.getMonth() + 1).toString();
    if (Number(mm) < 10) {
      mm = '0' + mm.toString();
    } else {
      mm = mm.toString();
    }
    let dd = (dateTime.getDate()).toString();
    if (Number(dd) < 10) {
      dd = '0' + dd.toString();
    } else {
      dd = dd.toString();
    }
    let hh = (dateTime.getHours().toString());
    if (Number(hh) < 10) {
      hh = '0' + hh.toString();
    } else {
      hh = hh.toString();
    }
    let mmm = (dateTime.getMinutes()).toString();
    if (Number(mmm) < 10) {
      mmm = '0' + mmm.toString();
    } else {
      mmm = mmm.toString();
    }
    let ss = (dateTime.getSeconds()).toString();
    if (Number(ss) < 10) {
      ss = '0' + ss.toString();
    } else {
      ss = ss.toString();
    }
    return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mmm + ':' + ss;
  }

  getStatus(status: string) {
    let statusname = '';
    switch (status) {
      case '1':
        statusname = 'Active';
        break;
      case '2':
        statusname = 'Inactive';
        break;
      case '3':
        statusname = 'Blocked';
        break;
      case '4':
        statusname = 'Free';
        break;
    }
    return statusname;
  }

  getMonthNmae(month: string) {
    let monthname
    switch (month) {
      case '1':
        monthname = 'JAN'
        break;
      case '2':
        monthname = 'FEB'
        break;
      case '3':
        monthname = 'MAR'
        break;
      case '4':
        monthname = 'APR'
        break;
      case '5':
        monthname = 'MAY'
        break;
      case '6':
        monthname = 'JUN'
        break;
      case '7':
        monthname = 'JUL'
        break;
      case '8':
        monthname = 'AUG'
        break;
      case '9':
        monthname = 'SEP'
        break;
      case '10':
        monthname = 'OCT'
        break;
      case '11':
        monthname = 'NOV'
        break;
      case '12':
        monthname = 'DEC'
        break;
      default:
    }
    return monthname;
  }

  printwindow() {
    //   let documents = this.element.nativeElement.querySelector('.memebr_tbl')
    //   const allmembers = documents.innerHTML;
    //  // const mywindow = window.open('', 'Infinity Marketing Limited', 'height=1000,width=1200');
    //   const mywindow = this.element.nativeElement.open('', 'Infinity Marketing Limited', 'height=1000,width=1200');
    //   // tslint:disable-next-line: max-line-length
    //   mywindow.document.write('<html><head><title></title><style>table {border-collapse: collapse;width:100%;}table, table td, table th {border: 1px solid #666;padding: 6px 8px;font-size: 14px;}.forfooter::before{content:"";display:table;clear:both;}</style>');
    //   mywindow.document.write('</head><body >');
    //   if (this.showPrintHeader) {
    //     // tslint:disable-next-line: max-line-length
    //     mywindow.document.write('<div style="width:100%;display:block;"><h3 style="text-align:center;">Infinity Marketing Ltd.</h3><p style="text-align:center;">Jabbar Tower,Road no-135 House No-42, Level-6, Gulshan Avenue-1 Dhaka-1212,Bangladesh</p><h3  style="text-align:center;">Total Income Report (infinity6)</h3></div>');
    //   }
    //   // tslint:disable-next-line: max-line-length
    //   mywindow.document.write('<div style="width:100%; display:block;"><div style=" width:70%;margin:0 auto;">' + allmembers + '</div></div>');

    //   if (this.showPrintHeader) {
    //     // tslint:disable-next-line: max-line-length
    //     mywindow.document.write('<div class="forfooter" style="width:100%;display:block;margin-top:26px;"><div style="text-align:center;width:100%;margin-top:26px;"> Copyright &copy;' + this.today.getFullYear() + '</div><p style="text-align:center;">All Rights Reserved By Infinity Marketing Limited</p></div>');
    //   }
    //   mywindow.document.write('</body></html>');
    //   mywindow.print();
    //   mywindow.close();
    return true;
  }

  JSONToCSVConvertor(JSONData: any[], ReportTitle: string, ShowLabel: boolean, lside = false, column: any = null) {
    JSONData.forEach(function (json, index) {
      delete json.id;
      delete json.password;
      delete json.facilitator;
      delete json.documentstatus;
      if (column != null) {
        let keys = Object.keys(json)
        keys.forEach(element => {
          let a = column.includes(element);
          if (a == false) {
            delete json[element];
          }
        });
      } else {
        if (lside != false) {
          if (JSONData[index].side === 'l') {
            JSONData[index].side = 'L1'
          } else {
            JSONData[index].side = 'L2'
          }
        }
      }
    })
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
    //var arrData = delete arrData1[key];
    var CSV = "";
    //Set Report title in first row or line
    CSV += ReportTitle + "\r\n\n";
    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";
      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }
      row = row.slice(0, -1);
      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";
      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV == "") {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    var fileName = "Download_";
    // this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");
    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);
    const link = document.createElement("a") as HTMLAnchorElement;
    link.href = uri;
    //set the visibility hidden so it will not effect on your web-layout
    link.style.visibility = "hidden";
    link.download = fileName + ".csv";
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }



}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'snack-bar-component-example-snack',
  templateUrl: './snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
// tslint:disable-next-line:component-class-suffix
export class SnackBarComponentExampleSnack implements OnInit {
  // public snackBar: MatSnackBarRef<SnackbarComponent>;
  constructor(public snackBar: MatSnackBarRef<SnackBarComponentExampleSnack>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }
  ngOnInit(): void {
    //
  }
  closeSnackbar(): void {
    this.snackBar.dismiss();
  }

}



