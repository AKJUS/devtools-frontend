// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */

import * as i18n from '../../core/i18n/i18n.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';

import {Events, type OverviewController} from './CSSOverviewController.js';
import cssOverviewProcessingViewStyles from './cssOverviewProcessingView.css.js';

const UIStrings = {
  /**
   *@description Text to cancel something
   */
  cancel: 'Cancel',
} as const;
const str_ = i18n.i18n.registerUIStrings('panels/css_overview/CSSOverviewProcessingView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);

export class CSSOverviewProcessingView extends UI.Widget.Widget {
  readonly #controller: OverviewController;
  fragment?: UI.Fragment.Fragment;
  constructor(controller: OverviewController) {
    super();
    this.registerRequiredCSS(cssOverviewProcessingViewStyles);

    this.#controller = controller;
    this.#render();
  }

  #render(): void {
    const cancelButton = UI.UIUtils.createTextButton(
        i18nString(UIStrings.cancel), () => this.#controller.dispatchEventToListeners(Events.REQUEST_OVERVIEW_CANCEL),
        {jslogContext: 'css-overview.cancel-processing', variant: Buttons.Button.Variant.OUTLINED});
    this.setDefaultFocusedElement(cancelButton);

    this.fragment = UI.Fragment.Fragment.build`
      <div class="vbox overview-processing-view">
        <h1>Processing page</h1>
        <div>${cancelButton}</div>
      </div>
    `;

    this.contentElement.appendChild(this.fragment.element());
    this.contentElement.style.overflow = 'auto';
  }
}
