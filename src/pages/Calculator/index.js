import React, { useState } from 'react'
 
export default function Calculator() {
   const [inputCalculation, setInputCalculation] = useState("∫")
   const [inputPotencyNumber, setInputPotencyNumber] = useState("")
   const [currentOperator, setCurrentOperator] = useState("")
   const [currentVar, setCurrentVar] = useState("")
   const [currentOperation, setCurrentOperation] = useState("")
   const [result, setResult] = useState("")
   const [inputInRoot, setinputInRoot] = useState("")
   const [inputRootPotencyNumber, setInputRootPotencyNumber] = useState("")
 
   let root = "√"
   let exponential = "e"
   let variableX = "x"
 
   const alertP = () => {
       return alert("Invalid input!")
   }
 
   const checkVisibilityClassListByID = (id) => {
       var func = document.getElementById(id).classList.contains("d-none")
       if (func)
           return true
       else
           return false
   }
 
   function changeIndividual(id, act){
       if(act = "show")
           document.getElementById(id).classList.remove("d-none")
       else if(act = "hide")
           document.getElementById(id).classList.add("d-none")
   }
 
   /*this function will be called every time a digit is clicked (except: root, exponential and x with potency (different cases))*/
   function insert(n) {
       if (validation(n) == 0) return
       //if the potency integral modal is open, the input focus is potency integral input
       if (!checkVisibilityClassListByID("potencyIntegral"))
           setInputPotencyNumber(inputPotencyNumber + n)
       //if the root potency integral modal is open and the potency number root contains "sent", so, the focus will be in root (content)
       else if (!checkVisibilityClassListByID("rootPotencyIntegral")) {
           if (document.getElementById("potencyNumberRoot").classList.contains("sent"))
               setinputInRoot(inputInRoot + n)
           else
               setInputRootPotencyNumber(inputRootPotencyNumber + n)
       } else {
           if (n == "+" || n == "-") {
               setCurrentOperator(n)
               operation(currentOperation, currentOperator)
           } else
               //else the current operation const will grow
               setCurrentOperation(currentOperation + n)
           //input calculation will grow with current n
           setInputCalculation(inputCalculation + n)
       }
   }
 
   /* this function will be validate all cases (examples: const equal operators) */
   function validation(n) {
       var currentInput = inputCalculation
       var last = currentInput.charAt(currentInput.length - 1)
 
       //because last is the last caractere of current input
       if (last.includes("s"))
           last = "cos"
       else if (last.includes("n"))
           last = "sen"
 
       //if the last and currrent equals will be trigger an alert and return 0
       if (isNaN(last) && n == last) {
           alertP()
           return 0
       }
 
       //if n is number and last = x will be trigger an alert and return 0, cannot do that: x2
       if (!isNaN(n) && last == variableX) {
           alertP()
           return 0
       }
   }
 
 
   /* this function below will be used in the future */
   function validateParentheses() {
       if (inputCalculation.includes("(") && !(inputCalculation.includes(")"))) {
           alert("looks like there is an open parenthesis. Check and try again!")
           return 0
       }
       return 1
   }
 
   /* this function will validate the input, if there are no variables will be trigger an alert*/
   function validateLetters() {
       if (!(inputCalculation.includes(variableX) || inputCalculation.includes(exponential))) {
           alertP()
           return 0
       }
   }
 
   /* this function will remove one caractere of current input */
   function removeOne() {
       var currentInput = inputCalculation,
           newInput = currentInput.substring(0, currentInput.length - 1)
       if (!currentInput.length < 1) { //if not, delete the integral symbol together
           setInputCalculation(newInput)
 
           //example: 15x + ==> 15x
           if (!(inputCalculation.charAt(inputCalculation.length) == "+" || inputCalculation.charAt(inputCalculation.length) == "-"))
               setCurrentOperation(currentOperation.substring(0, currentOperation.length - 1))
       }
   }
 
   /* this function remove all input result/calculation */
   function removeAll() {
       if (!document.getElementById("inputResult").classList.contains("d-none")) {
           document.getElementById("inputResult").classList.add("d-none")
           document.getElementById("inputCalculation").classList.remove("d-none")
           setResult("")
       }
 
       //clean all
       setCurrentOperator("")
       setCurrentOperation("")
       setInputCalculation("∫")
   }
 
   /* this function return simplify fractions */
   function simplify(str) {
       var result = '',
           data = str.split('/'),
           numOne = Number(data[0]),
           numTwo = Number(data[1]);
 
       for (var i = Math.max(numOne, numTwo); i > 1; i--) {
           if ((numOne % i == 0) && (numTwo % i == 0)) {
               numOne /= i;
               numTwo /= i;
           }
       }
       if (numTwo === 1)
           result = numOne.toString()
       else
           result = numOne.toString() + '/' + numTwo.toString()
       return result
   }
 
   function changeModal(id, v) {
       if (document.getElementById(id).classList.contains("d-none")) {
           document.getElementById(id).classList.remove("d-none")
       } else
           document.getElementById(id).classList.add("d-none")
       setCurrentVar(v)
   }
 
   /* this function is called when the button of inputinRoot is clicked */
   function sendinputInRoot() {
       //x is required in input
       if (!inputInRoot.includes(variableX))
           alert("it is necessary to have x in the root content")
       else {
           var aux = "(" + inputRootPotencyNumber + "^" + root + inputInRoot + ")"
           document.getElementById("rootPotencyIntegral").classList.add("d-none")
           setInputCalculation(inputCalculation + aux)
           setCurrentOperation(aux)
           document.getElementById("potencyNumberRoot").classList.remove("sent")
           setInputRootPotencyNumber("")
           setinputInRoot("")
       }
   }
 
   /* this function is called when the button of potencynumberroot is clicked, and this will be marked as 'sent' and the focus will be directed to another field  */
   function sendRootPotency() {
       document.getElementById("potencyNumberRoot").classList.add("sent")
   }
 
   /* this function is called to control the focus below the inputs */
   function sendPotency() {
       var open = document.getElementById("rootPotencyIntegral").classList.contains("d-none"),
           aux = currentVar + "^" + inputPotencyNumber
 
       if (!open)
           setinputInRoot(inputInRoot + aux)
       else
           setInputCalculation(inputCalculation + aux)
 
       setCurrentOperation(currentOperation + (!open ? inputInRoot : "") + aux)
 
       console.log(currentVar)
       document.getElementById("potencyIntegral").classList.add("d-none")
       setInputPotencyNumber("")
   }
 
   /* this function will calculate every operation that has X, and has as parameter the operation and the operator */
   function calculateX(operat, op) {
       //this will take the before the X of the operation, for example: "2x^3" => 2
       var before = forLoopSum(0, operat.indexOf(variableX), operat),
           potency;
 
       //if operat to contain potency, so the function forLoopSum will take the potency, else the potency is "1"
       if (operat.includes("^")) {
           potency = parseInt(forLoopSum(operat.indexOf("^") + 1, operat.length, operat))
       } else {
           potency = 1
       }
 
       //the integral of variableX is potency + 1 / potency + 1
       var integral = potency + 1,
           //the simpl is for simplify the function, if need
           simpl = simplify(before + "/" + integral),
           //the dataStr its to get the separate result of the simpl
           dataStr = simpl.split("/")
 
       //if integral = 0, then the x disappears
       if (integral == 0)
           setResult(result + "ln |x|")
       //if the simpl return 0, for example: 1/5 return 0, then the result will be standard
       else if (simpl == "0" || dataStr[0] == 0)
           setResult(result + op + before + "x^" + integral + "/" + integral)
       //if the simpl contains "/" so the fraction can be simplified
       else if (simpl.includes("/"))
           setResult(result + op + dataStr[0] + "x^" + dataStr[1] + "/" + dataStr[1])
       else
           setResult(result + op + simpl + "x^" + integral)
   }
 
   /* this function will calculate every operation that has root, and has as parameter the operation and the operator */
   function calculateRoot(operat, op) {
       //this will take the before the ( of the operation, for example: 2(root) => 2
       var before = forLoopSum(0, operat.indexOf("("), operat),
           potencyRoot = forLoopSum(operat.indexOf("(") + 1, operat.indexOf("^"), operat),
           content = forLoopSum(operat.indexOf(root) + 1, operat.indexOf(")"), operat),
           countX = forLoopSum(content.indexOf(root) + 1, content.indexOf(variableX), content),
           potencyX = ""
       //if the content has potency, so the potencyX is this, else the potencyX is 1
       if (content.includes("^")) {
           potencyX = parseInt(forLoopSum(content.indexOf("^") + 1, content.length, content))
       } else {
           potencyX = 1
       }
       //if the variables is empty, so the variables is 1
       if (before == "")
           before = 1
       if (potencyX == "")
           potencyX = 1
       if (countX == "")
           countX = 1
       //parse int variables for calculations
       parseInt(before)
       parseInt(potencyX)
       parseInt(countX)
       //the result fraq is the sum of potencyroot with potencyX
       var resultFraq = sumFrac(potencyRoot, potencyX),
           //the resultconst is the result of constant between before mult countX
           resultConst = parseInt(before) * countX,
           response = resultConst + "x^" + resultFraq
       //sum result of calcule root with the result
       setResult(result + response)
   }
 
   /* this function will calculate every operation that has exponential, and has as parameter the operation and the operator */
   function calculateExponential(operat, op) {
 
       //taking all value before exponential
       var before = forLoopSum(1, operat.indexOf(exponential), operat),
           potency = forLoopSum(operat.indexOf("^") + 1, operat.length, operat)
 
       if (before == "" || before == "+")
           before = 1
       if (before == "-")
           before = -1
 
       if (op == "-" || potency.includes("-")) {
           //the potency is positive and exp goes down a fraction
           potency = parseInt(potency * -1)
           setResult(before + "/" + "e^" + potency)
       } else {
           //validation not to be number 1
           if (before == 1)
               before = ""
           if (before == -1)
               before = "-"
           setResult(before + "e^" + potency)
       }
   }
 
   /* this function will calculate every operation that has cos or sin, and has as parameter the operation and the operator */
   function calculateSinCos(operat, op) {
       var content = "",
           potencyX = 1,
           countX = "",
           fraq = "",
           resultCalcule = "",
           current = (operat.includes("sin")) ? "sin" : "cos",
           opposite = (current == "sin") ? "cos" : "sin"
 
       //content of cos/sin, for example: cos 2x ==> content is 2x
       content = forLoopSum(operat.indexOf(current) + 3, operat.length, operat)
 
       //if content is for example: 2x²
       if (content.includes("^"))
           potencyX = forLoopSum(content.indexOf("^"), content.length, content)
 
       countX = content.substring(0, content.length - 1)
       countX = (countX == "") ? "1" : countX
 
       fraq = simplify(1 + "/" + countX)
 
       if (potencyX == 1) {
           var aux = fraq + opposite + "(" + content + ")"
           if (countX.includes("-") && op == "-")
               resultCalcule = ((current = "cos") ? "" : op) + aux
           else if (countX.includes("-"))
               resultCalcule = ((current = "cos") ? "-" : "") + aux
           else if (op == "-")
               resultCalcule = ((current = "cos") ? op : "-") + fraq + opposite + "(" + countX + "x)"
           else
               resultCalcule = aux
       } else
           resultCalcule = op + current + "(" + content + ")"
       setResult(result + resultCalcule)
   }
 
   /* this functions is called to operate one operation at a time */
   function operation(operat, op) {
       if (operat.includes("sin") || operat.includes("cos"))
           calculateSinCos(operat, op)
       else if (operat.includes(root))
           calculateRoot(operat, op)
       else if (operat.includes(exponential))
           calculateExponential(operat, op)
       else if (operat.includes(variableX))
           calculateX(operat, op)
 
       //clean the current operation after getting the result
       setCurrentOperation("")
   }
 
   /* this function is called when to button = is clicked */
   async function calculate() {
       if (validateParentheses() == 0 || validateLetters() == 0)
           return
       if (!(inputCalculation.includes("-") || inputCalculation.includes("+")))
           operation(currentOperation, currentOperator)
       else
           operation(currentOperation, currentOperator)
 
       document.getElementById("inputCalculation").classList.add("d-none")
       document.getElementById("inputResult").classList.remove("d-none")
   }
 
   /* this constant is for adding fractions for integral */
   const sumFrac = (a, b) => {
       // For sum of root
       //a = root potency
       //b = x potency
 
       var resultA = (a / 1) * 1
       var resultB = (a / a) * b
 
       var sum = resultA + resultB
 
       var result = sum + "/" + a
 
       return result
   }
 
   /* this constant return a result of a for loop with the params a (start), b (end) and the word that will go through */
   const forLoopSum = (start, end, word) => {
       var c = ""
       for (var i = start; i < end; i++) {
           c += word.charAt(i)
       }
       return c
   }
 
   return (
       <div class="container mt-4">
           <div className='warning'>
               <a className='' data-bs-toggle="modal" data-bs-target="#infoModal">Hello, see how i work!</a>
           </div>
           <div id="calculator" class="w-50 m-auto bg-dark p-4 text-center">
               <div class="text-center" id="inputCalculation">
                   <input type="text" name="input-calculation" class="w-75 m-4 rounded-pill pt-3 bg-light fs-5 text-end input-calculation" value={inputCalculation} onChange={(e) => setInputCalculation(e.target.value)} disabled />
               </div>
               <div class="text-center d-none" id="inputResult">
                   <input type="text" name="input-calculation" class="w-75 m-4 rounded-pill pt-3 bg-light fs-5 text-end input-calculation" value={result + "+ C"} disabled />
               </div>
               <div id="keyboard" class="m-auto">
                   {/* Remove One/All Caracteres Input */}
                   <div class="row">
                       <div class="col-5">
                           <button class="btn btn-danger rounded-3 w-100" onClick={() => removeOne()}>C</button>
                       </div>
                       <div class="col-5">
                           <button class="btn btn-danger rounded-3 w-100" onClick={() => removeAll()}>CE</button>
                       </div>
                   </div>
 
                   {/* Root Input */}
                   <div class="row mt-3 text-center d-none" id="rootPotencyIntegral">
                       <div className='row'>
                           <div className='col text-end'>
                               <button className='text-end btn btn-danger rounded-circle close-div' onClick={() => changeModal("rootPotencyIntegral", "")}><i class="fa-solid fa-xmark"></i></button>
                           </div>
                       </div>
                       <div class="col w-100">
                           <label for="potency-number" class="text-white">n:</label>
                           <input type="number" name="potency-number" id="potencyNumberRoot" class="bg-light rounded-pill w-25" value={inputRootPotencyNumber} disabled />
                           <button class="btn btn-success rounded-pill p-1 ps-3 pe-3 ms-2" onClick={() => sendRootPotency()}><small><i class="fa-solid fa-check"></i></small></button>
                       </div>
                       <div class="col w-100" id="inputInRoot">
                           <label for="in-Root" class="text-white">c:</label>
                           <input type="text" name="in-Root" class="bg-light rounded-pill w-25" value={inputInRoot} disabled />
                           <button class="btn btn-success rounded-pill p-1 ps-3 pe-3 ms-2" onClick={() => sendinputInRoot()}><small><i class="fa-solid fa-check"></i></small></button>
                       </div>
                   </div>
 
                   {/* Potency Input */}
                   <div class="row mt-3 text-center d-none" id="potencyIntegral">
                       <div className='row'>
                           <div className='col text-end'>
                               <button className='text-end btn btn-danger rounded-circle close-div' onClick={() => changeModal("potencyIntegral", "")}><i class="fa-solid fa-xmark"></i></button>
                           </div>
                       </div>
                       <div class="col w-100">
                           <label for="potency-number" class="text-white">n:</label>
                           <input type="number" name="potency-number" id="potencyNumber" class="bg-light rounded-pill w-25" value={inputPotencyNumber} disabled />
                           <button class="btn btn-success rounded-pill p-1 ps-3 pe-3 ms-2" onClick={() => sendPotency()}><small><i class="fa-solid fa-check"></i></small></button>
                       </div>
                   </div>
 
                   {/* Keyboard */}
                   <div class="row mt-3 m-auto">
                       <div class="col-12 mt-3">
                           <div class="row">
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(9)}>9</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(8)}>8</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(7)}>7</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-warning rounded-3" onClick={() => insert("+")}>+</button>
                               </div>
                           </div>
                           <div class="row mt-3">
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(6)}>6</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(5)}>5</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(4)}>4</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-warning rounded-3" onClick={() => insert("-")}>-</button>
                               </div>
                           </div>
                           <div class="row mt-3">
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(3)}>3</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(2)}>2</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(1)}>1</button>
                               </div>
                               <div class="col">
                                   <button class="btn btn-primary rounded-3" onClick={() => insert(variableX)}>x</button>
                               </div>
                           </div>
                           <div class="row mt-3">
                               <div class="col-3">
                                   <button class="btn btn-secondary rounded-3" onClick={() => insert(0)}>0</button>
                               </div>
                               <div class="col-3">
                                   <button class="btn btn-primary rounded-3" onClick={() => changeModal("potencyIntegral", exponential)}>eⁿ</button>
                               </div>
                               <div class="col-3">
                                   <button class="btn btn-primary rounded-3" onClick={() => changeModal("rootPotencyIntegral", root)}>ⁿ√</button>
                               </div>
                               <div class="col-3">
                                   <button class="btn btn-primary rounded-3" onClick={() => changeModal("potencyIntegral", variableX)}>xⁿ</button>
                               </div>
                           </div>
                           <div class="row mt-3">
                               <div class="col-3">
                                   <button class="btn btn-warning rounded-3 w-100" onClick={() => insert("sin")}>sin</button>
                               </div>
                               <div class="col-3">
                                   <button class="btn btn-warning rounded-3 w-100" onClick={() => insert("cos")}>cos</button>
                               </div>
                               <div class="col-6">
                                   <button class="btn btn-success rounded-3 w-100" onClick={() => calculate()}>=</button>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
 
           <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
               <div class="modal-dialog">
                   <div class="modal-content">
                       <div class="modal-header">
                           <h5 class="modal-title" id="infoModalLabel">About Me</h5>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                       </div>
                       <div class="modal-body">
                           <h5>Hello welcome!</h5>
                           <p>Well, here is some important information about me. You need to know that I'm still simple, my developer is creating me little by little. So at this point, I just do individual integrals, with addition and subtraction. Here are some examples for you to understand better:</p>
                           <ul class="text-start">
                               <li>∫x²</li>
                               <li>∫cosx</li>
                               <li>∫√x²</li>
                               <li>∫2 + x⁴</li>
                           </ul>
                           <p>Oh! And if you want to collaborate and help me grow and have more features, you can <a href='https://www.linkedin.com/in/erika-reis-da-silva-b64521187/'>contact</a> my developer, and if you're interested in seeing how I was built, check out my <a href='https://github.com/erika393/integral-calculator-react'>code</a></p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   )
}
 
 
 
 
 
 
 
 
 
 
 

