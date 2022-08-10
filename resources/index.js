function proceed() {
    var mode = document.querySelector('input[name="mode"]:checked').value;
    var bgcolor = document.getElementById('color').value;
    if (bgcolor.includes('#') != true) {
        bgcolor = '#' + bgcolor;
    }
    sessionStorage.clear();
    sessionStorage.setItem('bgcolor', bgcolor);
    var courl = document.getElementById("collection").value;
    var passurl = courl.substr(courl.lastIndexOf('/') + 1);
    if (passurl == "channel") {
        passurl = "arena-holiday-party-2012";
    }
    var finalurl = mode + ".html?" + passurl;
    location.href = window.location.href + finalurl;


}