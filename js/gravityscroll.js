//To capture the last scroll position
			var lastScrollTop = 0;
			var direction = "down";
			var center;
			var lastElementId;
			var divsArray = [];
			console.log("ready");
//

			function gravityScroll (divs) 
			{
				divsArray = divs;

				var windowHeight = $(window).height();
				console.log(windowHeight);
				center = windowHeight/2;
			};

			$.fn.nearest = function (items, pivot) {
				// console.log(items +" : "+pivot);
				for (var i = 0; i < items.length; i++) {
					items[i] = Math.abs(pivot-items[i]);
				}

				// console.log(items);
				var minElement = Math.min.apply(null, items);
				// console.log(minElement);
				return items.indexOf(minElement);
			}

			$.fn.scrollStopped = function(callback) {
				$(this).scroll(function() {
					var self = this, $this = $(self);
					if ($this.data('scrollTimeout')) {
						clearTimeout($this.data('scrollTimeout'));
			    	}

			    	// var elementHeight = $("#div1").height();
					// var offset = $("#div1").offset();
					// var posY = offset.top + elementHeight - $(window).scrollTop();
					// console.log(posY);

			    	var st = $(this).scrollTop();
						if (st > lastScrollTop){
			   			// downscroll code
			   				direction = "down";
			   			// console.log("Down scroll");
						} else {
			  			// upscroll code
			  				direction = "up";
			  			// console.log("Up scroll");
						}
						lastScrollTop = st;

			    	$this.data('scrollTimeout', setTimeout(callback, 200, self));
			    });
			}

			$.fn.calculateOffsets = function (elements) {
				console.log(">>> " + direction);
				var positions = [];
				if (direction == "up") {
					for (var i = 0; i < elements.length; i++) {
						var elementHeight = $("#"+elements[i]).height();
						var offset = $("#"+elements[i]).offset();
						var posY = offset.top + elementHeight - $(window).scrollTop();
						if (lastElementId == elements[i]) {
							posY -= elementHeight/2;
						};
						positions[i] = posY;
					}
				} else {
					for (var i = 0; i < elements.length; i++) {
						var offset = $("#"+elements[i]).offset();
						var posY = offset.top - $(window).scrollTop();

						positions[i] = posY;
					}
				}
				return positions;
			}

			$(window).scrollStopped(function() {
			    // console.log('scroll stopped');
			    // console.log("Scrolled "+direction);

			    // var offset = $("#div1").offset();
			    // var posY = offset.top - $(window).scrollTop();
			    var divPositions = $.fn.calculateOffsets(divsArray);

				console.log("div positions "+ divPositions+ " : " +center);

			    var nearestDivIndex = $.fn.nearest(divPositions, center);

			    var nearestDiv = divsArray[nearestDivIndex];
				console.log("nearest Div : " + nearestDiv);

				scrollTo(nearestDiv);
			});
			
			function scrollTo(id) 
			{
				if (lastElementId == id) { return};
				lastElementId = id;

				$('html, body').animate({ 
					scrollTop: $("#" + id).offset().top
				},
				'slow', function() {

				});
			}