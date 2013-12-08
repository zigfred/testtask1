jQuery(function( $ ) {
  var targets = [
    'chrome',
    'firefox',
    'opera',
    'safari',
    'ie'
  ];
  var elms = {
    images: {},
    texts: {},
    buttons: {}
  };
  for (var i = 0, l = targets.length; i < l; i++) {
    elms.images[i] = $("#slide_content > img[data-target='" + targets[i] + "']");
    elms.texts[i] = $("#slide_content > div[data-target='" + targets[i] + "']");
    elms.buttons[i] = $("#slide_panel > span[data-name='" + targets[i] + "']");
  }
  var currentTarget = 0;
  var changingNow = false;
  var timerId = false;

  elms.images[0].css({display: 'block', opacity: 100});
  elms.texts[0].css({display: 'block', top: 0});
  elms.buttons[0].addClass("selected");

  $("#arrow-left > span").on('click', function(e){
    changeTarget(getPrevTarget());
  });
  $("#arrow-right > span").on('click', function(e){
    changeTarget(getNextTarget());
  });
  $("#slide_panel > span").on('click', function(e){
    var nextTarget = targets.indexOf($(e.currentTarget).data('name'));
    changeTarget(nextTarget);
  });

  startTimer();

  function getNextTarget() {
    return targets[currentTarget + 1] ? currentTarget + 1 : 0;
  }
  function getPrevTarget() {
    return targets[currentTarget - 1] ? currentTarget - 1 : targets.length - 1;
  }
  function changeTarget(nextTarget) {
    if (changingNow || nextTarget === currentTarget) return;
    else changingNow = true;
    var res = 0;

    clearTimeout(timerId);

    elms.buttons[nextTarget].addClass("selected");
    elms.buttons[currentTarget].removeClass("selected");

    elms.images[currentTarget].fadeOut({
      complete: function(){
        $(this).css({display: "none"});
        showTarget(nextTarget);
      }
    });

    elms.texts[currentTarget].animate({
      top: "-=230px"
    }, {
      complete: function(){
        $(this).css({display: "none"});
        showTarget(nextTarget);
      }
    });

    function showTarget(nextTarget) {
      if (++res < 2) return;

      elms.texts[nextTarget].css({display: "block"}).animate({
        top: 0
      });

      elms.images[nextTarget].fadeIn();

      currentTarget = nextTarget;
      changingNow = false;
      timerId = false;
      startTimer();
    }
  }
  function startTimer() {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(function(){
      changeTarget(getNextTarget());
    }, 3000);
  }

});