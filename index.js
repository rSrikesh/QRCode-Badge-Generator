var imported = document.createElement('script');
imported.src = 'node_modules/qrcode-generator/qrcode.js';
document.head.appendChild(imported);

function process(){
    let fname_ = document.getElementById("fname").value;
    let lname_ = document.getElementById("lname").value;
    var email_ = document.getElementById("email").value;
    var github_ = document.getElementById("github").value;
    var twitter_ = document.getElementById("twitter").value;
    let twit_ = twitter_.slice(1);

    var regName = /^([a-zA-Z])+$/;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var regPattern = /(?<!\w)@[\w+]{1,15}\b/;
    
    if (fname_ == "" || lname_ == "" || email_ == "") {
        alert("Fields should not be empty");
        return false;
    } else if (!regName.test(fname_) || !regName.test(lname_)) {
        alert("Name should contain only characters");
        return false;
    } else if (!email_.match(validRegex)) {
        alert("Email is not valid");
        return false;
    } else if (twitter_ != "" && !regPattern.test(twitter_)) {
        alert("Twitter handle is not valid");
        return false;
    }
    
    var data = JSON.stringify({name : fname_, lname : lname_, email : email_, github : github_, twitter : twit_ });
    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(data);
    qr.make();
    makebadge(fname_, lname_, email_, github_, twit_);
    makebutton();
    document.getElementById('QR').innerHTML = qr.createImgTag(3);
}

function makebadge(name,lname,email,github,twitter) {
    var olddiv = document.getElementById("badge");
    olddiv.remove();

    let badge = document.createElement('div');
    badge.id = "badge";
    badge.style.width = "40vw";
    badge.style.height = "28vh";
    badge.style.background = "#e9f542";
    badge.appendChild(document.createElement('br'))
    let details = document.createElement('div');
    details.id = "details";
    details.style.float = "left";
    details.style.padding = "2vh 5vw";
    details.style.fontFamily = "monospace";
    details.innerHTML = name + ' '+ lname;
    details.appendChild(document.createElement('br'));

    if (github != "") {
        var img1 = document.createElement('img');
        img1.src = "assets/github.png";
        img1.style.height = "34px";
        img1.style.width = "34px";
        img1.style.padding = "3px 3px";
        img1.onclick = function () {
            window.open('https://github.com/' + github, '_blank').focus();
        };
        details.appendChild(img1);
    }

    var img2 = document.createElement('img');
    img2.src = "assets/email.png";
    img2.style.height = "34px";
    img2.style.width = "34px";
    img2.style.padding = "3px 3px";
    img2.onclick = function() {
        window.open('mailto:'+email, '_blank').focus();
    };
    details.appendChild(img2);

    if (twitter != "") {
        var img3 = document.createElement('img');
        img3.src = "assets/twitter.png";
        img3.style.height = "34px";
        img3.style.width = "34px";
        img3.onclick = function () {
            window.open('https://twitter.com/' + twitter, '_blank').focus();
        };
        details.appendChild(img3);
    }

    let qr_ = document.createElement('div');
    qr_.id = "QR";
    qr_.style.padding = "3.5vh 25vw";
    qr_.innerHTML = "q";
    qr_.float = "right";
    badge.appendChild(details);
    badge.appendChild(qr_);    
    document.getElementById('main').appendChild(badge);
}

function clearBox() {
    document.getElementById("badge").style.display = "none";
    document.getElementById("button").style.display = "none";
}

function makebutton() {
    var olddiv = document.getElementById("button");
    olddiv.remove();
    var button = document.createElement('button');
    button.id = "button";
    button.style.backgroundColor = "#F012BE";
    button.style.padding = "12px 25px";
    button.style.textAlign = "center";
    button.innerHTML = "Generate Badge";
    button.onclick = function () {
        domtoimage.toBlob(document.getElementById('badge')).then(function (blob) {
            window.saveAs(blob, 'badge.png');
        });
    };
    document.getElementById('main').appendChild(button);
}

function add() {
    document.getElementById("twitter").value = "@";
}