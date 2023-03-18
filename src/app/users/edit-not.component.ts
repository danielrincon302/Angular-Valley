import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'edit-not.component.html' })
export class EditNotComponent implements OnInit {
    form!: FormGroup;
    id?: BigInteger;
    idparam!: BigInteger;
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
    listaCiudades:string[]=[];
    listaProductos: any[]=[];
    listaNotificaciones:any[]=[];
    nota!: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        //this.id = this.route.snapshot.params['id'];
         this.idparam  = this.route.snapshot.params['id'];
        console.log("this.id");

        console.log(this.id);
        this.accountService.getNotifyUnique(this.idparam)
            .pipe(first())
            .subscribe(response=>{    
                this.nota = response.data;
                //console.log(response.data[1]["f100_desc"]);
                console.log(response.data);
                console.log(this.form.value);
  
                this.form.controls['notificaciones'].setValue(response.data["nota"]);
                //this.lista.push(response.data[1]["f100_desc"]);
                for(let key in response.data) {
                    let child = response.data[key]["nota"];
                    this.form.controls['notificaciones'].setValue(child);
                    console.log(child);
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

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

  
    onSubmit() {
        console.log("salvar notificacion 1");
        console.log(this.form.controls['notificaciones'].value);
        this.saveUser();

        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        console.log("salvar notificacion 2");

    }

    private saveUser() {
        const body = { nota: 'PUT' };
        body["nota"] = this.form.controls['notificaciones'].value;
        console.log("this.idparam: " + this.idparam)
        this.accountService.updateNotify(this.idparam, body);
        console.log("saveUser");

    }
}