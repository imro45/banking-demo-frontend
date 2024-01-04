import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    minDate = "1950-01-01";
    maxDate = "2005-12-01";
    uploadedFileNames: string[] =[];
    fileUrl: string = "https://storeapi.gerasim.in/customer";

    constructor(    
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            middleName: ['', Validators.required],
            lastName: ['', Validators.required],
            mobileNumber:['', [Validators.required]],
            dateOfBirth:['', [Validators.required]],
            aadhaarNumber:['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            identityProof: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
    onFileSelected(event: any) {
        const file = event.currentTarget.files[0];
        const formObj = new FormData();
        formObj.append('file', file);
        this.http.post("https://storeapi.gerasim.in/api/Customer/Upload", formObj).subscribe((res:any) => {
            debugger;
            this.uploadedFileNames.push(res)
        })
      }

      onUploadClick(event:any) {
        console.log("File Uploaded");
      }
}