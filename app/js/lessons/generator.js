{
    let state = function* () {
        while (1) {
            yield 'A';
            yield 'B';
            yield 'C';
        }
    };

    let status = state();

    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());    
}

{
    let draw = function (count) {
        // 具体抽奖逻辑
        console.log(`剩余${count}次抽奖`);
    };

    let residue = function* (count) {
        while (count > 0) {
            count --;
            yield draw(count);
        }
    };

    let star = residue(5);
    
    let btn = document.createElement('button');
    btn.id = "start";
    btn.textContent = "抽奖";
    document.body.appendChild(btn);
    document.getElementById('start').addEventListener('click', function() {
        star.next();
    }, false);
}

{
    let ajax = function* () {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({code: 0});
            }, 2000);
        });
    };

    let pull = function() {
        let generator = ajax();
        let step = generator.next();
        step.value.then(function(d) {
            if (d.code !== 0) {
                console.log('wait');                
            } else {
                console.log(d);                
            }
        });
    };

    pull();
}

{
    let ajax = function* () {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({code: 1});
            }, 2000);
        });
    };

    let pull = function() {
        let generator = ajax();
        let step = generator.next();
        let promise = step.value;
        promise.then(function(d) {
            if (d.code !== 0) {
                setTimeout(() => {
                    console.log('wait');  
                    pull();      
                }, 1000);
            } else {
                console.log(d);                
            }  
        });
    };

    pull();
}