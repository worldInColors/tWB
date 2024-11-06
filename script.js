$(document).ready(function() {
    const loadingScreen = $('.loading-screen');
    const loadingProgress = $('.loading-progress');

    function preloadImages(imageUrls) {
        let loadedCount = 0;
        const totalImages = imageUrls.length;

        // Create and append the images to preload
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                updateLoadingProgress(loadedCount, totalImages);
            };
            img.onerror = () => {
                // If an image fails to load, still increment the loadedCount
                loadedCount++;
                updateLoadingProgress(loadedCount, totalImages);
            };
        });
    }

    function updateLoadingProgress(loaded, total) {
        const progress = (loaded / total) * 100;
        loadingProgress.text(`${progress.toFixed(2)}%`);

        if (loaded === total) {
            // Hide the loading screen and start animations
            setTimeout(() => {
                loadingScreen.hide();
                startAnimations();
            }, 500);
        }
    }

    function getAllImageUrls() {
    const images = [];
    $('img').each(function() {
        images.push($(this).attr('src'));
    });
    return [...new Set(images)];
}
    function startAnimations() {
        const tl = gsap.timeline({ delay: 0 });

        tl.to('.col', {
            top: 0,
            duration: 3,
            ease: 'power4.inOut'
        });

        tl.to('.c-1 .item', {
            top: 0,
            stagger: 0.25,
            duration: 3,
            ease: 'power4.inOut'
        }, '-=2');

        tl.to('.c-2 .item', {
            top: 0,
            stagger: -0.25,
            duration: 3,
            ease: 'power4.inOut'
        }, '-=4');

        tl.to('.c-3 .item', {
            top: 0,
            stagger: 0.25,
            duration: 3,
            ease: 'power4.inOut'
        }, '-=4');

        tl.to('.c-4 .item', {
            top: 0,
            stagger: -0.25,
            duration: 3,
            ease: 'power4.inOut'
        }, '-=4');

        tl.to('.c-5 .item', {
            top: 0,
            stagger: 0.25,
            duration: 3,
            ease: 'power4.inOut'
        }, '-=4');

        tl.to('.container', {
            scale: 6,
            duration: 4,
            ease: 'power4.inOut'
        }, '-=2');

        tl.call(loadProfileSection);
    }



function changeIframeCursor() {
  const iframe = document.getElementById('profile-frame');
  if (iframe && iframe.contentWindow && typeof iframe.contentWindow.changeCursor === 'function') {
    iframe.contentWindow.changeCursor();
  }
}



function loadProfileSection() {
  $('.container, .content').fadeOut(500, function() {
    // Show the iframe with the profile page
    $('#profile-section').html(`
      <iframe src="hu-tao-profile.html" 
              style="width: 100%; height: 100vh; border: none;" 
              id="profile-frame"></iframe>
    `).fadeIn();

    // Call the function to change the cursor in the iframe
    changeIframeCursor();
  });
}

   function init() {
        const imageUrls = getAllImageUrls();
        preloadImages(imageUrls);
    }

    init();
});