function showCard(params) {
    $('#card-info').html('');

    const searchQuery = $('#search-input').val();

    $.ajax({
        url: `https://64140ebbebce1f9d8c5df836.mockapi.io/api/v2/kumpulandoa`,
        type: 'get',
        dataType: 'json',
        data:{
            'doa': `${searchQuery}`
        },
        success: function(data) {
            console.log(data);
  
            if (data.length > 1) {
                $.each(data, function(key, item) {
                    $('#card-info').append(`
                        <h5 class="card-title">${item['doa']}</h5>
                    `);
                });
            } else {
                alert('Doa Tidak Ditemukan')
            }

        },
      });
}

$('#search-btn').on('click', function() {
    showCard();
  });

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        showCard();
    }
})