import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilityService } from '../utility.service';
import { delay } from 'rxjs/operators';
import { CsvService } from './csv.service';

@Component({
  selector: 'app-mappertest',
  templateUrl: './mappertest.component.html',
  styleUrls: ['./mappertest.component.css']
})
export class MappertestComponent implements OnInit {

  tableData: any = [];
  showEditTable: boolean = false;
  editRowID: any = '';
  constructor(private router: Router,  private utilityService: UtilityService, private csvService: CsvService) { 
    
  }

  ngOnInit() {

    this.getTableData();
    this.modifyTableData();
  }

  getTableData(){
    this.tableData= [
      {id:1, abb: 'CRD'},
      {id:2, abb: 'G&L'},
      {id:3, abb: 'N&N'},
      {id:4, abb: 'M&SO'},
      {id:5, abb: 'U&A'},
      {id:6, abb: 'G&GI'},
      {id:7, abb: 'B&GC'}
    ]
  }

  modifyTableData(){

    
    this.tableData = JSON.parse(localStorage.getItem('tableData'));

  }

  public saveData(){
    console.log(this.tableData);
    localStorage.setItem('tableData', JSON.stringify(this.tableData));
    this.tableData = JSON.parse(localStorage.getItem('tableData'));

    this.router.navigate(['mappertest']);
    this.utilityService.showLoader();
    setTimeout(()=> this.utilityService.hideLoader() ,1500)
   
  }

  public clearData(){
    let todos = JSON.parse(localStorage.getItem('tableData'));

    this.tableData.forEach(function (a) {
      a['fullNameE'] = "";
      a['fullNameC'] = "";
      a['fullNameF'] = ""
    });
    localStorage.setItem('tableData', JSON.stringify(this.tableData));
    this.utilityService.showLoader();
    setTimeout(()=> this.utilityService.hideLoader() ,1500)
  }
  public download(){
    this.csvService.downloadFile(this.tableData, 'jsontocsv');
  }

}
