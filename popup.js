document.addEventListener('DOMContentLoaded', function() {
  var offset = {
    x: 50,
    y: 50
  };

  chrome.windows.getAll(null, function(windows) {
    // var targetWindow = windows.find(function(window) {
    //   return window.focused;
    // });
    var targetWindow = windows[0];

    var sorted = windows.sort(function(window) {
      if (window.id == targetWindow.id) return -1;
      if (window.state === 'minimized') return 1;
      return 0;
    });

    sorted.forEach(function(window, index) {
      chrome.windows.update(window.id, {
        top:  targetWindow.top + offset.y * index,
        left: targetWindow.left + offset.x * index,
        width: targetWindow.width,
        height: targetWindow.height,
      });
    });

    window.close();
  });
}, false);
