// catch-to-llm/ts-base.ts
/**
 * @module catch-to-llm/ts-base
 * This module extends the base visitor of acorn-walk to support TypeScript-specific AST nodes.
 */

import { base, RecursiveVisitors, WalkerCallback } from 'acorn-walk';
import { TSRecursiveVisitors } from './ts-base.d';

// Refer to the TypeScript ESLint project for an enumeration of typescript AST nodes:
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/ast-spec/src/ast-node-types.ts

// Helper functions for common visitor patterns

/**
 * @function skipThrough
 * Continues traversal to the child nodes of the current node.
 * @param {any} node The current AST node.
 * @param {any} st The walker's state.
 * @param {WalkerCallback<any>} c The callback to visit child nodes.
 */
const skipThrough = (node: any, st: any, c: WalkerCallback<any>): void => c(node, st);

/**
 * @function ignore
 * Does nothing, effectively skipping the current node and its children.
 * @param {any} _node The current AST node (unused).
 * @param {any} _st The walker's state (unused).
 * @param {WalkerCallback<any>} _c The callback to visit child nodes (unused).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ignore = (_node: any, _st: any, _c: WalkerCallback<any>): void => {};

// Extend the base visitor with TypeScript-specific node visitors.
// Each visitor function handles a specific TypeScript AST node type,
// ensuring that the walker can traverse the entire TypeScript AST.

(base as TSRecursiveVisitors).ClassProperty = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.key, st); // Visit the property key.
  if (node.value) {
    c(node.value, st); // Visit the property value if it exists.
  }
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st); // Visit the type annotation if it exists.
  }
};

(base as TSRecursiveVisitors).DeclareClass = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  if (node.extends) {
    node.extends.forEach((ext: any) => c(ext, st));
  }
  c(node.body, st);
};

(base as TSRecursiveVisitors).DeclareFunction = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  if (node.returnType) {
    c(node.returnType, st);
  }
};

(base as TSRecursiveVisitors).DeclareModuleExports = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.typeAnnotation, st);
};

(base as TSRecursiveVisitors).DeclareTypeAlias = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st); // Visit the type alias identifier.
  if (node.typeParameters) {
    c(node.typeParameters, st); // Visit any type parameters.
  }
  c(node.right, st); // Visit the type assigned to the alias.
};

(base as TSRecursiveVisitors).DeclareVariable = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st);
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st);
  }
};

(base as TSRecursiveVisitors).Import = ignore;

(base as TSRecursiveVisitors).InterfaceDeclaration = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st); // Visit the interface identifier.
  if (node.typeParameters) {
    c(node.typeParameters, st); // Visit any type parameters.
  }
  if (node.extends) {
    node.extends.forEach((ext: any) => c(ext, st)); // Visit any extended interfaces.
  }
  c(node.body, st); // Visit the interface body.
};

(base as TSRecursiveVisitors).OpaqueType = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  c(node.impltype, st);
  c(node.supertype, st);
};

(base as TSRecursiveVisitors).SpreadProperty = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.argument, st); // Visit the expression being spread.
};

(base as TSRecursiveVisitors).TSAbstractAccessorProperty = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.key, st);
  if (node.value) {
    c(node.value, st);
  }
};

(base as TSRecursiveVisitors).TSAbstractKeyword = ignore;

(base as TSRecursiveVisitors).TSAbstractMethodDefinition = (node: any, st: any, c: WalkerCallback<any>): void => {
  if (node.decorators) {
    node.decorators.forEach((d: any) => c(d, st)); // Visit any decorators.
  }
  c(node.key, st); // Visit the method name.
  if (node.value) {
    c(node.value, st); // Visit the method body if it exists.
  }
};

(base as TSRecursiveVisitors).TSAbstractPropertyDefinition = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.key, st);
  if (node.value) {
    c(node.value, st);
  }
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st);
  }
};

(base as TSRecursiveVisitors).TSAnyKeyword = ignore;

(base as TSRecursiveVisitors).TSArrayType = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.elementType, st);
};

(base as TSRecursiveVisitors).TSAsExpression = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.expression, st); // Visit the expression being asserted.
  c(node.typeAnnotation, st); // Visit the target type annotation.
};

(base as TSRecursiveVisitors).TSAsyncKeyword = ignore;

(base as TSRecursiveVisitors).TSBigIntKeyword = ignore;

(base as TSRecursiveVisitors).TSBooleanKeyword = ignore;

(base as TSRecursiveVisitors).TSCallSignatureDeclaration = (node: any, st: any, c: WalkerCallback<any>): void => {
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  if (node.returnType) {
    c(node.returnType, st);
  }
};

(base as TSRecursiveVisitors).TSClassImplements = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.expression, st);
};

(base as TSRecursiveVisitors).TSConditionalType = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.checkType, st);
  c(node.extendsType, st);
  c(node.trueType, st);
  c(node.falseType, st);
};

(base as TSRecursiveVisitors).TSConstructorType = (node: any, st: any, c: WalkerCallback<any>): void => {
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  c(node.returnType, st);
};

(base as TSRecursiveVisitors).TSConstructSignatureDeclaration = (
  node: any,
  st: any,
  c: WalkerCallback<any>
): void => {
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  if (node.returnType) {
    c(node.returnType, st);
  }
};

(base as TSRecursiveVisitors).TSDeclareFunction = (node: any, st: any, c: WalkerCallback<any>): void => {
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

(base as TSRecursiveVisitors).TSEmptyBodyFunctionExpression = (
  node: any,
  st: any,
  c: WalkerCallback<any>
): void => {
  c(node, st);
};

(base as TSRecursiveVisitors).TSEnumDeclaration = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st); // Visit the enum identifier.
  node.members.forEach((member: any) => c(member, st)); // Visit each enum member.
};

(base as TSRecursiveVisitors).TSEnumMember = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st);
  if (node.initializer) {
    c(node.initializer, st);
  }
};

(base as TSRecursiveVisitors).TSExportAssignment = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.expression, st); // Visit the expression being exported.
};

(base as TSRecursiveVisitors).TSExportKeyword = ignore;

(base as TSRecursiveVisitors).TSExternalModuleReference = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.expression, st);
};

(base as TSRecursiveVisitors).TSFunctionType = (node: any, st: any, c: WalkerCallback<any>): void => {
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  c(node.returnType, st);
};

(base as TSRecursiveVisitors).TSImportEqualsDeclaration = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st); // Visit the alias identifier.
  c(node.moduleReference, st); // Visit the module reference.
};

(base as TSRecursiveVisitors).TSImportType = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.parameter, st);
  if (node.qualifier) {
    c(node.qualifier, st);
  }
  if (node.typeArguments) {
    c(node.typeArguments, st);
  }
};

(base as TSRecursiveVisitors).TSIndexedAccessType = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.objectType, st);
  c(node.indexType, st);
};

(base as TSRecursiveVisitors).TSIndexSignature = (node: any, st: any, c: WalkerCallback<any>): void => {
  node.parameters.forEach((param: any) => c(param, st)); // Visit each parameter of the index signature.
  c(node.typeAnnotation, st); // Visit the type annotation of the index signature.
};

(base as TSRecursiveVisitors).TSInstantiationExpression = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.expression, st);
  c(node.typeArguments, st);
};

(base as TSRecursiveVisitors).TSInterfaceBody = (node: any, st: any, c: WalkerCallback<any>): void => {
  node.body.forEach((member: any) => c(member, st));
};

(base as TSRecursiveVisitors).TSInterfaceDeclaration = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.id, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  if (node.extends) {
    node.extends.forEach((ext: any) => c(ext, st));
  }
  c(node.body, st);
};

(base as TSRecursiveVisitors).TSInterfaceHeritage = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.expression, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
};

(base as TSRecursiveVisitors).TSInferType = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.typeParameter, st);
};

(base as TSRecursiveVisitors).TSIntersectionType = (node: any, st: any, c: WalkerCallback<any>): void => {
  node.types.forEach((type: any) => c(type, st));
};

(base as TSRecursiveVisitors).TSIntrinsicKeyword = ignore;

(base as TSRecursiveVisitors).TSLiteralType = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.literal, st);
};

(base as TSRecursiveVisitors).TSMappedType = (node: any, st: any, c: WalkerCallback<any>): void => {
  if (node.typeParameter) {
    c(node.typeParameter, st);
  }
  if (node.typeAnnotation) {
    c(node.typeAnnotation, st);
  }
};

(base as TSRecursiveVisitors).TSMethodSignature = (node: any, st: any, c: WalkerCallback<any>): void => {
  c(node.key, st);
  if (node.typeParameters) {
    c(node.typeParameters, st);
  }
  node.params.forEach((param: any) => c(param, st));
  if (node.returnType) {
    c(node.returnType, st);
  }};

  (base as TSRecursiveVisitors).TSModuleBlock = (node: any, st: any, c: WalkerCallback<any>): void => {
    node.body.forEach((stmt: any) => c(stmt, st));
  };
  
  (base as TSRecursiveVisitors).TSModuleDeclaration = (node: any, st: any, c: WalkerCallback<any>): void => {
    if (node.id) {
      c(node.id, st); // Visit the module identifier if it exists.
    }
    if (node.body) {
      c(node.body, st); // Visit the module body if it exists.
    }
  };
  
  (base as TSRecursiveVisitors).TSNamedTupleMember = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.label, st);
    if (node.elementType) {
      c(node.elementType, st);
    }
  };
  
  (base as TSRecursiveVisitors).TSNamespaceExportDeclaration = (
    node: any,
    st: any,
    c: WalkerCallback<any>
  ): void => {
    c(node.id, st);
  };
  
  (base as TSRecursiveVisitors).TSNeverKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSNonNullExpression = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.expression, st); // Visit the expression being asserted as non-null.
  };
  
  (base as TSRecursiveVisitors).TSNullKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSNumberKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSObjectKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSOptionalType = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.typeAnnotation, st);
  };
  
  (base as TSRecursiveVisitors).TSParameterProperty = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.parameter, st); // Visit the parameter declaration.
  };
  
  (base as TSRecursiveVisitors).TSPrivateKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSPropertySignature = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.key, st);
    if (node.typeAnnotation) {
      c(node.typeAnnotation, st);
    }
  };
  
  (base as TSRecursiveVisitors).TSProtectedKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSPublicKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSQualifiedName = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.left, st);
    c(node.right, st);
  };
  
  (base as TSRecursiveVisitors).TSReadonlyKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSRestType = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.typeAnnotation, st);
  };
  
  (base as TSRecursiveVisitors).TSSatisfiesExpression = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.expression, st);
    c(node.typeAnnotation, st);
  };
  
  (base as TSRecursiveVisitors).TSStaticKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSStringKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSSymbolKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSTemplateLiteralType = (node: any, st: any, c: WalkerCallback<any>): void => {
    node.quasis.forEach((quasi: any) => c(quasi, st));
    node.types.forEach((type: any) => c(type, st));
  };
  
  (base as TSRecursiveVisitors).TSThisType = ignore;
  
  (base as TSRecursiveVisitors).TSTupleType = (node: any, st: any, c: WalkerCallback<any>): void => {
    node.elementTypes.forEach((elementType: any) => c(elementType, st));
  };
  
  (base as TSRecursiveVisitors).TSTypeAliasDeclaration = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.id, st);
    if (node.typeParameters) {
      c(node.typeParameters, st);
    }
    c(node.typeAnnotation, st);
  };
  
  (base as TSRecursiveVisitors).TSTypeAnnotation = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.typeAnnotation, st);
  };
  
  (base as TSRecursiveVisitors).TSTypeAssertion = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.typeAnnotation, st);
    c(node.expression, st);
  };
  
  (base as TSRecursiveVisitors).TSTypeLiteral = (node: any, st: any, c: WalkerCallback<any>): void => {
    node.members.forEach((member: any) => c(member, st));
  };
  
  (base as TSRecursiveVisitors).TSTypeOperator = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.typeAnnotation, st);
  };
  
  (base as TSRecursiveVisitors).TSTypeParameter = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.name, st);
    if (node.constraint) {
      c(node.constraint, st);
    }
    if (node.default) {
      c(node.default, st);
    }
  };
  
  (base as TSRecursiveVisitors).TSTypeParameterDeclaration = (
    node: any,
    st: any,
    c: WalkerCallback<any>
  ): void => {
    node.params.forEach((param: any) => c(param, st));
  };
  
  (base as TSRecursiveVisitors).TSTypeParameterInstantiation = (
    node: any,
    st: any,
    c: WalkerCallback<any>
  ): void => {
    node.params.forEach((param: any) => c(param, st));
  };
  
  (base as TSRecursiveVisitors).TSTypePredicate = (node: any, st: any, c: WalkerCallback<any>): void => {
    if (node.parameterName) {
      c(node.parameterName, st);
    }
    c(node.typeAnnotation, st);
  };
  
  (base as TSRecursiveVisitors).TSTypeQuery = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.exprName, st);
  };
  
  (base as TSRecursiveVisitors).TSTypeReference = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.typeName, st);
    if (node.typeArguments) {
      c(node.typeArguments, st);
    }
  };
  
  (base as TSRecursiveVisitors).TSUndefinedKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSUnionType = (node: any, st: any, c: WalkerCallback<any>): void => {
    node.types.forEach((type: any) => c(type, st));
  };
  
  (base as TSRecursiveVisitors).TSUnknownKeyword = ignore;
  
  (base as TSRecursiveVisitors).TSVoidKeyword = ignore;
  
  (base as TSRecursiveVisitors).TypeAlias = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.id, st);
    if (node.typeParameters) {
      c(node.typeParameters, st);
    }
    c(node.right, st);
  };
  
  (base as TSRecursiveVisitors).TypeCastExpression = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.expression, st); // Visit the expression being cast.
    c(node.typeAnnotation, st); // Visit the target type annotation.
  };
  
  // Overriding existing visitors to support potentially nested TypeScript nodes within JSX
  (base as TSRecursiveVisitors).JSXElement = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.openingElement, st);
    node.children.forEach((child: any) => c(child, st));
    if (node.closingElement) {
      c(node.closingElement, st);
    }
  };
  
  (base as TSRecursiveVisitors).JSXFragment = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.openingFragment, st);
    node.children.forEach((child: any) => c(child, st));
    c(node.closingFragment, st);
  };
  
  (base as TSRecursiveVisitors).JSXOpeningElement = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.name, st);
    node.attributes.forEach((attr: any) => c(attr, st));
  };
  
  (base as TSRecursiveVisitors).JSXClosingElement = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.name, st);
  };
  
  (base as TSRecursiveVisitors).JSXIdentifier = skipThrough;
  
  (base as TSRecursiveVisitors).JSXMemberExpression = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.object, st);
    c(node.property, st);
  };
  
  (base as TSRecursiveVisitors).JSXNamespacedName = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.namespace, st);
    c(node.name, st);
  };
  
  (base as TSRecursiveVisitors).JSXEmptyExpression = ignore;
  
  (base as TSRecursiveVisitors).JSXExpressionContainer = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.expression, st);
  };
  
  (base as TSRecursiveVisitors).JSXSpreadChild = (node: any, st: any, c: WalkerCallback<any>): void => {
    c(node.expression, st);
  };
  
  (base as TSRecursiveVisitors).JSXText = ignore;
  
  (base as TSRecursiveVisitors).JSXOpeningFragment = ignore;
  
  (base as TSRecursiveVisitors).JSXClosingFragment = ignore;
  
  // Export the extended 'base' visitor which is now capable of traversing TypeScript ASTs.
  export { base };
