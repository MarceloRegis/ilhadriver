var map;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

map = new google.maps.Map(document.getElementById('map'), {
    center: {
        lat: -27.5914,
        lng: -48.5447
    },
    zoom: 16
});
directionsDisplay.setMap(map);

var start = document.getElementById('start');
var searchStart = new google.maps.places.SearchBox(start);
var end = document.getElementById('end');
var searchEnd = new google.maps.places.SearchBox(end);
var valorKM = 3;
var detail = document.getElementById('detail');
var mensagem = document.getElementById('mensagem');
var googlemapsStart = document.getElementById('button-input');

function findRoute() {
    var startAddress = start.value;
    var endAddress = end.value;
    var request = {
        origin: startAddress,
        destination: endAddress,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            
            document.getElementById('distance').innerHTML = result.routes[0].legs[0].distance.text;
            document.getElementById('duration').innerHTML = result.routes[0].legs[0].duration.text;

            // Transformar
            var distancia = parseInt(result.routes[0].legs[0].distance.text.replace(".", ""));
            // console.log(distancia)

            var valor1 = parseInt("1.000,00".replace(".", "")); // mostra 1000
            // console.log(valor1)

            

            // Ida    
            var totalValorIda = distancia * valorKM;

            if ( distancia <= 19.9) {
                mensagem.style.display = 'block';
                detail.style.display = 'none';
                document.getElementById('distanciadamensagem').innerHTML = result.routes[0].legs[0].distance.text;
            }
            else {
                document.getElementById("price").innerHTML = totalValorIda.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
                detail.style.display = 'block';
                mensagem.style.display = 'none';
            }
            

            // Volta
            var totalValorVolta = (distancia * valorKM) * 1.9;

            if (distancia <= 19.9) {
                mensagem.style.display = 'block';
                detail.style.display = 'none';
                
            } else {
                document.getElementById("price2").innerHTML = totalValorVolta.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });
                detail.style.display = 'block';
                mensagem.style.display = 'none';
            }

            
        } else {
            detail.style.display = 'none';
            alert("Opa! Parece que o endereço está incorreto. Tente novamente, Obrigado(a)")
        }

        var x = document.getElementById("meuSelectEspera").value;
        var opcaoDoSelect = parseInt(x);
        var precoAdicionalTaxaDeEspera = opcaoDoSelect + totalValorIda;
        var precoAdicionalTaxaDeEsperaVolta = opcaoDoSelect + totalValorVolta;
        document.getElementById("price").innerHTML = precoAdicionalTaxaDeEspera.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        document.getElementById("price2").innerHTML = precoAdicionalTaxaDeEsperaVolta.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });


    });
}

googlemaps.addEventListener("click", function (event) {
    if (start.value.trim() != "" && end.value.trim() != "") {
        event.preventDefault();
        findRoute();
    }
});



$(function() {

    $(document).on('click','a.page-scroll',function(event){
      var $anchor=$(this);
      $('html,body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top-45)
      },1500,'easeInOutExpo');
      event.preventDefault();
    });
    });
    
    
    
    
     $(window).scroll(function() {
        if($(this).scrollTop() > 50)  /*height in pixels when the navbar becomes non opaque*/ 
        {
            $('.opaque-navbar').addClass('opaque');
        } else {
            $('.opaque-navbar').removeClass('opaque');
        }
    });


