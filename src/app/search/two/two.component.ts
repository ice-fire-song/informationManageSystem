import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/Storage.service'
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit {

  constructor(private storage:StorageService,public http:HttpClient,public router:Router) { }
  public selfInf:any={
   username:"",
   password:""
  }
  public temp:any[]=[]
  ngOnInit() {
    this.temp=this.storage.get('searchTemp')
    
    let header = { headers: new HttpHeaders({ 'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"})}; 
    this.http.post('http://119.23.40.146:9000/query',this.temp[0],header).subscribe((response:any)=>{
             if(response.IsOk=="true") {
               this.selfInf.username=response.username;
               this.selfInf.password=response.password;      
                      
             }else{
               alert("获取信息失败，请重新验证");  
             
             }          
    }); 
    this.storage.remove('temp');           
  }
 goHome(){
  this.router.navigate(['/home']);
 }
}
