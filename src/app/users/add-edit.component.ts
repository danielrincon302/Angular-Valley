import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    fkproducto!: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    lista:string[]=[];
    filteredCiudades = [];
    selectedDepto = '';
    selectedCiudad = '';
    selectedNotificaciones= '';
    countries: any[]=[];
    ListaProductos2:string[]=[];
    listaProductos: any[]=[];
    listaNotificaciones:any[]=[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.accountService.getAllDeptos()
            .pipe(first())
            .subscribe(response=>{    
                this.countries = response.data;
                //console.log(response.data[1]["f100_desc"]);
                console.log(response.data);
                //this.lista.push(response.data[1]["f100_desc"]);
                for(let key in response.data) {
                    let child = response.data[key]["name"];
                    let childKey = response.data[key]["id"];
            
                    }

              })
  
            console.log(this.lista);

        // form with validation rules
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            notificaciones: ['', Validators.required],
            // password only required in add mode
            password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]]
        });
        this.form.controls['username'].disable(); 
        this.form.controls['firstName'].disable(); 
        this.form.controls['lastName'].disable(); 

        this.form.controls['notificaciones'].disable(); 

        this.title = 'Nuevo Usuario';
        if (this.id) {
            // edit mode
            this.title = 'Ver vendedores';
            this.loading = true;
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    deleteTest(id:BigInteger){
        console.log("Borrar notificacion");
        console.log(id);
        
        this.accountService.deleteNotify(id)
            .pipe(first())
            .subscribe(response=>{   
                console.log("Borrado");
                console.log((document.getElementById("states") as HTMLInputElement).value);
                this.router.navigateByUrl('/users');
              })

    }

    //selectedDepto producto
    mySelectHandler(selectedDepto:BigInteger){

        this.ListaProductos2=[];
        this.accountService.getProducto(selectedDepto)
            .pipe(first())
            .subscribe(response=>{   
                console.log(response.data); 
                this.listaProductos = response.data
                /*for(let key in response.data) {
                    let child = response.data[key]["name"];
                    console.log(child);
                    this.ListaProductos2.push(child);
                }*/
              })
            console.log(this.selectedDepto);
            console.log(this.ListaProductos2);

    }

    mySelectHandlerProd(selectedProduct:string){
        this.fkproducto = selectedProduct;
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    fkproducto!: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    lista:string[]=[];
    filteredCiudades = [];
    selectedDepto = '';
    selectedCiudad = '';
    selectedNotificaciones= '';
    vendedores: any[]=[];
    ListaProductos2:string[]=[];
    listaProductos: any[]=[];
    listaNotificaciones:any[]=[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.accountService.getAllDeptos()
            .pipe(first())
            .subscribe(response=>{    
                this.vendedores = response.data;
                //console.log(response.data[1]["f100_desc"]);
                console.log(response.data);
                //this.lista.push(response.data[1]["f100_desc"]);
                for(let key in response.data) {
                    let child = response.data[key]["name"];
                    let childKey = response.data[key]["id"];
            
                    }

              })
  
            console.log(this.lista);

        // form with validation rules
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            notificaciones: ['', Validators.required],
            // password only required in add mode
            password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]]
        });
        this.form.controls['username'].disable(); 
        this.form.controls['firstName'].disable(); 
        this.form.controls['lastName'].disable(); 

        this.form.controls['notificaciones'].disable(); 

        this.title = 'Nuevo Usuario';
        if (this.id) {
            // edit mode
            this.title = 'Ver vendedores';
            this.loading = true;
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    deleteTest(id:BigInteger){
        console.log("Borrar notificacion");
        console.log(id);
        
        this.accountService.deleteNotify(id)
            .pipe(first())
            .subscribe(response=>{   
                console.log("Borrado");
                console.log((document.getElementById("states") as HTMLInputElement).value);
                //this.router.navigateByUrl('/users');

                //refrescar lista
                this.accountService.getNotify(""+this.fkproducto)
                    .pipe(first())
                        .subscribe(response=>{   
                                    this.listaNotificaciones = response.data;
                                    console.log("Nuevo registro: " + this.listaNotificaciones); 
                                    console.log("Nuevo registro FK: " + this.fkproducto); 
                                    this.alertService.success('Notificaciones actualizadas', { keepAfterRouteChange: true });
                                  })

              })

    }

    //selectedDepto producto
    mySelectHandler(selectedDepto:BigInteger){

        this.ListaProductos2=[];
        this.accountService.getProducto(selectedDepto)
            .pipe(first())
            .subscribe(response=>{   
                console.log(response.data); 
                this.listaProductos = response.data
                /*for(let key in response.data) {
                    let child = response.data[key]["name"];
                    console.log(child);
                    this.ListaProductos2.push(child);
                }*/
              })
            console.log(this.selectedDepto);
            console.log(this.ListaProductos2);

    }

    mySelectHandlerProd(selectedProduct:string){
        this.fkproducto = selectedProduct;
        console.log("Seleccion de producto-notificaciones"); 
        this.listaNotificaciones=[];
        this.accountService.getNotify(selectedProduct)
            .pipe(first())
            .subscribe(response=>{   
                console.log(response.data); 
                this.listaNotificaciones = response.data
                /*for(let key in response.data) {
                    let child = response.data[key]["nota"];
                    console.log(child);
                    this.listaNotificaciones.push(child);

                }*/
              })

            console.log(this.listaNotificaciones);
            console.log("k prod" + this.fkproducto);
            this.form.controls['notificaciones'].enable(); 
    }

    onSubmit() {
        this.submitted = true;

        // reset alertas on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.saveUser();
        //this.router.navigateByUrl('/users');
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.submitting = true;

    }

    private saveUser() {
        console.log("Nueva Notify")
        const body = { nota: ' '  , id: '0'};
        body["nota"] = this.form.controls['notificaciones'].value; 
        body["id"] = this.fkproducto!;
        console.log(this.ListaProductos2);
        console.log(body);


        this.accountService.postNotify(body)
            .pipe(first())
                        .subscribe(response=>{   
                            //this.listaNotificaciones = response.data;
                            console.log("Nuevo registro para FK: " + this.fkproducto); 
                            //refrescar lista
                            this.accountService.getNotify(""+this.fkproducto)
                                .pipe(first())
                                .subscribe(response=>{   
                                    this.listaNotificaciones = response.data;
                                    console.log("Nuevo registro: " + this.listaNotificaciones); 
                                    console.log("Nuevo registro FK: " + this.fkproducto); 
                                    this.alertService.success('Notificaciones actualizadas', { keepAfterRouteChange: true });
                                    
                                  })
                })    

    }
}
