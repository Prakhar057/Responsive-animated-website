function locomotiveanimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

locomotiveanimation();
function navbaranimation(){
    gsap.to("#nav-part1 svg",{
    transform:"translateY(-100%)",
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        
        start:"top 0",
        end:"top -5%",
        scrub:true
    }
})
gsap.to("#nav-part2 #Link",{
    transform:"translateY(-100%)",
    opacity:0,
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        
        start:"top 0",
        end:"top -5%",
        scrub:true
    }
})
}
navbaranimation();  

function videoconAnimation(){
    var videocon=document.querySelector(
    "#videocontainer");
var playbtn=document.querySelector("#play");
    videocon.addEventListener("mouseenter",function(){
    gsap.to(playbtn, {
        scale:1,
        opacity: 1,
    })
    });

videocon.addEventListener("mouseleave",function(){
    gsap.to(playbtn, {
        scale:0,
        opacity: 0,
    })
}
);

videocon.addEventListener("mousemove",function(dets){
    gsap.to(playbtn, {
        left:dets.clientX,
        top:dets.clientY,
        duration:0.2, // optional: smooth movement
        ease:"power2.out"
    })
}
);


}
videoconAnimation();

function loadingAnimation(){
    gsap.from("#page1 h1",{
    y:100,
    opacity:0,
    delay:0.5,
    duration:1,
    stagger:0.2
})
gsap.from("#videocontainer",{
    scale:0.8,
    opacity:0,
    delay:0.5,
    duration:0.5,
    
})
}
loadingAnimation();

document.addEventListener("mousemove",function(dets){
    var x=dets.clientX;
    var y=dets.clientY;
    var cursor=document.querySelector("#cursor");
    
    gsap.to(cursor,{
        scale:1,

        left:x,
        top:y
    })
});
function cursorAnimation(){
    document.querySelector("#child1").addEventListener("mouseenter",function(){
    gsap.to("#cursor",{
        scale:1,
       transorm:"translate(-50%,-50%)",
    })
})
document.querySelector("#child1").addEventListener("mouseleave",function(){
    gsap.to("#cursor",{
        scale:0,
       transorm:"translate(-50%,-50%)",
    })
})}

cursorAnimation();
