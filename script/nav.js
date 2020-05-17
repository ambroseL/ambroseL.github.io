
$(function() {
    

    var body = $('body');
    var navbar = $('.navbar');
    var navbarCollapse = $('.navbar-collapse');

    window.mobilecheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    var firstTouch = false;

    $('.dropdown').on("touchstart", function (e) {
        'use strict'; 
        var link = $(this); 
        if(!link.hasClass('hover')){
            link.addClass('hover');
            e.preventDefault();
            firstTouch = true;
            return false; 
        }
        return true;
    });

    $('.social-button').on("touchstart", function (e) {
        $(this).addClass("active")
                .bind("touchend", function() {
                    $(this).removeClass("active");
                    $(this).removeClass("focus");
                });
    });

    body.on('touchstart', function(e){
        e = window.event || e; // 兼容IE7
        var obj = $(e.srcElement || e.target);
        if(firstTouch && obj.attr('class') != '.dropdown.hover'){
            $('.dropdown').removeClass('hover');
            firstTouch = false;
        }
    });
    
    body.append('<div class="side-menu-overlay"></div>');
    var overlay = $('.side-menu-overlay');

    body.append('<div id="side-menu"></div>');
    var sideMenu = $('#side-menu');

    sideMenu.append('<button class="close"><span aria-hidden="true">×</span></button>')
    var sideMenuCloseBtn = sideMenu.find('.close');

    sideMenu.append('<div class="contents"></div>')
    var sideMenuContents = sideMenu.find('.contents');

    if(navbar.hasClass('better-bootstrap-nav-left')) {
        sideMenu.addClass('side-menu-left');
    }

    navbarCollapse.on('show.bs.collapse', function (e) {
        e.preventDefault();

        var menuContent = $(this).html();    
        sideMenuContents.html(menuContent);

        slideIn();
    });


    // Hide the menu when the "x" button is clicked.
    
    sideMenuCloseBtn.on('click', function(e) {
        e.preventDefault();
        slideOut();
    });
    
    overlay.on('click', function(e) {
        slideOut();
    });
    
    $(window).resize(function(){
        if(!navbarCollapse.is(":visible") && body.hasClass('side-menu-visible')) {
            sideMenu.show();
            // sideFooter.show();
            overlay.show();
        }
        else{
            sideMenu.hide();
            // sideFooter.hide();
            overlay.hide();
            body.removeClass('side-menu-visible');
            $('.dropdown-menu').removeClass('mobile');            
            body.removeClass('overflow-hidden');
            
        }
    });
    
    function slideIn() {
        body.addClass('overflow-hidden');
        sideMenu.addClass("open");
        sideMenu.show();
        overlay.fadeIn();
        body.addClass('side-menu-visible');
        $('.dropdown-menu').addClass('mobile');
    }
    
    function slideOut() {
        body.removeClass('side-menu-visible');
        overlay.fadeOut();
        sideMenu.hide('normal', function(){
            $('.dropdown-menu').removeClass('mobile');
        });

        body.removeClass('overflow-hidden');
    }

    var scrollDelta = 0; //10
    var scrollOffset = 200;
    var isScroll = false;
    var previousTop = 0;
    var currentTop = 0;

    $(window).on('scroll', function() {
        if (!isScroll) {
            isScroll = true;
            autoHideHeader();
        }
    });
    
    function autoHideHeader() {
        currentTop = $(window).scrollTop();
        if (previousTop >= currentTop) {
            if (previousTop - currentTop >= scrollDelta && currentTop <= 10)  {
                navbar.removeClass('scroll-up');
            }
        }
        else {
            if (currentTop - previousTop >= scrollDelta && currentTop > scrollOffset) {
                navbar.addClass('scroll-up');
            }
        }
        previousTop = currentTop;
        isScroll = false;
    }

    // $(document).on('show.bs.dropdown', function(e){
    //     e.preventDefault();
    //     scrollToAnchor('work');
    //     slideOut();
    // });


    // function scrollToAnchor(aid){
    //     var aTag = $('#'+aid);
    //     $('html,body').animate({scrollTop: aTag.offset().top - 40},'slow');
    //     // $('html,body').scrollTo( aTag, 800 );
    // }
    
    // $(".work-nav-link").click(function() {
    //     // e.preventDefault();
    //     // scrollToAnchor('work');
    //    console.log(this.hash);
    // });
     
    // $(".playground-nav-link").click(function(e) {
    //     // console.log(this.hash);
    //     e.preventDefault();
    //     scrollToAnchor('playground');
    //     // console.log('jjj');
    //  });

    var jump=function(e)
    {

        if (e){
            e.preventDefault();
            var target = $(this).attr("href");
        }else{
            var target = location.hash;
        }
        
        window.targetOffset = $(target).offset().top-42;
        
        $('html,body').animate(
        { 
            scrollTop: $(target).offset().top-42,
        },'slow');

        if(window.mobilecheck()){
            slideOut();
        }
        // ,function()
        // {
        //     location.hash = target;
        // });
    }

    // $('html, body').hide();

    $(document).ready(function()
    {
        $(document).on('click', 'a[href^="#"]', jump);

        if (location.hash){
            setTimeout(function(){
                $('html, body').scrollTop(0);
                jump();
            }, 0);
        }
        // else{
        //     $('html, body').show();
        // }
    });

});

