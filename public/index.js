
var likebutton = document.getElementsByClassName("likebtn");
var redlikebutton = document.getElementsByClassName("redLike");

$(".likebtn").click(function(){
    $(this).siblings().toggleClass("hidden");
    $(this).toggleClass("hidden");
    
    let newNumber = 
    $(".likeAmount").html;
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

// $("").click(function() {
//     var htmlString = $( this ).html();
//     $( this ).text( htmlString );
//   });

// function liked(event, postId) {
//     const target = event.currentTarget;
//     Axios.post('/like/:id')
//         .then(function(response) {
//             likeAmount.innerHTML(response.data.likes)
//         })
// }

// }