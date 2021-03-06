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

import { by, element, ElementFinder } from 'protractor';
import { BrowserVisibility } from '../../core/utils/browser-visibility';
import { BrowserActions } from '../../core/utils/browser-actions';
import { FormFields } from '../../core/pages/form/form-fields';

export class GroupCloudComponentPage {

    groupCloudSearch: ElementFinder = element(by.css('input[data-automation-id="adf-cloud-group-search-input"]'));
    formFields: FormFields = new FormFields();

    async searchGroups(name: string): Promise<void> {
        await BrowserActions.clearSendKeys(this.groupCloudSearch, name);
    }

    async searchGroupsToExisting(name) {
        await BrowserActions.clearSendKeys(this.groupCloudSearch, name);
    }

    async getGroupsFieldContent(): Promise<string> {
        await BrowserVisibility.waitUntilElementIsVisible(this.groupCloudSearch);
        return this.groupCloudSearch.getAttribute('value');
    }

    async selectGroupFromList(name: string): Promise<void> {
        const groupRow = element.all(by.css(`mat-option[data-automation-id="adf-cloud-group-chip-${name}"]`)).first();

        await BrowserActions.click(groupRow);
        await BrowserVisibility.waitUntilElementIsNotVisible(groupRow);
    }

    async checkGroupIsDisplayed(name: string): Promise<void> {
        const groupRow = element.all(by.css(`mat-option[data-automation-id="adf-cloud-group-chip-${name}"]`)).first();
        await BrowserVisibility.waitUntilElementIsVisible(groupRow);
    }

    async checkGroupIsNotDisplayed(name: string): Promise<void> {
        const groupRow = element.all(by.css(`mat-option[data-automation-id="adf-cloud-group-chip-${name}"]`)).first();
        await BrowserVisibility.waitUntilElementIsNotVisible(groupRow);
    }

    async checkSelectedGroup(group: string): Promise<void> {
        await BrowserVisibility.waitUntilElementIsVisible(element(by.cssContainingText('mat-chip[data-automation-id*="adf-cloud-group-chip-"]', group)));
    }

    async checkGroupNotSelected(group: string): Promise<void> {
        await BrowserVisibility.waitUntilElementIsNotVisible(element(by.cssContainingText('mat-chip[data-automation-id*="adf-cloud-group-chip-"]', group)));
    }

    async removeSelectedGroup(group: string): Promise<void> {
        const locator = element(by.css(`mat-chip[data-automation-id*="adf-cloud-group-chip-${group}"] mat-icon`));
        await BrowserActions.click(locator);
    }

    async isGroupWidgetVisible(fieldId: string): Promise<boolean> {
        try {
            await this.formFields.checkWidgetIsVisible(fieldId);
            return true;
        } catch {
            return false;
        }
    }

    async checkGroupWidgetIsReadOnly (): Promise <boolean> {
        const readOnlyGroup = element(by.css('group-cloud-widget .adf-readonly'));
        try {
            await BrowserVisibility.waitUntilElementIsVisible(readOnlyGroup);
            return true;
        } catch {
            return false;
        }
    }

    async checkGroupActiveField(name): Promise <boolean> {
        const activeGroupField = element(by.css('group-cloud-widget .adf-readonly'));
        try {
            await BrowserActions.clearSendKeys(activeGroupField, name);
            return true;
        } catch {
            return false;
        }
    }

    async checkNoResultsFoundError(): Promise<void> {
        const errorLocator = element(by.css('[data-automation-id="adf-cloud-group-no-results"]'));
        await BrowserVisibility.waitUntilElementIsVisible(errorLocator);
    }

}
