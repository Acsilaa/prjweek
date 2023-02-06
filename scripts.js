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
            deg += (st - lastScrollTop)/9;
        } else {
            deg -= (lastScrollTop - st)/9;
        }
        divs[i].style.transform = "rotateZ(" + deg + "deg)";
    }
    lastScrollTop = st;
});