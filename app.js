var formulario = document.querySelector('form')

formulario.addEventListener('submit', function(e){
    //bloqueia o refresh página
    e.preventDefault()
    //url da pesquisa
    let urlForm =  "https://pokeapi.co/api/v2/pokemon/";
    //valor do input name
    let name = document.getElementById("name")
    //concatena a url com o valor do inputname
    urlForm = urlForm + this.name.value
    //transforma os valores em minúsculo
    urlForm = urlForm.toLocaleLowerCase()

    //ID Content
    let resposta = document.getElementById('content')

    //ID img Poke
    let  imagem = document.getElementById('imgPoke')

    //resposta em HTML
    let html = ''

    fetch(urlForm)
        //transforma a resposta em um json
        .then(resposta => resposta.json())
        .then(function (data){
            console.log(data)
            //concatena as informações Nome: + resultado da api data.name + quebra linha
            html = 'Nome: ' + upperCase(data.name) + '<br>'
            //concatena a parte nome pokemon + concatenação do tipo
            html = html + 'Type: ' + upperCase(data.types[0].type.name)
            //insere essas informações em uma representação html
            resposta.innerHTML = html

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='"+ data.sprites.front_default +"'>"
        })
        .catch(function(err){
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
                html = 'Pokemon não encontrado! 😥'
            } else{
                html = err
            }
            resposta.innerHTML = html
        })

});

function upperCase(val){
    return val[0].toUpperCase() + val.substr(1)
}