// intro's rectangles-------------
let divs = $(".intro .rectangles div");
let minSpread = 30;
for (let i = 0, prevR = [-minSpread]; i < divs.length; i++) {
    let r = Math.floor(Math.random() * 210 + minSpread);
    if (i == 0) prevR[0] = r;
    if (i != 0) {
        for (let j = 0; j < prevR.length; j++) { // in theory this would not let the squares' rotation be too close together. in practice... not so much
            let diff = r < prevR[j] ? prevR[j] - r : r - prevR[j];
            if (diff < minSpread) {
                r = Math.floor(Math.random() * 210 + minSpread);
                j = -1;
            }
        }
        prevR[prevR.length] = r;
    }

    divs[i].style.transform = "rotateZ(" + r + "deg)";
}
let lastScrollTop = 0;
$(document).scroll(function (event) {
    var st = $(this).scrollTop();
    for (let i = 0; i < divs.length; i++) {
        let transf = (divs[i].style.transform + "");
        let deg = transf.slice(8).split('deg)')[0] * 1;
        if (st > lastScrollTop) {
            deg += (st - lastScrollTop) / 9;
        } else {
            deg -= (lastScrollTop - st) / 9;
        }
        divs[i].style.transform = "rotateZ(" + deg + "deg)";
    }
    lastScrollTop = st;
});
//---------------

//intro heading h3

let contents = [
    "ChatGPT from OpenAI",
    "Landbot",
    "Ubisoft Sam",
];
let h3 = $('.heading h3');
h3.text("");
let timediff = 0;
for (let i = 0; i < contents.length; i++) {
    setTimeout(function () {
        let text = contents[i];
        let crrnt = "";
        //in
        let drawn = 0;
        function TimeOutDrawCharacter() {
            setTimeout(function () {
                crrnt += text.slice('')[drawn];
                h3.text(crrnt);
                drawn++;
                if (drawn == text.length) {
                    return setTimeout(TimeOutDrawCharacterReverse(), 1000);
                };

                TimeOutDrawCharacter();


            }, 200);
        }
        //out
        function TimeOutDrawCharacterReverse() {
            setTimeout(function () {
                crrnt = text.slice(0, drawn);
                h3.text(crrnt);

                if (drawn == 0) {
                    return;
                };
                drawn--;
                TimeOutDrawCharacterReverse();
            }, 200);
        }

        //invoke it
        TimeOutDrawCharacter();
        console.log("i");
    }, timediff);
    timediff = (contents[i + 1].length * 200 * 2 + 1010)*2;
}
