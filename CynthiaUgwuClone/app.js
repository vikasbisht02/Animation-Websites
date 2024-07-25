const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var t1 = gsap.timeline();

    t1.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        
        ease: Expo.easeInOut
    })

    t1.to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })

    .from("#herofooter", {
        y: -10,
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1,
        opacity: 0
    })

}

let xScale = 1;
let yScale = 1;

let xpre = 0;
let ypre = 0;

let timeout;

function circleSkew() {
    window.addEventListener("mousemove", function(dets) {
        this.clearTimeout(timeout);
       
        let xdiff = dets.clientX - xpre;
        let ydiff = dets.clientY - ypre;

        xpre = dets.clientX;
        ypre = dets.clientY;

        xScale = gsap.utils.clamp(0.8,1.2,xdiff);
        yScale = gsap.utils.clamp(0.8,1.2,ydiff);

        circleMouserFollower(xScale, yScale);
        timeout = this.setTimeout(()=> {
            document.querySelector("#minicircle").style.transform = `translate( ${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100)

    })
}

function circleMouserFollower(xScale, yScale) {
    document.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate( ${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`;
    })
}


circleSkew();
circleMouserFollower()
firstPageAnim()

document.querySelectorAll(".elem").forEach(function(elem) {
    let rotate = 0;
    let diffrote = 0;

    elem.addEventListener("mouseleave", function(dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });


    elem.addEventListener("mousemove", function(dets) {
        let diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrote = rotate - dets.clientX;
        rotate = dets.clientX; 

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrote * 0.8)
        })
    })
});