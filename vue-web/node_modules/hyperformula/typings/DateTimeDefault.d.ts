/**
 * @license
 * Copyright (c) 2022 Handsoncode. All rights reserved.
 */
import { DateTime } from './DateTimeHelper';
import { Maybe } from './Maybe';
export declare function defaultParseToDateTime(dateTimeString: string, dateFormat?: string, timeFormat?: string): Maybe<DateTime>;
export declare const secondsExtendedRegexp: RegExp;
