"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.getLayer = getLayer;
var _aggregationLayers = require("@deck.gl/aggregation-layers");
var _core = require("@superset-ui/core");
var _common = require("../common");
var _sandbox = _interopRequireDefault(require("../../utils/sandbox"));
var _colors = require("../../utils/colors");
var _factory = require("../../factory");
var _TooltipRow = _interopRequireDefault(require("../../TooltipRow"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function setTooltipContent(o) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "deckgl-tooltip",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
      label: (0, _core.t)('Centroid (Longitude and Latitude): '),
      value: "(" + o.coordinate[0] + ", " + o.coordinate[1] + ")"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default
    // eslint-disable-next-line prefer-template
    , {
      label: (0, _core.t)('Height') + ': ',
      value: "" + o.object.elevationValue
    })]
  });
}
function getLayer(formData, payload, onAddFilter, setTooltip) {
  var fd = formData;
  var colorScale = _core.CategoricalColorNamespace.getScale(fd.color_scheme);
  var colorRange = colorScale.range().map(color => (0, _colors.hexToRGB)(color));
  var data = payload.data.features;
  if (fd.js_data_mutator) {
    // Applying user defined data mutator if defined
    var jsFnMutator = (0, _sandbox.default)(fd.js_data_mutator);
    data = jsFnMutator(data);
  }
  var aggFunc = (0, _common.getAggFunc)(fd.js_agg_function, p => p == null ? void 0 : p.weight);
  return new _aggregationLayers.HexagonLayer(_extends({
    id: "hex-layer-" + fd.slice_id,
    data,
    radius: fd.grid_size,
    extruded: fd.extruded,
    colorRange,
    outline: false,
    // @ts-ignore
    getElevationValue: aggFunc,
    // @ts-ignore
    getColorValue: aggFunc
  }, (0, _common.commonLayerProps)(fd, setTooltip, setTooltipContent)));
}
function getPoints(data) {
  return data.map(d => d.position);
}
var _default = exports.default = (0, _factory.createDeckGLComponent)(getLayer, getPoints);