$(document).ready(function () {
  // Check the status of the API
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
      console.log('API Status:', data); // Debug log
      if (data.status === 'OK') {
          $('#api_status').addClass('available');
      } else {
          $('#api_status').removeClass('available');
      }
  });

  // Fetch all places
  $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({}),
      contentType: 'application/json',
      success: function (data) {
          console.log('Places Data:', data); // Debug log
          for (let place of data) {
              $('.places').append(
                  `<article>
                      <div class="title_box">
                          <h2>${place.name}</h2>
                          <div class="price_by_night">$${place.price_by_night}</div>
                      </div>
                      <div class="information">
                          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                      </div>
                      <div class="description">
                          ${place.description}
                      </div>
                  </article>`
              );
          }
      },
      error: function (error) {
          console.log('Error:', error); // Debug log
      }
  });

  // Filter amenities
  let amenities = {};
  $('.amenities input').change(function () {
      if ($(this).is(':checked')) {
          amenities[$(this).data('id')] = $(this).data('name');
      } else {
          delete amenities[$(this).data('id')];
      }
      $('.amenities h4').text(Object.values(amenities).join(', '));
  });

  // Handle search button click
  $('button').click(function () {
      $.ajax({
          url: 'http://127.0.0.1:5001/api/v1/places_search/',
          type: 'POST',
          data: JSON.stringify({ amenities: Object.keys(amenities) }),
          contentType: 'application/json',
          success: function (data) {
              console.log('Filtered Places Data:', data); // Debug log
              $('.places').empty();
              for (let place of data) {
                  $('.places').append(
                      `<article>
                          <div class="title_box">
                              <h2>${place.name}</h2>
                              <div class="price_by_night">$${place.price_by_night}</div>
                          </div>
                          <div class="information">
                              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                          </div>
                          <div class="description">
                              ${place.description}
                          </div>
                      </article>`
                  );
              }
          },
          error: function (error) {
              console.log('Error:', error); // Debug log
          }
      });
  });
});
