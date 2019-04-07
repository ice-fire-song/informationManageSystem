package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	"net/http"
	"reflect"
	"strings"
	_"github.com/lib/pq"
)
const (
	host    = "localhost"
	port    =  5432
	user     = "postgres"
	password = "postgres"
	dbname   = "userInformation"
)

var db *sql.DB
var err error
//包含所有信息
var one userInf //用于登陆验证
var two userInf  //用于注册
var allUser [20000]userInf
//所有函数各自的全局变量
var user1 logInf
func checkErr(err error){
	if(err != nil){
		panic(err)
	}
}
func OpenDatabase(){
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err = sql.Open("postgres", psqlInfo)
	checkErr(err)
}
func login(w http.ResponseWriter, r *http.Request) {


	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json")             //返回数据格式是json

	var s Temp
	s.Company="itcast"
	s.IsOk=false
	s.IsManage = false
	if r.Method == "POST" {
		// 解析url传递的参数
		r.ParseForm()

		for k ,v:= range r.Form{

			err:=json.Unmarshal([]byte(k),&user1)
			//解析失败会报错，如json字符串格式不对，缺"号，缺}等。
			if err!=nil{
				fmt.Println(err)
			}
            if(user1.Username=="我爱罗"&&user1.Password=="123"){
            	s.IsManage = true

				s.Username = ""
				s.Password = ""
				s.Sex = ""
				s.Age = ""
				s.Phone = ""
				s.Mailbox = ""
			} else if(Query(user1.Username)&&user1.Password==one.Password){
				s.IsOk = true
				s.Username = one.Username
				s.Password = one.Password
				s.Sex = one.Sex
				s.Age = one.Age
				s.Phone = one.Phone
				s.Mailbox = one.Mailbox
			}



			//join() 方法用于把数组中的所有元素放入一个字符串。
			//元素是通过指定的分隔符进行分隔的
			strings.Join(v, "")
		}


	}

    
	//编码，根据内容生成json文本
	//control,_:= json.Marshal(s)
	control, err := json.MarshalIndent(s, "", "    ") //格式化编码
	if err != nil {
		fmt.Println("err = ", err)
		return
	}
	fmt.Fprint(w, string(control))  //向前端传值

}
func register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json")             //返回数据格式是json

	s := Temp2 {"itcast", false,false}
	if r.Method == "POST" {
		// 解析url传递的参数
		r.ParseForm()
		fmt.Println(reflect.TypeOf(r.Form))
		fmt.Println("..................")

		for k ,v:= range r.Form{

			err:=json.Unmarshal([]byte(k),&two)
			//解析失败会报错，如json字符串格式不对，缺"号，缺}等。
			if err!=nil{
				fmt.Println(err)
			}
            if Query(two.Username)==true{
            	s.IsHave = true
			}else {
				s.IsOk = Insert()
			}


			//join() 方法用于把数组中的所有元素放入一个字符串。
			//元素是通过指定的分隔符进行分隔的
			strings.Join(v, "")
		}


	}


	//编码，根据内容生成json文本
	//control,_:= json.Marshal(s)
	control, err := json.MarshalIndent(s, "", "    ") //格式化编码
	if err != nil {
		fmt.Println("err = ", err)
		return
	}

	fmt.Fprint(w, string(control))  //向前端传值

}
var dUser dQ
func delete(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json")             //返回数据格式是json


	s := Temp2 {"itcast", false,false}

	if r.Method == "POST" {
		// 解析url传递的参数
		r.ParseForm()

		for k ,v:= range r.Form{

			err:=json.Unmarshal([]byte(k),&dUser)
			//解析失败会报错，如json字符串格式不对，缺"号，缺}等。
			if err!=nil{
				fmt.Println(err)
			}


				s.IsOk = Delete()

			//join() 方法用于把数组中的所有元素放入一个字符串。
			//元素是通过指定的分隔符进行分隔的
			strings.Join(v, "")
		}

	}



	//编码，根据内容生成json文本
	//control,_:= json.Marshal(s)
	control, err := json.MarshalIndent(s, "", "    ") //格式化编码
	if err != nil {
		fmt.Println("err = ", err)
		return
	}

	fmt.Fprint(w, string(control))  //向前端传值
}

func update(w http.ResponseWriter, r *http.Request){

	OpenDatabase()

	err = db.Ping()
	checkErr(err)
	fmt.Println("successful open")
	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json")             //返回数据格式是json

	fmt.Println(r.Method)
	if r.Method=="POST"{
         allInf:=[]userInf{} //所有人的信息，切片存储
		//查询所有数据
		rows, err := db.Query("select * from public.ordinary ")
		checkErr(err)

		for rows.Next() {

			err = rows.Scan(&one.Id, &one.Username,&one.Password,&one.Sex,&one.Age,&one.Phone,&one.Mailbox)
			checkErr(err)
			allInf = append(allInf,one)

		}



		//编码，根据内容生成json文本
		//control,_:= json.Marshal(s)
		control, err := json.MarshalIndent(allInf, "", "    ") //格式化编码
		if err != nil {
			fmt.Println("err = ", err)
			return
		}


		fmt.Fprint(w, string(control))  //向前端传值

	}
}
var qUser dQ
func query(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json")             //返回数据格式是json

	var s Temp
	s.Company="itcast"
	s.IsOk=false
	s.IsManage = false

	if r.Method == "POST" {
		// 解析url传递的参数
		r.ParseForm()
		for k ,v:= range r.Form{

			err:=json.Unmarshal([]byte(k),&qUser)
			//解析失败会报错，如json字符串格式不对，缺"号，缺}等。
			if err!=nil{
				fmt.Println(err)
			}


				s.IsOk =Query(qUser.Username)

			//join() 方法用于把数组中的所有元素放入一个字符串。
			//元素是通过指定的分隔符进行分隔的
			strings.Join(v, "")
		}


	}


	s.Username = one.Username
	s.Password = one.Password
	s.Sex = one.Sex
	s.Age = one.Age
	s.Phone = one.Phone
	s.Mailbox = one.Mailbox
	//编码，根据内容生成json文本
	//control,_:= json.Marshal(s)
	 control, err := json.MarshalIndent(s, "", "    ") //格式化编码
	 if err != nil {
		fmt.Println("err = ", err)
		return
	 }
    fmt.Println(string(control))
	fmt.Fprint(w, string(control))  //向前端传值
}
var mUser userInf
func modify(w http.ResponseWriter, r *http.Request){

	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json")             //返回数据格式是json

	s := Temp2 {"itcast", false,false}

	if r.Method == "POST" {
		// 解析url传递的参数
		r.ParseForm()

		for k ,v:= range r.Form{
			err:=json.Unmarshal([]byte(k),&mUser)
			//解析失败会报错，如json字符串格式不对，缺"号，缺}等。
			if err!=nil{
				fmt.Println(err)
			}

				s.IsOk = Update()


			//join() 方法用于把数组中的所有元素放入一个字符串。
			//元素是通过指定的分隔符进行分隔的
			strings.Join(v, "")
		}


	}


	//编码，根据内容生成json文本
	//control,_:= json.Marshal(s)
	control, err := json.MarshalIndent(s, "", "    ") //格式化编码
	if err != nil {
		fmt.Println("err = ", err)
		return
	}
	fmt.Fprint(w, string(control))  //向前端传值
}
func confirm(w http.ResponseWriter, r *http.Request){

	var s Temp2
	s.Company="itcast"
	s.IsOk=false

	if r.Method == "POST" {

	    var receive confirmInf
		// 解析url传递的参数
		r.ParseForm()

		for k ,v:= range r.Form{

			err:=json.Unmarshal([]byte(k),&receive)
			//解析失败会报错，如json字符串格式不对，缺"号，缺}等。
			if err!=nil{
				fmt.Println(err)
			}

			if(Query(receive.Username)&&receive.Phone==one.Phone){
				s.IsOk = true
			}


			//join() 方法用于把数组中的所有元素放入一个字符串。
			//元素是通过指定的分隔符进行分隔的
			strings.Join(v, "")
		}


	}


	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json")             //返回数据格式是json

	//编码，根据内容生成json文本
	//control,_:= json.Marshal(s)
	control, err := json.MarshalIndent(s, "", "    ") //格式化编码
    checkErr(err)

	fmt.Fprint(w, string(control))  //向前端传值

}
func check(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w,"go go go") //往窗口写东西
}

func main(){

   http.HandleFunc("/",check)//测试golang是否部署成功

	http.HandleFunc("/login", login)
	http.HandleFunc("/register",register)
	http.HandleFunc("/update",update)
	http.HandleFunc("/delete",delete)
	http.HandleFunc("/query",query)
	http.HandleFunc("/modify",modify)
	http.HandleFunc("/confirm",confirm)
	err := http.ListenAndServe(":900", nil)
	if err != nil {
		log.Fatal("ListenAndserve:", err)
	}
}

func Insert() bool {

	OpenDatabase()

	err = db.Ping()
	checkErr(err)
	fmt.Println("successful open")

	stmt, err := db.Prepare("INSERT INTO public.ordinary (username,password,sex, age,phone,mailbox)VALUES ($1, $2,$3,$4,$5,$6)RETURNING id")
	checkErr(err)
	res, err := stmt.Exec(two.Username,two.Password,two.Sex,two.Age,two.Phone,two.Mailbox)
	checkErr(err)
	affect, err :=res.RowsAffected()
	if(err != nil){
		return false
		panic(err)
	}else {
		return true
	}
    fmt.Print(affect)
	fmt.Println("-->from Insert()")
	return false
}
func Delete() bool{
	OpenDatabase()

	err = db.Ping()
	checkErr(err)
	fmt.Println("successful open")
	//删除数据
	stmt, err := db.Prepare("delete from public.ordinary where username=$1")
	checkErr(err)

	res, err := stmt.Exec(dUser.Username)
	checkErr(err)

	affect, err :=res.RowsAffected()
	checkErr(err)
	if(affect==0) {
		return false
	} else{
		return true
	}
	fmt.Print(affect)

   return true
}

func Query(name string ) bool{
	OpenDatabase()
	err = db.Ping()
	checkErr(err)
	fmt.Println("successful open")

	//查询单条数据
	//err := db.QueryRow("SELECT name FROM names WHERE id = ?", id).Scan(&name)
	sqlStatement := `SELECT "id", "username", "password","sex","age","phone","mailbox" FROM ordinary WHERE username=$1`
	row := db.QueryRow(sqlStatement,name)
	err = row.Scan(&one.Id,&one.Username, &one.Password, &one.Sex, &one.Age,&one.Phone,&one.Mailbox)
	fmt.Println(one)
	if(err != nil){
		return false
		panic(err)
	}else {
		return true
	}
	fmt.Println(one)
	return false
}
func Update()bool{
	OpenDatabase()

	err = db.Ping()
	checkErr(err)
	fmt.Println("successful open")

	//更新数据
	stmt, err := db.Prepare("update public.ordinary set sex=$1,age=$2,phone=$3,mailbox=$4 where username=$5")
	checkErr(err)

	a,err:=stmt.Exec(mUser.Sex,mUser.Age,mUser.Phone,mUser.Mailbox,mUser.Username)
	checkErr(err)

	affect, err := a.RowsAffected()
	if(err != nil){
		return false

		panic(err)
	}else {
		return true
	}
	fmt.Print(affect)
	fmt.Println("-->from Delete()")
	return false
}

type userInf struct {
	Id string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Sex string `json:"sex"`
	Age string `json:"age"`
	Phone string `json:"phone"`
	Mailbox string `json:"mailbox"`
}

type logInf struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type Temp struct {   //返回的辅助结构体
	Company string `json:"-"` //此字段不会输出到屏幕
	//Company  string   `json:"company"`       这样打印输出别名首字母就会小写(二次编码)
	IsOk bool `json:",string"`    //注意：首字母要大写
	IsManage bool `json:",string"`
	Username string `json:"username"`
	Password string `json:"password"`
	Sex string `json:"sex"`
	Age string `json:"age"`
	Phone string `json:"phone"`
	Mailbox string `json:"mailbox"`
}

type Temp2 struct {   //用于删除
	Company string `json:"-"` //此字段不会输出到屏幕
	//Company  string   `json:"company"`       这样打印输出别名首字母就会小写(二次编码)
	IsOk bool `json:",string"`    //注意：首字母要大写
	IsHave bool `json:",string"`
}
type dQ struct{
	Username string `json:"username"`
}
type confirmInf struct {
	Username string `json:"username"`
	Phone string `json:"phone"`
}
