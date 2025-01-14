/**
 * Parsing of untyped lambda calculus into an AST using ParseBox.
 */

import { Static } from '@sinclair/parsebox'
import { _ } from './util'
import { LParen, Slash, Arrow, RParen, Equals, In, LetK } from './consts'

enum ExprNodeType {
	Abstraction,
	Application,
	Variable,
	Let
}

type VariableNode = { type: ExprNodeType.Variable, name: string }
type AbstractionNode = { type: ExprNodeType.Abstraction, argument: VariableNode, body: ExprNode }
type ApplicationNode = { type: ExprNodeType.Application, function: ExprNode, argument: ExprNode }
type LetNode = { type: ExprNodeType.Let, name: VariableNode, expr: ExprNode, body: ExprNode }
type ExprNode = VariableNode
	| AbstractionNode
	| ApplicationNode
	| LetNode;

interface VariableMapping extends Static.IMapping {
	output: this['input'] extends [infer Name]
		? { type: ExprNodeType.Variable, name: Name }
		: never
}
type Variable = Static.Tuple<[Static.Ident], VariableMapping>;

interface AbstractionMapping extends Static.IMapping {
	output: this['input'] extends [_, _, infer Argument, _, infer Body, _]
		? { type: ExprNodeType.Abstraction, argument: Argument, body: Body }
		: never
}
type Abstraction = Static.Tuple<[
	LParen,
	Slash,
	Variable,
	Arrow,
	Expr,
	RParen,
], AbstractionMapping>

interface ApplicationMapping extends Static.IMapping {
	output: this['input'] extends [_, infer Function, infer Argument, _]
		? { type: ExprNodeType.Application, function: Function, argument: Argument }
		: never
}
type Application = Static.Tuple<[
	LParen,
	Expr,
	Expr,
	RParen,
], ApplicationMapping>

interface LetMapping extends Static.IMapping {
	output: this['input'] extends [_, infer Variable, _, infer Expr, _, infer Body]
		? { type: ExprNodeType.Let, name: Variable, expr: Expr, body: Body }
		: never
}
type Let = Static.Tuple<[
	LetK,
	Variable,
	Equals,
	Expr,
	In,
	Expr,
], LetMapping>

type Expr = Static.Union<[
	// TODO: Make keywords not be valid idents LOL
	Let,
	Abstraction,
	Application,
	Variable,
]>

type FreeVariables<E extends ExprNode> = E extends VariableNode
	? E['name']
	: E extends AbstractionNode
	? Exclude<FreeVariables<E['body']>, E['argument']['name']>
	: E extends ApplicationNode
	? FreeVariables<E['function']> | FreeVariables<E['argument']>
	: E extends LetNode
	? Exclude<FreeVariables<E['expr']>, E['name']['name']> | FreeVariables<E['body']>
	: never

type Res = Static.Parse<Expr, 'let j = ((/x -> (/y -> z)) x) in k'>[0];
type Free = FreeVariables<Res>;
