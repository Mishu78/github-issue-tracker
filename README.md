qn 1: What is the difference between var, let, and const?

ans: var,let and const are variables and they are like containers.But there are difference between them. 
var is actually an oldest way to contain values.It works throughout the function and can be declare or reassign again. let works inside 
the block and it is a modern way.let variable's value can be reassign also. But const is like constant so its value can not be 
changed or can not be reassign.In recent days const and let is mostly used.

qn 2:What is the spread operator (...)?

ans: if we use spread operator of an array in a new array then it will take the values of previous array and put it in the 
array when spread operator has been used.Its actually expands arrays and objects. for example: 
const num1=[1,2,3];
let num2=[4,5,6];
num2=[...num1,4,5,6] 
so the output will be in, num2=[1,2,3,4,5,6]

qn3: What is the difference between map(), filter(), and forEach()?

ans:map() is used want to change every element in an array and create a new array with the chnaged values. when we want to pick certain 
elements from an array based on a condition and create a new array with only those elements we use filter() function. forEach() does not 
create a new array rather we use this when we want to perform an action for each element in the array.

qn 4:What is an arrow function?

ans: Arrow function we use when we want to write functions in a shorter way.Like addition substraction in function perform
in multiple line but using arrow function we can write it in one line. Like const add = (a,b)=>a+b.

qn 5: What are template literals?

ans:Template literals let us write strings with variables using backticks.for example: `My name is ${name} and i am ${age} years 
old.`It is simpler and easier to use. And strings can be write in it.
