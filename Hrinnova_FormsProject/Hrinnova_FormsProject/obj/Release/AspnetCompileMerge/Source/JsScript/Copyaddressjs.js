function copyaddress() {
    var checkbox = document.getElementById('copyaddresscheck');
    var permadd = document.getElementById('permaddress');
    var tempadd = document.getElementById('tempaddress');
    if (checkbox.checked) {
        permadd.value = tempadd.value
    }
    else {
        permadd.value = ""
    }
}