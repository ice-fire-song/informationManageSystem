import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { StorageService } from '../services/Storage.service'

//普通路由和js的跳转
import{Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'managementApp';
  constructor(public router:Router, public http:HttpClient,private storage:StorageService) { }

  ngOnInit() {
  
  }
  username:string;
  password:string;
  public historyInfList:any[]=[]
  public temp:any[]=[]
  login() {
    const data = {
      username:this.username,
      password:this.password
    };
    var loginInf = this.storage.get("loginList");
    if(loginInf){
      this.historyInfList=loginInf;
    }
    this.temp.push(data);


   
  
      if(JSON.stringify(this.historyInfList).indexOf(JSON.stringify(data))==-1){
          //x-www-form-urlencoded
       const header = { headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}) };   
       this.http.post('http://119.23.40.146:9000/login',data,header).subscribe((response:any)=>{
              if(response.IsManage=="true"){
                this.router.navigate(['/manage']);
                this.storage.set('temp',this.temp);
            
              } else if(response.IsOk=="true"&&response.IsManage=="false"){
                this.router.navigate(['/ordinary']);
                this.storage.set('temp',this.temp);
                this.storage.set('loginList',this.historyInfList);
              } else {
                alert("信息错误或其他异常，请重新登陆");
              }  
             
       }); 
        
      } else {
        this.router.navigate(['/ordinary']);
        this.storage.set('temp',this.temp);
      
      }  
}


}
