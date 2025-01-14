/**
 * Utilities for type-valued programming.
 */

/**
 * Flattens arbitrarily nested lists.
 */
export type Flatten<Right extends unknown[], Left extends unknown[] = []> =
	Right extends [infer Head, ...infer Tail extends unknown[]]
	? Head extends unknown[]
	? Flatten<Tail, [...Left, ...Flatten<Head>]>
	: Flatten<Tail, [...Left, Head]>
	: Left

/**
 * Alias for `unknown`; useful for tuple unpacking
 * @example [_, infer A]
 */
export type _ = unknown
