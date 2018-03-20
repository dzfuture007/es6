// import 'babel-polyfill';
//import test from './lessons/lesson18-Module模块化';

// ***********************第一种使用方法***********************
// import {A, test, Hello} from './lessons/lesson18-Module模块化';
// console.log(A, test, Hello);

// 如果只需要A
// import {A} from './lessons/lesson18-Module模块化';
// console.log(A);

// // // 导入全部
// // // as后面是模块的别名
// import * as lesson from './lessons/lesson18-Module模块化';
// console.log(lesson.A, lesson.test, lesson.Hello);


// ***********************第二种使用方法***********************
import lesson from './lessons/lesson18-Module模块化';
console.log(lesson.A, lesson.test, lesson.Hello);