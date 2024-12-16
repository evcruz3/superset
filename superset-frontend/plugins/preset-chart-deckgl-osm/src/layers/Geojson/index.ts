/**
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
import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import thumbnail from './images/thumbnail.png';
import example from './images/example.png';
import transformProps from '../../transformProps';
import controlPanel from './controlPanel';

const metadata = new ChartMetadata({
  category: t('Map'),
  credits: ['https://uber.github.io/deck.gl'],
  description: t(
    'The GeoJsonLayer takes in GeoJSON formatted data and renders it as interactive polygons, lines and points (circles, icons and/or texts).',
  ),
  exampleGallery: [{ url: example }],
  name: t('deck.gl Geojson OSM'),
  thumbnail,
  useLegacyApi: true,
  tags: [t('deckGL'), t('2D')],
});

export default class GeojsonChartPlugin extends ChartPlugin {
  constructor() {
    super({
      loadChart: () => import('./Geojson'),
      controlPanel,
      metadata,
      transformProps,
    });
  }
}
