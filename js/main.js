// Dean Attali / Beautiful Jekyll 2016

var main = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
            $(".navbar-custom .avatar-container").fadeOut(500);
        } else {
            $(".navbar").removeClass("top-nav-short");
            $(".navbar-custom .avatar-container").fadeIn(500);
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // On mobile, when clicking on a multi-level navbar menu, show the child links
    $('#main-navbar').on("click", ".navlinks-parent", function(e) {
      var target = e.target;
      $.each($(".navlinks-parent"), function(key, value) {
        if (value == target) {
          $(value).parent().toggleClass("show-children");
        } else {
          $(value).parent().removeClass("show-children");
        }
      });
    });

    // Ensure nested navbar menus are not longer than the menu header
    var menus = $(".navlinks-container");
    if (menus.length > 0) {
      var navbar = $("#main-navbar ul");
      var fakeMenuHtml = "<li class='fake-menu' style='display:none;'><a></a></li>";
      navbar.append(fakeMenuHtml);
      var fakeMenu = $(".fake-menu");

      $.each(menus, function(i) {
        var parent = $(menus[i]).find(".navlinks-parent");
        var children = $(menus[i]).find(".navlinks-children a");
        var words = [];
        $.each(children, function(idx, el) { words = words.concat($(el).text().trim().split(/\s+/)); });
        var maxwidth = 0;
        $.each(words, function(id, word) {
          fakeMenu.html("<a>" + word + "</a>");
          var width =  fakeMenu.width();
          if (width > maxwidth) {
            maxwidth = width;
          }
        });
        $(menus[i]).css('min-width', maxwidth + 'px')
      });

      fakeMenu.remove();
    }

    // show the big header image
    main.initImgs();

    main.initCodeCopy();
  },

  initCodeCopy : function() {
    var codeBlocks = document.querySelectorAll(".highlight");
    if (!codeBlocks.length) {
      return;
    }

    var pageLang = document.documentElement.getAttribute("lang") || "en";
    var copyLabel = pageLang === "es" ? "Copiar código" : "Copy code";
    var copiedLabel = pageLang === "es" ? "Copiado" : "Copied";

    Array.prototype.forEach.call(codeBlocks, function(block) {
      if (block.classList.contains("code-copy-ready")) {
        return;
      }

      var pre = block.querySelector("pre");
      if (!pre || block.querySelector(".language-mermaid")) {
        return;
      }

      var wrapper = document.createElement("div");
      wrapper.className = "code-copy-wrapper";
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);
      block.classList.add("code-copy-ready");

      var button = document.createElement("button");
      button.className = "code-copy-button";
      button.type = "button";
      button.setAttribute("aria-label", copyLabel);
      button.setAttribute("title", copyLabel);
      button.innerHTML = '<i class="fa fa-clipboard" aria-hidden="true"></i>';
      wrapper.appendChild(button);

      button.addEventListener("click", function() {
        main.copyCodeBlock(pre).then(function() {
          button.classList.add("code-copy-button-copied");
          button.setAttribute("aria-label", copiedLabel);
          button.setAttribute("title", copiedLabel);
          button.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';

          window.setTimeout(function() {
            button.classList.remove("code-copy-button-copied");
            button.setAttribute("aria-label", copyLabel);
            button.setAttribute("title", copyLabel);
            button.innerHTML = '<i class="fa fa-clipboard" aria-hidden="true"></i>';
          }, 1600);
        });
      });
    });
  },

  copyCodeBlock : function(pre) {
    var clone = pre.cloneNode(true);
    var lineNumbers = clone.querySelectorAll(".lineno");
    Array.prototype.forEach.call(lineNumbers, function(lineNumber) {
      lineNumber.parentNode.removeChild(lineNumber);
    });

    var text = clone.innerText.replace(/\n$/, "");

    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function(resolve) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      resolve();
    });
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      main.bigImgEl = $("#header-big-imgs");
      main.numImgs = main.bigImgEl.attr("data-num-img");

          // 2fc73a3a967e97599c9763d05e564189
	  // set an initial image
	  var imgInfo = main.getImgInfo();
	  var src = imgInfo.src;
	  var desc = imgInfo.desc;
  	  main.setImg(src, desc);

	  // For better UX, prefetch the next image so that it will already be loaded when we want to show it
  	  var getNextImg = function() {
	    var imgInfo = main.getImgInfo();
	    var src = imgInfo.src;
	    var desc = imgInfo.desc;

		var prefetchImg = new Image();
  		prefetchImg.src = src;
		// if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

  		setTimeout(function(){
                  var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
  		  $(".intro-header.big-img").prepend(img);
  		  setTimeout(function(){ img.css("opacity", "1"); }, 50);

		  // after the animation of fading in the new image is done, prefetch the next one
  		  //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		  setTimeout(function() {
		    main.setImg(src, desc);
			img.remove();
  			getNextImg();
		  }, 1000);
  		  //});
  		}, 6000);
  	  };

	  // If there are multiple images, cycle through them
	  if (main.numImgs > 1) {
  	    getNextImg();
	  }
    }
  },

  getImgInfo : function() {
  	var randNum = Math.floor((Math.random() * main.numImgs) + 1);
    var src = main.bigImgEl.attr("data-img-src-" + randNum);
	var desc = main.bigImgEl.attr("data-img-desc-" + randNum);

	return {
	  src : src,
	  desc : desc
	}
  },

  setImg : function(src, desc) {
	$(".intro-header.big-img").css("background-image", 'url(' + src + ')');
	if (typeof desc !== typeof undefined && desc !== false) {
	  $(".img-desc").text(desc).show();
	} else {
	  $(".img-desc").hide();
	}
  }
};

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', main.init);
