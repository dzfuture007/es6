// 基本语法
{
    // constructor
    class Parent {
        constructor (name = "mukewang") {
            this.name = name;
        }
    }

    let parent = new Parent('v');

    console.log(parent);
}  

// 继承
{
    class Parent {
        constructor (name = "mukewang") {
            this.name = name;
        }
    }

    class Child extends Parent {

    }

    console.log(new Child());
}
 
// 继承传递参数
{
    // 通过super()覆盖父类的属性
    // 1. 如果super()不带任何参数，它会使用父类的默认值
    // 2. super()语句必须放在constructor方法的最上面，否则会报错！
    class Parent {
        constructor (name = "mukewang") {
            this.name = name;
        }
    }

    class Child extends Parent {
        constructor (name = "child") {
            super(name);
            this.type = "child";
        }
    }

    console.log(new Child("test"));
}

// getter和setter
{
    class Parent {
        constructor (name = "mukewang") {
            this.name = name;
        }

        // 这里longName不是方法而是是属性名
        get longName() {
            return 'mk' + this.name;
        }

        set longName(value) {
            this.name = value;
        }
    }

    let parent = new Parent();

    console.log('getter', parent.longName); // mkmukewang
    parent.longName = 'hello';
    console.log('setter', parent.longName, parent);
}

// 类的静态方法
{
    class Parent {
        constructor (name = "mukewang") {
            this.name = name;
        }
        static tell() {
            console.log('tell');
        }
    }

    Parent.tell(); // tell
}

// 类的静态属性
{
    class Parent {
        constructor (name = "mukewang") {
            this.name = name;
        }
        static tell() {
            console.log('tell');
        }    
    }

    // 直接在类上定义属性就是静态属性
    Parent.type = 'test';

    console.log('静态属性', Parent.type);
}