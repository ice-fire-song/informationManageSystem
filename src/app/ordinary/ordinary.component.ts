import { Component, OnInit,ViewChild } from '@angular/core';
import { StorageService } from '../services/Storage.service'
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-ordinary',
  templateUrl: './ordinary.component.html',
  styleUrls: ['./ordinary.component.css']
})
export class OrdinaryComponent implements OnInit {
  @ViewChild('tip') tip:any;
  @ViewChild('modify') change:any;
  constructor(private storage:StorageService,public http:HttpClient,public router:Router) { }
  private header = { headers: new HttpHeaders({ 'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"})};
  public api:string= "http://119.23.40.146:9000/";
  public temp:any[]=[]
  public selfInf:any= {
    username:"",
    password:"",
    sex:"男",
    age:"",
    phone:"",
    mailbox:""
  }
  public cloneInf:any= {
    username:"",
    password:"",
    sex:"男",
    age:"",
    phone:"",
    mailbox:""
  }
  ngOnInit() {
    this.temp=this.storage.get('temp')
   

    this.http.post(this.api+"login",this.temp[0],this.header).subscribe((response:any)=>{
             if(response.IsOk=="true") {
               this.selfInf.username = this.cloneInf.username = response.username;
               this.selfInf.sex = this.cloneInf.sex = response.sex;
               this.selfInf.age = this.cloneInf.age = response.age;
               this.selfInf.phone = this.cloneInf.phone = response.phone;
               this.selfInf.mailbox = this.cloneInf.mailbox = response.mailbox;              
             
             }else{
               alert("获取失败，请重新登陆");  
               this.storage.remove('temp');
           
             }          
    }); 
  }
  goModify() {
    this.change.nativeElement.style.opacity=1;
    this.tip.nativeElement.innerText="";
  }
  goHome(){
    this.router.navigate(['/home']);
  }
  hide(){
    this.change.nativeElement.style.opacity=0;
   
  }
  selfModify(){
    let str:string="";
    let pLength=this.cloneInf.phone.length;
    let isHave=this.cloneInf.mailbox.indexOf("@");
    if(pLength==0) str+="手机号码不能为空\n";
     else if(pLength!=11) str+="手机号码输入非法\n";
    if(isHave<0) str+="邮箱输入非法\n";

    if(pLength!=0&&pLength==11&&isHave>=0) {
        //x-www-form-urlencoded
       

        this.http.post(this.api+"modify",this.cloneInf,this.header).subscribe((response:any)=>{
             if(response.IsOk=="true"){
               this.tip.nativeElement.innerText="修改成功";
             }else {
               this.tip.nativeElement.innerText="修改失败，请重新修改";
             }
        });
    }else {
    
        this.tip.nativeElement.innerText=str;
    
    }

  }

}
