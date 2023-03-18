$.ajax({
    url: `https://64140ebbebce1f9d8c5df836.mockapi.io/api/v2/kumpulandoa`,
    type: 'get',
    dataType: 'json',
    data:{
        doa : `doa`
    },
    success: function(data) {
        let counter = 0; 
        $.each(data, function(index, item) {
          if (counter < 5) { 
            $('#doa-info').append(`
            <button class="btn btn-primary mx-2 w-auto detail" type="button" 
            data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${item['id']}">
                ${item['doa']}
            </button>
            `);
            // <h5 class="card-title">${item['doa']}</h5>
            counter++; 
          } else {
            return false; 
          }
        });

    },
    
  });


function showCard(params) {
    $('#doa-info').html('');

    const searchQuery = $('#search-input').val();

    $.ajax({
        url: `https://64140ebbebce1f9d8c5df836.mockapi.io/api/v2/kumpulandoa`,
        type: 'get',
        dataType: 'json',
        data:{
            'doa': `${searchQuery}`
        },
        success: function(data) {
            // console.log(data);
  
            if (data.length > 1) {
                $.each(data, function(key, item) {
                    $('#doa-info').append(`
                    <button class="btn btn-primary mx-2 w-auto detail" type="button" 
                    data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${item['id']}">
                        ${item['doa']}
                    </button>
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

$('#doa-info').on('click', '.detail', function () {
    const id = $(this).data('id');
    // console.log($this.data('id'));
    $.ajax({
        url: `https://64140ebbebce1f9d8c5df836.mockapi.io/api/v2/kumpulandoa/${id}`,
        type: 'get',
        dataType: 'json',
        data:{
            'id': id
        },
        success: function(data) {
            $('.modal-header').html(`
            <h1 class="modal-title fs-5" id="exampleModalLabel">${data.doa}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            `)
          $('.modal-body').html(`
          <p>${data.ayat}</p>
          <p>${data.latin}</p>
          <p>${data.artinya}</p>
          `)
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
          alert('tidak ditemukan');
        }
      });
})