/**
 * Parsing of Hindley-Milner types (right now simply System F)
 * into an AST using ParseBox.
 */


import { Static } from "@sinclair/parsebox"
import { Dot, Forall, LParen, RParen, Tilde } from "./consts"

type TyVar = Static.Tuple<[Tilde, Static.Ident]>;

type TyCtor = Static.Tuple<[
	Static.Ident,
	Static.Optional<Static.Tuple<[
		LParen,
		Static.Array<Ty>,
		RParen,
	]>>
]>

type TyForall = Static.Tuple<[
	Forall,
	TyVar,
	Dot,
	Ty,
]>

type Ty = Static.Union<[
	TyCtor,
	TyVar,
	TyForall
]>

type Res = Static.Parse<Ty, '/forall ~a . Fn (Int ~a)'>;

