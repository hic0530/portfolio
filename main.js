'use strict';

// Make navbar transparent when it is on the top.
const navbar= document.querySelector('#navbar');
const navbarHeight= navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () =>{
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    if(window.scrollY>navbarHeight){
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Make home slowly fade to transparent as the window scrolls down
// and Show "arrow up" button when scrolling up
const home= document.querySelector('.home__container');
const homeHeight= home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    if (window.scrollY<homeHeight){
        home.style.opacity= (homeHeight-window.scrollY)/homeHeight;
    }
    else{
        home.style.opacity= 0;
    }
    if (home.style.opacity<0.1) {
        arrowBtn.style.display= 'block';
    }
    else {
        arrowBtn.style.display='none';
    }
})
// Hndle click on "arrow" button
const arrowBtn= document.querySelector('.navbar__arrow-btn');

arrowBtn.addEventListener('click',()=>{
    scrollIntoView('#home');
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
    // Remove selection from the previous item and select the new one
    const active= document.querySelector('.navbar__menu__item.active');
    active.classList.remove('active');
    const target= event.target;
    target.classList.add('active');
    const link= target.dataset.link;
    if (link == null){
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
})
// Navbar toggle button for small screen
const navbarToggleBtn= document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open');
});
// Handle click on "contact me" button on home
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click',()=>{
    scrollIntoView('#contact');
});

function scrollIntoView(selector) {
    const scrollTo= document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}

// Projects
const categoryBtnContainer= document.querySelector('.work__categories');
const projectContainer= document.querySelector('.work__projects');
const projects= document.querySelectorAll('.project');

categoryBtnContainer.addEventListener('click',(event)=>{
    // const filter= event.target.dataset.filter;
    // filter에 아무값도 들오오지 않는다면, 부모의 filter값을 넣자!
    const filter= event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

    // Remove selection from the previous item and select the new one
    const active= document.querySelector('.category__btn.active');
    active.classList.remove('active');
    const target= event.target.nodeName ==='BUTTON'?event.target : event.target.parentNode;
    target.classList.add('active');

    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        projects.forEach((project)=>{
            // console.log(project.dataset.type);
            if (filter == '*' || filter == project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        })
        projectContainer.classList.remove('anim-out');

    }, 300)
})

