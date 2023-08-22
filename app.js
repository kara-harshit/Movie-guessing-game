const movieTitle=document.getElementById("movie_title");
const alphaInput=document.getElementById("alpha_input");
const button=document.getElementById("button");
const score=document.getElementById("score");
const timeblock=document.getElementById("time_block");
const mainContainer=document.getElementById("main_container");


let check=true;
let timevar;
function Updatetime(){  
    let fixTime=60;
    if(check)
    {
        clearInterval(timevar);
    }
    timevar=setInterval(()=>{
       
        if(fixTime>=0)
        {
            timeblock.innerHTML=`TIMER : ${fixTime}`;
            fixTime--;
        }else{
            clearInterval(timevar);
            mainContainer.innerHTML="";
            setTimeout(()=>{
                mainContainer.innerHTML=`<p>${movieName}</p>`;
            },2000)
            // let response=confirm("WANT TO RESTART GAME");
            // if(response){
            //     startGame();
            // }else{
            //     alert("Okay Bye")
            // }
        }
    },1000);
   
}

window.onload=function () {
    alphaInput.focus();
    fillMovieName();
    Updatetime();
}

let demoArray=["kabir singh","arjun reddy","ram lakhan","tere ishq mein","Pathaan","Baahubali 2 The Conclusion","KGF Chapter 2",
"Shivaay",	 
"Batla House",
"Zero",
"Welcome Back",
"Baaghi 3",
"Baby",
"Manikarnika: The Queen of Jhansi",	
"Luka Chuppi",	
"Raajneeti",
"Talaash",
"Satyameva Jayate",
"Bholaa",
"Singh Is Bliing",
"Zindagi Na Milegi Dobara",
"Badla",
"Zara Hatke Zara Bachke",
"Gabbar is Back",
"Rab Ne Bana Di Jodi",
"JugJugg Jeeyo",
"Kantara",
"Kalank",
"Pati Patni Aur Woh",
"Fan",
"Satyaprem Ki Katha",
"My Name Is Khan",
"Brothers",
"Padman",
"Oh My God",
"Veere Di Wedding",
"Sair",
"Dhoom 2",
"Fukrey Returns",
"The Dirty Picture",
"Piku",
"Sui Dhaaga"]
let movieArray=[];

for(let i=0;i<demoArray.length;i++)
{
    movieArray[i]=demoArray[i].toLowerCase();
}
let indexofBlank=[];

function getMovieIndex(){
    let num=Math.floor(Math.random()*movieArray.length);
    return num;
}

function getMovieName()
{
    const randIndex=getMovieIndex();
    console.log(randIndex);
    const movieName=movieArray[randIndex];
    return movieName;
}
let movieName="";
function fillMovieName()
{
    movieName=getMovieName();
    let clutter="";
    for(let i=0;i<movieName.length;i++)
    {
        let randNum=Math.floor(Math.random()*2);
        if(movieName[i]===" ")
        {
            clutter+=` <li>-</li>`
        }else if(randNum){
            clutter+=` <li>${movieName[i]}</li>`

        }else{
            clutter+=` <li>#</li>`
            indexofBlank.push(i);
        }
    }
    if(clutter.includes("#")){
        movieTitle.innerHTML=clutter;

    }else{
        fillMovieName();
    }
}

function fillCharacter(alpha,movie){
    let newclutter="";
    
    for(let i=0;i<movie.length;i++)
    {
        if(movie[i]===" ")
        {
            newclutter+=` <li>-</li>`
        }else if(movie[i]===alpha && indexofBlank.includes(i))
        {
            newclutter+=` <li>${alpha}</li>`
            for(let j=0;j<indexofBlank.length;j++)
            {
                if(movie[indexofBlank[j]]===alpha)
                {
                    indexofBlank.splice(j,1);
                    break;
                }
            }
        }else{
            if(indexofBlank.includes(i))
            {
                newclutter+=`<li>#</li>`
            }else{
                newclutter+=` <li>${movie[i]}</li>`
            }
        }
    }
    movieTitle.innerHTML="";
   
    movieTitle.innerHTML=newclutter;
    if(!newclutter.includes("#")){
        movieTitle.innerHTML="you won!";
        setTimeout(()=>{
            fillMovieName();
            check=true;
            Updatetime();
        },1000)
    }
    

}
let chances=5;
function updateChances()
{
    chances--;
    if(chances===0)
    {
        movieTitle.innerHTML=`<p>${movieName}</p>`;
        setTimeout(()=>{
            fillMovieName();
            check=true;
            Updatetime();
        },1500)
        
    }

        score.innerHTML=`Chances left : ${chances}`;
}
button.addEventListener("click",()=>{
    alphaInput.focus();
    const alpha=alphaInput.value;
    alphaInput.value="";
    if(alpha==="")
    {
        alert("Enter valid value, smjhe?");
    }else{
        const result=movieName.includes(alpha);
        if(result)
        {
            fillCharacter(alpha,movieName);
        }else{
            updateChances();
        }
    }
})

alphaInput.addEventListener("keypress",()=>{
    if(event.key==="Enter")
    {
        event.preventDefault();
        button.click();
    }
})

