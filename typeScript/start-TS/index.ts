// typeScript의 타입들
// number
// string
// boolean
// null
// undefined
// any : 어떤 타입도 상관없다

// type 지정하기
let a:number = 3
let b:string = "love you"

// any 타입
let c:any = 4
c = "asd"

// 여러 타입 지정
let d:number | string = "asdqq"
d = 123

// 배열
let e:string[] = ['apple', 'mango']
e.push('pear')

// 함수
function addNumber (f:number, g:number):number{
    return f+g
}
addNumber(3, 7)
