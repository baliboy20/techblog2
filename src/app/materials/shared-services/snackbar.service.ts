import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";


@Injectable()
export class SnackbarService{
    constructor(private sbar: MatSnackBar){}
    open(){
        const sbar = this.sbar.open('hello dolly', 'cancel', {duration:1000});
    }

    openWithMsg(value){
        const sbar = this.sbar.open(value, 'cancel', {duration:1000});
    }
}