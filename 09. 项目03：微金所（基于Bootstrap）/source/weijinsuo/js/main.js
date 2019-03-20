$(function(){
    function imgResize(){
        var windowWidth = $(window).width();
        var minWidth=680;
        $("#main_ad .carousel-inner > .item").each(function(index,item){
            var $item = $(item);
            var imageUrl = $item.data(minWidth>windowWidth?"image-sm":"image-lg")
            $item.css("backgroundImage","url('"+imageUrl+"')");
        })
    }
    $(window).on("resize",imgResize);
    $(window).trigger("resize");
})