// import { handleDrag, handleDragEnd, handleDragStart } from "./carrousel.js";
const d = document;
const scrollOffset = 100;
const scrollElement = document.querySelectorAll(".js-scroll");

//initialize throttleTimer as false 
let throttleTimer = false;
const throttle = (callback, time) => {
    //don't run the function while throttle timer is true 
    if (throttleTimer) return;
    
    //first set throttle timer to true so the function doesn't run 
    throttleTimer = true;
    
    setTimeout(() => {
        //call the callback function in the setTimeout and set the throttle timer to false after the indicated time has passed 
        callback();
        throttleTimer = false;
	}, time);
}

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= 
    ((window.innerHeight || document.documentElement.clientHeight) - offset)
  );
};
const displayScrollElement = (element) => {
  element.classList.add('scrolled');
}
const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
}
const handleScrollAnimation = () => {
    scrollElement.forEach(elemnt=>{
        if (elementInView(elemnt, scrollOffset)) {
            displayScrollElement(elemnt);
        } else {
          hideScrollElement(elemnt);
        }
    })
 
}
document.addEventListener('DOMContentLoaded',()=>{
  handleScrollAnimation();
});
window.addEventListener('scroll', () => {
  throttle(handleScrollAnimation,250); 
});
