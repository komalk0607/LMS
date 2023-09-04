import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }
  destroyDT() {
    $('#data-table-config').DataTable().clear().destroy();
  }

  getDT() {
    setTimeout(() => { $('#data-table-config').DataTable
    
    ({ pagingType: 'full_numbers', 
    pageLength: 10,
     processing: true, 
     lengthMenu: [5, 10, 25], }); }, 1);
  }

}
