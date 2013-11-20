/*! Hammer.JS - v1.0.6dev - 2013-09-12
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */(function(e,t){"use strict";function r(){if(n.READY)return;n.event.determineEventTypes();for(var e in n.gestures)n.gestures.hasOwnProperty(e)&&n.detection.register(n.gestures[e]);n.event.onTouch(n.DOCUMENT,n.EVENT_MOVE,n.detection.detect);n.event.onTouch(n.DOCUMENT,n.EVENT_END,n.detection.detect);n.READY=!0}var n=function(e,t){return new n.Instance(e,t||{})};n.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};n.HAS_POINTEREVENTS=e.navigator.pointerEnabled||e.navigator.msPointerEnabled;n.HAS_TOUCHEVENTS="ontouchstart"in e;n.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i;n.NO_MOUSEEVENTS=n.HAS_TOUCHEVENTS&&e.navigator.userAgent.match(n.MOBILE_REGEX);n.EVENT_TYPES={};n.DIRECTION_DOWN="down";n.DIRECTION_LEFT="left";n.DIRECTION_UP="up";n.DIRECTION_RIGHT="right";n.POINTER_MOUSE="mouse";n.POINTER_TOUCH="touch";n.POINTER_PEN="pen";n.EVENT_START="start";n.EVENT_MOVE="move";n.EVENT_END="end";n.DOCUMENT=e.document;n.plugins={};n.READY=!1;n.Instance=function(e,t){var i=this;r();this.element=e;this.enabled=!0;this.options=n.utils.extend(n.utils.extend({},n.defaults),t||{});this.options.stop_browser_behavior&&n.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior);n.event.onTouch(e,n.EVENT_START,function(e){i.enabled&&n.detection.startDetect(i,e)});return this};n.Instance.prototype={on:function(t,n){var r=t.split(" ");for(var i=0;i<r.length;i++)this.element.addEventListener(r[i],n,!1);return this},off:function(t,n){var r=t.split(" ");for(var i=0;i<r.length;i++)this.element.removeEventListener(r[i],n,!1);return this},trigger:function(t,r){r||(r={});var i=n.DOCUMENT.createEvent("Event");i.initEvent(t,!0,!0);i.gesture=r;var s=this.element;n.utils.hasParent(r.target,s)&&(s=r.target);s.dispatchEvent(i);return this},enable:function(t){this.enabled=t;return this}};var i=null,s=!1,o=!1;n.event={bindDom:function(e,t,n){var r=t.split(" ");for(var i=0;i<r.length;i++)e.addEventListener(r[i],n,!1)},onTouch:function(t,r,u){var a=this;this.bindDom(t,n.EVENT_TYPES[r],function(f){var l=f.type.toLowerCase();if(l.match(/mouse/)&&o)return;l.match(/touch/)||l.match(/pointerdown/)||l.match(/mouse/)&&f.which===1?s=!0:l.match(/mouse/)&&f.which!==1&&(s=!1);l.match(/touch|pointer/)&&(o=!0);var c=0;if(s){n.HAS_POINTEREVENTS&&r!=n.EVENT_END?c=n.PointerEvent.updatePointer(r,f):l.match(/touch/)?c=f.touches.length:o||(c=l.match(/up/)?0:1);c>0&&r==n.EVENT_END?r=n.EVENT_MOVE:c||(r=n.EVENT_END);if(c||i===null)i=f;u.call(n.detection,a.collectEventData(t,r,a.getTouchList(i,r),f));n.HAS_POINTEREVENTS&&r==n.EVENT_END&&(c=n.PointerEvent.updatePointer(r,f))}if(!c){i=null;s=!1;o=!1;n.PointerEvent.reset()}})},determineEventTypes:function(){var t;n.HAS_POINTEREVENTS?t=n.PointerEvent.getEvents():n.NO_MOUSEEVENTS?t=["touchstart","touchmove","touchend touchcancel"]:t=["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"];n.EVENT_TYPES[n.EVENT_START]=t[0];n.EVENT_TYPES[n.EVENT_MOVE]=t[1];n.EVENT_TYPES[n.EVENT_END]=t[2]},getTouchList:function(t){if(n.HAS_POINTEREVENTS)return n.PointerEvent.getTouchList();if(t.touches)return t.touches;t.indentifier=1;return[t]},collectEventData:function(t,r,i,s){var o=n.POINTER_TOUCH;if(s.type.match(/mouse/)||n.PointerEvent.matchType(n.POINTER_MOUSE,s))o=n.POINTER_MOUSE;return{center:n.utils.getCenter(i),timeStamp:(new Date).getTime(),target:s.target,touches:i,eventType:r,pointerType:o,srcEvent:s,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation();this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return n.detection.stopDetect()}}}};n.PointerEvent={pointers:{},getTouchList:function(){var e=this,t=[];Object.keys(e.pointers).sort().forEach(function(n){t.push(e.pointers[n])});return t},updatePointer:function(e,t){if(e==n.EVENT_END)this.pointers={};else{t.identifier=t.pointerId;this.pointers[t.pointerId]=t}return Object.keys(this.pointers).length},matchType:function(e,t){if(!t.pointerType)return!1;var r={};r[n.POINTER_MOUSE]=t.pointerType==t.MSPOINTER_TYPE_MOUSE||t.pointerType==n.POINTER_MOUSE;r[n.POINTER_TOUCH]=t.pointerType==t.MSPOINTER_TYPE_TOUCH||t.pointerType==n.POINTER_TOUCH;r[n.POINTER_PEN]=t.pointerType==t.MSPOINTER_TYPE_PEN||t.pointerType==n.POINTER_PEN;return r[e]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}};n.utils={extend:function(n,r,i){for(var s in r){if(n[s]!==t&&i)continue;n[s]=r[s]}return n},hasParent:function(e,t){while(e){if(e==t)return!0;e=e.parentNode}return!1},getCenter:function(t){var n=[],r=[];for(var i=0,s=t.length;i<s;i++){n.push(t[i].pageX);r.push(t[i].pageY)}return{pageX:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2,pageY:(Math.min.apply(Math,r)+Math.max.apply(Math,r))/2}},getVelocity:function(t,n,r){return{x:Math.abs(n/t)||0,y:Math.abs(r/t)||0}},getAngle:function(t,n){var r=n.pageY-t.pageY,i=n.pageX-t.pageX;return Math.atan2(r,i)*180/Math.PI},getDirection:function(t,r){var i=Math.abs(t.pageX-r.pageX),s=Math.abs(t.pageY-r.pageY);return i>=s?t.pageX-r.pageX>0?n.DIRECTION_LEFT:n.DIRECTION_RIGHT:t.pageY-r.pageY>0?n.DIRECTION_UP:n.DIRECTION_DOWN},getDistance:function(t,n){var r=n.pageX-t.pageX,i=n.pageY-t.pageY;return Math.sqrt(r*r+i*i)},getScale:function(t,n){return t.length>=2&&n.length>=2?this.getDistance(n[0],n[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,n){return t.length>=2&&n.length>=2?this.getAngle(n[1],n[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==n.DIRECTION_UP||t==n.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,n){var r,i=["webkit","khtml","moz","Moz","ms","o",""];if(!n||!t.style)return;for(var s=0;s<i.length;s++)for(var o in n)if(n.hasOwnProperty(o)){r=o;i[s]&&(r=i[s]+r.substring(0,1).toUpperCase()+r.substring(1));t.style[r]=n[o]}n.userSelect=="none"&&(t.onselectstart=function(){return!1});n.userDrag=="none"&&(t.ondragstart=function(){return!1})}};n.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,r){if(this.current)return;this.stopped=!1;this.current={inst:t,startEvent:n.utils.extend({},r),lastEvent:!1,name:""};this.detect(r)},detect:function(t){if(!this.current||this.stopped)return;t=this.extendEventData(t);var r=this.current.inst.options;for(var i=0,s=this.gestures.length;i<s;i++){var o=this.gestures[i];if(!this.stopped&&r[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}this.current&&(this.current.lastEvent=t);t.eventType==n.EVENT_END&&!t.touches.length-1&&this.stopDetect();return t},stopDetect:function(){this.previous=n.utils.extend({},this.current);this.current=null;this.stopped=!0},extendEventData:function(t){var r=this.current.startEvent;if(r&&(t.touches.length!=r.touches.length||t.touches===r.touches)){r.touches=[];for(var i=0,s=t.touches.length;i<s;i++)r.touches.push(n.utils.extend({},t.touches[i]))}var o=t.timeStamp-r.timeStamp,u=t.center.pageX-r.center.pageX,a=t.center.pageY-r.center.pageY,f=n.utils.getVelocity(o,u,a);n.utils.extend(t,{deltaTime:o,deltaX:u,deltaY:a,velocityX:f.x,velocityY:f.y,distance:n.utils.getDistance(r.center,t.center),angle:n.utils.getAngle(r.center,t.center),interimAngle:this.current.lastEvent&&n.utils.getAngle(this.current.lastEvent.center,t.center),direction:n.utils.getDirection(r.center,t.center),interimDirection:this.current.lastEvent&&n.utils.getDirection(this.current.lastEvent.center,t.center),scale:n.utils.getScale(r.touches,t.touches),rotation:n.utils.getRotation(r.touches,t.touches),startEvent:r});return t},register:function(r){var i=r.defaults||{};i[r.name]===t&&(i[r.name]=!0);n.utils.extend(n.defaults,i,!0);r.index=r.index||1e3;this.gestures.push(r);this.gestures.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:0});return this.gestures}};n.gestures=n.gestures||{};n.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,r){switch(t.eventType){case n.EVENT_START:clearTimeout(this.timer);n.detection.current.name=this.name;this.timer=setTimeout(function(){n.detection.current.name=="hold"&&r.trigger("hold",t)},r.options.hold_timeout);break;case n.EVENT_MOVE:t.distance>r.options.hold_threshold&&clearTimeout(this.timer);break;case n.EVENT_END:clearTimeout(this.timer)}}};n.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,r){if(t.eventType==n.EVENT_END&&t.srcEvent.type!="touchcancel"){var i=n.detection.previous,s=!1;if(t.deltaTime>r.options.tap_max_touchtime||t.distance>r.options.tap_max_distance)return;if(i&&i.name=="tap"&&t.timeStamp-i.lastEvent.timeStamp<r.options.doubletap_interval&&t.distance<r.options.doubletap_distance){r.trigger("doubletap",t);s=!0}if(!s||r.options.tap_always){n.detection.current.name="tap";r.trigger(n.detection.current.name,t)}}}};n.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,r){if(t.eventType==n.EVENT_END){if(r.options.swipe_max_touches>0&&t.touches.length>r.options.swipe_max_touches)return;if(t.velocityX>r.options.swipe_velocity||t.velocityY>r.options.swipe_velocity){r.trigger(this.name,t);r.trigger(this.name+t.direction,t)}}}};n.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,r){if(n.detection.current.name!=this.name&&this.triggered){r.trigger(this.name+"end",t);this.triggered=!1;return}if(r.options.drag_max_touches>0&&t.touches.length>r.options.drag_max_touches)return;switch(t.eventType){case n.EVENT_START:this.triggered=!1;break;case n.EVENT_MOVE:if(t.distance<r.options.drag_min_distance&&n.detection.current.name!=this.name)return;if(n.detection.current.name!=this.name){n.detection.current.name=this.name;if(r.options.correct_for_drag_min_distance){var i=Math.abs(r.options.drag_min_distance/t.distance);n.detection.current.startEvent.center.pageX+=t.deltaX*i;n.detection.current.startEvent.center.pageY+=t.deltaY*i;t=n.detection.extendEventData(t)}}if(n.detection.current.lastEvent.drag_locked_to_axis||r.options.drag_lock_to_axis&&r.options.drag_lock_min_distance<=t.distance)t.drag_locked_to_axis=!0;var s=n.detection.current.lastEvent.direction;t.drag_locked_to_axis&&s!==t.direction&&(n.utils.isVertical(s)?t.direction=t.deltaY<0?n.DIRECTION_UP:n.DIRECTION_DOWN:t.direction=t.deltaX<0?n.DIRECTION_LEFT:n.DIRECTION_RIGHT);if(!this.triggered){r.trigger(this.name+"start",t);this.triggered=!0}r.trigger(this.name,t);r.trigger(this.name+t.direction,t);(r.options.drag_block_vertical&&n.utils.isVertical(t.direction)||r.options.drag_block_horizontal&&!n.utils.isVertical(t.direction))&&t.preventDefault();break;case n.EVENT_END:this.triggered&&r.trigger(this.name+"end",t);this.triggered=!1}}};n.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,r){if(n.detection.current.name!=this.name&&this.triggered){r.trigger(this.name+"end",t);this.triggered=!1;return}if(t.touches.length<2)return;r.options.transform_always_block&&t.preventDefault();switch(t.eventType){case n.EVENT_START:this.triggered=!1;break;case n.EVENT_MOVE:var i=Math.abs(1-t.scale),s=Math.abs(t.rotation);if(i<r.options.transform_min_scale&&s<r.options.transform_min_rotation)return;n.detection.current.name=this.name;if(!this.triggered){r.trigger(this.name+"start",t);this.triggered=!0}r.trigger(this.name,t);s>r.options.transform_min_rotation&&r.trigger("rotate",t);if(i>r.options.transform_min_scale){r.trigger("pinch",t);r.trigger("pinch"+(t.scale<1?"in":"out"),t)}break;case n.EVENT_END:this.triggered&&r.trigger(this.name+"end",t);this.triggered=!1}}};n.gestures.Touch={name:"touch",index:-Infinity,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,r){if(r.options.prevent_mouseevents&&t.pointerType==n.POINTER_MOUSE){t.stopDetect();return}r.options.prevent_default&&t.preventDefault();t.eventType==n.EVENT_START&&r.trigger(this.name,t)}};n.gestures.Release={name:"release",index:Infinity,handler:function(t,r){t.eventType==n.EVENT_END&&r.trigger(this.name,t)}};typeof define=="function"&&typeof define.amd=="object"&&define.amd?define(function(){return n}):typeof module=="object"&&typeof module.exports=="object"?module.exports=n:e.Hammer=n})(this);(function(e){"use strict";var t=function(t,n){if(n===e)return t;t.event.bindDom=function(t,r,i){n(t).on(r,function(t){var n=t.originalEvent||t;if(n.pageX===e){n.pageX=t.pageX;n.pageY=t.pageY}n.target||(n.target=t.target);n.which===e&&(n.which=n.button);n.preventDefault||(n.preventDefault=t.preventDefault);n.stopPropagation||(n.stopPropagation=t.stopPropagation);i.call(this,n)})};t.Instance.prototype.on=function(e,t){return n(this.element).on(e,t)};t.Instance.prototype.off=function(e,t){return n(this.element).off(e,t)};t.Instance.prototype.trigger=function(e,t){var r=n(this.element);r.has(t.target).length&&(r=n(t.target));return r.trigger({type:e,gesture:t})};n.fn.hammer=function(e){return this.each(function(){var r=n(this),i=r.data("hammer");i?i&&e&&t.utils.extend(i.options,e):r.data("hammer",new t(this,e||{}))})};return t};typeof define=="function"&&typeof define.amd=="object"&&define.amd?define("hammer-jquery",["hammer","jquery"],t):t(window.Hammer,window.jQuery||window.Zepto)})();