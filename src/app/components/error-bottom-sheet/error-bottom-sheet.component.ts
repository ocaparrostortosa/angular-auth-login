import { Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-error-bottom-sheet',
  templateUrl: './error-bottom-sheet.component.html',
  styleUrls: ['./error-bottom-sheet.component.sass'] 
})
export class ErrorBottomSheetComponent implements OnInit{

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ErrorBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public _data: {errorMessage: any}
    ) {}  

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {
    console.log(this._data)
  }

}
