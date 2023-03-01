// A decorator is a function that you apply to something, such as a class, in a certain way. That doesn't clarify anything though.

// It is convention to start with a capital character.  Not a requirement, but just a convention.

// We use this by using an @ symbol, which is something typescript recognizes, then immediately after that, a POINTER at the decorator function.  We need to pass arguments into it.  It depends on what you are using the decorator for, how many arguments you require.  For a class we pass one, the target.  This is a function.  In the case of a class it will be the constructor.

// Decorators execute when your class is defined, not when it is instantiated.  You don't need to instantiate your class at all and this decorator will still run.

// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

// @Logger
// class Person {
//   name = 'Cory';

//   constructor() {
//     console.log('Creating person object...');
//   }
// }

// const pers = new Person();

// console.log(pers);

// Decorator factories

// We pass a our decorator function into the return statement of the Logger function.  We then accept an argument that will specify which decorator we wish to use.

// This will give use more options to configure what the decorator does.

function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');

  return function (constructor: any) {
    console.log('Rendering template');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

// Decorator factories/ meta programming essentailly are a tool which we expose to other developers which they can use to, for example, conveniently render something on the screen for a givin class. Angular uses decorators a lot.

// You can add more than one decorator.
// They execute from the bottom up.  In this example @WithTemplate will execute first, and then @Logger will execute second.  However, the factories will run in the order in which they are defined in the script.

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Cory';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

// If you add a decorator to a property the decorate recieves 2 arguments. The first element is the target of the property.  The second argument is the propertyName.

// If we console log the two arguments we will see that target is the prototype of our class and the propertyName will be the ... properties name. --> 'title'

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
