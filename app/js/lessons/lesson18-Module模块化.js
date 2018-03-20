// ***********************第一种使用方法***********************

// export let A = 13;

// export function test() {
//     console.log('test');
// }

// export class Hello {
//     test() {
//         console.log('class');
//     }
// }




// ***********************第二种使用方法***********************
let A = 13;

let test = function() {
    console.log('test');
}

class Hello {
    test() {
        console.log('class');
    }
}

export default {
    A,
    test,
    Hello
}