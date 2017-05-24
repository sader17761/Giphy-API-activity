console.log('It works!');

$(onReady);

function onReady(){
  //listeners
  $('#searchBtn').on('click', function(){
    var randNum = Math.floor(Math.random() * 25);
    if($('#userInput').val() === '' || $('#userInput').val() === undefined){
      alert('OhmyGawd!');
    } else {
      var searchURL = 'http://api.giphy.com/v1/gifs/search?q=';
      searchURL += $('#userInput').val();
      searchURL += '&api_key=dc6zaTOxFJmzC';

      $.ajax({
        url: searchURL,
        type: 'GET',
        success: function (response) {
          console.log(response);
          if(response.data.length === 0){
            $('.container').append('<div class="whoopsies"><p>Sorry!  No results, please try again.</p><img src= https://media.giphy.com/media/80TEu4wOBdPLG/giphy.gif?response_id=5925e85668c66efd24a18672><button class="rmvBtn">Remove</button></div>');
            $('#userInput').val('');
          } else {
          var searchResult = response.data[randNum].images.downsized.url;
          $('#userInput').val('');
          var imgDiv = '<div class="squares">';
          imgDiv += '<img src="' + searchResult + '">';
          imgDiv += '<button class="rmvBtn">Remove</button>';
          imgDiv += '<button class="favBtn">Add To Favorites</button>';
          imgDiv += '</div>';
          $('.container').append(imgDiv);
        }
        },
      }); // end ajax
    } // end of else
  }); // end of on click
  $(document).on('click', '.rmvBtn', function(){
    $(this).parent().remove();
  });
  $(document).on('click', '.favBtn', function(){
    $(this).parent().appendTo('.favorites');
    $(this).remove();

  });
} // end of onReady
