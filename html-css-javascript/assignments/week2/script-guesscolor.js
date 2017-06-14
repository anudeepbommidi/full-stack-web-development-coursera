(function(){
    var colors = ["blue","cyan","gold","gray","green","magenta","orange","red","white","yellow"];
    var index = Math.floor(Math.random() * colors.length);
  console.log("index: "+index);
    var position=-1;
    var numGuesses=0;
    var guess="";
    while(position!=index){
        guess = prompt("I am thinking of one of these colors:"+"\n\n"+
                        colors.join()+"\n\n"+"What color am I thinking of?");
        numGuesses++;
        console.log("guess: "+guess);
        for(var i=0;i<colors.length;i++){
            if(colors[i]==guess)
                position=i;
         }
        console.log(position+" ");
        if(position==-1){
            alert("Sorry, I'm not familiar with that color!");
        }
        else if(position>index){
            alert("My color is alphabatically smaller");
        }
        else if(position<index){
            alert("My color is alphabatically bigger");
        }   
    }   
    document.body.style.backgroundColor=guess;
    
    setTimeout(function() {
        window.alert("Well Done! You took "+numGuesses+" guesses!");
    }, 1 * 100);
})();
           