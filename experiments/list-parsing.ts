/**
 * Implementation of ParseBox's "List Parsing" example
 * using `Static`.
 * @link https://github.com/sinclairzx81/parsebox?tab=readme-ov-file#list-parsing
 */

import { Static } from '@sinclair/parsebox'
import { Flatten } from '../src/util'


interface FlattenMapping extends Static.IMapping {
	output: this['input'] extends unknown[]
	? Flatten<this['input']>
	: never
}

type Item = Static.Union<[
	Static.Const<'X'>,
	Static.Const<'Y'>,
	Static.Const<'Z'>,
]>

type List = Static.Union<
	[Static.Tuple<[Item, Static.Optional<List>]>]
	, FlattenMapping
>

type Res = Static.Parse<List, 'X Y Z Y X E'>
