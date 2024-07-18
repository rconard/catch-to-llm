// catch-to-llm/ts-base.ts
/**
 * @module catch-to-llm/ts-base
 * This module extends the base visitor of acorn-walk to support TypeScript-specific AST nodes.
 */

import { base, RecursiveVisitors, WalkerCallback } from 'acorn-walk';

// Refer to the TypeScript ESLint project for an enumeration of typescript AST nodes:
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/ast-spec/src/ast-node-types.ts

/**
 * @interface TSRecursiveVisitors
 * Extends the base RecursiveVisitors interface from acorn-walk to include
 * TypeScript-specific AST node types.
 */
interface TSRecursiveVisitors extends RecursiveVisitors<any> {
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

// Helper functions for common visitor patterns

/**
 * @function skipThrough
 * Continues traversal to the child nodes of the current node.
 * @param {any} node The current AST node.
 * @param {any} st The walker's state.
 * @param {WalkerCallback<any>} c The callback to visit child nodes.
 */
const skipThrough = (node: any, st: any, c: WalkerCallback<any>) => c(node, st);

/**
 * @function ignore
 * Does nothing, effectively skipping the current node and its children.
 * @param {any} _node The current AST node (unused).
 * @param {any} _st The walker's state (unused).
 * @param {WalkerCallback<any>} _c The callback to visit child nodes (unused).
 */
const ignore = (_node: any, _st: any, _c: WalkerCallback<any>) => {};

// Extend the base visitor with TypeScript-specific node visitors.
// Each visitor function handles a specific TypeScript AST node type,
// ensuring that the walker can traverse the entire TypeScript AST.

(base as TSRecursiveVisitors).ClassProperty = (node, st, c) => {
  c(node.key, st); // Visit the property key.
  if (node.value) {
    c(node.value, st); // Visit the property value if it exists.
  }
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st); // Visit the type annotation if it exists.
  }
};

(base as TSRecursiveVisitors).DeclareClass = (node, st, c) => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  if (node.extends) {
    node.extends.forEach((ext: any) => c(ext, st));
  }
  c(node.body, st);
};

(base as TSRecursiveVisitors).DeclareFunction = (node, st, c) => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  if (node.returnType) {
    c(node.returnType, st);
  }
};

(base as TSRecursiveVisitors).DeclareModuleExports = (node, st, c) => {
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).DeclareTypeAlias = (node, st, c) => {
  c(node.id, st); // Visit the type alias identifier.
  if (node.typeParameters) {
    c(node.typeParameters, st); // Visit any type parameters.
  }
  c(node.right, st); // Visit the type assigned to the alias.
};

(base as TSRecursiveVisitors).DeclareVariable = (node, st, c) => {
  c(node.id, st);
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st);
  }
};

(base as TSRecursiveVisitors).Import = ignore;

(base as TSRecursiveVisitors).InterfaceDeclaration = (node, st, c) => {
  c(node.id, st); // Visit the interface identifier.
  if (node.typeParameters) {
    c(node.typeParameters, st); // Visit any type parameters.
  }
  if (node.extends) {
    node.extends.forEach((ext: any) => c(ext, st)); // Visit any extended interfaces.
  }
  c(node.body, st); // Visit the interface body.
};

(base as TSRecursiveVisitors).OpaqueType = (node, st, c) => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  c(node.impltype, st);
  c(node.supertype, st);
};

(base as TSRecursiveVisitors).SpreadProperty = (node, st, c) => {
  c(node.argument, st); // Visit the expression being spread.
};

(base as TSRecursiveVisitors).TSAbstractAccessorProperty = (node, st, c) => {
  c(node.key, st);
  if (node.value) {
    c(node.value, st);
  }
};

(base as TSRecursiveVisitors).TSAbstractKeyword = ignore;

(base as TSRecursiveVisitors).TSAbstractMethodDefinition = (node, st, c) => {
  if (node.decorators) {
    node.decorators.forEach((d: any) => c(d, st)); // Visit any decorators.
  }
  c(node.key, st); // Visit the method name.
  if (node.value) {
    c(node.value, st); // Visit the method body if it exists.
  }
};

(base as TSRecursiveVisitors).TSAbstractPropertyDefinition = (node, st, c) => {
  c(node.key, st);
  if (node.value) {
    c(node.value, st);
  }
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st);
  }
};

(base as TSRecursiveVisitors).TSAnyKeyword = ignore;

(base as TSRecursiveVisitors).TSArrayType = (node, st, c) => {
  c(node.elementType, st);
};

(base as TSRecursiveVisitors).TSAsExpression = (node, st, c) => {
  c(node.expression, st); // Visit the expression being asserted.
  c(node.typeAnnotation, st); // Visit the target type annotation.
};

(base as TSRecursiveVisitors).TSAsyncKeyword = ignore;

(base as TSRecursiveVisitors).TSBigIntKeyword = ignore;

(base as TSRecursiveVisitors).TSBooleanKeyword = ignore;

(base as TSRecursiveVisitors).TSCallSignatureDeclaration = (node, st, c) => {
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  if (node.returnType) {
    c(node.returnType, st);
  }
};

(base as TSRecursiveVisitors).TSClassImplements = (node, st, c) => {
  c(node.expression, st);
};

(base as TSRecursiveVisitors).TSConditionalType = (node, st, c) => {
  c(node.checkType, st);
  c(node.extendsType, st);
  c(node.trueType, st);
  c(node.falseType, st);
};

(base as TSRecursiveVisitors).TSConstructorType = (node, st, c) => {
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  c(node.returnType, st);
};

(base as TSRecursiveVisitors).TSConstructSignatureDeclaration = (node, st, c) => {
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  if (node.returnType) {
    c(node.returnType, st);
  }
};

(base as TSRecursiveVisitors).TSDeclareFunction = (node, st, c) => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st)); // Visit each function parameter.
  if (node.returnType) {
    c(node.returnType, st); // Visit the return type annotation if it exists.
  }
};

(base as TSRecursiveVisitors).TSDeclareKeyword = ignore;

(base as TSRecursiveVisitors).TSEmptyBodyFunctionExpression = (node, st, c) => {
  c(node, st);
};

(base as TSRecursiveVisitors).TSEnumDeclaration = (node, st, c) => {
  c(node.id, st); // Visit the enum identifier.
  node.members.forEach((member: any) => c(member, st)); // Visit each enum member.
};

(base as TSRecursiveVisitors).TSEnumMember = (node, st, c) => {
  c(node.id, st);
  if (node.initializer) {
    c(node.initializer, st);
  }
};

(base as TSRecursiveVisitors).TSExportAssignment = (node, st, c) => {
  c(node.expression, st); // Visit the expression being exported.
};

(base as TSRecursiveVisitors).TSExportKeyword = ignore;

(base as TSRecursiveVisitors).TSExternalModuleReference = (node, st, c) => {
  c(node.expression, st);
};

(base as TSRecursiveVisitors).TSFunctionType = (node, st, c) => {
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  c(node.returnType, st);
};

(base as TSRecursiveVisitors).TSImportEqualsDeclaration = (node, st, c) => {
  c(node.id, st); // Visit the alias identifier.
  c(node.moduleReference, st); // Visit the module reference.
};

(base as TSRecursiveVisitors).TSImportType = (node, st, c) => {
  c(node.parameter, st);
  if (node.qualifier) {
    c(node.qualifier, st);
  }
  if (node.typeArguments) {
    c(node.typeArguments, st);
  }
};

(base as TSRecursiveVisitors).TSIndexedAccessType = (node, st, c) => {
  c(node.objectType, st);
  c(node.indexType, st);
};

(base as TSRecursiveVisitors).TSIndexSignature = (node, st, c) => {
  node.parameters.forEach((param: any) => c(param, st)); // Visit each parameter of the index signature.
  c(node.typeAnnotation, st); // Visit the type annotation of the index signature.
};

(base as TSRecursiveVisitors).TSInstantiationExpression = (node, st, c) => {
  c(node.expression, st);
  c(node.typeArguments, st);
};

(base as TSRecursiveVisitors).TSInterfaceBody = (node, st, c) => {
  node.body.forEach((member: any) => c(member, st));
};

(base as TSRecursiveVisitors).TSInterfaceDeclaration = (node, st, c) => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  if (node.extends) {
    node.extends.forEach((ext: any) => c(ext, st));
  }
  c(node.body, st);
};

(base as TSRecursiveVisitors).TSInterfaceHeritage = (node, st, c) => {
  c(node.expression, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
};

(base as TSRecursiveVisitors).TSInferType = (node, st, c) => {
  c(node.typeParameter, st);
};

(base as TSRecursiveVisitors).TSIntersectionType = (node, st, c) => {
  node.types.forEach((type: any) => c(type, st));
};

(base as TSRecursiveVisitors).TSIntrinsicKeyword = ignore;

(base as TSRecursiveVisitors).TSLiteralType = (node, st, c) => {
  c(node.literal, st);
};

(base as TSRecursiveVisitors).TSMappedType = (node, st, c) => {
  if (node.typeParameter) {
    c(node.typeParameter, st);
  }
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st);
  }
};

(base as TSRecursiveVisitors).TSMethodSignature = (node, st, c) => {
  c(node.key, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  if (node.returnType) {
    c(node.returnType, st);
  }
};

(base as TSRecursiveVisitors).TSModuleBlock = (node, st, c) => {
  node.body.forEach((stmt: any) => c(stmt, st));
};

(base as TSRecursiveVisitors).TSModuleDeclaration = (node, st, c) => {
  if (node.id) {
    c(node.id, st); // Visit the module identifier if it exists.
  }
  if (node.body) {
    c(node.body, st); // Visit the module body if it exists.
  }
};

(base as TSRecursiveVisitors).TSNamedTupleMember = (node, st, c) => {
  c(node.label, st);
  if (node.elementType) {
    c(node.elementType, st);
  }
};

(base as TSRecursiveVisitors).TSNamespaceExportDeclaration = (node, st, c) => {
  c(node.id, st);
};

(base as TSRecursiveVisitors).TSNeverKeyword = ignore;

(base as TSRecursiveVisitors).TSNonNullExpression = (node, st, c) => {
  c(node.expression, st); // Visit the expression being asserted as non-null.
};

(base as TSRecursiveVisitors).TSNullKeyword = ignore;

(base as TSRecursiveVisitors).TSNumberKeyword = ignore;

(base as TSRecursiveVisitors).TSObjectKeyword = ignore;

(base as TSRecursiveVisitors).TSOptionalType = (node, st, c) => {
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).TSParameterProperty = (node, st, c) => {
  c(node.parameter, st); // Visit the parameter declaration.
};

(base as TSRecursiveVisitors).TSPrivateKeyword = ignore;

(base as TSRecursiveVisitors).TSPropertySignature = (node, st, c) => {
  c(node.key, st);
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st);
  }
};

(base as TSRecursiveVisitors).TSProtectedKeyword = ignore;

(base as TSRecursiveVisitors).TSPublicKeyword = ignore;

(base as TSRecursiveVisitors).TSQualifiedName = (node, st, c) => {
  c(node.left, st);
  c(node.right, st);
};

(base as TSRecursiveVisitors).TSReadonlyKeyword = ignore;

(base as TSRecursiveVisitors).TSRestType = (node, st, c) => {
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).TSSatisfiesExpression = (node, st, c) => {
  c(node.expression, st);
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).TSStaticKeyword = ignore;

(base as TSRecursiveVisitors).TSStringKeyword = ignore;

(base as TSRecursiveVisitors).TSSymbolKeyword = ignore;

(base as TSRecursiveVisitors).TSTemplateLiteralType = (node, st, c) => {
  node.quasis.forEach((quasi: any) => c(quasi, st));
  node.types.forEach((type: any) => c(type, st));
};

(base as TSRecursiveVisitors).TSThisType = ignore;

(base as TSRecursiveVisitors).TSTupleType = (node, st, c) => {
  node.elementTypes.forEach((elementType: any) => c(elementType, st));
};

(base as TSRecursiveVisitors).TSTypeAliasDeclaration = (node, st, c) => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).TSTypeAnnotation = (node, st, c) => {
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).TSTypeAssertion = (node, st, c) => {
  c(node.typeAnnotation, st);
  c(node.expression, st);
};

(base as TSRecursiveVisitors).TSTypeLiteral = (node, st, c) => {
  node.members.forEach((member: any) => c(member, st));
};

(base as TSRecursiveVisitors).TSTypeOperator = (node, st, c) => {
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).TSTypeParameter = (node, st, c) => {
  c(node.name, st);
  if (node.constraint) {
    c(node.constraint, st);
  }
  if (node.default) {
    c(node.default, st);
  }
};

(base as TSRecursiveVisitors).TSTypeParameterDeclaration = (node, st, c) => {
  node.params.forEach((param: any) => c(param, st));
};

(base as TSRecursiveVisitors).TSTypeParameterInstantiation = (node, st, c) => {
  node.params.forEach((param: any) => c(param, st));
};

(base as TSRecursiveVisitors).TSTypePredicate = (node, st, c) => {
  if (node.parameterName) {
    c(node.parameterName, st);
  }
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).TSTypeQuery = (node, st, c) => {
  c(node.exprName, st);
};

(base as TSRecursiveVisitors).TSTypeReference = (node, st, c) => {
  c(node.typeName, st);
  if (node.typeArguments) {
    c(node.typeArguments, st);
  }
};

(base as TSRecursiveVisitors).TSUndefinedKeyword = ignore;

(base as TSRecursiveVisitors).TSUnionType = (node, st, c) => {
  node.types.forEach((type: any) => c(type, st));
};

(base as TSRecursiveVisitors).TSUnknownKeyword = ignore;

(base as TSRecursiveVisitors).TSVoidKeyword = ignore;

(base as TSRecursiveVisitors).TypeAlias = (node, st, c) => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  c(node.right, st);
};

(base as TSRecursiveVisitors).TypeCastExpression = (node, st, c) => {
  c(node.expression, st); // Visit the expression being cast.
  c(node.typeAnnotation, st); // Visit the target type annotation.
};

// Overriding existing visitors to support potentially nested TypeScript nodes within JSX
(base as TSRecursiveVisitors).JSXElement = (node, st, c) => {
  c(node.openingElement, st);
  node.children.forEach((child: any) => c(child, st));
  if (node.closingElement) {
    c(node.closingElement, st);
  }
};

(base as TSRecursiveVisitors).JSXFragment = (node, st, c) => {
  c(node.openingFragment, st);
  node.children.forEach((child: any) => c(child, st));
  c(node.closingFragment, st);
};

(base as TSRecursiveVisitors).JSXOpeningElement = (node, st, c) => {
  c(node.name, st);
  node.attributes.forEach((attr: any) => c(attr, st));
};

(base as TSRecursiveVisitors).JSXClosingElement = (node, st, c) => {
  c(node.name, st);
};

(base as TSRecursiveVisitors).JSXIdentifier = skipThrough;

(base as TSRecursiveVisitors).JSXMemberExpression = (node, st, c) => {
  c(node.object, st);
  c(node.property, st);
};

(base as TSRecursiveVisitors).JSXNamespacedName = (node, st, c) => {
  c(node.namespace, st);
  c(node.name, st);
};

(base as TSRecursiveVisitors).JSXEmptyExpression = ignore;

(base as TSRecursiveVisitors).JSXExpressionContainer = (node, st, c) => {
  c(node.expression, st);
};

(base as TSRecursiveVisitors).JSXSpreadChild = (node, st, c) => {
  c(node.expression, st);
};

(base as TSRecursiveVisitors).JSXText = ignore;

(base as TSRecursiveVisitors).JSXOpeningFragment = ignore;

(base as TSRecursiveVisitors).JSXClosingFragment = ignore;

// Export the extended 'base' visitor which is now capable of traversing TypeScript ASTs.
export { base };
