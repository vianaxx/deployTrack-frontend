import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

export interface DeployFilter {
  author?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

@Component({
  selector: 'app-deploy-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './deploy-filter.component.html',
  styleUrl: './deploy-filter.component.scss'
})
export class DeployFilterComponent implements OnInit{

  @Output()filterChanged = new EventEmitter<DeployFilter>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      author: [''],
      status: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  applyFilter(): void {
    const filter: DeployFilter = this.form.value;
    console.log('Emitindo filtro:', filter); // Verifique se aparece no console
    this.filterChanged.emit(filter);

  }


  resetFilter(): void{
    this.form.reset();
    this.filterChanged.emit({});
  }

}
