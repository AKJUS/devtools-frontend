import * as UI from '../../ui/legacy/legacy.js';
export declare class ConsolePinPane extends UI.Widget.VBox {
    private readonly liveExpressionButton;
    private readonly focusOut;
    private pins;
    private readonly pinsSetting;
    private readonly throttler;
    constructor(liveExpressionButton: UI.Toolbar.ToolbarButton, focusOut: () => void);
    willHide(): void;
    savePins(): void;
    private contextMenuEventFired;
    private removeAllPins;
    removePin(pin: ConsolePinPresenter): void;
    addPin(expression: string, userGesture?: boolean): void;
    private focusedPinAfterDeletion;
    wasShown(): void;
    performUpdate(): Promise<void>;
    private updatedForTest;
}
export declare class ConsolePinPresenter {
    #private;
    private readonly pinPane;
    private readonly focusOut;
    private readonly pinElement;
    private readonly pinPreview;
    private lastResult;
    private lastExecutionContext;
    private editor;
    private committedExpression;
    private hovered;
    private lastNode;
    private deletePinIcon;
    constructor(expression: string, pinPane: ConsolePinPane, focusOut: () => void);
    setHovered(hovered: boolean): void;
    expression(): string;
    element(): Element;
    focus(): Promise<void>;
    appendToContextMenu(contextMenu: UI.ContextMenu.ContextMenu): void;
    updatePreview(): Promise<void>;
}
