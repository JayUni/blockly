/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Dropdown input field.  Used for editable titles and variables.
 * In the interests of a consistent UI, the toolbox shares some functions and
 * properties with the context menu.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldDropdown');

goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuItem');


/**
 * Class for an editable dropdown field.
 * @param {(!Array.<string>|!Function)} menuGenerator An array of options
 *     for a dropdown list, or a function which generates these options.
 * @param {Function} opt_changeHandler A function that is executed when a new
 *     option is selected, with the newly selected value as its sole argument.
 *     If it returns a value, that value (which must be one of the options) will
 *     become selected in place of the newly selected option, unless the return
 *     value is null, in which case the change is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldDropdown = function(menuGenerator, opt_changeHandler) {
  this.menuGenerator_ = menuGenerator;
  this.changeHandler_ = opt_changeHandler;
  this.trimOptions_();
  var firstTuple = this.getOptions_()[0];
  this.value_ = firstTuple[1];

  // Add dropdown arrow: "option ▾" (LTR) or "▾ אופציה" (RTL)
  // Android can't (in 2014) display "▾", so use "▼" instead.
  var arrowChar = goog.userAgent.ANDROID ? '\u25BC' : '\u25BE';
  this.arrow_ = Blockly.createSvgElement('tspan', {}, null);
  this.arrow_.appendChild(document.createTextNode(
      Blockly.RTL ? arrowChar + ' ' : ' ' + arrowChar));

  // Call parent's constructor.
  Blockly.FieldDropdown.superClass_.constructor.call(this, firstTuple[0]);
};
goog.inherits(Blockly.FieldDropdown, Blockly.Field);

/**
 * Horizontal distance that a checkmark ovehangs the dropdown.
 */
Blockly.FieldDropdown.CHECKMARK_OVERHANG = 25;

/**
 * Clone this FieldDropdown.
 * @return {!Blockly.FieldDropdown} The result of calling the constructor again
 *   with the current values of the arguments used during construction.
 */
Blockly.FieldDropdown.prototype.clone = function() {
  return new Blockly.FieldDropdown(this.menuGenerator_, this.changeHandler_);
};

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldDropdown.prototype.CURSOR = 'default';

/**
 * Create a dropdown menu under the text.
 * @private
 */
Blockly.FieldDropdown.prototype.showEditor_ = function() {
  Blockly.WidgetDiv.show(this, null);
  var thisField = this;
  var oldValue  = '';  //  MAP - Have to keep track of what was there before.  
  
  function newVariableCallback(value) {  //  MAP - Callback from "promptDialog" for NEW.VARIABLE Below
    if (value) {
      Blockly.Variables.renameVariable(value, value);
      thisField.setValue(value);
    }
    Blockly.WidgetDiv.hideIfOwner(thisField);  //  MAP - Not sure if this should be left in or not
  }
  function renameVariableCallback(value) {  //  MAP - Callback from "promptDialog" for NEW.VARIABLE Below
    if (value) {
      Blockly.Variables.renameVariable(oldValue, value);
    }
    Blockly.WidgetDiv.hideIfOwner(thisField);  //  MAP - Not sure if this should be left in or not
  }

  function callback(e) {
    var menuItem = e.target;
    if (menuItem) {
      var value = menuItem.getValue();
      if (Blockly.Msg.NEW_VARIABLE == value) {  //  MAP - Create New Variable
        if (thisField.changeHandler_) {  //  MAP - Changing Name of Variable or New Variable
          promptDialog('New Variable', 'Enter New Variable Name', '', newVariableCallback);  //  MAP - Get a new Name or nothing
//          // Call any change handler, and allow it to override.
//          var override = thisField.changeHandler_(value);
//          if (override !== undefined) {
//            value = override;
//          }
//          value = thisField.changeHandler_(value);
//          if (value !== null) {
//            thisField.setValue(value);
//          }
          Blockly.WidgetDiv.hideIfOwner(thisField);  //  MAP - Not sure if this should be left in or not
        }
      }
      else if (Blockly.Msg.RENAME_VARIABLE == value) {  //  MAP - Renaming Variable
        if (thisField.changeHandler_) {  //  MAP - Changing Name of Variable or New Variable
          promptDialog('Rename Variable', 'Enter New Variable Name', oldValue, renameVariableCallback);  //  MAP - Get a replacement Name or return nothing
//          // Call any change handler, and allow it to override.
//          var override = thisField.changeHandler_(value);
//          if (override !== undefined) {
//            value = override;
//          }
//          if (value !== null) {
//            thisField.setValue(value);
//          }
          Blockly.WidgetDiv.hideIfOwner(thisField);
        }
      }
      else {  //  MAP - Changing Variable in Block
        thisField.setValue(value);
        Blockly.WidgetDiv.hideIfOwner(thisField);
      }
    }
  }

  var menu = new goog.ui.Menu();
  var options = this.getOptions_();
  for (var x = 0; x < options.length; x++) {
    var text = options[x][0];  // Human-readable text.
    var value = options[x][1]; // Language-neutral value.
    var menuItem = new goog.ui.MenuItem(text);
    menuItem.setValue(value);
    menuItem.setCheckable(true);
    menu.addChild(menuItem, true);
    if (value == this.value_) {  //  MAP - Save the "value" for later
      oldValue = value;
      menuItem.setChecked(true);
    }
//    menuItem.setChecked(value == this.value_);
  }
  goog.events.listen(menu, goog.ui.Component.EventType.ACTION, callback);
  // Record windowSize and scrollOffset before adding menu.
  var windowSize = goog.dom.getViewportSize();
  var scrollOffset = goog.style.getViewportPageOffset(document);
  var xy = Blockly.getAbsoluteXY_(/** @type {!Element} */ (this.borderRect_));
  var borderBBox = this.borderRect_.getBBox();
  var div = Blockly.WidgetDiv.DIV;
  menu.render(div);
  var menuDom = menu.getElement();
  Blockly.addClass_(menuDom, 'blocklyDropdownMenu');
  // Record menuSize after adding menu.
  var menuSize = goog.style.getSize(menuDom);

  // Position the menu.
  // Flip menu vertically if off the bottom.
  if (xy.y + menuSize.height + borderBBox.height >=
      windowSize.height + scrollOffset.y) {
    xy.y -= menuSize.height;
  } else {
    xy.y += borderBBox.height;
  }
  if (Blockly.RTL) {
    xy.x += borderBBox.width;
    xy.x += Blockly.FieldDropdown.CHECKMARK_OVERHANG;
    // Don't go offscreen left.
    if (xy.x < scrollOffset.x + menuSize.width) {
      xy.x = scrollOffset.x + menuSize.width;
    }
  } else {
    xy.x -= Blockly.FieldDropdown.CHECKMARK_OVERHANG;
    // Don't go offscreen right.
    if (xy.x > windowSize.width + scrollOffset.x - menuSize.width) {
      xy.x = windowSize.width + scrollOffset.x - menuSize.width;
    }
  }
  Blockly.WidgetDiv.position(xy.x, xy.y, windowSize, scrollOffset);
  menu.setAllowAutoFocus(true);
  menuDom.focus();
};

/**
 * Factor out common words in statically defined options.
 * Create prefix and/or suffix labels.
 * @private
 */
Blockly.FieldDropdown.prototype.trimOptions_ = function() {
  this.prefixField = null;
  this.suffixField = null;
  var options = this.menuGenerator_;
  if (!goog.isArray(options) || options.length < 2) {
    return;
  }
  var strings = options.map(function(t) {return t[0];});
  var shortest = Blockly.shortestStringLength(strings);
  var prefixLength = Blockly.commonWordPrefix(strings, shortest);
  var suffixLength = Blockly.commonWordSuffix(strings, shortest);
  if (!prefixLength && !suffixLength) {
    return;
  }
  if (shortest <= prefixLength + suffixLength) {
    // One or more strings will entirely vanish if we proceed.  Abort.
    return;
  }
  if (prefixLength) {
    this.prefixField = strings[0].substring(0, prefixLength - 1);
  }
  if (suffixLength) {
    this.suffixField = strings[0].substr(1 - suffixLength);
  }
  // Remove the prefix and suffix from the options.
  var newOptions = [];
  for (var x = 0; x < options.length; x++) {
    var text = options[x][0];
    var value = options[x][1];
    text = text.substring(prefixLength, text.length - suffixLength);
    newOptions[x] = [text, value];
  }
  this.menuGenerator_ = newOptions;
};

/**
 * Return a list of the options for this dropdown.
 * @return {!Array.<!Array.<string>>} Array of option tuples:
 *     (human-readable text, language-neutral name).
 * @private
 */
Blockly.FieldDropdown.prototype.getOptions_ = function() {
  if (goog.isFunction(this.menuGenerator_)) {
    return this.menuGenerator_.call(this);
  }
  return /** @type {!Array.<!Array.<string>>} */ (this.menuGenerator_);
};

/**
 * Get the language-neutral value from this dropdown menu.
 * @return {string} Current text.
 */
Blockly.FieldDropdown.prototype.getValue = function() {
  return this.value_;
};

/**
 * Set the language-neutral value for this dropdown menu.
 * @param {string} newValue New value to set.
 */
Blockly.FieldDropdown.prototype.setValue = function(newValue) {
  this.value_ = newValue;
  // Look up and display the human-readable text.
  var options = this.getOptions_();
  for (var x = 0; x < options.length; x++) {
    // Options are tuples of human-readable text and language-neutral values.
    if (options[x][1] == newValue) {
      this.setText(options[x][0]);
      return;
    }
  }
  // Value not found.  Add it, maybe it will become valid once set
  // (like variable names).
  this.setText(newValue);
};

/**
 * Set the text in this field.  Trigger a rerender of the source block.
 * @param {?string} text New text.
 */
Blockly.FieldDropdown.prototype.setText = function(text) {
  if (this.sourceBlock_) {
    // Update arrow's colour.
    this.arrow_.style.fill = Blockly.makeColour(this.sourceBlock_.getColour());
  }
  if (text === null || text === this.text_) {
    // No change if null.
    return;
  }
  this.text_ = text;
  this.updateTextNode_();

  // Insert dropdown arrow.
  if (Blockly.RTL) {
    this.textElement_.insertBefore(this.arrow_, this.textElement_.firstChild);
  } else {
    this.textElement_.appendChild(this.arrow_);
  }

  if (this.sourceBlock_ && this.sourceBlock_.rendered) {
    this.sourceBlock_.render();
    this.sourceBlock_.bumpNeighbours_();
    this.sourceBlock_.workspace.fireChangeEvent();
  }
};

/**
 * Close the dropdown menu if this input is being deleted.
 */
Blockly.FieldDropdown.prototype.dispose = function() {
  Blockly.WidgetDiv.hideIfOwner(this);
  Blockly.FieldDropdown.superClass_.dispose.call(this);
};




function promptDialog(title, message, originalText, closeCallback) {  //  MAP - Get the User Input
  title = title || "Prompt...";
  var returnValue = "";

  var deferred = Q.defer();
  $('<div title="' + title + '">' +
                                    "<p>" + message + "</p>" +
                                    "<input type=\"text\" name=\"__prompt\" value=" + originalText + ">" +
                                    '</div>').dialog({
    modal: true,
    width: 400,
    position: {
      my: "center top",
      at: "center top",
      of: window
    },
    buttons: [{
      text: "OK",
      click: function () {
        returnValue = $("input:text").val();
        returnValue = returnValue && returnValue.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        $(this).dialog("close");
      }
    }, {
      text: "Cancel",
      click: function () {
        $(this).dialog("close");
      }
    }],
    close: function (event, ui) {
      $(this).dialog("destroy").remove();
      if (deferred.promise.isPending()) {
        deferred.resolve(false);
      }
      closeCallback(returnValue);
    }
  });
  
  return deferred.promise;
}
