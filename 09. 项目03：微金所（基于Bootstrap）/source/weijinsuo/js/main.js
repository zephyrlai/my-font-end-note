$(function(){
    function imgResize(){
        var windowWidth = $(window).width();
        var minWidth=680;
        $("#main_ad .carousel-inner > .item").each(function(index,item){
            var $item = $(item);
            if(minWidth>windowWidth){
                $item.css("backgroundImage","none");
                $item.html("<img src='"+$item.data("image-sm")+"' alt=''/>");
                
            }else{
                $item.html("");
                $item.css("backgroundImage","url('"+$item.data("image-lg")+"')");
            }
        })
    }
    $(window).on("resize",imgResize);
    $(window).trigger("resize");
})