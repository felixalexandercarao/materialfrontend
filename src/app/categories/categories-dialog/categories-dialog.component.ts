import { Component, OnInit,ViewChild , Inject} from '@angular/core';
import { CategoryService } from '../categories.service';
import { ICategory } from '../categories';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {PageEvent,MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, MatTabChangeEvent} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../categories.component'
@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.css']
})
export class CategoriesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  doAction(){
    this.dialogRef.close(
      'yes'
    );
  }
}
