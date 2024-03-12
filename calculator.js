function add(num1, num2){
    return num1 + num2;
}

function substract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    switch(operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return substract(num1,num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        default:
            console.log("cannot compute");
    }
    
}

function isOperatorExist(){
    if(operator == null){
        return false;
    }else{
        return true;
    }
}

function isDecimalExist(){
    if(decimal == ''){
        return false;
    }else{
        return true;
    }
}

function displayNum(num){
    //console.log(num);
    if(isOperatorExist() && strNum2.length <10){// display the second number input
        strNum2 += num;
        OP.textContent = `${operator} ${strNum2}`;
        console.log("1");
    }else if(!EndResult  && strNum1.length <10 && !isOperatorExist()){ //display the first number input
        strNum1 += num;
        // let tempDis = OP.textContent;
        OP.textContent = `${strNum1}`;
        // operator = null;
        console.log("2"+operator)
    }else if(EndResult && !isOperatorExist()){ // display the end result after operation. if another num btn
           // clicked (0-9), should function like new calculator 
           EndResult = false;
        strNum1 = num;
        OP.textContent = `${strNum1}`;
        operator = null;
        
        decimal = '';
        console.log("3"+EndResult)
    }else{
        console.log("4");
    }
    
}

function displayOpe(ope){
    
        decimal = ''; //when operator btn clicked, it means we go to second num
                      // so decimal point should reset
         operator = ope;
    

}

function displayDecimal(){
    if(strNum2){
        strNum2 += '.';
    }else{
        strNum1 += '.';
    }
    OP.textContent += '.';
    decimal = '.';
}

function equalResult(){
     const whichButton = document.querySelectorAll(".btnOpe");
    whichButton.forEach((button)=>{
        button.classList.remove("clicked");
    });
    if(strNum2){
        if(operator == '/' && strNum2 == 0){
            alert("Please don't divide by zero");
            clear();
        }else{console.log(strNum1.includes("."));
            if(isDecimalExist() || strNum1.includes(".")){
                
                let floatNum1 = parseFloat(strNum1);
                let floatNum2 = parseFloat(strNum2);
                 result = operate(operator, floatNum1, floatNum2).toFixed(2);
                 decimal = '.';
            }else{
                
                let intNum1 = parseInt(strNum1);
                let intNum2 = parseInt(strNum2);
                 result = operate(operator, intNum1, intNum2);
                 console.log(result - Math.floor(result) !== 0);
                 if(result - Math.floor(result) !== 0){
                    result = result.toFixed(2);
                    
                 }
            }
            
            if(result > 9999999999){
                result = 9999999999;
            }
            OP.textContent = `${result}`;
    
            strNum1 = result.toString();
            operator = null;
            strNum2 = '';
            EndResult = true;
            
        }

    }else{

    }
}

function deleteLastString(){
    console.log(isOperatorExist());
    if(strNum2 && isOperatorExist){
        strNum2 = strNum2.slice(0, -1);
        OP.textContent = `${operator} ${strNum2}`;
        
    }else if(!EndResult && !operator){
        
        strNum1 = strNum1.slice(0, -1);
        
        OP.textContent = `${strNum1}`;
    }else{
        
    }

    
}

function clear(){
    strNum1 = '';
    strNum2 = '';
    operator = null;
    OP.textContent = '';
    EndResult = false;
    decimal = '';
}



let strNum1 = '';
let strNum2 = '';
let operator = null;
let decimal = '';
let EndResult = false;
let result = 0;
const OP = document.querySelector('.operations');

const btnNumber = document.querySelectorAll(".btnNum");
const btnOpe = document.querySelectorAll(".btnOpe");
const btnEqual = document.querySelector(".equal");
const btnClear = document.querySelector(".btnClear");
const btnDecimal = document.querySelector(".btnDecimal");
const btnBackspace = document.querySelector(".btnBackspace");

btnNumber.forEach((button)=>{
    button.addEventListener("click", () =>{
        displayNum(button.textContent.toString());
        //console.log(button.textContent.toString());
    });
});

btnOpe.forEach((button)=>{
    button.addEventListener("click", () =>{
        if(isOperatorExist() || strNum1 === ''){
            console.log("cannot add operator");
        }else{
            EndResult = false;
            displayOpe(button.textContent.toString());
            button.classList.add("clicked");
        }
        //console.log(button.textContent.toString());
    });
});

btnEqual.addEventListener("click", () =>{
   equalResult();
});

btnClear.addEventListener("click", ()=> clear());

btnDecimal.addEventListener("click", () =>{
    if(isDecimalExist()){
        console.log("there is already decimal point");
    }else{
        displayDecimal(btnDecimal.textContent.toString());
    }
});

btnBackspace.addEventListener("click", ()=> {
    deleteLastString();
});

// document.querySelector('document').keypress(function(event){
//     console.log(event.which);
//     //0
//     if(event.which == 48){
//       string += 0;
//       $("#calc").text(string);
//     }
// });

document.addEventListener("keydown", (event) => {
    console.timeLog(event.key);
    if(event.keyCode >= 48 && event.keyCode <= 57 && event.key != '*'){
        displayNum(event.key.toString());
    }
    switch (event.key){
        case 'Backspace':
            deleteLastString();
            break;
        case '-':
        case '+':
        case '*':
        case '/':
            if(isOperatorExist() || strNum1 === ''){
                console.log("cannot add operator");
            }else{
                EndResult = false;
                displayOpe(event.key);
                btnOpe.forEach((button)=>{
                    if(button.textContent == operator){
                        button.classList.add("clicked");
                    }
                });
                
            }
            break;
        case '.':
            if(isDecimalExist()){
                console.log("there is already decimal point");
            }else{
                displayDecimal(event.key.toString());
            }
            break;
        case 'c':
            clear()
            break;
        case '=':
        case 'Enter':
            
            equalResult();
            break;
    }
  


});




