function back(){location.href='../index.html#examples'}
const lb=document.getElementById('lb'), lbimg=document.getElementById('lbimg');
function openImage(src){lbimg.src=src;lb.classList.add('open');document.body.style.overflow='hidden'}
function closeLB(){lb.classList.remove('open');lbimg.removeAttribute('src');document.body.style.overflow=''}
function backdropClose(e){if(e.target===lb)closeLB()}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()})
