import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.patientForm = this.formBuilder.group({
      title: [''],
      salutation: [''],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      dob: ['', Validators.required],
      maritalStatus: ['unknown'],
      email: ['', [Validators.required, Validators.email]],
      notes: [''],
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      console.log('Form submitted:', this.patientForm.value);
    } else {
      this.markFormGroupTouched(this.patientForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  isFieldInvalid(field: string) {
    return (
      this.patientForm.get(field).invalid && this.patientForm.get(field).touched
    );
  }
}
