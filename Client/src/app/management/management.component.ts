import { Component, OnInit,ViewChild } from '@angular/core';
import { StorageService } from '../services/Storage.service'
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
 


@ViewChild('tip') tip:any;
@ViewChild('otherTip') otherTip:any;
@ViewChild('numText') numText:any;
@ViewChild('table') table:any;
@ViewChild('hb') hbText:any;
  constructor(private storage:StorageService, public http:HttpClient,public router:Router) { }
  private header = { headers: new HttpHeaders({ 'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"})};
  public api:string= "http://127.0.0.1:900/";
  public temp:any[]=[]
  public list:any[]=[]
  public allList:any[]=[]
  public numSum:number
  public pageSum:number
  public nowPages:number=1
  public aim:number
  public selfInf:any= {
    username:"",
    password:"",
    sex:"",
    age:"",
    phone:"",
    mailbox:""
  }
  ngOnInit() {
 
    this.temp=this.storage.get('temp')
   
    this.http.post(this.api+"query",this.temp[0],this.header).subscribe((response:any)=>{
             if(response.IsOk=="true") {
               this.selfInf.username=response.username;
               this.selfInf.sex=response.sex;
               this.selfInf.age=response.age;
               this.selfInf.phone=response.phone;
               this.selfInf.mailbox=response.mailbox;   
             
             }else{
               alert("获取失败，请重新登陆");  
               this.storage.remove('temp');
           
             }          
    }); 
    this.update();
    this.allList=this.storage.get('allInf');
    this.numSum=this.allList.length;
    if(this.numSum>=17){
      this.list=this.allList.slice(0,17);
     
    }else {
      this.list=this.allList.slice(0,this.numSum);
   

    }
    let tp1=this.numSum/17;
    let tp2=this.numSum%17;
    if(tp2!=0){
     this.pageSum=parseInt(tp1.toString())+1;
    }else{
     this.pageSum=parseInt(tp1.toString());
    }
  

  }
  public otherInf:any= {
    username:"",
    password:"",
    sex:"男",
    age:"",
    phone:"",
    mailbox:""
  }

  dQUsername:string

  getkeys(item){
  return Object.keys(item);
  }
  goHome(){
    this.router.navigate(['/home']);
  }
  selfModify(){
    let str:string="";
    let pLength=this.selfInf.phone.length;
    let isHave=this.selfInf.mailbox.indexOf("@");
    if(pLength==0) str+="手机号码不能为空\n";
     else if(pLength!=11) str+="手机号码输入非法\n";
    if(isHave<0) str+="邮箱输入非法\n";

    if(pLength!=0&&pLength==11&&isHave>=0) {
        //x-www-form-urlencoded
       
     
        this.http.post(this.api+"modify",this.selfInf,this.header).subscribe((response:any)=>{
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

  
  insert(){

     const otherClone:any = {
      id: Number(this.table.nativeElement.rows[this.list.length].cells[0].innerHTML)+1,
      username:this.otherInf.username,
      password:this.otherInf.password,
      sex:this.otherInf.sex,
      age:this.otherInf.age,
      phone:this.otherInf.phone,
      mailbox:this.otherInf.mailbox
    }
    let str:string="";
    let nLength=this.otherInf.username.length;
    let pw = this.otherInf.password.length;
    let pLength=this.otherInf.phone.length;
    let isHave=this.otherInf.mailbox.indexOf("@");
    
    if(nLength==0) str+="用户名不能为空\n";
    if(pw==0) str+="密码不能为空\n";
    if(pLength==0) str+="手机号码不能为空\n";
    else  if(pLength!=11) str+="手机号码输入非法\n";
   
    if(isHave<0) str+="邮箱输入非法\n";
    this.otherTip.nativeElement.innerText=str;
    if(nLength!=0 && pw!=0 && pLength!=0 && pLength==11&&isHave>=0){
      this.sameRegister(otherClone);
    }
    this.otherInf.username="";
    this.otherInf.password="";
    this.otherInf.sex="男";
    this.otherInf.age="";
    this.otherInf.phone="";
    this.otherInf.mailbox="";

   }
 sameRegister(otherClone:any) {   
    //x-www-form-urlencoded

  this.http.post(this.api+"register",this.otherInf,this.header).subscribe((response:any)=>{
           if(response.IsOk=="true"&&response.IsHave=="false") {
             this.list.push(otherClone);
             alert("增加成功");         
           }else if(response.IsHave=="true"){
            this.otherTip.nativeElement.innerText="该用户名已被占用，请更改用户名";

           
           } else {
            this.otherTip.nativeElement.innerText="增加出现异常，请重新增加";
      
           }
  });

}
  public historyInfList:any[]=this.storage.get('loginList');
  deleteUser(name:any,pass:any){
      const data ={
        username:name,
        password:pass
      }
      var key:number=JSON.stringify(this.historyInfList).indexOf(JSON.stringify(data));
      if(key!=-1){
        this.historyInfList.splice(key,1);
        this.storage.set('loginList',this.historyInfList);
      }
  }
  delete(){
    let rf = confirm("是否确认删除");
    if(rf==true){
      const data ={
    
        username:this.dQUsername
      }
    
   
     this.http.post(this.api+"delete",data,this.header).subscribe((response:any)=>{
              if(response.IsOk=="true") {
                // this.deleteUser(response.username,response.password);    
                alert("删除成功");
              
              }else{
                alert("用户不存在");
              }          
     }); 
    }
   
    this.dQUsername='';
   
  }
  hide(){
    let str:string=this.hbText.nativeElement.innerText;
    if(str=="隐藏"){
        this.table.nativeElement.style.opacity=0;
        this.hbText.nativeElement.innerText="展现";
    }else if(str=="展现"){
        this.table.nativeElement.style.opacity=1;
        this.hbText.nativeElement.innerText="隐藏";
    }
  }
  update(){
    const data ={
     temp:"temp"
    }

    this.http.post(this.api+"update",data,this.header).subscribe((response:any)=>{
             this.allList=response;
             this.numSum=this.allList.length;
             this.storage.set('allInf',this.allList);     
             console.log(response);          
    })
 
 
  
  }
  query(){
    const data ={
      username:this.dQUsername
    }
 
    this.http.post(this.api+"query",data,this.header).subscribe((response:any)=>{
             if(response.IsOk=="true") { 
               alert(response.username+"\n"+response.sex+"\n"+response.age+"\n"+response.phone+"\n"+response.mailbox);
            
             }else{
               alert("查找不到该用户");
             }          
    }); 
    this.dQUsername='';
  }

  goBack(){
    if(this.nowPages>=2){
      this.nowPages-=1;
      this.allList=this.storage.get('allInf');
      let temp=17*this.nowPages;
      this.list=this.allList.slice(temp-17,temp);
    }
  }
  goOn(){
   
    let temp=this.nowPages*17;
    this.allList=this.storage.get('allInf')
    if(temp<=this.allList.length){
       this.list=this.allList.slice(temp,temp+17);
       this.nowPages+=1;
    }
  }
  jump(){
    if(this.aim<=this.pageSum){
      this.allList=this.storage.get('allInf');
      let temp=17*this.aim;
      this.list=this.allList.slice(temp-17,temp);
      this.nowPages=this.aim;
    }else {
      alert("该页不存在");
    }
  }
}
