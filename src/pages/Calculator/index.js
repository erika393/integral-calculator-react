import React, { useState } from 'react'

export default function Calculator() {
    const [inputCalculation, setInputCalculation] = useState("∫")
    const [inputPotencyNumber, setInputPotencyNumber] = useState("")
    const [currentOperator, setCurrentOperator] = useState("")
    const [currentVar, setCurrentVar] = useState("")
    const [currentOperation, setCurrentOperation] = useState("")
    const [result, setResult] = useState("")
    const [inputMax, setInputMax] = useState("")
    const [inputMin, setInputMin] = useState("")
    const [maxLimit, setMaxLimit] = useState("")
    const [minLimit, setMinLimit] = useState("0")
    const [inputInRoot, setinputInRoot] = useState("")
    const [inputRootPotencyNumber, setInputRootPotencyNumber] = useState("")

    const alertP = () => {
        return alert("Invalid input!")
    }

    /* return of current input modal is open */
    function currentInput() {
        if (!document.getElementById("potencyIntegral").classList.contains("d-none"))
            return "potencyIntegralModal"
        else if (!document.getElementById("rootPotencyIntegral").classList.contains("d-none")) {
            if (document.getElementById("potencyNumberRoot").classList.contains("send"))
                return "InputInRootModal"
            return "InputRootPotencyNumberModal"
        } else if (!document.getElementById("delimiteIntegral").classList.contains("d-none")) {
            if (!document.getElementById("maxLimit").classList.contains("send"))
                return "InputMaxLimitModal"
            return "InputMinLimitModal"
        }

        return "Default"
    }

    /*this function will be called every time a digit is clicked (except: root, exponential and x with potency (different cases))*/
    function insert(n) {
        if (validation(n) == 0) { return }

        var modal = currentInput()

        //if the potency integral modal is open, the input focus is potency integral input
        if (modal == "potencyIntegralModal")
            setInputPotencyNumber(inputPotencyNumber + n)

        //if the root potency integral modal is open and the potency number root contains "send", so, the focus will be in root (content)
        else if (modal == "InputInRootModal")
            setinputInRoot(inputInRoot + n)

        else if (modal == "InputRootPotencyNumberModal")
            setInputRootPotencyNumber(inputRootPotencyNumber + n)

        //if delimiteIntegral modal is open and the maxLimit input contains send, so, the focus will be in inputMin + the current var
        else if (modal == "InputMaxLimitModal")
            setInputMax(inputMax + n)

        else if (modal == "InputMinLimitModal")
            setInputMin(inputMin + n)

        else {
            //if n is an operator, so, will operate and current operator will be updated
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

        console.log("n: " + n)
        console.log("last: " + last)

        //if the last and currrent equals will be trigger an alert and return 0
        if (isNaN(last) && n == last) {
            alertP()
            return 0
        }

        //if n is number and last = x will be trigger an alert and return 0, cannot do that: x2
        if (!isNaN(n) && last == "x") {
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
        if (!(inputCalculation.includes("x") || inputCalculation.includes("e"))) {
            alertP()
            return 0
        }
    }

    /* this function will remove one caractere of current input */
    function removeOne() {
        if (!inputCalculation.length < 2) { //if not, delete the integral symbol together
            var currentInput = inputCalculation
            var newInput = currentInput.substring(0, currentInput.length - 1)
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

        //clear all
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

    /* this function is controll modal */
    function changeModalDelimiteIntegral(checked) {
        if (checked) {
            document.getElementById("limitOfIntegralText").classList.remove("d-none")
            document.getElementById("delimiteIntegral").classList.remove("d-none")
        } else
            document.getElementById("delimiteIntegral").classList.add("d-none")
    }

    function changeRootModal(op){
        if (document.getElementById("rootPotencyIntegral").classList.contains("d-none")) {
            document.getElementById("rootPotencyIntegral").classList.remove("d-none")
        } else
            document.getElementById("rootPotencyIntegral").classList.add("d-none")
        setCurrentVar(op)
    }

    function changePotencyModal(op) {
        if (document.getElementById("potencyIntegral").classList.contains("d-none")) {
            document.getElementById("potencyIntegral").classList.remove("d-none")
        } else
            document.getElementById("potencyIntegral").classList.add("d-none")
        setCurrentVar(op)
    }


    function sendinputInRoot(){
        if (!inputInRoot.includes("x"))
            alert("it is necessary to have x in the root content")
        else {
            document.getElementById("rootPotencyIntegral").classList.add("d-none")
            setInputCalculation(inputCalculation + "(" + inputRootPotencyNumber + "^" + "√" + inputInRoot + ")")
            setCurrentOperation("(" + inputRootPotencyNumber + "^" + "√" + inputInRoot + ")")
            document.getElementById("potencyNumberRoot").classList.remove("send")
            setInputRootPotencyNumber("")
            setinputInRoot("")
        }
    }

    const sendRootPotency = () => {
        document.getElementById("potencyNumberRoot").classList.add("send")
    }

    const sendPotency = () => {
        if (!document.getElementById("rootPotencyIntegral").classList.contains("d-none")) {
            setinputInRoot(inputInRoot + currentVar + "^" + inputPotencyNumber)
            setCurrentOperation(inputInRoot + currentVar + "^" + inputPotencyNumber)
        } else {
            setInputCalculation(inputCalculation + currentVar + "^" + inputPotencyNumber)
            setCurrentOperation(currentVar + "^" + inputPotencyNumber)
        }
        document.getElementById("potencyIntegral").classList.add("d-none")
        setInputPotencyNumber("")
    }

    const sendMax = () => {
        document.getElementById("maxLimit").classList.add("send")
        setMaxLimit(inputMax)
        setInputMax("")
    }

    const sendMin = () => {
        document.getElementById("delimiteIntegral").classList.add("d-none")
        setMinLimit(inputMin)
        setInputMin("")
    }

    function calculateX(operat, op) {
        var after = forLoopSum(0, operat.indexOf("x"), operat)

        console.log(after + " oper: " + operat)
        var potency;
        if (operat.includes("^")) {
            potency = forLoopSum(operat.indexOf("^") + 1, operat.length, operat)
        } else {
            potency = 1
        }

        var potencyInt = parseInt(potency)
        var resPot = potencyInt + 1
        var simpl = simplify(after + "/" + resPot)
        var dataStr = simpl.split("/")

        console.log(potencyInt + " 2: " + resPot + " 3: " + simpl + " 4: " + dataStr[0] + " 5: " + dataStr[1] + " 6: " + after)

        console.log(op)
        if (resPot == 0) {
            setResult(result + op + after)
        } else if (simpl == "0") {
            setResult(result + op + "x^" + resPot + "|" + resPot)
        } else if (dataStr[0] == "0") {
            setResult(result + op + after + "x^" + resPot + "|" + resPot)
        } else if (simpl.includes("/")) {
            setResult(result + op + dataStr[0] + "x^" + dataStr[1] + "|" + dataStr[1])
        } else {
            setResult(result + op + simpl + "x^" + resPot)
        }
    }

    function calculateRoot(operat, op) {
        console.log(operat)
        var after = forLoopSum(0, operat.indexOf("("), operat)
        if (after.includes("∫")) {
            after = after.substring(1, after.length)
        }

        var potencyRoot = forLoopSum(operat.indexOf("(") + 1, operat.indexOf("^"), operat)
        var content = forLoopSum(operat.indexOf("√") + 1, operat.indexOf(")"), operat)
        var countX = forLoopSum(content.indexOf("√") + 1, content.indexOf("x"), content)

        if (content.includes("^")) {
            var potencyX = forLoopSum(content.indexOf("^") + 1, content.length, content)
        } else {
            var potencyX = forLoopSum(content.indexOf("x") + 1, content.length, content)
        }

        if (after == "")
            after = 1
        if (potencyX == "")
            potencyX = 1
        if (countX == "")
            countX = 1

        console.log("1: " + after + " 2: " + potencyX + " 3: " + potencyRoot + " 4: " + content + " 5: " + countX)
        potencyRoot = parseInt(potencyRoot)
        potencyX = parseInt(potencyX)
        countX = parseInt(countX)

        var resultFraq = sumFrac(potencyRoot, potencyX)
        var resultConst = parseInt(after) * countX

        setResult(result + resultConst + "x^" + resultFraq)
    }

    function calculateExponential(operat, op) {
        var after = forLoopSum(1, operat.indexOf("e"), operat)
        var potency = forLoopSum(operat.indexOf("^") + 1, operat.length, operat)

        console.log(after)
        console.log(potency)
        console.log(op)

        if (after == "" || after == "+")
            after = 1
        if (after == "-")
            after = -1

        if (op == "-" || potency.includes("-")) {
            console.log('parou aq')
            potency = parseInt(potency * -1)
            console.log(after)
            setResult(after + "/" + "e^" + potency)
        } else {
            if (after == 1)
                after = ""
            if (after == -1)
                after = "-"
            console.log("foi all")
            setResult(after + "e^" + potency)
        }
    }

    function calculateSinCos(operat, op) {
        var after = ""
        var content = ""
        var potencyX = 1
        var countX = ""
        var fraq = ""
        var resultCalcule = ""

        var current = (operat.includes("sin")) ? "sin" : "cos"
        var opposite = (current == "sin") ? "cos" : "sin"

        after = forLoopSum(0, operat.indexOf(current) + 3, operat)
        content = forLoopSum(operat.indexOf(current) + 3, operat.length, operat)
        if (content.includes("^"))
            potencyX = forLoopSum(content.indexOf("^"), content.length, content)

        countX = content.substring(0, content.length - 1)

        if (countX == "")
            countX = "1"

        fraq = simplify(1 + "/" + countX)

        console.log("1: " + content + " 2: " + potencyX + " 3: " + countX + " 4: " + fraq)

        if (potencyX == 1) {
            console.log("AQ")
            if (countX.includes("-") && op == "-") {
                resultCalcule = ((current = "cos") ? "" : op) + fraq + opposite + "(" + content + ")"
            } else if (countX.includes("-")) {
                resultCalcule = ((current = "cos") ? "-" : "") + fraq + opposite + "(" + content + ")"
            } else if (op == "-") {
                resultCalcule = ((current = "cos") ? op : "-") + fraq + opposite + "(" + countX + "x)"
            } else {
                resultCalcule = fraq + opposite + "(" + content + ")"
            }
        } else {
            console.log("aq")
            resultCalcule = op + current + "(" + content + ")"
        }

        console.log(resultCalcule)
        setResult(result + resultCalcule)
    }

    function operation(operat, op) {
        console.log("OPERAT> " + operat)

        if (operat.includes("sin") || operat.includes("cos")) {
            calculateSinCos(operat, op)
        } else if (operat.includes("√")) {
            calculateRoot(operat, op)
        } else if (operat.includes("e")) {
            calculateExponential(operat, op)
        } else if (operat.includes("x")) {
            calculateX(operat, op)
        }

        console.log("zerou")
        setCurrentOperation("")
        console.log("OPERACAOOO: " + operat)
    }

    async function calculate() {
        console.log(currentOperation)
        if (validateParentheses() == 0 || validateLetters() == 0) {
            return
        }
        if (!(inputCalculation.includes("-") || inputCalculation.includes("+")))
            operation(currentOperation, currentOperator)
        else
            operation(currentOperation, currentOperator)
        document.getElementById("inputCalculation").classList.add("d-none")
        document.getElementById("inputResult").classList.remove("d-none")
    }

    const sumFrac = (a, b) => {
        // For sum of root
        //a = root potency
        //b = x potency

        var resultA = (a / 1) * 1
        var resultB = (a / a) * b

        var sum = resultA + resultB

        var result = sum + "|" + a

        return result
    }

    const forLoopSum = (a, b, word) => {
        var c = ""
        for (var i = a; i < b; i++) {
            c += word.charAt(i)
        }
        console.log(c)
        return c
    }

    return (
        <div class="container mt-4">
            <div id="calculator" class="w-50 m-auto bg-dark p-4 text-center">
                <div class="text-center" id="inputCalculation">
                    <input type="text" name="input-calculation" class="w-75 m-4 rounded-pill pt-3 bg-light fs-5 text-end input-calculation" value={inputCalculation} onChange={(e) => setInputCalculation(e.target.value)} disabled />
                </div>
                <div class="text-center d-none" id="inputResult">
                    <input type="text" name="input-calculation" class="w-75 m-4 rounded-pill pt-3 bg-light fs-5 text-end input-calculation" value={result} disabled />
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
                        <div class="col-2">
                            <div class="group-input-check w-100 h-100">
                                <input type="checkbox" name="definite-integral" onChange={(e) => changeModalDelimiteIntegral(e.target.checked)} />
                                <label for="definite-integral" class="text-white ms-2">D.I?</label>
                            </div>
                        </div>
                    </div>

                    {/* Limit Integral Text */}
                    <div class="row d-none" id="limitOfIntegralText">
                        <div class="col text-start">
                            <small class="text-white">Limit of integral: {minLimit} to {maxLimit}</small>
                        </div>
                    </div>

                    {/* Delimite Integral */}
                    <div class="row mt-3 text-center d-none" id="delimiteIntegral">
                        <div class="col-1 icon-question">
                            <div class="v-middle w-100 h-100">
                                <i class="fa-solid fa-circle-question text-white" data-bs-toggle="tooltip" data-bs-placement="top" title="write the maximum and minimum limit of the integral"></i>
                            </div>
                        </div>
                        <div class="col" id="maxLimit">
                            <label for="max" class="text-white">Max:</label>
                            <input type="text" name="max" class="bg-light rounded-pill w-25" value={inputMax} disabled />
                            <button class="btn btn-success rounded-pill p-1 ps-3 pe-3 ms-1" onClick={() => sendMax()}><small><i class="fa-solid fa-check"></i></small></button>
                        </div>
                        <div class="col text-start" id="minLimit">
                            <label for="min" class="text-white">Min:</label>
                            <input type="text" name="min" class="bg-light rounded-pill w-25" value={inputMin} disabled />
                            <button class="btn btn-success rounded-pill p-1 ps-3 pe-3 ms-1" onClick={() => sendMin()}><small><i class="fa-solid fa-check"></i></small></button>
                        </div>
                    </div>

                    {/* Root Input */}
                    <div class="row mt-3 text-center d-none" id="rootPotencyIntegral">
                        <div className='row'>
                            <div className='col text-end'>
                                <button className='text-end btn btn-danger rounded-circle close-div' onClick={() => changeRootModal("")}><i class="fa-solid fa-xmark"></i></button>
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
                                <button className='text-end btn btn-danger rounded-circle close-div' onClick={() => changePotencyModal("")}><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                        <div class="col w-100">
                            <label for="potency-number" class="text-white">n:</label>
                            <input type="number" name="potency-number" id="potencyNumber" class="bg-light rounded-pill w-25" value={inputPotencyNumber} disabled />
                            <button class="btn btn-success rounded-pill p-1 ps-3 pe-3 ms-2" onClick={() => sendPotency()}><small><i class="fa-solid fa-check"></i></small></button>
                        </div>
                    </div>

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
                                    <button class="btn btn-primary rounded-3" onClick={() => insert("x")}>x</button>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-3">
                                    <button class="btn btn-secondary rounded-3" onClick={() => insert(0)}>0</button>
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-primary rounded-3" onClick={() => changePotencyModal("e")}>eⁿ</button>
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-primary rounded-3" onClick={() => changeRootModal("√")}>ⁿ√</button>
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-primary rounded-3" onClick={() => changePotencyModal("x")}>xⁿ</button>
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
        </div>
    )
}



