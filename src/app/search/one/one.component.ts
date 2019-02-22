import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { StorageService } from '../../services/Storage.service'
@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {

  constructor(public http:HttpClient,public router:Router,private storage:StorageService) { }

  ngOnInit() {
  }
  username:string;
  phone:string;
  public searchTemp:any[]=[]
  submit() {
  
    const data = {
      username:this.username,
      phone:this.phone
    };
    
   const data1 = {
     username:this.username
   }
    this.searchTemp.push(data1);
    let header = { headers: new HttpHeaders({ 'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"})};
       this.http.post('http://119.23.40.146:9000/confirm',data,header).subscribe((response:any)=>{
                if(response.IsOk=="true") {
                  this.router.navigate(['/searchTwo']);
                  this.storage.set('searchTemp',this.searchTemp);
               
                             
                }else{
                  alert("信息错误，请重新输入");
                }          
       }); 

     }
}
