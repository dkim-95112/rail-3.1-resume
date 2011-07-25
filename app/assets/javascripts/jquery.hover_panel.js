(function($){
  var thumb_handlers = {
 	load:function(){
 	  $(this).parent().trigger('on_load');  // bubble up
	  return false;
 	},
	mouseenter: function(){
	  $(this).parent().trigger('on_over'); // bubble up
	  return false;
	},
  };
  var hover_tile_handlers = {
	on_load:function(){
	  $(this).parent().trigger('on_load'); // bubble up
	  return false;
	},
	on_over:function(){
	  var animate = settings.animate;
	  $(this)
	  .find('.helper').animate(animate.over, animate.duration).end()
	  .prev().trigger('on_left').prevAll().trigger('on_other').end().end()
	  .next().trigger('on_right').nextAll().trigger('on_other').end().end()
	  return false;
	},
	on_left:function(){
	  var animate = settings.animate;
	  $(this).find('.helper').animate(animate.left, animate.duration);
	  return false;
	},
	on_right:function(){
	  var animate = settings.animate;
	  $(this).find('.helper').animate(animate.right, animate.duration);
	  return false;
	},
	on_other:function(){
	  var animate = settings.animate;
	  var $this = $(this);
	  var thumb_offset = $this.find('.thumb').offset();
	  var animate_css = $.extend(true, {}, animate.other, thumb_offset);
	  var helper = $this.find('.helper').animate(animate_css, animate.duration);
	  return false;
	},
  };
  var hover_panel_handlers = {
	on_load:function(){
	  if(++loaded_tiles == num_tiles){
		$(this).find('.hover-tile').each(function(){
		  $(this).trigger('on_other');
		});
	  }
	  return false;
	},
  };
  var loaded_tiles = 0;
  var hover_panel_methods = {
	num_tiles:null,
	init:function(options){
	  options && $.extend(true, settings, options);

	  this.append(function(){
		return settings.image_srcs.map(function(image_src){
 		  return '<div class="hover-tile">' +
			'<img src="' + image_src + '" class="thumb"/>' +
			'<img src="' + image_src + '" class="helper"/>' +
			'</div>';
		}).join("");
	  });

	  this.bind(hover_panel_handlers);
	  var hover_tiles = this.find('.hover-tile').css(settings.tile_css);
	  num_tiles = hover_tiles.length;
	  hover_tiles.each(function(){
		$(this).bind(hover_tile_handlers);
	  });
	  var thumbs = this.find('.thumb').css(settings.thumb_css).bind(thumb_handlers);
	  var helpers = this.find('.helper').css(settings.helper_css);
	  return this;
	},
  };

  $.fn.hover_panel = function(method){ // plugin convention
	if(hover_panel_methods[ method]){
	  return hover_panel_methods[ method].apply(this, slice.call(arguments, 1));
    } else {
	  if(typeof method === 'object' || ! method){
		return hover_panel_methods.init.apply( this, arguments);
	  } else {
		$.error('Method ' +  method + ' does not exist on jQuery.hover_tile');
	  }
	}
  };

  var settings = {
	image_srcs:[],
	tile_css:{float:"left"},
	thumb_css:{position:"relative", zIndex:+1, width:33},
	helper_css:{position:"absolute"},
	animate:{
	  over:{width:122},
	  left:{width:66},
	  right:{width:66},
	  other:{width:33},
	  duration:100,
	},
  };
})(jQuery);
