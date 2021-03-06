(function($){ 
     $.fn.extend({  
         airport: function(array) {
			
			var self = $(this);
			var chars = [' ','a','b','c','d','e','f','g',' ','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','-','.','/','!','@','#','$','%','^','&','*','(',')','+'];
			var longest = 0;
			var items = items2 = array.length;
			var repeat = 0;

			function pad(a,b) { return a + new Array(b - a.length + 1).join(' '); }
			
			$(this).empty();
			
			while(items--)
				if(array[items].length > longest) longest = array[items].length;

			while(items2--)
				array[items2] = pad(array[items2],longest);
				
			spans = longest;
			while(spans--)
				$(this).prepend("<div class='char c" + spans + "'></div>");
				
			
			function testChar(a,b,c,d){
				if (repeat < array.length) {
				if(c >= array.length)
					setTimeout(function() { testChar(0,0,0,0); }, 50);				
				else if(d >= longest) {
					repeat = repeat + 1;
					setTimeout(function() { testChar(0,0,c+1,0); }, 50);
				}
				else {
					$(self).find('.c'+a).html((chars[b]==" ")?"&nbsp;":chars[b]);
					setTimeout(function() {
						if(b > chars.length)
							testChar(a+1,0,c,d+1);
						else if(chars[b] != array[c].substring(d,d+1).toLowerCase())
							testChar(a,b+1,c,d);
						else
							testChar(a+1,0,c,d+1);
					}, 20);
				}
				}
			}
			
			testChar(0,0,0,0);
        } 
    }); 
})(jQuery);
