## Website Performance Optimization portfolio project

#### 1. Steps to run the web application

Clone the code from:
https://github.com/ghyma9/frontend-nanodegree-mobile-portfolio.git

1.1 In a consile window run the following steps:

a. cd ../ghyma9/frontend-nanodegree-mobile-portfolio

b. python -m http.server 8080

1.2 Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

c. cd ../ghyma9/frontend-nanodegree-mobile-portfolio

d. ngrok http 8080

#### 2. Outline of optimizations:
2.1 index.html

First we need to check the js and css files whethere they are required to be includd in the critical path or become parser blockers.
We need to delay or avoid to download those files. Therefore the following files have been changed.

    <link href="css/print.css" rel="stylesheet" media="print">  <!-- Stop parser blocker -->

    <script async src="http://www.google-analytics.com/analytics.js"></script>  <!-- Stop parser blocker -->
    <script async src="js/perfmatters.js"></script>     <!-- Stop parser blocker -->

Download the Goole Font loader API, wegfontloaderjs, and load it at the end of the body.

    <script src="js/webfontloader.js"></script>


2.2 views/js/main.js for pizza.html

In order to fix the Janky code, we need to stop the css related statements,
which create FSL and remove repeating code in loops. Based on these two dirctions,
we need to fix the following methods:

a. updatePositions - Fix this method when scroll the content.

b. changePizzaSizes - Fix this method when change the pizza sizes.

JavaScript execution improvement:

a. In the resizePizzas method, change querySelector to getElementById.

b. In the changePizzaSizes method, change querySelectorAll to getElementsByClassName

c. In the changePizzaSizes method, move randomPizzaContainer.length out from the for statement.

d. In the updatePositions method, change querySelectorAll to getElementsByClassName.

e. In the updatePositions method, move phase definition out of the for loop.

f. In the addEventListener method, change querySelector to getElementById.

2.3 views/css/style.css for pizza.html

In order to stop FSL and improve CSS speed, the class '.mover' has been
optimized by adding the two properties as folloows:

  will-change: transform;
  transform: translateZ(0);


## Original Content

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

### Getting started

#### Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m http.server 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

In index.html, css/print.css has been marked as media="print" to prevent html parser blocker.

#### Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

In js/main.js, it has been optimized to avoid FSL i order to get better FPS counts.

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
