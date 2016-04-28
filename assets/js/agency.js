$(window).scroll( function() {
    var st = $(this).scrollTop();

    $('header').css({ 'opacity' : (1.4 - st/400) });
});

// This code runs when jQuery is ready
$(function() {
    "use strict";
    
    // Adjust .intro section height to same as window height
    var wH = $(window).height();
    $('#hero-carousel .item').css("height", wH);

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top'
    })

    // Initialise Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        singleItem: true,
        navigation: false,
        pagination: true,
        autoHeight: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        transitionStyle: "goDown"
    });

    // Smooth scrolling links - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Animate sections on scroll and make them visible
    $('.service-item,.testimonials-carousel,.team-member.first').removeClass("hidden").viewportChecker({
        classToAdd: 'visible animated zoomIn',offset: 100
    });

    $('#portfolio,#blog,.cta-quote .quote').removeClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeIn',offset: 100
    });     

    $('.timeline li:nth-child(1),.timeline li:nth-child(3)').removeClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInLeft',offset: 100
    }); 

    $('.timeline li:nth-child(2),.timeline li:nth-child(4)').removeClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInRight',offset: 100
    }); 

    $('.team-member.second').removeClass("hidden").viewportChecker({
        classToAdd: 'visible animated zoomIn delay-short',offset: 100
    }); 

    $('.team-member.third').removeClass("hidden").viewportChecker({
        classToAdd: 'visible animated zoomIn delay-long',offset: 100
    }); 

});

    /*============================================
    Contact Map
    ==============================================*/
    function loadGoogleMap() {
    
        var mapPoint = {
                    'lat': 53.3776901,
                    'lng': -2.8649802,
                    'zoom' : 10,
                    'infoText':'<p>94 Redcliffe Way\
                                <br/>Woolton\
                                <br/>L25 4NT</p>',
                    'linkText':'View on Google Maps',
                    'mapAddress':'94 Redcliffe Way, Woolton, L25 4TN',
                    'icon': 'assets/img/map_pin.png'
                };

        if($('#gmap').length){
        
            var map;
            var mapstyles = [ { "stylers": [ { "saturation": -100 } ] } ];
            
            var infoWindow = new google.maps.InfoWindow;
            
            var pointLatLng = new google.maps.LatLng(mapPoint.lat, mapPoint.lng);

            var mapOptions = {
                zoom: mapPoint.zoom,
                center: pointLatLng,
                zoomControl : true,
                panControl : false,
                streetViewControl : false,
                mapTypeControl: false,
                overviewMapControl: false,
                scrollwheel: false,
                styles: mapstyles
            }
            
            map = new google.maps.Map(document.getElementById("gmap"), mapOptions);
            
            var marker = new google.maps.Marker({
                position: pointLatLng, 
                map: map, 
                title:mapPoint.linkText,
                icon: mapPoint.icon
            });
            
            var mapLink = 'https://www.google.com/maps/preview?ll='+mapPoint.lat+','+mapPoint.lng+'&z=14&q='+mapPoint.mapAddress;
            
            var html = '<div class="infowin">'
                    + mapPoint.infoText
                    + '<a href="'+mapLink+'" target="_blank">'+mapPoint.linkText+'</a>'
                    + '</div>';

            google.maps.event.addListener(marker, 'mouseover', function() {
                infoWindow.setContent(html);
                infoWindow.open(map, marker);
            });

            google.maps.event.addListener(marker, 'click', function() {
                window.open(mapLink,'_blank');
            });
            
        }
    }

$(window).load(function() {

    // Call function for Google Maps

    loadGoogleMap();

    // Initialise Isotope plugin for Portfolio Filtering (Needs to be inside window load function)

    // init Isotope
    var $container = $('.isotope').isotope({
        itemSelector: '.portfolio-item'
    });
    $('#filters').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({
            filter: filterValue
        });
    });
    // change is-checked class on buttons
    $('#filters').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            $buttonGroup.find('.active').removeClass('active');
            $(this).addClass('active');
        });
    });
});