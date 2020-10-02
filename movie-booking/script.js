const seat = document.querySelectorAll('.row .seat:not(.occupied)');// will return node list simple terms like array
const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectBox = document.getElementById('movie');
let selectedValue =  +selectBox.value;

populateUI();

function populateUI(){
   const selectedSeats =  JSON.parse(localStorage.getItem('seat'));
   if(selectedSeats!==null && selectedSeats.length >0){
       seat.forEach((s,index)=>{
           if(selectedSeats.indexOf(index)>-1){
               s.classList.add('selected');
           }
       })
   }
}

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('movie',movieIndex)
    localStorage.setItem('price',moviePrice)
}

function updatedSelectedCount(){


    const selectedseats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedseats].map((s)=>[...seat].indexOf(s));
    localStorage.setItem('seat',JSON.stringify(seatsIndex));
    total.innerText = selectedseats.length * selectedValue;
    count.innerText= selectedseats.length;

}

selectBox.addEventListener('change',(e)=>{
 selectedValue = +e.target.value;
 setMovieData(e.target.selectedIndex,e.target.value);
 updatedSelectedCount();
});

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')){
     e.target.classList.toggle('selected');
     updatedSelectedCount();
    }
});