import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver'; 
import * as XLSX from 'xlsx'; 

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportAsExcelFile(filename:string, obj:any[]) {
    const exportItem = obj; //this.item是一个数组，包含需要导出的内容
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportItem);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, filename);
  }

  private saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + "_" + new Date().getTime() + "xlsx");
  }
}
