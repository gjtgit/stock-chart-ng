import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import $ from "jquery";
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { isArray } from 'util';
import { ImportResultData } from '../importResultData';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  warninfo:string="";
  summary:ImportResultData[] = new Array(0);
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  btnUploadIsDisabled: Boolean = true; //disable the upload button when no file selected

  selectedFileOnChanged(event: any) {
    this.btnUploadIsDisabled = false;       
  }

  uploadProgress:number = 0;
  upload(file: HTMLInputElement) {
    this.btnUploadIsDisabled = true;
    let token = sessionStorage.getItem("jsessionid");
    let tokenJson = JSON.parse(token);
    if(token != null || tokenJson.expires_in > new Date().getTime()){
      const myUrl = 'http://localhost:8087/stock-upload/upload';
      const myHeaders: HttpHeaders = new HttpHeaders()
      .append('Cache-Control', 'no-cache')  
      .append('Authorization','Bearer'+tokenJson.access_token);

      if (file.value.length === 0) {
        this.warninfo = 'Please select an excel file!';  
        return;  
      }  
      const files: FileList = file.files; 
      const fileLength = files.length;  
      const formData: FormData = new FormData();  
      for (let index = 0; index < fileLength; index++) {  
        const singleFile = files.item(index);  
        formData.append('excelFile', singleFile);  
      }  
      
      // this.http.post(myUrl,formData,
      //   {
      //     reportProgress: true, 
      //     headers: myHeaders,
      //     withCredentials: true
      //   }
      // ).subscribe(res => {  
      //   console.log(res);
      //       this.warninfo = 'Files uploaded successfully!';  
      // });  

      const req = new HttpRequest('POST', myUrl, formData, {  
           reportProgress: true,
           headers: myHeaders,
           withCredentials: true
      });  
      
      this.http.request(req).subscribe(event => {  
        if (event.type === HttpEventType.UploadProgress) {  
        } else if (event instanceof HttpResponse) { 
          if(event.status === 200){
            this.warninfo = 'Files uploaded successfully!';  
            let sum:any;
            if(isArray(event.body)){
              sum = event.body;
              for(var i=0;i<sum.length;i++){
                let tmp = new ImportResultData();
                tmp.companyId = sum[i][0];
                tmp.stockExchange = sum[i][1];
                tmp.numberOfRecords = sum[i][2];
                tmp.fromDate = sum[i][3];
                tmp.toDate = sum[i][4];
                tmp.companyName = sum[i][5];
                this.summary.push(tmp);
              }

            }

          }
        }  
      });  
 
    }

  }

    // isSuccess:Boolean;
  // uploader: FileUploader = new FileUploader({
  //   url: 'http://localhost:8087/stock-upload/upload',
  //   method: 'POST',
  //   itemAlias: 'file',
  //   autoUpload: false,
  //   allowedFileType: ['xlsx', 'xls'],
  //   });

  // uploadFile() {
  //   this.btnUploadIsDisabled = true;   
  //   this.uploader.queue[0].onSuccess = (response, status, headers) => {
  //     if (status === 200) {
  //       console.log('status:' + status);
  //       const tempRes = JSON.parse(response);
  //       if (tempRes.result == 'OK') {
  //         this.isSuccess = true;
  //         this.btnUploadIsDisabled = false;
  //         this.warninfo="Upload successfully.";
  //       } else {
  //         this.isSuccess = false;
  //         this.btnUploadIsDisabled = false;
  //         this.warninfo=tempRes.data;
  //       }
  //     } else {
  //       this.isSuccess = false;
  //       this.btnUploadIsDisabled = false;
  //       this.warninfo="Upload failed, try again later.";
  //     }
  //   };
  //   this.uploader.queue[0].upload();
  // }

  // selectFile(){
  //   $("#file").click();
  // }

}
