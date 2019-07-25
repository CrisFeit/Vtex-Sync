export const General ={
init(){
  General.menuMobile();
},
//Mobile
  menuMobile() {
    General.components.mobileMenu.addEventListener('click', function () {
      this.classList.toggle("change");
      General.components.navMenu.classList.toggle("change");
      General.components.listMenu.classList.toggle("change");
    })
  }
}