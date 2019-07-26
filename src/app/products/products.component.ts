import { Component, OnInit,ViewChild , Inject} from '@angular/core';
import { PokemonService } from './products.service';
import { IPokemon } from './product';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {PageEvent,MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, MatTabChangeEvent} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProductsdialogComponent}from './productsdialog/productsdialog.component'

export interface DialogData {
  product:any;
  operation:string;
}
@Component({
  selector: 'app-pokemon',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedIndex=0;
  displayedColumns: string[]=['id','imageURL','name','description','price','enabled','edit','delete']
  mode:string='Add';
  pokemons: IPokemon[] = [];
  productAdd: any = {};
  productForm: FormGroup;
  isActive: boolean;
  errorMsg: string;
  length=this.pokemons.length;
  pageSize = 10;
  pageSizeOptions: number[] = [5,10, 15, 20];
  pageEvent: PageEvent;
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  constructor(private _pokemonService: PokemonService,
    private fb: FormBuilder,private toastr: ToastrService,public dialog: MatDialog) {
  }
  
  newProduct: any
  ngOnInit() {
    this.initProductForm(true);
    this.getPokemon();
    console.log(this.pokemons);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  dataSource=new MatTableDataSource<IPokemon>(this.pokemons);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  goToProductsForm(){
    this.selectedIndex=1;
  }
  openDialog(_product:any,_operation:string): void {
    const dialogRef = this.dialog.open(ProductsdialogComponent, {
      width: '250px'
      ,data: {product:_product,
        operation:_operation}
    });
    if (_operation=='delete'){
      dialogRef.afterClosed().subscribe(result => {
        if(result=='yes'){
          this.deleteProduct(_product);
        }
      });
    }
  }
  getPokemon() {
    this.errorMsg = '';
    this._pokemonService.getDoge().subscribe(x =>{
      this.pokemons = x;},
      error => {this.errorMsg = error;
        this.toastr.error(error, 'Error', {
          progressBar: true
        })}
      );
  }
  initProductForm(isNew: boolean) {
    if (isNew) {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        imageURL: [''],
        price: [''],
        isActive: [''],
        id:['']
      });
    } else {
      this.productForm = this.fb.group({
        name: [this.productAdd.name],
        description: [this.productAdd.description],
        imageURL: [this.productAdd.imageURL],
        price: [this.productAdd.price],
        isActive: [this.productAdd.isActive],
        id:[this.productAdd.id]
      });
    }
  }

  assignProductFormValue(isNew: boolean) {
    const formValues = Object.assign({}, this.productForm.value);

    if (isNew) {
      this.productAdd = {}
      this.productAdd.name = formValues['name'];
      this.productAdd.description = formValues['description'];
      this.productAdd.imageURL = formValues['imageURL'];
      this.productAdd.price = formValues['price'];
      this.productAdd.isActive = formValues['isActive']
    } else {
      this.productAdd = {}
      this.productAdd.name = formValues['name'];
      this.productAdd.description = formValues['description'];
      this.productAdd.imageURL = formValues['imageURL'];
      this.productAdd.price = formValues['price'];
      this.productAdd.isActive = formValues['isActive']
      this.productAdd.id = formValues['id'];
    }
  }

  addProduct() {
    this.assignProductFormValue(true)
    this._pokemonService.postDoge(this.productAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.getPokemon();
        this.toastr.success('Product has been added', 'Success!', {
          progressBar: true
        })
      }, error => { this.errorMsg = error;
      this.toastr.error(error,'Error')});
    console.log(this.productForm.value)
  }

  deleteProduct(product:any){
    this._pokemonService.deleteProduct(product)
    .subscribe(data =>{data;this.getPokemon();
      this.toastr.success('Product has been deleted', 'Success!', {
        progressBar: true
      })
    } , error =>{ this.errorMsg = error;
      this.toastr.error(error, 'Error', {
      progressBar: true
    })});
    
  }

  updateProduct() {
    this.assignProductFormValue(false)
    this._pokemonService.updateProduct(this.productAdd)
      .subscribe(data => {
        this.initProductForm(true);
        this.getPokemon();
        this.toastr.success('Product has been updated', 'Success!', {
          progressBar: true
        })
      }, error => { this.errorMsg = error;
        this.toastr.error(error, 'Error', {
          progressBar: true
        }) });
  }
  submitForm(){
    if (this.mode=='Add'){
      this.addProduct();
      this.selectedIndex=0
    }
    else{
      this.updateProduct();
      this.mode='Add'
      this.selectedIndex=0
    }
    
  }

  initializeUpdate(product:any){
    this.mode='Update';
    this.productAdd.id = product.id;
    this.productAdd.name = product.name;
    this.productAdd.description = product.description;
    this.productAdd.imageURL = product.imageURL;
    this.productAdd.price = product.price;
    this.productAdd.isActive = product.isActive;
    this.initProductForm(false);
    this.selectedIndex=1
  }
  cancelUpdate(){
    this.mode='Add';
    this.selectedIndex=0;
  }
  onLinkClick(event: MatTabChangeEvent) {
    this.selectedIndex=event.index;
  }
  
}

