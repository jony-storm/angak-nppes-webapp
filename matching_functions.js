function phone(num1, num2) {
    let n1 = process_nm(num1)
    let n2 = process_nm(num2)
    if (n1 && n2){
        return (n1.indexOf(n2) > -1) || (n2.indexOf(n1) > -1)
    }
    return false
}

function fax(num1, num2) {    
    let n1 = process_nm(num1)
    let n2 = process_nm(num2)
    if (n1 && n2){
        return (n1.indexOf(n2) > -1) || (n2.indexOf(n1) > -1)
    }
    return false
}

function process_nm(num) {
    let result = num.replace(/[^0-9]/g, '')
    return result
}

module.exports= {phone, fax}