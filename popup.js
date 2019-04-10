document.addEventListener('DOMContentLoaded', function() {
  var offset = {
    x: 50,
    y: 50
  };

  chrome.windows.getAll(null, function(windows) {
    var targetWindow = windows[0];

    // target window first, normal, then incognito, then minimized windows last
    var sorted = windows.sort(function(window) {
      if (window.id == targetWindow.id) return -1;
      if (window.incognito === true) return 1;
      if (window.state === 'minimized') return 2;
      return 0;
    });

    var ignoredStates = ['maximized', 'fullscreen'];
    var sortedAndfiltered = sorted.filter(function(window) {
      return !ignoredStates.includes(window.state);
    });

    sortedAndfiltered.forEach(function(window, index) {
      chrome.windows.update(window.id, {
        top:  targetWindow.top + offset.y * index,
        left: targetWindow.left + offset.x * index,
        width: targetWindow.width,
        height: targetWindow.height,
      });
    });

    // immediately close popup
    window.close();
  });
}, false);
