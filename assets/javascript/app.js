
// create an array of strings, each one related to a topic that interests you.
//Save it to a variable called topics.

var topics = ["puppies", "kittens", "hamsters", "ponies", "koala bears", "mice", "guinea pigs", "rabbits"]

// take the topics in this array and create buttons in your HTML.
 
//function to create button
function displayButtons() {
  $(".buttons").empty();
  // Try using a loop that appends a button for each string in the array.
  for (var i = 0; i < topics.length; i++) {

    var topicButtons = $("<button>");

    //  //  promise function--when we get the response, do this--
    //   .then(function (response) { //the word response is totally arbitary-

    // assigns a variable to the image url it is pulling in from the API
    // var imageUrl = response.data.image_original_url;

    // add text to topicButton
    topicButtons.text(topics[i]);

    //add class to button
    topicButtons.addClass("animalButton");

    // this new image will go before the last--PUTS THE NEWEST FIRST
    $(".buttons").prepend(topicButtons);
  }
}
displayButtons();

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
$(document).on("click", ".animalButton", function () {
  var topics = $(this).text();
  // console.log(topics);

  // links the api using the query URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topics + "&api_key=dc6zaTOxFJmzC&limit=10";

  // does ajax call using GET method to plug into query URL as defined above
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) { // don't want code to run anymore until we get a response back
    var results = response.data;
console.log(results)
    for (var i = 0; i < results.length; i++) {
    

      var gifDiv = $("<div>");

      // Under every gif, display its rating (PG, G, so on).

      var rating = results[i].rating;

      // show rating to the page
      var showRating = $("<p>").text("Rating: " + rating);

      // add attributes 
      var image = $("<img class= 'animalImages'>");
      image.attr("src", results[i].images.fixed_height_still.url); //default is still image
      image.attr("data-still", results[i].images.fixed_height_still.url);
      image.attr("data-animate", results[i].images.fixed_height.url);
      image.attr("data-state", "still");


      gifDiv.prepend(image);

      $("#images").prepend(gifDiv);
    }
  })
})
$(document).on("click", ".animalImages",function() {

 // give state variables a data-state attribute
  var state=$(this).data("state");
  // var state = $(this).attr("data-state");

  console.log(state)

  // When the user clicks one of the still GIPHY images, the gif should animate.

  if (state === "still") {
    var animate = $(this).attr("data-animate");

    // then update the src attribute of this image to it's data-animate value,
    $(this).attr("src", animate);

    // and update the data-state attribute to 'animate'.
    $(this).attr("data-state", "animate");

  }

  // If state is equal to 'animate', then update the src attribute of this

  if (state === "animate") {
    var still = $(this).attr("data-still");

    // image to it's data-still value and 
    $(this).attr("src", still);

    // update the data-state attribute to 'still'
    $(this).attr("data-state", "still");

  }

})
// on click
$(document).on("click", "#form-submit", function(){

 // Add a form to your page takes the value from a user input box 

var userInput=$("#input-value").val();

// and adds it into your topics array. 
topics.push(userInput);

 //   function remakeButtons() {
displayButtons();
})
