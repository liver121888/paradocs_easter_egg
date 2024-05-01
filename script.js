(function ($, window, undefined) {
	$.fn.marqueeify = function (options) {
		var settings = $.extend({
			horizontal: true,
			vertical: true,
			speed: 100, // In pixels per second
			container: $(this).parent(),
			bumpEdge: function () {}
		}, options);
		
		return this.each(function () {
			var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
				$el = $(this);

			getSizes = function () {
				containerWidth = settings.container.outerWidth();
				containerHeight = settings.container.outerHeight();
				elWidth = $el.outerWidth();
				elHeight = $el.outerHeight();
			};

			move = {
				right: function () {
					$el.animate({left: (containerWidth - elWidth)}, {duration: ((containerWidth/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
						move.left();
					}});
				},
				left: function () {
					$el.animate({left: 0}, {duration: ((containerWidth/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
						move.right();
					}});
				},
				down: function () {
					$el.animate({top: (containerHeight - elHeight)}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
						move.up();
					}});
				},
				up: function () {
					$el.animate({top: 0}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
						settings.bumpEdge();
						move.down();
					}});
				}
			};

			getSizes();

			if (settings.horizontal) {
				move.right();
			}
			if (settings.vertical) {
				move.down();
			}

      // Make that shit responsive!
      $(window).resize( function() {
        getSizes();
      });
		});
	};
})(jQuery, window);

// Sequence change random color
// $(document).ready(function() {
//     var currentLogoIndex = 0;  // Initialize index to track the current logo

//     $('.marquee').marqueeify({
//         speed: 300,
//         bumpEdge: function() {
//             // Array of logo classes in the sequence they should change
//             var logos = ['logo1', 'logo2', 'logo3'];
//             // Get the current logo class using the index
//             var currentLogo = logos[currentLogoIndex];

//             // Generate a random color
//             var newColor = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";
//             // Apply the new color to the current logo
//             $('.marquee .' + currentLogo).css('fill', newColor);

//             // Increment the index to the next logo, wrapping around with modulus
//             currentLogoIndex = (currentLogoIndex + 1) % logos.length;
//         }
//     });
// });


$(document).ready(function() {
    var currentLogoIndex = 0;  // Initialize index to track the current logo
    var logoColors = {         // Store the initial colors and other properties
        'logo1': { h: 0, s: 100, l: 50 },
        'logo2': { h: 120, s: 100, l: 50 },
        'logo3': { h: 240, s: 100, l: 50 }
    };

    $('.marquee').marqueeify({
        speed: 300,
        bumpEdge: function() {
            // Array of logo classes in the sequence they should change
            var logos = ['logo1', 'logo2', 'logo3'];
            var currentLogo = logos[currentLogoIndex];  // Get the current logo class using the index

            // Adjust the hue by a small amount to make the color change noticeable
            logoColors[currentLogo].h = (logoColors[currentLogo].h + 50) % 360;

            // Construct the new color string
            var newColor = `hsl(${logoColors[currentLogo].h}, ${logoColors[currentLogo].s}%, ${logoColors[currentLogo].l}%)`;

            // Apply the new color to the current logo
            $('.marquee .' + currentLogo).css('fill', newColor);

            // Increment the index to the next logo, wrapping around with modulus
            currentLogoIndex = (currentLogoIndex + 1) % logos.length;
        }
    });
});
