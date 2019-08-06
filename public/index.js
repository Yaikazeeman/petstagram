// import Axios from "axios";

var likebutton = document.getElementsByClassName("likebtn");
var redlikebutton = document.getElementsByClassName("redLike");

$(".likebtn").click(function(){
    $(this).siblings().toggleClass("hidden");
    $(this).toggleClass("hidden");
    
})

$(".redLike").click(function(){
    $(this).siblings().toggleClass("hidden");
    $(this).toggleClass("hidden");
})

$(".nav-profileImg").click(function(){
    $(".linkDiv").toggleClass('hidden');
  });


var showMoreBtn = document.getElementsByClassName("showComments");

$(".showComments").click(function(){
    $(".commentDiv").toggleClass('hidden');
})


// function changeLikes () {
//     Axios.get(){

//     }

//     let clickLikeBtn = document.getElementsByClassName("likeAmount")[0].onClick

//     clickLikeBtn.innerHTML = 
// }