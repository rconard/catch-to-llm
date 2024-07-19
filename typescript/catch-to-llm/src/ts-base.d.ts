// catch-to-llm/ts-base.d.ts
/**
 * @module catch-to-llm/ts-base
 * This module extends the base visitor of acorn-walk to support TypeScript-specific AST nodes.
 */

import { RecursiveVisitors, WalkerCallback } from 'acorn-walk';

/**
 * Extends the base RecursiveVisitors interface from acorn-walk to include
 * TypeScript-specific AST node types.
 */
export interface TSRecursiveVisitors extends RecursiveVisitors<any> {
  // TypeScript Specific AST Nodes
  // Each function represents a visitor for a specific TypeScript AST node type.
  // The 'c' parameter is a callback function used to traverse to child nodes.
  TSAbstractAccessorProperty: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSAbstractKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSAbstractMethodDefinition: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSAbstractPropertyDefinition: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSAnyKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSArrayType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSAsExpression: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSAsyncKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSBigIntKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSBooleanKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSCallSignatureDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSClassImplements: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSConditionalType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSConstructorType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSConstructSignatureDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSDeclareFunction: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSDeclareKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSEmptyBodyFunctionExpression: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSEnumDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSEnumMember: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSExportAssignment: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSExportKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSExternalModuleReference: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSFunctionType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSImportEqualsDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSImportType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSIndexedAccessType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSIndexSignature: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSInstantiationExpression: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSInterfaceBody: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSInterfaceDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSInterfaceHeritage: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSInferType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSIntersectionType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSIntrinsicKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSLiteralType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSMappedType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSMethodSignature: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSModuleBlock: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSModuleDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSNamedTupleMember: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSNamespaceExportDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSNeverKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSNonNullExpression: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSNullKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSNumberKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSObjectKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSOptionalType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSParameterProperty: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSPrivateKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSPropertySignature: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSProtectedKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSPublicKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSQualifiedName: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSReadonlyKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSRestType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSSatisfiesExpression: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSStaticKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSStringKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSSymbolKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTemplateLiteralType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSThisType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTupleType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeAliasDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeAnnotation: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeAssertion: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeLiteral: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeOperator: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeParameter: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeParameterDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeParameterInstantiation: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypePredicate: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeQuery: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSTypeReference: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSUndefinedKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSUnionType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSUnknownKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TSVoidKeyword: (node: any, state: any, callback: WalkerCallback<any>) => void;
  // Other TypeScript Specific Nodes
  ClassProperty: (node: any, state: any, callback: WalkerCallback<any>) => void;
  DeclareClass: (node: any, state: any, callback: WalkerCallback<any>) => void;
  DeclareFunction: (node: any, state: any, callback: WalkerCallback<any>) => void;
  DeclareModuleExports: (node: any, state: any, callback: WalkerCallback<any>) => void;
  DeclareTypeAlias: (node: any, state: any, callback: WalkerCallback<any>) => void;
  DeclareVariable: (node: any, state: any, callback: WalkerCallback<any>) => void;
  Import: (node: any, state: any, callback: WalkerCallback<any>) => void;
  InterfaceDeclaration: (node: any, state: any, callback: WalkerCallback<any>) => void;
  OpaqueType: (node: any, state: any, callback: WalkerCallback<any>) => void;
  SpreadProperty: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TypeAlias: (node: any, state: any, callback: WalkerCallback<any>) => void;
  TypeCastExpression: (node: any, state: any, callback: WalkerCallback<any>) => void;
  // Overridden JSX nodes to support nested TypeScript nodes
  JSXClosingElement?: Function;
  JSXClosingFragment?: Function;
  JSXElement?: Function;
  JSXEmptyExpression?: Function;
  JSXExpressionContainer?: Function;
  JSXFragment?: Function;
  JSXIdentifier?: Function;
  JSXMemberExpression?: Function;
  JSXNamespacedName?: Function;
  JSXOpeningElement?: Function;
  JSXOpeningFragment?: Function;
  JSXSpreadChild?: Function;
  JSXText?: Function;
}

/**
 * The extended 'base' visitor which is now capable of traversing TypeScript ASTs.
 */
export declare const base: TSRecursiveVisitors;
