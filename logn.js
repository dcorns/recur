/**
 * logn
 * Created by dcorns on 11/15/16
 * Copyright © 2016 Dale Corns
 */
///<reference path='all.d.ts' />
'use strict';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Log N?', (n) => {
    let lg = logLoop(parseInt(n, 10), 0);
    console.log(`log N of ${n} = ${lg} Test accuracy 2^lg: ${Math.pow(2, lg)}`);
    rl.close();
});
//js will create a stack for each recursive execution which waits for subsequent calls to return before returning itself, so each one returns it's result to the one before it which means that the final result in the following (as well every result except the last) returns nothing. That is why the value of lg above ends up being undefined.
function log2OfN(n, seed) {
    console.log(`2 ** seed: ${Math.pow(2, seed)}, n: ${n}, seed: ${seed}`);
    if (Math.pow(2, seed) >= n)
        return seed;
    else
        log2OfN(n, seed + 1); //note that seed++ will always be 1 at the input because it is incremented after being calling the function ++seed will give the desired result of seed + 1 because it will be incremented first.
}
//To fix this problem, every recursive call needs to return the correct answer. In order to do that instead of continuing to call the function, we need to return the call to itself. As the following function does.
function log2OfNReturnRecursive(n, seed) {
    console.log(`2 ** seed: ${Math.pow(2, seed)}, n: ${n}, seed: ${seed}`);
    if (Math.pow(2, seed) >= n)
        return seed;
    else
        return log2OfNReturnRecursive(n, seed + 1);
}
//On to other issues with recursion in JS. The log function above only correctly returns answers of integer powers of 2 so a nine will return 3 as is the same for 8. It will handle very large numbers but it is not accurate. In order to demonstrate the next issue we need to handle numbers that are not integers as well. The intent will be to cause the stack to overflow and provide a solution. (tail call optimization). I reality, this will not really accurately determine even the integer powers of 2 because of the floating point feature of JS, however it is great for pointing out the issue memory munching recursion since even an input as small as 3 will cause the stack to overflow. Remember a stack for every recursive call until it completes. That can amount to a lot of stacks in the following function.
function log2(n, seed) {
    console.log(`2 ** seed: ${Math.pow(2, seed)}, n: ${n}, seed: ${seed}`);
    if (Math.pow(2, seed) < n)
        return log2(n, seed + .0001);
    else
        return seed;
}
//The following is how tail call optimization would be written. By wrapping the function in another function we inform a programing language that the function is recursive and it would execute like a loop to save the memory.
function log2a(a, b) {
    function recursiveLog2(n, seed) {
        console.log(`2 ** seed: ${Math.pow(2, seed)}, n: ${n}, seed: ${seed}`);
        if (Math.pow(2, seed) < n)
            return log2a(n, seed + .0001);
        else
            return seed;
    }
    return recursiveLog2(a, b);
}
//Unfortunately, in the case of JS this only makes the stack overflow sooner so now even a 3 is too large to calculate. Obviously we can solve this problem in a loop as demonstrated here.
function logLoop(n, seed) {
    while (Math.pow(2, seed) < n) {
        seed = seed + .0001;
    }
    return seed;
}
//By using this loop we get the result we want quickly for very large numbers without a stack over flow. There are elaborate ways implement tail call optimization (TCO) in JS using patterns like trampolining, but I think it is excessive. All a TCO in a language does is execute the recursion as a loop. We can always use a loop the accomplish the same result as we would with recursion so my advise is to wait until the language supports TCO before widespread us of recursion or use a functional programing library. In the meantime, only use recursion for functions that will not go so deep the stack will overflow.
//# sourceMappingURL=logn.js.map