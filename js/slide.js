
var num_slides = 6;
var duration = 10;
var click_disabled = false;

function transition(i, j) {
    if(click_disabled) return;
    click_disabled = true;

    var slide_i = document.getElementById('slide-'+i);
    var slide_j = document.getElementById('slide-'+j);

    var fadeout = setInterval(function () {
        if (slide_i.style.opacity > 0) {
            slide_i.style.opacity = parseFloat(slide_i.style.opacity) - 0.1;
        } else {
            clearInterval(fadeout);
        }
    }, 50);

    var fadein = setInterval(function () {
        if (slide_i.style.opacity <= 0) {
            if (slide_j.style.opacity < 1) {
                slide_j.style.opacity = parseFloat(slide_j.style.opacity) + 0.1;
            } else {
                clearInterval(fadein);
                click_disabled = false;
            }
        }
    }, 50);
}

document.addEventListener("DOMContentLoaded", function(event){

    var i = 0;
    var j = i+1;
    var t = duration+1;
    var locked = false;

    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var left_link = document.getElementById('left_link');
    var right_link = document.getElementById('right_link');
    var cites = document.querySelector(".cites");

    cites.addEventListener("mouseover", function(){
        locked = true;
        left.style.opacity=1;
        right.style.opacity=1;
    }, false);

    cites.addEventListener("mouseout", function(){
        locked = false;
        left.style.opacity=0;
        right.style.opacity=0;
    }, false);

    left_link.addEventListener("click", function(){
        if(click_disabled) return;
        t = duration+1;
        j = (i-1+num_slides)%num_slides;
        transition(i, j);
        i = j
        j = (i+1)%num_slides;
    }, false);

    right_link.addEventListener("click", function(){
        if(click_disabled) return;
        t = duration+1;
        transition(i, j);
        i = (i+1)%num_slides;
        j = (i+1)%num_slides;
    }, false);

    setInterval(function(){
        if(locked)
            return;
        if(document.hidden)
            return;

        t--;
        if(t<=0){
            transition(i, j);
            t = duration;
            i = (i+1)%num_slides;
            j = (i+1)%num_slides;
        }

        var div = document.getElementById('seconds');
        div.innerHTML = t;

    }, 1000);


});



