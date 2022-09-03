const sections = [...document.querySelectorAll(".content-section")]
const navLinks = [...document.querySelectorAll("nav a")]
const documentationContainer = document.querySelector(".documentation-content")


/********************************************************* NAVIGATION SCROLL *************************************************************** */
window.addEventListener("load", () => {
  let data = sections.map(section => section.offsetTop)
  console.log(data);

  // Resize Observer
  const resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(documentationContainer)

  let firstLoad = true;
  function handleResize(){
    if(!firstLoad)  data = sections.map(section => section.offsetTop)
    firstLoad = false;
  }

  // Intersection Observer
  const intersectionObserver = new IntersectionObserver(startWatching, {rootMargin: "10% 0px"}) 
  intersectionObserver.observe(documentationContainer)

  function startWatching(entries) {
    if(entries[0].isIntersecting) {
      window.addEventListener("scroll", handleScroll)
    } else if (!entries[0].isIntersecting) {
      const elToClean = navLinks.find(navLink => navLink.className.includes("marked"))
      if(elToClean) elToClean.classList.remove("marked")
      savedIndex = undefined;
      window.removeEventListener('scroll', handleScroll)
    }
  }

  navLinks.forEach((navLink, index) => {
    navLink.addEventListener("click", e => {
      e.preventDefault()

      window.scrollTo({
        top: data[index],
        behavior: "smooth"
      })
    })
  })

  // window.addEventListener("scroll", handleScroll)

  let savedIndex;
  function handleScroll(){

    const trigger = window.scrollY + (window.innerHeight/2)

    for(const i of data) {
      const index = data.indexOf(i)

      if(trigger >= data[index] && trigger < data[index +1]){
        if(index !== savedIndex) {
          savedIndex = index;
          addClassAndClear(index)
        }
        break;
      }

      if(index === data.length - 1 && trigger >= data[index]) {
        if(index !== savedIndex) {
          savedIndex = index;
          addClassAndClear(index)
        }
      }
    }
  }
  handleScroll()

  function addClassAndClear(index) {
    const elToClean = navLinks.find(navLink => navLink.className.includes("marked"))
    if(elToClean) elToClean.classList.remove("marked")
    navLinks[index].classList.add("marked")
  }
})


// Animation au démarrage
const btns = document.querySelectorAll('.btn-first');
const appartTitle = document.getElementById('appart');
const description = document.querySelector('.description');

window.addEventListener('load', () => {

  const TL = gsap.timeline({paused: true});
  
  TL
  .staggerFrom(btns, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.3)
  .staggerFrom(appartTitle, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.3, '-=0.5')
  .staggerFrom(description, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.3, '-=0.25')
  
  
  TL.play();
  })




/********************************************************* HAMBURGER *************************************************************** */
const hamburgerButton = document.querySelector('.hamburger-btn');
const navbar = document.querySelector('#navbar');

hamburgerButton.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

const a1 = document.querySelector('.a1');
const a2 = document.querySelector('.a2');
const a3 = document.querySelector('.a3');
const a4 = document.querySelector('.a4');

a1.addEventListener("click", () => { navbar.classList.remove('active'); });
a2.addEventListener("click", () => { navbar.classList.remove('active'); });
a3.addEventListener("click", () => { navbar.classList.remove('active'); });
a4.addEventListener("click", () => { navbar.classList.remove('active'); });



/********************************************************* SCROLL TO *************************************************************** */

// Initialisation de la librairie pour l'animation au  scroll
AOS.init();

const nav1 = document.querySelector('#nav1');
const nav2 = document.querySelector('#nav2');
const nav3 = document.querySelector('#nav3');
const nav4 = document.querySelector('#nav4');

const appart = document.querySelector('#appart');
const immeuble = document.querySelector('#imm');
const commune = document.querySelector('#comm');
const contact = document.querySelector('#conta');

nav1.addEventListener('click', () => { navigateScrollIntoView(appart) });
nav2.addEventListener('click', () => { navigateScrollIntoView(immeuble) });
nav3.addEventListener('click', () => { navigateScrollIntoView(commune) });
nav4.addEventListener('click', () => { navigateScrollIntoView(contact) });


function navigateScrollIntoView(el) {
  el.scrollIntoView({behavior:"smooth"});
}