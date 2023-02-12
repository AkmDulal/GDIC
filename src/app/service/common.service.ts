import {ElementRef, EventEmitter, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';
import {Component, OnInit, Inject} from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  constructor(private snackBar: MatSnackBar, private auth: AuthService, public dialog: MatDialog) { }

  AClicked(msg: string) {
    this.aClickedEvent.emit(msg);
  }

}

