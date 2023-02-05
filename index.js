
img = document.querySelector(".img");
toGen = document.querySelector(".input-field");
genBtn = document.querySelector(".button");
genCard = document.querySelector(".gen-card");

read = document.querySelector(".read-card");
genBtn.addEventListener("click", () => {
    if (!toGen.value) { alert("Please enter a text or a link"); return }
    genBtn.innerText = "Generating ..";
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${toGen.value}`;
    img.addEventListener("load", () => {
        genCard.classList.add("active");

        read.classList.add("read-active");
        genBtn.innerText = "Generate";
    })

});

readForm = document.querySelector(".read-form");
fileInp = document.querySelector(".input-field-file");
scanBtn = document.querySelector(".button2");
fileImg = document.querySelector(".upload");
info = document.querySelector(".gen-text");
let data;

fileInp.addEventListener("change", e => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    data = formData;

    if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
            fileImg.src = this.result;
            fileImg.classList.add("qr-code-img");
        });
    }

    console.log(file);
});


scanBtn.addEventListener("click", () => {
    scanBtn.innerText = "Scanning ...";
    if (!data) {
        alert("please select a qr code...");
        return;
    }

    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: data
    }).then(res => res.json()).then(result => {
        read.classList.add("scan-selected");
        scanBtn.innerText = "Scan";
        info.innerText = result[0]['symbol'][0]['data'];
        info.classList.add("gen-text-active");
        console.log(result);
    });
});


readForm.addEventListener("click", () => fileInp.click());




