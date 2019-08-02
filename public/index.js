var likebutton = document.getElementsByClassName("likebtn");
var redlikebutton = document.getElementsByClassName("redLike");

// function like(e) {
//     let clickedbtn = e.currentTarget;
//     let redlikebtn = e.currentTarget.siblings();
//     $(clickedbtn).toggleClass('hidden')
//     $(redlikebtn[0]).toggleClass('hidden')
// }
$(".likebtn").click(function(){
    $(this).siblings().toggleClass("hidden");
    $(this).toggleClass("hidden");
})

$(".redLike").click(function(){
    $(this).siblings().toggleClass("hidden");
    $(this).toggleClass("hidden");
})

// for (var i = 0; i < likebutton.length; i++) {
//     likebutton[i].onclick = like;
// }

// function unlike(e) {
//     let clickedbtn = e.currentTarget
//     let redlikebtn = document.getElementsByClassName("redLike")
//     $(clickedbtn).toggleClass('hidden')
//     $(redlikebtn).toggleClass('hidden')
// }


// for (var i = 0; i < redlikebutton.length; i++) {
//     redlikebutton[i].onclick = unlike;
// }

$(".nav-profileImg").click(function(){
    $(".linkDiv").toggleClass('hidden');
  });