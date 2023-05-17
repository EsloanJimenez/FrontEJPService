export const Main = () => {
   const headerLong = document.querySelector('.main-long');
   const menu = document.querySelector('.main')
   const img = document.querySelector('.imgLong');
   const info = document.querySelector('.InfoLong');

   window.addEventListener('scroll', () => {
      headerLong.classList.toggle('bajando', window.scrollY > 0);
      menu.classList.toggle('subiendo', window.scrollY>0);
      img.classList.toggle('imgSmall', window.scrollY>0);
      info.classList.toggle('InfoSmall', window.scrollY>0);
   })
}