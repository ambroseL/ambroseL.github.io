$(function(){
    AOS.init({
        // Global settings:
        disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        
      
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 600, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      
      });
    // $(".content-list").hide();

    $(window).bind("load", function() {

        $(window).on('scroll', function () {
            var heightList = [];
            var topList = [];
    
            $.each($(".container-fluid"), function(){
                heightList.push($(this).height());
                topList.push($(this).offset().top);
            // console.log(heightList);
            });
            var scrollHeight = ($(window).height()+$(".content-list").height())/2;
            var pos = scrollHeight + $(window).scrollTop();
            var visible = true;
            var len = heightList.length;
            
            for(i=0; i<len; i++){
                var top = topList[i];
                var height = heightList[i];  
                if(pos>top && pos<top+height){
                    visible = false;
                    // break;
                }
            }
            if(visible){
                $(".content-list").css('opacity','1');
            }else{
                $(".content-list").css('opacity','0');
                $(".content-list").hover(function(){
                    $(this).css('opacity','1');
                });
            }

            // console.log(visible);

            var secondaryListItems = $('.secondary-list-item');
            var primaryListItems = $('.primary-list-item');
            
            if(secondaryListItems.length>0){
                secondaryListItems.each(function(){
                    if(!$(this).hasClass('active')){
                        $(this).removeClass('displayed');
                    }
                });
            }

            if(primaryListItems.length>0){
                primaryListItems.each(function(){
                    if(!$(this).hasClass('active')){
                        $(this).removeClass('displayed');
                    }
                });
            }
    
            var activeListItem = $('.list-group-item.active');
            if(activeListItem.length>0){
                activeListItem.addClass('displayed');
                if(activeListItem.hasClass('secondary-list-item')){
                    activeListItem.siblings().addClass('displayed');
                    activeListItem.parent().prev().addClass('displayed');
                    // console.log(activeListItem.parent().prev());         
                }else{
                    activeListItem.next().children().addClass('displayed');
                }
            }
        });
    });

    // $(window).bind("load", function() {
    //     $(window).on('scroll', function () {
    //         var secondaryListItems = $('.secondary-list-item');
    //         var primaryListItems = $('.primary-list-item');
            
    //         if(secondaryListItems.length>0){
    //             secondaryListItems.each(function(){
    //                 if(!$(this).hasClass('active')){
    //                     $(this).removeClass('displayed');
    //                 }
    //             });
    //         }

    //         if(primaryListItems.length>0){
    //             primaryListItems.each(function(){
    //                 if(!$(this).hasClass('active')){
    //                     $(this).removeClass('displayed');
    //                 }
    //             });
    //         }
    
    //         var activeListItem = $('.list-group-item.active');
    //         if(activeListItem.length>0){
    //             if(activeListItem.hasClass('secondary-list-item')){
    //                 activeListItem.siblings().addClass('displayed');
    //                 activeListItem.parent().prev().addClass('displayed');
    //                 // console.log(activeListItem.parent().prev());         
    //             }else{
    //                 activeListItem.next().children().addClass('displayed');
    //             }
    //         }
            
    //     });
    // });

    // function scrollToAnchor(aid){
    //     var aTag = $('#'+aid);
    //     $('html,body').animate({scrollTop: aTag.offset().top - 50},'slow');
    // }


    // $('.list-group-item').each(function(){
    //     $(this).click(function(){
    //         scrollToAnchor($(this).attr('href').substr(1));
    //     });
    // });
    
});