
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()



// function handlename()
// {
//   var names=document.getElementById("name").value;
//   var nam_warning=document.getElementById("warning");

//   if(names.length==10)
//   {
//     nam_warning.innerText="correct";
//   }  else if(names.length>10)
//   {
//     nam_warning.innerText=" not correct";
//   }



// }
function handlesubmit()
{
  var names=document.getElementById("name").value;
  var email=document.getElementById("email").value;
  var numbers=document.getElementById("number").value;
  var message=document.getElementById("message").value;
    var regx=/^[A-Za-z]+$/;
    var emi=/\b^[^ ][a-z.\-_0-9]+@[a-z0-9]+\.[a-z]{2,3}\b/;
    var num= /^[1-9]\d{9}$/;
    var name_validation=false;
    var email_validation=false;
    var number_validation=false;
    if(!names.match(regx))
    {
      alert("follow the instructions");
      // document.form1.name.focus();
      // return false;
      name_validation=false;
      return false;
    }
    else if(names==""){
      alert("MUST HAVE NAME");
      return false;
    }
    else{
      name_validation=true;
    }
    

    if(!email.match(emi))
    {
      alert("Type email");
      document.form1.email.focus();
      return false;
      
    }
    else if(email=="")
    {
     alert("MUST HAVE Email");
     document.form1.email.focus();
     return false;
     
    }
    else{
      email_validation=true;
    }
    

    if(!numbers.match(num))
    {
      alert("Type number please ");
      document.form1.number.focus();
      return false;
      

    }
    else if(numbers=="")
    {
     alert("MUST HAVE number");
     document.form1.number.focus();
     return false;
    }
    else{
      number_validation=true;
    }

   
   if(message=="")
   {
    alert("MUST HAVE message");
    document.form1.message.focus();
    return false;
   }
 


  //  if(name_validation==true && number_validation==true && email_validation==true)
  //  {
    
       var params={
        from_name:document.getElementById("name").value,
        email_id:document.getElementById("email").value,
        message:document.getElementById("message").value,
        from_number:document.getElementById("number").value
       }
       emailjs.send("service_64q44sa","template_qehy0vm",params).then(function(res){
        alert("sucess!"+res.status)
       })
 
  
  // }
  return true;
}