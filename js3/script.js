let incrementar = counter(1);

function counter(value){
    let inc = value;
    return function () {
        return inc = inc + 1;
    };
}

console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());