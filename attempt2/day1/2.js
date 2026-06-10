const obj = {
    name: "Object",
    regularFunc: function() {
        console.log(this.name);  // 'this' is dynamic!
    },
    arrowFunc: () => {
        console.log(this.name);  // 'this' is lexical from outer scope
    }
};

obj.regularFunc();  // "Object" (this = obj)
obj.arrowFunc();    // undefined (this = outer/global)

// Arrow functions capture 'this' lexically
function outerFunction() {
    this.name = "Outer";
    
    setTimeout(() => {
        console.log(this.name);  // Lexical 'this' = outerFunction's this
    }, 100);
}

outerFunction.call({name: "Custom"});  // "Custom"