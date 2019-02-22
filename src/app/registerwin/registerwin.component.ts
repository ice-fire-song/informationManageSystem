import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-registerwin',
  templateUrl: './registerwin.component.html',
  styleUrls: ['./registerwin.component.css']
})


export class RegisterWinComponent implements OnInit {

  @ViewChild('tipText') tipText:any;
  @ViewChild('pText') pText:any;
  @ViewChild('nText') nText:any;
  @ViewChild('mText') mText:any;
  @ViewChild('uText') uText:any;
  @ViewChild('ppText') ppText:any;
  constructor(public router:Router,public http:HttpClient) { }


  ngAfterViewInit(): void {   
   
  }
  ngOnInit() {
  }
 
  public userInf:any= {
    username:"",
    password:"",
    sex:"男",
    age:"",
    phone:"",
    mailbox:""
  }
  password2:string;
  confirm(){

    let length:Number=this.userInf.phone.length;
    let uLength:Number=this.userInf.username.length;
    let pLength:Number=this.userInf.password.length;
    let p = this.password2==this.userInf.password? true:false;
    let n = length==11?true:false;
    let isHave=this.userInf.mailbox.indexOf("@");

    if(p==false) this.pText.nativeElement.innerText="密码不一致";
     else this.pText.nativeElement.innerText="";
    if(pLength==0) this.ppText.nativeElement.innerText="密码不能为空";
     else this.ppText.nativeElement.innerText="";

    if(uLength==0) this.uText.nativeElement.innerText="用户名不能为空";
     else this.uText.nativeElement.innerText="";

    if(length==0) this.nText.nativeElement.innerText="手机号码不能为空";
     else if(n==false) this.nText.nativeElement.innerText="手机号码输入非法";
           else  this.nText.nativeElement.innerText="";
    if(isHave<0) this.mText.nativeElement.innerText="邮箱输入非法";
     else this.mText.nativeElement.innerText="";

    if(uLength!=0 && p && n && length!=0 && this.userInf.password.length!=0 && isHave>=0){
      this.goRegisterok();
    }
 
  }
  goRegisterok() {
    
    
        //x-www-form-urlencoded
      let header = { headers: new HttpHeaders({ 'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"})};
      this.http.post('http://119.23.40.146:9000/register',this.userInf,header).subscribe((response:any)=>{
               if(response.IsOk=="true"&&response.IsHave=="false") {
                 this.router.navigate(['/success']);
               }else if(response.IsOk=="false"&&response.IsHave=="true"){
                this.tipText.nativeElement.innerText="该用户名已被占用，请更改用户名";
               
               } else {
                this.tipText.nativeElement.innerText="注册出现异常，请重新注册";
              
               }
      });
  
  }
}
