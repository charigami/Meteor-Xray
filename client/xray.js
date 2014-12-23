Meteor.startup(function() {
  Blaze.render(Template.xray, document.body);
  Session.set('xray-label', 'xray on');
});

Template.xray.helpers({
  label: function () {
    return Session.get('xray-label');
  }
});

var xrayVisible = false;

Template.xray.events({
  'click button': function(e, tpl) {
    var regions;

    if (!xrayVisible) {
      regions = document.body.querySelectorAll('.xray');

      Session.set('xray-label', 'xray off');

      _.each(regions, function(region) {
        region.className = region.className.replace('xray', 'xray-visible');
      });

      xrayVisible = !xrayVisible;
    } else {
      regions = document.body.querySelectorAll('.xray-visible');

      Session.set('xray-label', 'xray on');

      _.each(regions, function(region) {
        region.className = region.className.replace('xray-visible', 'xray');
      });

      xrayVisible = !xrayVisible;
    }
  }
});

// render and put in the document
var renderToDiv = function(comp) {
  var div = document.createElement('DIV');
  var innderDiv = document.createElement('DIV');
  innderDiv.className = 'xray-label';
  div.appendChild(innderDiv);
  div.className = 'xray-label-container';
  Blaze.render(comp, innderDiv);
  return div;
};

Template.rendered(null, function() {
  var self = this;

  if (self.templateName !== 'xray') {
    // get direct childs
    var childs = self.findAll('>*');

    _.each(childs, function(child) {
      child.className += ' xray';
      var templateLabel = renderToDiv(self.templateName);
      child.insertBefore(templateLabel, child.firstNode);
    });

  }
});
