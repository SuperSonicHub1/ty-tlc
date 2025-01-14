/**
 * Common library of tokens used for parsing.
 */

import { Static } from "@sinclair/parsebox"

export type LParen = Static.Const<'('>
export type RParen = Static.Const<')'>
export type Slash = Static.Const<'/'>
export type Arrow = Static.Const<'->'>
export type LetK = Static.Const<'let'>
export type In = Static.Const<'in'>
export type Equals = Static.Const<'='>
export type Forall = Static.Const<'/forall'>
export type Dot = Static.Const<'.'>
export type Tilde = Static.Const<'~'>
