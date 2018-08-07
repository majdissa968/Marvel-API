// focus the text field on load
$('#search-input').focus();

$('#search-form').submit((e) => {
  e.preventDefault()
})

class MARVELapi {
  constructor() {
    this.apiUrl = "https://gateway.marvel.com:443/v1/public/characters";
    this.elements = {
      form: $("#marvel-form"),
      input: $("#search-input")
    };
    this.registerEvents();
  }

  registerEvents() {
    this.elements.form.on("submit", (e) => {
      e.preventDefault();
      this.getCharacterName(this.elements.input.val().trim(), (data) => { this.callback(data) });
    });
  }

  getCharacterName(name, callback) {
    let url = this.apiUrl;
    let params = {
      'nameStartsWith': name,
      'limit': 10,
      'offset': 0,
      'apikey': '4fb747b82d17b24e6ed469f3d3bc6b47'
    };

    $.getJSON(url, params)
      .done(data => {
        this.callback(data)
        this.showResults(data)
      })

      .fail(response => {
        this.callback(null)
      });
  }

  callback(data) {
    if (typeof data !== 'undefined' || typeof data !== null) {
      return true;
    }

    else if (typeof data === 'undefined' || typeof data === null) {
      return false;
    }
  }

  showResults(data) {
    $('#results').removeClass('hidden')
    $('#results').html('')


    data.data.results.forEach((item) => {
      $('#results').append(`
          <div class="text-center my-5">
             <h4 class="">${item.name}</h4><br>
             <img class="col-6" src="${item.thumbnail.path}.${item.thumbnail.extension}" ><br>
             <h5 class="">Description :</h5>
             <p class="para">${item.description}</p><br>
          </div>
     `);
    })
  }


}

new MARVELapi();
