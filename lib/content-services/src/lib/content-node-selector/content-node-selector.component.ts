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

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslationService } from '@alfresco/adf-core';
import { Node } from '@alfresco/js-api';
import { ContentNodeSelectorComponentData } from './content-node-selector.component-data.interface';

@Component({
    selector: 'adf-content-node-selector',
    templateUrl: './content-node-selector.component.html',
    styleUrls: ['./content-node-selector.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentNodeSelectorComponent {

    title: string;
    action: string;
    buttonActionName: string;
    chosenNode: Node[];

    constructor(public translation: TranslationService,
                @Inject(MAT_DIALOG_DATA) public data: ContentNodeSelectorComponentData) {
        this.action = data.actionName ? data.actionName.toUpperCase() : 'CHOOSE';
        this.buttonActionName = `NODE_SELECTOR.${this.action}`;
        this.title = data.title;
    }

    close() {
        this.data.select.complete();
    }

    onSelect(nodeList: Node[]) {
        this.chosenNode = nodeList;
        this.updateTitle(nodeList);
    }

    onClick(): void {
        this.data.select.next(this.chosenNode);
        this.data.select.complete();
    }

    updateTitle(nodeList: Node[]): void {
        if (this.action === 'CHOOSE' && nodeList) {
            this.title = this.getTitleTranslation(this.action, nodeList[0].name);
        }
    }

    getTitleTranslation(action: string, name: string): string {
        return this.translation.instant(`NODE_SELECTOR.${action}_ITEM`, { name });
    }
}
