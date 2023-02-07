function clamp(val, minInc, maxInc) {
    if (val <= minInc) return minInc;
    if (val >= maxInc) return maxInc;
    return val;
}
async function delay(t){
    return new Promise(res => setTimeout(res, t));
}
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
    "Google Assistant",
    "Siri from Apple",
];
let h3 = $('.heading h3');
h3.text("");
let typingSpeed = 150; // the lower, the faster
let deleteSpeed = 50;
let afterTypeWait = 1000;
let afterDeleteWait = 600;

async function Draw(){
    for(let i = 0; i < contents.length; i++){
        let text = contents[i];
        for(let j = 0; j <= text.length; j++){
            h3.text(text.slice(0, j));
            await delay(typingSpeed);
        }
        await delay(afterTypeWait);
        for(let j = text.length; j >= 0; j--){
            h3.text(text.slice(0, j));
            await delay(deleteSpeed);
        }
        await delay(afterDeleteWait);
    }
    Draw();
}
Draw();