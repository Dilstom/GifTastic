        
//======adding array list and new buttons =======
        
//Initial array of movies
    var animalList=["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
renderButtons();
//Function for displaying animal giphy data
    function renderButtons() {
//Delet the animal buttons proir to adding new animal button (eliminate repeating buttons)
        $("#animalButtons").empty();
//Looping through the array of animalList
    for (var i = 0; i < animalList.length; i++) {
//Dynamically generate buttons for each animal in the array.
//$("<button>") is needed to create the start and end tag.(<button></button>)
var a = $("<button>");
// Adding a class 
 a.addClass("newAnimal");
// Adding a data-attribute with a value of the animal at index i
 a.attr("data-name", animalList[i]);
//providing the button's text with a value of the animal at index i
a.text(animalList[i]);
//adding the button to the HTML
$("#animalButtons").append(a);
    }
}
// this function fires on click event
$("#addAnimal").on("click", function(event) {
// evetn.preventDefault() prevents the form from trying to submit itself.
event.preventDefault();
//this line will grab the inputed text line
var animalText = $("#animal-input").val().trim();
// the movie from the textbox is then added to our array
animalList.push(animalText);
//calling renderButtons which handles the processing of our animal list array
    renderButtons();
});
// calling again the renderButtons function at least once to display the initial list of movies
renderButtons();
// ======================== end of adding buttons

// ==start of onlick button Giphs display in div id=#animals
    
    $("#animalButtons").on("click", function(event) {
        console.log(event.target)
        var animal = $(event.target).attr("data-name");
        
         var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(animal, "cat");
    $.ajax({
          url: queryURL,
          method: "GET"
        })
// After data comes back from the request
        .done(function(response) {
          console.log(queryURL);

          console.log(response);
// storing the data from the AJAX request in the results variable
          var results = response.data;
            
        
        $("#animalWrapper").remove();
        var animalWrapper = $("<div id='animalWrapper'>");
       console.log(animalWrapper, "animalWrapper");
        console.log('length ---> ', animalList.length)
        console.log(' the list ---> ', animalList)
        
// Looping through each result item
          for (var i = 0; i < results.length; i++) {
              

 // Creating and storing a div tag
            var animalDiv = $("<div>")
 // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

// Creating and storing an image tag
            var animalImage = $("<img>");
// Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);

// Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);
              
// console.log(response.data[1].url);
//              //==========testing start
//              var a = response.data[i].url;
//               a.attr("data-state", still);
              
              
// Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            animalWrapper.prepend(animalDiv);
          }
       
         $("#animals").append(animalWrapper);
        });
    })
    
 
    
//====change states of gifs
        
       
//    $(animalDiv).on("click", function() {
//      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//      var state = $(this).attr("data-state");
//      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//      // Then, set the image's data-state to animate
//      // Else set src to the data-still value
//      if (state === "still") {
//        $(this).attr("src", $(this).attr("data-animate"));
//        $(this).attr("data-state", "animate");
//      } else {
//        $(this).attr("src", $(this).attr("data-still"));
//        $(this).attr("data-state", "still");
//      }
//    });
//== end change state of gifs===
    
    