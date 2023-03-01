// A decorator is a function that you apply to something, such as a class, in a certain way. That doesn't clarify anything though.

// It is convention to start with a capital character.  Not a requirement, but just a convention.

// We use this by using an @ symbol, which is something typescript recognizes, then immediately after that, a POINTER at the decorator function.  We need to pass arguments into it.  It depends on what you are using the decorator for, how many arguments you require.  For a class we pass one, the target.  This is a function.  In the case of a class it will be the constructor.

// Decorators execute when your class is defined, not when it is instantiated.  You don't need to instantiate your class at all and this decorator will still run.

function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Cory';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);
