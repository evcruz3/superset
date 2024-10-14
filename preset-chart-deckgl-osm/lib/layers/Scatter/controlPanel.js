"use strict";

exports.__esModule = true;
exports.default = void 0;
var _core = require("@superset-ui/core");
var _controls = _interopRequireDefault(require("../../utilities/controls"));
var _Shared_DeckGL = require("../../utilities/Shared_DeckGL");
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
var config = {
  onInit: controlState => _extends({}, controlState, {
    time_grain_sqla: _extends({}, controlState.time_grain_sqla, {
      value: null
    }),
    granularity: _extends({}, controlState.granularity, {
      value: null
    })
  }),
  controlPanelSections: [{
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [[_Shared_DeckGL.spatial, null], ['row_limit', _Shared_DeckGL.filterNulls], ['adhoc_filters']]
  },
  // {
  //   label: t('Map'),
  //   expanded: true,
  //   controlSetRows: [[osmStyle], [autozoom, viewport]],
  // },
  {
    label: (0, _core.t)('Map'),
    expanded: true,
    controlSetRows: [[_Shared_DeckGL.osmStyle], [_Shared_DeckGL.autozoom, _Shared_DeckGL.viewport]]
  }, {
    label: (0, _core.t)('Point Size'),
    controlSetRows: [[_Shared_DeckGL.pointRadiusFixed], [{
      name: 'point_unit',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Point Unit'),
        default: 'square_m',
        clearable: false,
        choices: [['square_m', (0, _core.t)('Square meters')], ['square_km', (0, _core.t)('Square kilometers')], ['square_miles', (0, _core.t)('Square miles')], ['radius_m', (0, _core.t)('Radius in meters')], ['radius_km', (0, _core.t)('Radius in kilometers')], ['radius_miles', (0, _core.t)('Radius in miles')]],
        description: (0, _core.t)('The unit of measure for the specified point radius')
      }
    }], [{
      name: 'min_radius',
      config: {
        type: 'TextControl',
        label: (0, _core.t)('Minimum Radius'),
        isFloat: true,
        validators: [_core.validateNonEmpty],
        renderTrigger: true,
        default: 2,
        description: (0, _core.t)('Minimum radius size of the circle, in pixels. As the zoom level changes, this ' + 'insures that the circle respects this minimum radius.')
      }
    }, {
      name: 'max_radius',
      config: {
        type: 'TextControl',
        label: (0, _core.t)('Maximum Radius'),
        isFloat: true,
        validators: [_core.validateNonEmpty],
        renderTrigger: true,
        default: 250,
        description: (0, _core.t)('Maximum radius size of the circle, in pixels. As the zoom level changes, this ' + 'insures that the circle respects this maximum radius.')
      }
    }], [_Shared_DeckGL.multiplier, null]]
  }, {
    label: (0, _core.t)('Point Color'),
    controlSetRows: [['color_picker'], [_Shared_DeckGL.legendPosition], [_Shared_DeckGL.legendFormat], [{
      name: _Shared_DeckGL.dimension.name,
      config: _extends({}, _Shared_DeckGL.dimension.config, {
        label: (0, _core.t)('Categorical Color'),
        description: (0, _core.t)('Pick a dimension from which categorical colors are defined')
      })
    }], ['color_scheme']]
  }, {
    label: (0, _core.t)('Advanced'),
    controlSetRows: [[_Shared_DeckGL.jsColumns], [_Shared_DeckGL.jsDataMutator], [_Shared_DeckGL.jsTooltip], [_Shared_DeckGL.jsOnclickHref]]
  }],
  controlOverrides: {
    size: {
      validators: []
    },
    time_grain_sqla: _controls.default
  }
};
var _default = exports.default = config;