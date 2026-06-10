// ❌ Wrong expectation
const functions = [];

for (var i = 0; i < 3; i++) {
    functions.push(function() {
        console.log(i);  // All share same lexical i
    });
}

functions[0]();  // 3
functions[1]();  // 3
functions[2]();  // 3


// ✅ Solution with new lexical scope per iteration
const functions2 = [];

for (let i = 0; i < 3; i++) {  // let creates new binding each iteration
    functions2.push(function() {
        console.log(i);
    });
}

functions2[0]();  // 0
functions2[1]();  // 1
functions2[2]();  // 2