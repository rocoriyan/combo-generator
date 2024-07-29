/*
num pattern will be in a format like "1021"
where each digit is the max number at that digit
the number will start at 0 and then rise.

pattern for 1021:
0000, 0001, 0010, 0011, 0020, 0021,
1000, 1001, 1010, 1011, 1020, 1021

you can figure out the combos by
adding 1 to each of the digits 
then multiplying them together:  1021 -> 2132 -> 2*1*3*2 = 12
*/

function FindComboNum(chars){
    charDigitCombos = chars.map(a => a+1);
    let totalCombo = 1;
    for(let x=0; x<charDigitCombos.length; x++){
        totalCombo = totalCombo * charDigitCombos[x];
    }
    return totalCombo;
}

function DecreaseUserInput(input){               // the user input will be terms of bases but we want to convert it into 1 less than that bc its easier with array indexes
    let arrPattern = StringToNumArr(input);      // e.g. if the user has a group of 2, then 3, then 2, they will enter "232"
    let arrPatternLwr = arrPattern.map(a => a-1);  //      we'll convert this to "121", because we start at 0 and not 1.
    let outputStr = ArrToString(arrPatternLwr);
    return outputStr;
}

function Generate(userPattern){ //this exists solely for the user bc i feel like numbers starting from 0 is unintuitive and will cause confusion
    let numPattern = DecreaseUserInput(userPattern.toString());
    let arrPattern = StringToNumArr(numPattern);
    let patternCombo = FindComboNum(arrPattern);
    console.log(`Number of combinations: ${patternCombo}`);
    let combos = GenAllCombos(arrPattern);
    console.log(combos);
}

function GenAllCombos(maxPattern){
    let patternCombo = FindComboNum(maxPattern);
    let combos = [];
    let current = [];
    for(let y=0; y<maxPattern.length;y++){
        current.push(0);
    }
    for(let x=0; x<patternCombo;x++){
        combos.push(ArrToString([current]));
        try{current = IncrementWholeByOne(maxPattern, current);}
        catch(e){console.error(e);}
    }
    return combos
}

/*function IncrementWholeByNum(maxPattern, current, num){
    let numOutput = current;
    for(let x=num; num<=x;x++){
        numOutput = IncrementWholeByOne(maxPattern, numOutput);
    }
}*/ //not really needed..

function IncrementWholeByOne(maxPattern, current){
    if(current == maxPattern){
        throw new Error("Number already at max"); //calls should be ran with error catch https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
    }
    for(let x = maxPattern.length - 1; x>=0; x--){
        if(current[x] < maxPattern[x]){
            current = IncrementDigit(x, current);
            return current;
        }
        else{
            current = ResetToZeroAtDigit(x, current)
        }
    }
}

function IncrementDigit(digit, number){
    number[digit] = number[digit]+1; //do i really need a function for this lol?
    return number;
}

function ResetToZeroAtDigit(digit, number){
    for(let x=digit; x<number.length; x++){
        number[x] = 0;
    }
    return number;
}

function ArrToString(arr){
    outputString = "";
    arr.forEach(element => {
        outputString = outputString.concat(element);
    });
    return outputString;
}

function StringToNumArr(str){
    let strTemp = str.split("");
    let outputArr = strTemp.map(Number);
    return outputArr;
}