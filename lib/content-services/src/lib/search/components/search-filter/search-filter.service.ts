/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable, Type } from '@angular/core';
import { SearchTextComponent } from '../search-text/search-text.component';
import { SearchRadioComponent } from '../search-radio/search-radio.component';
import { SearchSliderComponent } from '../search-slider/search-slider.component';
import { SearchNumberRangeComponent } from '../search-number-range/search-number-range.component';
import { SearchCheckListComponent } from '../search-check-list/search-check-list.component';
import { SearchDateRangeComponent } from '../search-date-range/search-date-range.component';

@Injectable({
    providedIn: 'root'
})
export class SearchFilterService {

    /**
     * Contains string-to-type mappings for registered widgets.
     */
    widgets: { [id: string]: Type<{}> } = {
        'text': SearchTextComponent,
        'radio': SearchRadioComponent,
        'slider': SearchSliderComponent,
        'number-range': SearchNumberRangeComponent,
        'check-list': SearchCheckListComponent,
        'date-range': SearchDateRangeComponent
    };

}