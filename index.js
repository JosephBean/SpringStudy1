window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-80887304-4');

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function setFocus(target_element, settings){
  target_element.style('background-color', settings.nodeActiveBGColor);
  target_element.style('color', settings.fontColor);
  target_element.successors().each(
      function(e){
          if(e.isEdge()){
              e.style('width', settings.edgeWidth);
              e.style('arrow-scale', settings.arrowScale);
          }
          e.style('color', settings.fontColor);
          e.style('background-color', settings.successorColor);
          e.style('line-color', settings.successorColor);
          e.style('target-arrow-color', settings.successorColor);
          e.style('z-index', getMaxZIndex());
          setOpacityElement(e, 1);
      }
  );
  target_element.predecessors().each(function(e){
      if(e.isEdge()){
          e.style('width', settings.edgeWidth);
          e.style('arrow-scale', settings.arrowScale);
      }
      e.style('color', settings.fontColor);
      e.style('background-color', settings.predecessorsColor);
      e.style('line-color', settings.predecessorsColor);
      e.style('target-arrow-color', settings.predecessorsColor);
      e.style('z-index', getMaxZIndex());
      setOpacityElement(e, 1);
  });
  target_element.neighborhood().each(
      function(e){
          var empDegree = 30;
          e.style('background-color',tinycolor(e.style('background-color')).darken(empDegree).toString());
          e.style('line-color', tinycolor(e.style('line-color')).darken(empDegree).toString());
          e.style('target-arrow-color', tinycolor(e.style('target-arrow-color')).darken(empDegree).toString());
      }
  );
  target_element.style('z-index', getMaxZIndex());
  target_element.style('width', Math.max(parseFloat(target_element.style('width')), settings.nodeActiveSize));
  target_element.style('height', Math.max(parseFloat(target_element.style('height')), settings.nodeActiveSize));
  target_element.style('font-size', Math.max(parseFloat(target_element.style('font-size')), settings.nodeActiveFontSize));
}
function getMaxZIndex(){
  if(!window.zindex){
      window.zindex = 1;
  }
  return ++window.zindex;
}
function setOpacityElement(target_element, degree){
  target_element.style('opacity', degree);
}
function setOpacity(target_cy, degree){
  target_cy.nodes().forEach(function(target){
      setOpacityElement(target, degree);
  });
  target_cy.edges().forEach(function(target){
      setOpacityElement(target, degree);
  });
}
function setStyle(target_cy, style){
  target_cy.nodes().forEach(function(target){
      target.style(style);
  });
  target_cy.edges().forEach(function(target){
      target.style(style);
  });

}
function setResetFocus(target_cy, pageRank, settings){
  target_cy.nodes().forEach(function(target){
      target.style('background-color', settings.nodeBGColor);
      var rank = pageRank.rank(target);
      target.style('width', (settings.nodeMaxSize * rank) + settings.nodeMinSize);
      target.style('height', (settings.nodeMaxSize * rank) + settings.nodeMinSize);
      target.style('font-size', (settings.fontMaxSize * rank) + settings.fontMinSize);
      target.style('color', settings.fontColor);
  });
  target_cy.edges().forEach(function(target){
      target.style('line-color', settings.edgeBGColor);
      target.style('target-arrow-color', settings.edgeBGColor);
      target.style('width', settings.edgeWidth);
      target.style('arrow-scale', settings.arrowScale);
  });
}
const start = (data) => {

  const settings = {
    nodeMaxSize : 80,
    nodeMinSize : 4,
    fontMaxSize : 7,
    fontMinSize : 4,
    dimColor : '#f4f4f8',
    textOutlineColor : 'white',
    fontColor : 'black',
    nodeBGColor : '#4f5b66',
    edgeBGColor : '#c0c5ce',
    edgeWidth : '0.3px',
    arrowScale : 0.2,
    arrowActiveScale : 0.5,
    successorColor : 'rgb(246, 176, 172)',
    successorWeakColor : '#ff8b94',
    predecessorsColor : 'rgb(140, 232, 250)',
    predecessorsWeakColor : '#4a91f2',
    nodeActiveBGColor : '#fed766',
    nodeActiveSize : 23,
    nodeActiveFontSize : 7,
    edgeActiveWidth : '1px'
  };

  var _rank_cy = cytoscape({elements: data});
  var pageRank = _rank_cy.elements().pageRank();

  const styles = [
      {
        selector: 'node',
        style: {
            'font-family':'Open Sans Condensed',
            'font-weight': '200',
            'label': 'data(label)',
            'text-valign': 'top',
            'color': settings.fontColor,
            'text-outline-width': 0,
            'text-outline-color': settings.textOutlineColor,
            'background-color': settings.nodeBGColor,
            'width':function(ele){
                return (settings.nodeMaxSize * pageRank.rank('#'+ele.id())) + settings.nodeMinSize;
            },
            'height':function(ele){
                return (settings.nodeMaxSize * pageRank.rank('#'+ele.id())) + settings.nodeMinSize;
            },
            'font-size':function(ele){
                return (settings.fontMaxSize * pageRank.rank('#'+ele.id())) + settings.fontMinSize;
            }
        }
      },
      {
        selector: 'edge',
        style: {
            'curve-style': 'bezier',
            'width': 0.3,
            'target-arrow-shape': 'triangle',
            'line-color': settings.edgeBGColor,
            'target-arrow-color': settings.edgeBGColor,
        }
      },
      {
        selector: '.prepare',
        style: {
            'opacity': '0.5'
        }
      }
  ];
  const layout = {
      name: 'cose-bilkent',
      animate: false,
      gravityRangeCompound: 1.5,
      fit: true,
      tile: true
  };

  cy = cytoscape({
      container: document.getElementById('cy'),
      elements: data,
      minZoom:0.2,
      wheelSensitivity:0.1,
      style: styles,
      layout: layout
  });

  var home = getParameterByName('i');
  if(home){
      var _home = cy.$('#'+home);
      setResetFocus(cy, pageRank, settings);
      setFocus(_home, settings);
  } else {
      setResetFocus(cy, pageRank, settings);
  }

  cy.on('tap', function (e) {
      if(e.cy === e.target){
          setResetFocus(e.cy, pageRank, settings);
      } else {
          var url = e.target.data('url');
          gtag('event', 'Click', {
              'event_category': 'node',
              'event_label': e.target.id(),
              'value': 1
          });
          if(url && url !== '')
              window.open(url);
      }
  });

  cy.on('tapend mouseout', 'node', function(e){
      setResetFocus(e.cy, pageRank, settings);
  });

  cy.on('tapstart mouseover', 'node', function(e){
      setResetFocus(e.cy, pageRank, settings);
      setStyle(cy, {
          'background-color': settings.dimColor,
          'line-color': settings.dimColor,
          'target-arrow-color': settings.dimColor,
          'color': settings.dimColor
      });
      setFocus(e.target, settings);
  });

  waitForWebfonts(['Open Sans Condensed'], function(){
      cy.forceRender();
  })

}

function debouncer(func, timeout) {
  var timeoutID, timeout = timeout || 200;
  return function () {
      var scope = this, args = arguments;
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function () {
          func.apply(scope, Array.prototype.slice.call(args));
      }, timeout);
  }
}
function waitForWebfonts(fonts, callback) {
  var loadedFonts = 0;
  for(var i = 0, l = fonts.length; i < l; ++i) {
      (function(font) {
          var node = document.createElement('span');

          node.innerHTML = 'giItT1WQy@!-/#';

          node.style.position      = 'absolute';
          node.style.left          = '-10000px';
          node.style.top           = '-10000px';

          node.style.fontSize      = '300px';

          node.style.fontFamily    = 'sans-serif';
          node.style.fontVariant   = 'normal';
          node.style.fontStyle     = 'normal';
          node.style.fontWeight    = 'normal';
          node.style.letterSpacing = '0';
          document.body.appendChild(node);

          var width = node.offsetWidth;

          node.style.fontFamily = font + ', sans-serif';

          var interval;
          function checkFont() {
              if(node && node.offsetWidth != width) {
                  ++loadedFonts;
                  node.parentNode.removeChild(node);
                  node = null;
              }
              if(loadedFonts >= fonts.length) {
                  if(interval) {
                      clearInterval(interval);
                  }
                  if(loadedFonts == fonts.length) {
                      callback();
                      return true;
                  }
              }
          };

          if(!checkFont()) {
              interval = setInterval(checkFont, 50);
          }
      })(fonts[i]);
  }
};

$(window).resize(debouncer(function() {cy.fit()}));
$(document).one('touchstart click', function() {cy.userPanningEnabled(true)});

