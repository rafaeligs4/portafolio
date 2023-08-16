const scrollableElement = document.querySelector(".slider");
const element = document.querySelectorAll(".card");
let circles = document.querySelectorAll(".circle_slider"); 
let currentIndex =0;
let numberElements = element.length;
let eachDistance = scrollableElement.scrollWidth/numberElements;
console.log("Cada elemento tiene una distancia de: ",eachDistance);
function snapElementsToPosition(element,index,array) {

      let scrollLeft;
      let startX;
      let percentageScroll = scrollableElement.scrollWidth;
      let isDragging = false;
      let deltaX = 0;

      const elementRect = element.getBoundingClientRect();
      console.log(elementRect);
      let ismovePositive = true;     
      element.addEventListener("mousedown",(e)=>{
        isDragging = true;
        startX = e.clientX - scrollableElement.offsetLeft;
        
        scrollLeft = scrollableElement.scrollLeft;
        console.log(scrollLeft,"scrollleft")
        
        console.log("El index es: "+currentIndex);
        e.preventDefault();
      });
      element.addEventListener("mousemove",(e)=>{
        if (!isDragging) return;
        const x = e.clientX - scrollableElement.offsetLeft;
   
        deltaX = x - startX;
        let scrolTot= scrollLeft - deltaX;
        if(scrolTot<0){
          scrolTot=0;
        }
        else if(scrolTot>percentageScroll){
          scrolTot=elementRect.width;
        }
        console.log(x);
        console.log(deltaX);
        if(deltaX>0){
         ismovePositive=true;
        }else{
          ismovePositive=false;
        }
       
        scrollableElement.scrollLeft = scrolTot;
        
       
        
        
      });
      element.addEventListener("mouseup",(e)=>{
        isDragging = false;
        console.log(index);
        const movScroll = Math.abs(deltaX);
        console.log("scroll mov",movScroll);
        let widthSlider;
        if(movScroll>=(elementRect.width/2)){
              if(ismovePositive){
                  widthSlider = index-1;
                  if(widthSlider<0){
                      return;
                  }
                  
                  cambiarPosicion(widthSlider);
              
                  actualizarCurrentIndex(index-1);
                  deltaX=0;
            
              }else{
                  widthSlider = index+1;
                  if(index===0)widthSlider=1;
                  scrollableElement.scrollLeft = eachDistance*widthSlider;
                  actualizarCurrentIndex(widthSlider);
                  unactiveElements(circles);
                 } 
        }
        else{
              let restaPosition =   elementRect.left- scrollableElement.getBoundingClientRect().left;
              console.log("resta: ",restaPosition)
              scrollableElement.scrollLeft=restaPosition;
              actualizarCurrentIndex(index);
        }
      
      });
    
      // if (Math.abs(elementRect.left - scrollableElement.getBoundingClientRect().left) < threshold) {
      //     scrollableElement.scrollLeft += elementRect.left - scrollableElement.getBoundingClientRect().left;
      //     element.classList.add("animate_mov_left");
      //     console.log(element);
      // }
      // else{
      //   element.classList.toggle("animate_mov_right");
      // }
    
}

function cambiarPosicion(index){
if(index<0 || index>numberElements) return;
actualizarCurrentIndex(index);

let newPosition = (index)*eachDistance;

scrollableElement.scrollLeft = newPosition;
unactiveElements(circles);
} 


function actualizarCurrentIndex(numero){

  currentIndex=numero;
  console.log("El index actual es: "+currentIndex);
}
element.forEach(snapElementsToPosition);

document.querySelector('#btn_next').addEventListener("click",()=>{
  if(currentIndex>=(numberElements-1)){cambiarPosicion(0)} 
  else cambiarPosicion(currentIndex+1);
  unactiveElements(circles);


});

document.querySelector('#btn_prev').addEventListener("click",()=>{
  if(currentIndex==(0)){cambiarPosicion(numberElements-1)} 
  else cambiarPosicion(currentIndex-1);
  unactiveElements(circles);
});

function activeElement(element,index,array){
   element.addEventListener('click',()=>{
    cambiarPosicion(index);
    unactiveElements(array)
   });
      
}
function unactiveElements(arr){
  console.log(arr);
  for (let index = 0; index < arr.length; index++) {
    if(arr[currentIndex]===arr[index]){
      arr[index].classList.add("circle_active");
      console.log(arr[currentIndex]);
    }
    else{
    arr[index].classList.remove('circle_active');
    } 
    
  }
}

circles.forEach(activeElement);
