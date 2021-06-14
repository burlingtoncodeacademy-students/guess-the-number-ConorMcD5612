

function binarySearch(sequence, item) {
    // Index start is the first index of the array which is 0
    indexStart = 0

    // Index end is the position of the end of the array sequence.length is the length of the array, need to -1 becasue length doesn't start counting at 0
    indexEnd = sequence.length -1

    // As long as indexstart is lower than index end 
    while (indexStart <= indexEnd){
        // midpoint (point/position between indexStart and IndexEnd) to get this value its indexEnd - IndexStart / 2.
        // indexStart = 2 IndexEnd = 4  4-2 / 2 = 1 +2 = 3  3 is inbetween 2 and 4
        middle = Math.floor(indexStart + (indexEnd - indexStart) / 2)

        // this gets the value of the middlePosition
        middleVal = sequence[middle]

        // if middleVal === the value of the thing where trying to find (item) it returns the array position of middle
        if (middleVal === item){
            return middle
        
        // if the item value is less then the value of the middlePosition then redifine the index range in particular the Upper bound of the index (IndexEnd)
        } else if (item < middleVal){
            // Indexend end is equal to the middle position -1( -1 because index starts at 0)
            indexEnd = middle - 1
        } else{
            indexStart = middle +1
        }
    }

    return 
}

//How do I make this apply to what I'm doing?

//When the user enters there secretnumber run binary search (the computer guess will be 50)
// The user then inputs wether or not the guess is higher or lower
// If higher 

// array that will be used to search for number
let array = [2,4,5,6,7,8,9,10,12,13,14]

// item to be searched
item1 = 4


// This returns the position of the item searched 
console.log(binarySearch(array, item1))



// let testArray = []

// function makeArray(array, max){
//     for (let i = 1; i <= max; i++){
//         array.push(i);
//     }
// }

let upperBound  = await ask('How many numbers would you like to use?')


let gameArray = [];

for (let i = 1; i <= parseInt(upperBound); i++) {
    gameArray.push(i);
  }



  

  [1, 5, 6 , 4, 1, 2]