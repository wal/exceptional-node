# Exceptional for node.js

Exceptional helps you track errors in your node.js apps!

This CommonJS module posts exception data to Exceptional <http://getexceptional.com>. Data about the environment and backtrace of the exception are sent.

To use Exceptional for node.js you must have an account at <http://getexceptional.com>.

## Installation

Include the exceptional.js file in your application, and set your Exceptional API-KEY

<pre>
 var Exceptional = require(./'exceptional');

 Exceptional.API_KEY = **YOUR-API-KEY**
 </pre>


## Usage
There a are multiple ways you can use exceptional with your node.js app.

* The process.uncaughtException event can be used to catch exceptions that bubble all the way up to the event loop.

<pre>
  process.addListener('uncaughtException', function(err) {
    Exceptional.handle(err);
  });
</pre>

* You can sent exception data to exceptional from inside your own try/catch blocks
<pre>
  try {

    // Your Code

  } catch(error) {
    // Your own error processing
    Exceptional.handle(error);
  }
</pre>

## Example

Check out the small example in examples/demo.js


Copyright © 2008, 2010 Contrast.
