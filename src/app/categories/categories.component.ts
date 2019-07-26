import { Component, OnInit } from '@angular/core';
import { CategoryService } from './categories.service';
import { ICategory } from './categories';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatTabChangeEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CategoriesDialogComponent}from './categories-dialog/categories-dialog.component'

export interface DialogData {
  category:any;
  operation:string;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  selectedIndex: number = 0;
  displayedColumns: string[] = ['id', 'name', 'description','enabled', 'edit', 'delete']
  mode: string = 'Add'
  categories: ICategory[] = [];
  errorMsg: string;
  categoryAdd: any = {};
  categoryForm: FormGroup;
  length: number = this.categories.length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageEvent: PageEvent;
  constructor(private _categoryService: CategoryService,
    private fb: FormBuilder, private toastr: ToastrService,public dialog:MatDialog) { }
  newCategory: any;
  ngOnInit() {
    this.initCategoryForm(true);
    this.getCategory();
    console.log(this.categories);
  }
  getCategory() {
    this.errorMsg = '';
    this._categoryService.getCategories().subscribe(x =>
      this.categories = x,
      error => this.errorMsg = error
    );
  }
  goToCategoriesForm() {
    this.selectedIndex = 1;
  }
  openDialog(_category:any,_operation:string): void {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      width: '250px'
      ,data: {category:_category,
        operation:_operation}
    });
    if (_operation=='delete'){
      dialogRef.afterClosed().subscribe(result => {
        if(result=='yes'){
          this.deleteCategory(_category);
        }
      });
    }
  }
  initCategoryForm(isNew: boolean) {
    if (isNew) {
      this.categoryForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        isActive: [''],
        id: ['']
      });
    } else {
      this.categoryForm = this.fb.group({
        name: [this.categoryAdd.name],
        description: [this.categoryAdd.description],
        isActive: [this.categoryAdd.isActive],
        id: [this.categoryAdd.id]
      });
    }
  }

  assignCategoryFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.categoryForm.value);

    if (isNew) {
      this.categoryAdd = {}
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
      this.categoryAdd.isActive = formValues['isActive']
    } else {
      this.categoryAdd = {}

      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
      this.categoryAdd.isActive = formValues['isActive']
      this.categoryAdd.id = formValues['id'];

    }
  }

  postCategory() {
    this.assignCategoryFormValue(true)
    this._categoryService.postCategory(this.categoryAdd)
      .subscribe(data => {
        this.initCategoryForm(true);
        this.getCategory();
        this.toastr.success('Category has been added', 'Success!', {
          progressBar: true
        })
      }, error => { this.errorMsg = error;
        this.toastr.error(error, 'Error', {
          progressBar: true
        })
       });
    console.log(this.categoryForm.value)
  }

  deleteCategory(category: any) {
    this._categoryService.deleteCategory(category)
      .subscribe(data => {
        data; this.getCategory();
        this.toastr.success('Category has been deleted', 'Success!', {
          progressBar: true
        })
      }
        , error => {
        this.errorMsg = error;
          this.toastr.error(this.errorMsg, 'Error', {
            progressBar: true
          })
        });

  }
  updateCategory() {
    this.assignCategoryFormValue(false)
    this._categoryService.updateCategory(this.categoryAdd)
      .subscribe(data => {
        this.initCategoryForm(true);
        this.getCategory();
        this.toastr.success('Category has been updated', 'Success!', {
          progressBar: true
        })
      }, error => { this.errorMsg = error;
        this.toastr.error(error, 'Error', {
          progressBar: true
        }) });
  }
  submitForm() {
    if (this.mode == 'Add') {
      this.postCategory();
      this.selectedIndex = 0
    }
    else {
      this.updateCategory();
      this.mode = 'Add'
      this.selectedIndex = 0
    }
  }
  initializeUpdate(category: any) {
    this.mode = 'Update';
    this.categoryAdd.id = category.id;
    this.categoryAdd.name = category.name;
    this.categoryAdd.description = category.description;
    this.categoryAdd.isActive = category.isActive;
    this.initCategoryForm(false);
    this.selectedIndex = 1;
  }
  cancelUpdate() {
    this.mode = 'Add'
    this.selectedIndex = 0
  }
  onLinkClick(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
  }
}

