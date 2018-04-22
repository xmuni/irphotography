

	var columns = 5;

	var all_images = document.querySelectorAll("#flex .box");
	var position = -1;
	
	setImgMultiple(all_images, "medium");

	all_images.forEach(img => img.addEventListener("click", toggleSizeSelf));

	// keyboard navigation
	document.addEventListener("keydown", function(event)
	{
		if(event.which == 27) // esc
		{
			setImgMultiple(all_images, "medium");
			return;
		}

		var index_big = get_index_of_class(all_images, "big");

		//    38
		// 37 40 39

		var index_to_toggle = -1;

		if(event.which == 37) // left
			index_to_toggle = index_big-1;
		else if(event.which == 39) // right
			index_to_toggle = index_big+1;
		else
			return;

		// check for out of bounds
		if(index_to_toggle > -1 && index_to_toggle < all_images.length)
			toggleSizeImg(all_images[index_to_toggle]);
		else if(index_to_toggle <= -1 || index_to_toggle >= all_images.length)
			setImgMultiple(all_images, "medium");
	});

	function toggleSizeSelf()
	{
		return toggleSizeImg(this);
	}

	function toggleSizeImg(thisImg)
	{
		if(window.innerWidth > 1800)
			columns = 5;
		else if(window.innerWidth > 600)
			columns = 3;
		else
		{
			columns = 1;
			return;
		}


		if(thisImg.classList.contains("big"))
		{
			setImgMultiple(all_images, "medium");
		}
		else
		{
			setImgMultiple(all_images, "medium");

			thisImg.classList.add("big");
			var index = get_index_of_class(all_images, "big");

			var row_images = getRow(columns, index, all_images);
			setImgMultiple(row_images, "small");

			setImg(thisImg, "big");
			thisImg.style.cursor = "zoom-out";
			thisImg.classList.remove("highlight");
			
			adjustScroll(thisImg);
		}
	}

	// gets the index of the first element with a given class
	function get_index_of_class(images, classname)
	{
		for(var i=0; i<images.length; i++)
			if(images[i].classList.contains(classname))
				return i;

		return -1;
	}

	function getRow(row_length, img_index, images)
	{
		var row_images = []; // array of images

		var row_start_index = row_length * Math.floor(img_index/row_length);

		for(var i=0; i<row_length; i++)
			if(images.length > row_start_index+i)
				row_images.push(images[row_start_index+i]);

		return row_images;
	}

	function setImgMultiple(images, size)
	{
		for(var i=0; i<images.length; i++)
		{
			setImg(images[i], size);
		}
	}

	function setImg(img, size)
	{
	//	if(window.innerWidth >= 600)
	//	{
			img.style.cursor = "zoom-in";
			img.classList.add("highlight");
	//	}
		img.classList.remove("big");
		img.classList.remove("small");
		img.classList.remove("medium");
		img.classList.add(size);
	}
	
	function getScrollTop()
	{
		return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

	function adjustScroll(element)
	{
		var margin = 10; // size of margin (pixels)

		var scrolled = getScrollTop();
		var elemtop = element.offsetTop;
	//	var elemtop = element.clientHeight;
		
	//	console.log(scrolled);
	//	console.log(elemtop);
		
		if(scrolled > elemtop)
			window.scrollBy(0,elemtop-scrolled-margin); // 10px extra for the margin
		else
		{
			var elembottom = elemtop + element.clientHeight;
			var viewbottom = scrolled + (window.innerHeight);
			
		//	console.log(elembottom);
		//	console.log(viewbottom);

			if(elembottom > viewbottom)
				window.scrollBy(0,elembottom-viewbottom+margin);
		}
	}
