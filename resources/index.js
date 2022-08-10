function proceed() {
    var mode = document.querySelector('input[name="mode"]:checked').value;
    var courl = document.getElementById("collection").value;
    var passurl = courl.substr(courl.lastIndexOf('/') + 1);
    var finalurl = mode + ".html?" + passurl;
    location.href = window.location.href + finalurl;


}