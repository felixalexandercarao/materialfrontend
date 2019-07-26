import { Component, OnInit,ViewChild , Inject} from '@angular/core';
import { PokemonService } from '../products.service';
import { IPokemon } from '../product';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {PageEvent,MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, MatTabChangeEvent} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../products.component'

@Component({
  selector: 'app-productsdialog',
  templateUrl: './productsdialog.component.html',
  styleUrls: ['./productsdialog.component.css']
})
export class ProductsdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductsdialogComponent>,
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