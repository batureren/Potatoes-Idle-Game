//! Variables
let counter = parseInt(localStorage.getItem("potatoCounter")) || 0
let peelerCounter = parseInt(localStorage.getItem("peelerCounter")) || 0
let mashCounter = parseInt(localStorage.getItem("mashCounter")) || 0
let potatoAnimationRandomizer = 0
const potatoContainer = document.getElementById("potatoContainer")
const potatoContainerII = document.getElementById("potatoContainerII")
const potatoContainerIII = document.getElementById("potatoContainerIII")
const counterRight = document.getElementById("counter-right")
const peelerHTML = document.getElementById("potato-peeler-html")
const mashHTML = document.getElementById("potato-masher-html")
const plus = document.getElementById("plus")
const peelerPlus = document.getElementById("potato-peeler-plus")
const mashPlus = document.getElementById("potato-masher-plus")
const upgradeII = document.getElementById("upgradeII")
const bodyimage = document.querySelector("body")
//! Variables Done

//! When the app starts
window.onload = ()=>{
    counterRight.innerHTML = counter;
    if (counter === 0){
        bodyimage.style.setProperty('--bg-opacity', '0.00');
    }
    const savedPeelerHTML = localStorage.getItem("peelerHTML");
    const savedMashHTML = localStorage.getItem("mashHTML");
    // kayıt edilmiş opacity'sini localden çeker
    const savedBgOpacity = localStorage.getItem('bgOpacity');
    if(peelerCounter >= 1){
        peelerHTML.innerHTML = (`${savedPeelerHTML}`)
    }
    if(mashCounter >= 1){
        mashHTML.innerHTML = (`${savedMashHTML}`)
    }
    // eğer değer boş değilse, css değerini ekler
    if (savedBgOpacity !== null) {
        bodyimage.style.setProperty('--bg-opacity', savedBgOpacity);
    }
    if (peelerCounter >= 5){
        upgradeII.classList.remove("display-none")
    }
}
//! App booting ends

//! Potato spawn animations
function potatoAnimation(){
    potatoContainer.classList.add("potatoAnimation");
    setTimeout(() => {
        potatoContainer.classList.remove("potatoAnimation")
    }, 950);
    ++potatoAnimationRandomizer 
}

function potatoAnimationII(){
    potatoContainerII.classList.add("potatoAnimationII");
    setTimeout(() => {
        potatoContainerII.classList.remove("potatoAnimationII")
    }, 950);
    ++potatoAnimationRandomizer 
}

function potatoAnimationIII(){
    potatoContainerIII.classList.add("potatoAnimationII");
    setTimeout(() => {
        potatoContainerIII.classList.remove("potatoAnimationII")
    }, 950);
    ++potatoAnimationRandomizer 
}
//! Animation Done

//! Top Plus Button
plus.addEventListener("click", () =>{
    counter++
    counterRight.innerHTML = counter
    localStorage.setItem("potatoCounter", counter);
    if (potatoAnimationRandomizer === 0){
        potatoAnimation()
    }else if (potatoAnimationRandomizer === 1){
        potatoAnimationII()
    }else if (potatoAnimationRandomizer === 2){
        potatoAnimationIII()
    }else if (potatoAnimationRandomizer >= 3){
        potatoAnimation()
        potatoAnimationRandomizer = 0
    }

    //background opacity'sini locale atar
    updateBackgroundOpacity(counter);
    const bgOpacity = getComputedStyle(bodyimage).getPropertyValue("--bg-opacity").trim();
    localStorage.setItem("bgOpacity", bgOpacity);
});
//! Top Plus Button Done

//! Opacity Counter
function updateBackgroundOpacity(counter) {
    const counterOpacityMap = {0: 0.00, 20: 0.01,40: 0.02, 60: 0.03, 80: 0.04, 100: 0.05, 120: 0.06, 140: 0.07, 160: 0.08, 180: 0.09, 200: 0.10, 250: 0.11, 350: 0.12, 500: 0.13, 900: 0.14, 1400: 0.15, 2000: 0.16, 3000: 0.17, 5000: 0.18, 10000: 0.19, 50000: 0.20, 100000: 0.21, 200000: 0.22, 300000: 0.23, 600000: 0.24, 1000000: 0.25,
      };
      let opacity = 0.00;
      for (let i in counterOpacityMap) {
        if (counter > i) {
          opacity = counterOpacityMap[i];
        } else {
          break;
        }
      }
      
      bodyimage.style.setProperty('--bg-opacity', opacity);
    bodyimage.clientHeight;
}

//! Opacity Counter Done

//! bottom peeler-click

let peelSec = 0.9
let peelCost = 50
let peelInterval = 1100 // starting interval in milliseconds
let lastPeelerCounter = 0
let mashSec = 25.10
let mashCost = 1000
let mashInterval = 39 // starting interval in milliseconds
let lastMashCounter = 0

peelerPlus.addEventListener("click", () =>{
if (counter >= 50 && counter >= peelCost * peelerCounter){
    if (peelerCounter === 0){
        counter -= 50
    }
    counter -= peelCost * peelerCounter
    counterRight.innerHTML = counter
    updateBackgroundOpacity(counter);
    peelerCounter++
    localStorage.setItem("peelerCounter", peelerCounter);
    peelerHTML.innerHTML = (`: ${(peelSec * peelerCounter).toFixed(2)}/sec & Cost: ${peelCost * peelerCounter} Potatoes`)
    localStorage.setItem("peelerHTML", peelerHTML.innerHTML);
    peelerPotatoes()
} else {
    return;
}
})

function updatePeelInterval() {
  // Calculate the new interval based on the peelerCounter
  const newInterval = Math.floor(peelInterval / peelerCounter)
  // Clear the existing setInterval
  clearInterval(peelTimer)
  // Set a new setInterval with the updated interval
  peelTimer = setInterval(peelerPotatoes, newInterval)
  // Store the last peelerCounter value
  lastPeelerCounter = peelerCounter
}

if (peelerCounter >= 1){
    // Start the setInterval
    var peelTimer = setInterval(peelerPotatoes, peelInterval)
}

function peelerPotatoes() {
    counter++
    updateBackgroundOpacity(counter);
    counterRight.innerHTML = counter;
    localStorage.setItem("potatoCounter", counter);
    if (peelerCounter >= 5){
        upgradeII.classList.remove("display-none")
    }
    // Check if the peelerCounter has changed since the last update
    if (peelerCounter !== lastPeelerCounter) {
      updatePeelInterval()
    }
}

//! bottom peeler-click Done


//! Masher section

mashPlus.addEventListener("click", () =>{
    if (counter >= 1000 && counter >= mashCost * mashCounter){
        if (mashCounter === 0){
            counter -= 1000
        }
        counter -= mashCost * mashCounter
        counterRight.innerHTML = counter
        updateBackgroundOpacity(counter);
        mashCounter++
        localStorage.setItem("mashCounter", mashCounter);
        mashHTML.innerHTML = (`: ${(mashSec * mashCounter).toFixed(2)}/sec & Cost: ${mashCost * mashCounter} Potatoes`)
        localStorage.setItem("mashHTML", mashHTML.innerHTML);
        mashPotatoes()
    } else {
        return;
    }
    })

    if (mashCounter >= 1){
        // Start the setInterval
        var mashTimer = setInterval(mashPotatoes, mashInterval)
    }


    function mashPotatoes() {
        counter++
        updateBackgroundOpacity(counter);
        counterRight.innerHTML = counter;
        localStorage.setItem("potatoCounter", counter);
        // if (mashCounter >= 5){
        //     upgradeIII.classList.remove("display-none")
        // }
        // Check if the peelerCounter has changed since the last update
        if (mashCounter !== lastMashCounter) {
          updateMashInterval()
        }
    }

    function updateMashInterval() {
        // Calculate the new interval based on the peelerCounter
        const masherInterval = Math.floor(mashInterval / mashCounter)
        // Clear the existing setInterval
        clearInterval(mashTimer)
        // Set a new setInterval with the updated interval
        mashTimer = setInterval(mashPotatoes, masherInterval)
        // Store the last peelerCounter value
        lastMashCounter = mashCounter
      }