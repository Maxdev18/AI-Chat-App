setTimeout(function () {
  var viewheight = $(window).height();
  var viewwidth = $(window).width();
  var viewport = $("meta[name=viewport]");
  viewport.attr("content", "height=" + viewheight + "px, width=" + 
  viewwidth + "px, initial-scale=1.0");
}, 300);