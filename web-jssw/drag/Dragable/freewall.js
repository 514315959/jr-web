(function ($) {
    $.isNumeric == null && ($.isNumeric = function (src) { return src != null && src.constructor === Number; }); $.isFunction == null && ($.isFunction = function (src) { return src != null && src instanceof Function; }); var $W = $(window); var $D = $(document); var layoutManager = {
        defaultConfig: { animate: false, cellW: 100, cellH: 100, delay: 0, engine: 'giot', fixSize: null, gutterX: 15, gutterY: 15, keepOrder: false, selector: '> div', draggable: false, cacheSize: true, rightToLeft: false, bottomToTop: false, onGapFound: function () { }, onComplete: function () { }, onResize: function () { }, onBlockDrag: function () { }, onBlockMove: function () { }, onBlockDrop: function () { }, onBlockReady: function () { }, onBlockFinish: function () { }, onBlockActive: function () { }, onBlockResize: function () { } }, plugin: {}, totalGrid: 1, transition: false, loadBlock: function (item, setting) {
            var runtime = setting.runtime; var gutterX = runtime.gutterX; var gutterY = runtime.gutterY; var cellH = runtime.cellH; var cellW = runtime.cellW; var block = null; var $item = $(item); var active = $item.data("active"); var fixPos = $item.attr('data-position'); var fixSize = parseInt($item.attr('data-fixSize')); var blockId = runtime.lastId++ + '-' + runtime.totalGrid; if ($item.hasClass('fw-float')) return null; $item.attr({ id: blockId, 'data-delay': item.index }); if (setting.animate && this.transition) { this.setTransition(item, ""); }
            isNaN(fixSize) && (fixSize = null); (fixSize == null) && (fixSize = setting.fixSize); var makeRound = (!fixSize) ? "round" : "ceil"; $item.attr('data-height') == null && $item.attr('data-height', $item.height()); $item.attr('data-width') == null && $item.attr('data-width', $item.width()); var height = 1 * $item.attr('data-height'); var width = 1 * $item.attr('data-width'); if (!setting.cacheSize) { item.style.width = ""; width = $item.width(); item.style.height = ""; height = $item.height(); }
            var col = !width ? 0 : Math[makeRound]((width + gutterX) / cellW); var row = !height ? 0 : Math[makeRound]((height + gutterY) / cellH); if (!fixSize && setting.cellH == 'auto') { $item.width(cellW * col - gutterX); item.style.height = ""; height = $item.height(); row = !height ? 0 : Math.round((height + gutterY) / cellH); }
            if (!fixSize && setting.cellW == 'auto') { $item.height(cellH * row - gutterY); item.style.width = ""; width = $item.width(); col = !width ? 0 : Math.round((width + gutterX) / cellW); }
            if ((fixSize != null) && (col > runtime.limitCol || row > runtime.limitRow)) { block = null; } else { row && row < runtime.minHoB && (runtime.minHoB = row); col && col < runtime.minWoB && (runtime.minWoB = col); row > runtime.maxHoB && (runtime.maxHoB = row); col > runtime.maxWoB && (runtime.maxWoB = col); width == 0 && (col = 0); height == 0 && (row = 0); block = { resize: false, id: blockId, width: col, height: row, fixSize: fixSize }; if (fixPos) { fixPos = fixPos.split("-"); block.y = 1 * fixPos[0]; block.x = 1 * fixPos[1]; block.width = fixSize != null ? col : Math.min(col, runtime.limitCol - block.x); block.height = fixSize != null ? row : Math.min(row, runtime.limitRow - block.y); var holeId = block.y + "-" + block.x + "-" + block.width + "-" + block.height; if (active) { runtime.holes[holeId] = { id: block.id, top: block.y, left: block.x, width: block.width, height: block.height }; this.setBlock(block, setting); } else { delete runtime.holes[holeId]; } } }
            if ($item.attr("data-state") == null) { $item.attr("data-state", "init"); } else { $item.attr("data-state", "move"); }
            setting.onBlockReady.call(item, block, setting); return (fixPos && active) ? null : block;
        }, setBlock: function (block, setting) {
            var runtime = setting.runtime; var gutterX = runtime.gutterX; var gutterY = runtime.gutterY; var height = block.height; var width = block.width; var cellH = runtime.cellH; var cellW = runtime.cellW; var x = block.x; var y = block.y; if (setting.rightToLeft) { x = runtime.limitCol - x - width; }
            if (setting.bottomToTop) { y = runtime.limitRow - y - height; }
            var realBlock = { fixSize: block.fixSize, resize: block.resize, top: y * cellH, left: x * cellW, width: cellW * width - gutterX, height: cellH * height - gutterY }; realBlock.top = 1 * realBlock.top.toFixed(2); realBlock.left = 1 * realBlock.left.toFixed(2); realBlock.width = 1 * realBlock.width.toFixed(2); realBlock.height = 1 * realBlock.height.toFixed(2); block.id && (runtime.blocks[block.id] = realBlock); return realBlock;
        }, showBlock: function (item, setting) {
            var runtime = setting.runtime; var method = setting.animate && !this.transition ? 'animate' : 'css'; var block = runtime.blocks[item.id]; var $item = $(item); var self = this; var start = $item.attr("data-state") != "move"; var trans = start ? "width 0.5s, height 0.5s" : "top 0.5s, left 0.5s, width 0.5s, height 0.5s, opacity 0.5s"; item.delay && clearTimeout(item.delay); if ($item.hasClass('fw-float')) return; self.setTransition(item, ""); item.style.position = "absolute"; setting.onBlockActive.call(item, block, setting); function action() {
                start && $item.attr("data-state", "start"); if (setting.animate && self.transition) { self.setTransition(item, trans); }
                runtime.length -= 1; if (!block) { var height = parseInt(item.style.height) || 0; var width = parseInt(item.style.width) || 0; var left = parseInt(item.style.left) || 0; var top = parseInt(item.style.top) || 0; $item[method]({ left: left + width / 2, top: top + height / 2, width: 0, height: 0, opacity: 0 }); } else {
                    if (block.fixSize) { block.height = 1 * $item.attr("data-height"); block.width = 1 * $item.attr("data-width"); }
                    $item["css"]({ opacity: 1, width: block.width, height: block.height }); $item[method]({ top: block.top, left: block.left }); if ($item.attr('data-nested') != null) { self.nestedGrid(item, setting); }
                }
                setting.onBlockFinish.call(item, block, setting); if (runtime.length == 0) { var duration = setting.animate ? 500 : 0; item.delay = setTimeout(function () { setting.onComplete.call(item, block, setting); }, duration); }
            }
            block && block.resize && setting.onBlockResize.call(item, block, setting); setting.delay > 0 ? (item.delay = setTimeout(action, setting.delay * $item.attr("data-delay"))) : action();
        }, nestedGrid: function (item, setting) { var innerWall, $item = $(item), runtime = setting.runtime; var gutterX = $item.attr("data-gutterX") || setting.gutterX; var gutterY = $item.attr("data-gutterY") || setting.gutterY; var method = $item.attr("data-method") || "fitZone"; var nested = $item.attr('data-nested') || "> div"; var cellH = $item.attr("data-cellH") || setting.cellH; var cellW = $item.attr("data-cellW") || setting.cellW; var block = runtime.blocks[item.id]; if (block) { innerWall = new Freewall($item); innerWall.reset({ cellH: cellH, cellW: cellW, gutterX: 1 * gutterX, gutterY: 1 * gutterY, selector: nested, cacheSize: false }); switch (method) { case "fitHeight": innerWall[method](block.height); break; case "fitWidth": innerWall[method](block.width); break; case "fitZone": innerWall[method](block.width, block.height); break; } } }, adjustBlock: function (block, setting) { var runtime = setting.runtime; var gutterX = runtime.gutterX; var gutterY = runtime.gutterY; var $item = $("#" + block.id); var cellH = runtime.cellH; var cellW = runtime.cellW; if (setting.cellH == 'auto') { $item.width(block.width * cellW - gutterX); $item[0].style.height = ""; block.height = Math.round(($item.height() + gutterY) / cellH); } }, adjustUnit: function (width, height, setting) {
            var gutterX = setting.gutterX; var gutterY = setting.gutterY; var runtime = setting.runtime; var cellW = setting.cellW; var cellH = setting.cellH; $.isFunction(cellW) && (cellW = cellW(width)); cellW = 1 * cellW; !$.isNumeric(cellW) && (cellW = 1); $.isFunction(cellH) && (cellH = cellH(height)); cellH = 1 * cellH; !$.isNumeric(cellH) && (cellH = 1); if ($.isNumeric(width)) {
                cellW < 1 && (cellW = cellW * width); var limitCol = Math.max(1, Math.floor(width / cellW)); if (!$.isNumeric(gutterX)) { gutterX = (width - limitCol * cellW) / Math.max(1, (limitCol - 1)); gutterX = Math.max(0, gutterX); }
                limitCol = Math.floor((width + gutterX) / cellW); runtime.cellW = (width + gutterX) / Math.max(limitCol, 1); runtime.cellS = runtime.cellW / cellW; runtime.gutterX = gutterX; runtime.limitCol = limitCol;
            }
            if ($.isNumeric(height)) {
                cellH < 1 && (cellH = cellH * height); var limitRow = Math.max(1, Math.floor(height / cellH)); if (!$.isNumeric(gutterY)) { gutterY = (height - limitRow * cellH) / Math.max(1, (limitRow - 1)); gutterY = Math.max(0, gutterY); }
                limitRow = Math.floor((height + gutterY) / cellH); runtime.cellH = (height + gutterY) / Math.max(limitRow, 1); runtime.cellS = runtime.cellH / cellH; runtime.gutterY = gutterY; runtime.limitRow = limitRow;
            }
            if (!$.isNumeric(width)) { cellW < 1 && (cellW = runtime.cellH); runtime.cellW = cellW != 1 ? cellW * runtime.cellS : 1; runtime.gutterX = gutterX; runtime.limitCol = 666666; }
            if (!$.isNumeric(height)) { cellH < 1 && (cellH = runtime.cellW); runtime.cellH = cellH != 1 ? cellH * runtime.cellS : 1; runtime.gutterY = gutterY; runtime.limitRow = 666666; }
            runtime.keepOrder = setting.keepOrder;
        }, resetGrid: function (runtime) { runtime.blocks = {}; runtime.length = 0; runtime.cellH = 0; runtime.cellW = 0; runtime.lastId = 1; runtime.matrix = {}; runtime.totalCol = 0; runtime.totalRow = 0; }, setDraggable: function (item, option) {
            var isTouch = false; var config = { startX: 0, startY: 0, top: 0, left: 0, handle: null, onDrop: function () { }, onDrag: function () { }, onStart: function () { } }; $(item).each(function () {
                var setting = $.extend({}, config, option); var handle = setting.handle || this; var ele = this; var $E = $(ele); var $H = $(handle); var posStyle = $E.css("position"); posStyle != "absolute" && $E.css("position", "relative"); function mouseDown(evt) {
                    evt.stopPropagation(); evt = evt.originalEvent; if (evt.touches) { isTouch = true; evt = evt.changedTouches[0]; }
                    if (evt.button != 2 && evt.which != 3) { setting.onStart.call(ele, evt); setting.startX = evt.clientX; setting.startY = evt.clientY; setting.top = parseInt($E.css("top")) || 0; setting.left = parseInt($E.css("left")) || 0; $D.bind("mouseup touchend", mouseUp); $D.bind("mousemove touchmove", mouseMove); }
                    return false;
                }; function mouseMove(evt) { evt = evt.originalEvent; isTouch && (evt = evt.changedTouches[0]); $E.css({ top: setting.top - (setting.startY - evt.clientY), left: setting.left - (setting.startX - evt.clientX) }); setting.onDrag.call(ele, evt); }; function mouseUp(evt) { evt = evt.originalEvent; isTouch && (evt = evt.changedTouches[0]); setting.onDrop.call(ele, evt); $D.unbind("mouseup touchend", mouseUp); $D.unbind("mousemove touchmove", mouseMove); }; $E.find("iframe, form, input, textarea, .ignore-drag").each(function () { $(this).on("touchstart mousedown", function (evt) { evt.stopPropagation(); }); }); $D.unbind("mouseup touchend", mouseUp); $D.unbind("mousemove touchmove", mouseMove); $H.unbind("mousedown touchstart").bind("mousedown touchstart", mouseDown);
            });
        }, setTransition: function (item, trans) { var style = item.style; var $item = $(item); if (!this.transition && $item.stop) { $item.stop(); } else if (style.webkitTransition != null) { style.webkitTransition = trans; } else if (style.MozTransition != null) { style.MozTransition = trans; } else if (style.msTransition != null) { style.msTransition = trans; } else if (style.OTransition != null) { style.OTransition = trans; } else { style.transition = trans; } }, getFreeArea: function (t, l, runtime) {
            var maxY = Math.min(t + runtime.maxHoB, runtime.limitRow); var maxX = Math.min(l + runtime.maxWoB, runtime.limitCol); var minX = maxX; var minY = maxY; var matrix = runtime.matrix; for (var y = t; y < minY; ++y) { for (var x = l; x < maxX; ++x) { if (matrix[y + '-' + x]) { (l < x && x < minX) && (minX = x); } } }
            for (var y = t; y < maxY; ++y) { for (var x = l; x < minX; ++x) { if (matrix[y + '-' + x]) { (t < y && y < minY) && (minY = y); } } }
            return { top: t, left: l, width: minX - l, height: minY - t };
        }, setWallSize: function (runtime, container) { var totalRow = runtime.totalRow; var totalCol = runtime.totalCol; var gutterY = runtime.gutterY; var gutterX = runtime.gutterX; var cellH = runtime.cellH; var cellW = runtime.cellW; var totalWidth = Math.max(0, cellW * totalCol - gutterX); var totalHeight = Math.max(0, cellH * totalRow - gutterY); container.attr({ 'data-total-col': totalCol, 'data-total-row': totalRow, 'data-wall-width': Math.ceil(totalWidth), 'data-wall-height': Math.ceil(totalHeight) }); if (runtime.limitCol < runtime.limitRow) { !container.attr("data-height") && container.height(Math.ceil(totalHeight)); } }
    }; var engine = {
        giot: function (items, setting) {
            var runtime = setting.runtime, row = runtime.limitRow, col = runtime.limitCol, x = 0, y = 0, maxX = runtime.totalCol, maxY = runtime.totalRow, wall = {}, holes = runtime.holes, block = null, matrix = runtime.matrix, bigLoop = Math.max(col, row), freeArea = null, misBlock = null, fitWidth = col < row ? 1 : 0, lastBlock = null, smallLoop = Math.min(col, row); function fillMatrix(id, t, l, w, h) {
                for (var y = t; y < t + h;) {
                    for (var x = l; x < l + w;) { matrix[y + '-' + x] = id; ++x > maxX && (maxX = x); }
                    ++y > maxY && (maxY = y);
                }
            }
            for (var i in holes) { if (holes.hasOwnProperty(i)) { fillMatrix(holes[i]["id"] || true, holes[i]['top'], holes[i]['left'], holes[i]['width'], holes[i]['height']); } }
            for (var b = 0; b < bigLoop; ++b) {
                if (!items.length) break; fitWidth ? (y = b) : (x = b); lastBlock = null; for (var s = 0; s < smallLoop; ++s) {
                    if (!items.length) break; block = null; fitWidth ? (x = s) : (y = s); if (runtime.matrix[y + '-' + x]) continue; freeArea = layoutManager.getFreeArea(y, x, runtime); if (setting.fixSize == null) { if (lastBlock && !fitWidth && runtime.minHoB > freeArea.height) { lastBlock.height += freeArea.height; lastBlock.resize = true; fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height); layoutManager.setBlock(lastBlock, setting); continue; } else if (lastBlock && fitWidth && runtime.minWoB > freeArea.width) { lastBlock.width += freeArea.width; lastBlock.resize = true; fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height); layoutManager.setBlock(lastBlock, setting); continue; } }
                    if (runtime.keepOrder) { block = items.shift(); block.resize = true; } else {
                        for (var i = 0; i < items.length; ++i) { if (items[i].height > freeArea.height) continue; if (items[i].width > freeArea.width) continue; block = items.splice(i, 1)[0]; break; }
                        if (block == null && setting.fixSize == null) { for (var i = 0; i < items.length; ++i) { if (items[i]['fixSize'] != null) continue; block = items.splice(i, 1)[0]; block.resize = true; break; } }
                    }
                    if (block != null) {
                        if (block.resize) {
                            if (fitWidth) {
                                block.width = freeArea.width; if (setting.cellH == 'auto') { layoutManager.adjustBlock(block, setting); }
                                block.height = Math.min(block.height, freeArea.height);
                            } else { block.height = freeArea.height; block.width = Math.min(block.width, freeArea.width); }
                        }
                        wall[block.id] = { id: block.id, x: x, y: y, width: block.width, height: block.height, resize: block.resize, fixSize: block.fixSize }; lastBlock = wall[block.id]; fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height); layoutManager.setBlock(lastBlock, setting);
                    } else {
                        var misBlock = { x: x, y: y, fixSize: 0 }; if (fitWidth) { misBlock.width = freeArea.width; misBlock.height = 0; var lastX = x - 1; var lastY = y; while (matrix[lastY + '-' + lastX]) { matrix[lastY + '-' + x] = true; misBlock.height += 1; lastY += 1; } } else { misBlock.height = freeArea.height; misBlock.width = 0; var lastY = y - 1; var lastX = x; while (matrix[lastY + '-' + lastX]) { matrix[y + '-' + lastX] = true; misBlock.width += 1; lastX += 1; } }
                        setting.onGapFound(layoutManager.setBlock(misBlock, setting), setting);
                    }
                }
            }
            runtime.matrix = matrix; runtime.totalRow = maxY; runtime.totalCol = maxX;
        }
    }; function Freewall(selector) {
        var container = $(selector); if (container.css('position') == 'static') { container.css('position', 'relative'); }
        var MAX = Number.MAX_VALUE; var klass = this; layoutManager.totalGrid += 1; var setting = $.extend({}, layoutManager.defaultConfig); var runtime = { arguments: null, blocks: {}, events: {}, matrix: {}, holes: {}, cellW: 0, cellH: 0, cellS: 1, filter: '', lastId: 0, length: 0, maxWoB: 0, maxHoB: 0, minWoB: MAX, minHoB: MAX, running: 0, gutterX: 15, gutterY: 15, totalCol: 0, totalRow: 0, limitCol: 666666, limitRow: 666666, sortFunc: null, keepOrder: false }; setting.runtime = runtime; runtime.totalGrid = layoutManager.totalGrid; var bodyStyle = document.body.style; if (!layoutManager.transition) { (bodyStyle.webkitTransition != null || bodyStyle.MozTransition != null || bodyStyle.msTransition != null || bodyStyle.OTransition != null || bodyStyle.transition != null) && (layoutManager.transition = true); }
        function setDraggable(item) {
            var gutterX = runtime.gutterX; var gutterY = runtime.gutterY; var cellH = runtime.cellH; var cellW = runtime.cellW; var $item = $(item); var handle = $item.find($item.attr("data-handle")); layoutManager.setDraggable(item, {
                handle: handle[0], onStart: function (event) {
                    if (setting.animate && layoutManager.transition) { layoutManager.setTransition(this, ""); }
                    $item.css('z-index', 9999).addClass('fw-float'); setting.onBlockDrag.call(item, event);
                }, onDrag: function (event, tracker) { var position = $item.position(); var top = Math.round(position.top / cellH); var left = Math.round(position.left / cellW); var width = Math.round($item.width() / cellW); var height = Math.round($item.height() / cellH); top = Math.min(Math.max(0, top), runtime.limitRow - height); left = Math.min(Math.max(0, left), runtime.limitCol - width); klass.setHoles({ top: top, left: left, width: width, height: height }); klass.refresh(); setting.onBlockMove.call(item, event); }, onDrop: function (event) {
                    var position = $item.position(); var top = Math.round(position.top / cellH); var left = Math.round(position.left / cellW); var width = Math.round($item.width() / cellW); var height = Math.round($item.height() / cellH); top = Math.min(Math.max(0, top), runtime.limitRow - height); left = Math.min(Math.max(0, left), runtime.limitCol - width); $item.removeClass('fw-float'); $item.css({ zIndex: "auto", top: top * cellH, left: left * cellW }); var x, y, key, oldDropId; for (y = 0; y < height; ++y) { for (x = 0; x < width; ++x) { key = (y + top) + "-" + (x + left); oldDropId = runtime.matrix[key]; if (oldDropId && oldDropId != true) { $("#" + oldDropId).removeAttr("data-position"); } } }
                    runtime.holes = {}; $item.attr({ "data-width": $item.width(), "data-height": $item.height(), "data-position": top + "-" + left }); klass.refresh(); setting.onBlockDrop.call(item, event);
                }
            });
        }
        $.extend(klass, {
            addCustomEvent: function (name, func) { var events = runtime.events; name = name.toLowerCase(); !events[name] && (events[name] = []); func.eid = events[name].length; events[name].push(func); return this; }, appendBlock: function (items) {
                var allBlock = $(items).appendTo(container); var block = null; var activeBlock = []; if (runtime.arguments) {
                    if ($.isFunction(runtime.sortFunc)) { allBlock.sort(runtime.sortFunc); }
                    allBlock.each(function (index, item) { item.index = ++index; block = layoutManager.loadBlock(item, setting); block && activeBlock.push(block); }); engine[setting.engine](activeBlock, setting); layoutManager.setWallSize(runtime, container); runtime.length = allBlock.length; allBlock.each(function (index, item) { layoutManager.showBlock(item, setting); if (setting.draggable || item.getAttribute('data-draggable')) { setDraggable(item); } });
                }
            }, appendHoles: function (holes) {
                var newHoles = [].concat(holes), h = {}, i; for (i = 0; i < newHoles.length; ++i) { h = newHoles[i]; runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = h; }
                return this;
            }, container: container, destroy: function () { var allBlock = container.find(setting.selector).removeAttr('id'), block = null, activeBlock = []; allBlock.each(function (index, item) { $item = $(item); var width = 1 * $item.attr('data-width') || ""; var height = 1 * $item.attr('data-height') || ""; $item.width(width).height(height).css({ position: 'static' }); }); }, fillHoles: function (holes) {
                if (arguments.length == 0) { runtime.holes = {}; } else { var newHoles = [].concat(holes), h = {}, i; for (i = 0; i < newHoles.length; ++i) { h = newHoles[i]; delete runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height]; } }
                return this;
            }, filter: function (filter) {
                runtime.filter = filter; if (runtime.arguments) { this.refresh(); }
                return this;
            }, fireEvent: function (name, object, setting) {
                var events = runtime.events; name = name.toLowerCase(); if (events[name] && events[name].length) { for (var i = 0; i < events[name].length; ++i) { events[name][i].call(this, object, setting); } }
                return this;
            }, fitHeight: function (height) { var height = height ? height : container.height() || $W.height(); this.fitZone('auto', height); runtime.arguments = arguments; }, fitWidth: function (width) { var width = width ? width : container.width() || $W.width(); this.fitZone(width, 'auto'); runtime.arguments = arguments; }, fitZone: function (width, height) {
                var allBlock = container.find(setting.selector).removeAttr('id'), block = null, activeBlock = []; height = height ? height : container.height() || $W.height(); width = width ? width : container.width() || $W.width(); runtime.arguments = arguments; layoutManager.resetGrid(runtime); layoutManager.adjustUnit(width, height, setting); if (runtime.filter) { allBlock.data('active', 0); allBlock.filter(runtime.filter).data('active', 1); } else { allBlock.data('active', 1); }
                if ($.isFunction(runtime.sortFunc)) { allBlock.sort(runtime.sortFunc); }
                allBlock.each(function (index, item) { var $item = $(item); item.index = ++index; block = layoutManager.loadBlock(item, setting); block && $item.data("active") && activeBlock.push(block); }); klass.fireEvent('onGridReady', container, setting); engine[setting.engine](activeBlock, setting); layoutManager.setWallSize(runtime, container); klass.fireEvent('onGridArrange', container, setting); runtime.length = allBlock.length; allBlock.each(function (index, item) { layoutManager.showBlock(item, setting); if (setting.draggable || item.getAttribute('data-draggable')) { setDraggable(item); } });
            }, fixPos: function (option) { $(option.block).attr({ 'data-position': option.top + "-" + option.left }); return this; }, fixSize: function (option) { option.height != null && $(option.block).attr({ 'data-height': option.height }); option.width != null && $(option.block).attr({ 'data-width': option.width }); return this; }, prepend: function (items) {
                container.prepend(items); if (runtime.arguments) { this.refresh(); }
                return this;
            }, refresh: function () { var params = arguments.length ? arguments : runtime.arguments; var oldArg = runtime.arguments; var method = oldArg ? oldArg.callee : this.fitWidth; method.apply(this, Array.prototype.slice.call(params, 0)); return this; }, reset: function (option) { $.extend(setting, option); return this; }, setHoles: function (holes) {
                var newHoles = [].concat(holes), h = {}, i; runtime.holes = {}; for (i = 0; i < newHoles.length; ++i) { h = newHoles[i]; runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = h; }
                return this;
            }, sortBy: function (func) {
                runtime.sortFunc = func; if (runtime.arguments) { this.refresh(); }
                return this;
            }, unFilter: function () { delete runtime.filter; this.refresh(); return this; }
        }); container.attr('data-min-width', Math.floor($W.width() / 80) * 80); for (var i in layoutManager.plugin) { if (layoutManager.plugin.hasOwnProperty(i)) { layoutManager.plugin[i].call(klass, setting, container); } }
        $W.resize(function () { if (runtime.running) return; runtime.running = 1; setTimeout(function () { runtime.running = 0; setting.onResize.call(klass, container); }, 122); container.attr('data-min-width', Math.floor($W.width() / 80) * 80); });
    }; Freewall.addConfig = function (newConfig) { $.extend(layoutManager.defaultConfig, newConfig); }; Freewall.createEngine = function (engineData) { $.extend(engine, engineData); }; Freewall.createPlugin = function (pluginData) { $.extend(layoutManager.plugin, pluginData); }; Freewall.getMethod = function (method) { return layoutManager[method]; }; window.Freewall = window.freewall = Freewall;
})(window.Zepto || window.jQuery);