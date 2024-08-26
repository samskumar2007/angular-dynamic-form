import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGeneratorService } from 'src/app/services/form-generator.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  @Input() jsonConfig: any;
  form!: FormGroup;

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnInit(): void {

    let jData = this.jsonConfig;
    //console.log(jData);

    //sorting the json based on group field
    function sortFieldsByGroup(data: { fields: { group: String; }[]; }) {
        data.fields.sort((a: { group: String; }, b: { group: String; }) => {
            if (a.group < b.group) {
                return -1;
            }
            if (a.group > b.group) {
                return 1;
            }
            return 0;
        });
    
        return data;
    }
  
  
    this.jsonConfig = sortFieldsByGroup(jData);
    console.log(this.jsonConfig);

    this.form = this.formGeneratorService.createForm(this.jsonConfig);
  }

  formatLabel(value: number): string {
    return `${value}€`;
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
