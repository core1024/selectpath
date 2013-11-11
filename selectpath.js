(function($, undefined) {
	var methods = {
		init: function(options) {
			options = options || {};
			return this.each(function() {
				if($(this).data('separator')) return;
				$(this)
				.data('separator', this.getAttribute('data-separator') || options.separator || '/')
				.on('mousedown.selectPath keydown.selectPath', function() {
					var odd = $('>option[data-index]', this);
					if( ! odd.length) return;
					var toc = odd.attr('data-index');
					odd.remove();
					this.options[toc].selected = true;
				})
			.on('change.selectPath blur.selectPath', function() {
				if((this.selectedIndex < 0) ||
					(this.options[this.selectedIndex].parentNode.tagName.toLowerCase() != 'optgroup') ||
					$('>option[data-index]', this).remove().length) return;
				$('<option>')
				.html(this.options[this.selectedIndex].parentNode.label+
					$.data(this, 'separator')+
					this.options[this.selectedIndex].innerHTML)
				.val(this.options[this.selectedIndex].value)
				.attr('data-index', this.selectedIndex)
				.prependTo(this)
				.prop('selected', true);
			})
			.trigger('change.selectPath');
			});
		},
		destroy: function() {
			return this.each(function() {
				$(this)
				.trigger('mousedown.selectPath')
				.off('mousedown.selectPath keydown.selectPath change.selectPath blur.selectPath')
				.removeData('separator');
			});
		},
		option: function(option, value) {
			if(option !== 'separator') $.error('Unknown option '+option+' for jQuery.selectPath');
			if(value === undefined) return this.data(option);
			return this.data(option, value).trigger('mousedown.selectPath').trigger('change.selectPath');
		}
	};
	$.fn.selectPath = function( method ) {
		if(method && ((typeof method).toLowerCase() === 'string'))
		{
			if((typeof methods[method]).toLowerCase() === 'function')
			{
				return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			}
			$.error('Method '+method+' does not exist on jQuery.selectPath');
		}
		return methods.init.apply( this, arguments );
	};
})(jQuery);
