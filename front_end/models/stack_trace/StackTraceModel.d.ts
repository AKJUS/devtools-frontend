import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as StackTrace from './stack_trace.js';
import { FrameKind, type FunctionKeys, type RawFrame } from './Trie.js';
/** Named `TranslatedUIFrame` to avoid confusion with `SDK.SourceMapScopesInfo.TranslatedFrame`. */
export type TranslatedUIFrame = Pick<StackTrace.StackTrace.Frame, 'url' | 'uiSourceCode' | 'name' | 'line' | 'column' | 'missingDebugInfo'>;
/**
 * The translation of a single {@link RawFrame}. `frames` is [top, ...inlinedCallers] in top-to-bottom order. It MUST
 * NOT be empty for VISIBLE and OUTLINED.
 */
export type TranslatedRawFrame = {
    readonly kind: FrameKind.HIDDEN;
    readonly frames: readonly [];
} | {
    readonly kind: FrameKind.VISIBLE;
    readonly frames: TranslatedUIFrame[];
    /** Makes the frame eligible to end an outlined chain. */
    readonly functionKeys?: FunctionKeys;
} | {
    readonly kind: FrameKind.OUTLINED;
    readonly frames: TranslatedUIFrame[];
    readonly functionKeys: FunctionKeys;
};
/**
 * A stack trace translation function.
 *
 * Any implementation must return an array with the same length as `frames`.
 */
export type TranslateRawFrames = (frames: readonly RawFrame[], target: SDK.Target.Target) => Promise<TranslatedRawFrame[]>;
/**
 * The {@link StackTraceModel} is a thin wrapper around a fragment trie.
 *
 * We want to store stack trace fragments per target so a SDKModel is the natural choice.
 */
export declare class StackTraceModel extends SDK.SDKModel.SDKModel<unknown> {
    #private;
    createFromProtocolRuntime(stackTrace: Protocol.Runtime.StackTrace, rawFramesToUIFrames: TranslateRawFrames): Promise<StackTrace.StackTrace.StackTrace>;
    createFromErrorStackLikeString(stack: string, rawFramesToUIFrames: TranslateRawFrames, exceptionDetails?: Protocol.Runtime.ExceptionDetails): Promise<StackTrace.StackTrace.ParsedErrorStackTrace | null>;
    createFromDebuggerPaused(pausedDetails: SDK.DebuggerModel.DebuggerPausedDetails, rawFramesToUIFrames: TranslateRawFrames): Promise<StackTrace.StackTrace.DebuggableStackTrace>;
    /** Trigger re-translation of all fragments with the provide script in their call stack */
    scriptInfoChanged(script: SDK.Script.Script, translateRawFrames: TranslateRawFrames): Promise<void>;
}
