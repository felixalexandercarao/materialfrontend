export interface ICategory{

    name:string;
    description:string;
    productCategories:any[];
    isActive:boolean; 
    childCategories:any[];
    parentCategories:any[];
    id:number;
}