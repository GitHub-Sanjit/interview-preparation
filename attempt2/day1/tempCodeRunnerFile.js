function outerFunction() {
    this.name = "Outer";
    
    setTimeout(() => {
        console.log(this.name);  // Lexical 'this' = outerFunction's this
    }, 100);
}

outerFunction.call({name: "Custom"});  // "Custom"