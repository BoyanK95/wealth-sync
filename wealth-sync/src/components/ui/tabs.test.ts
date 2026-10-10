import { readFileSync } from "node:fs";

import ts from "typescript";
import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

const source = readFileSync(new URL("./tabs.tsx", import.meta.url), "utf8");
const sourceFile = ts.createSourceFile(
  "tabs.tsx",
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);

function findTabsTriggerClassNameCall(): ts.CallExpression {
  let classNameCall: ts.CallExpression | undefined;

  function visit(node: ts.Node): void {
    if (ts.isFunctionDeclaration(node) && node.name?.text === "TabsTrigger") {
      const inspectTrigger = (child: ts.Node): void => {
        if (
          ts.isJsxAttribute(child) &&
          child.name.getText(sourceFile) === "className" &&
          child.initializer &&
          ts.isJsxExpression(child.initializer) &&
          child.initializer.expression &&
          ts.isCallExpression(child.initializer.expression)
        ) {
          classNameCall = child.initializer.expression;
          return;
        }

        ts.forEachChild(child, inspectTrigger);
      };

      ts.forEachChild(node, inspectTrigger);
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (!classNameCall) {
    throw new Error(
      "TabsTrigger must compose its className with a function call",
    );
  }

  return classNameCall;
}

const classNameCall = findTabsTriggerClassNameCall();
const defaultClassArgument = classNameCall.arguments[0];

if (!defaultClassArgument || !ts.isStringLiteral(defaultClassArgument)) {
  throw new Error("TabsTrigger must declare its default classes as a string");
}

const defaultClasses = defaultClassArgument.text;

function classesWith(customClassName?: string): string[] {
  return cn(defaultClasses, customClassName).split(/\s+/).filter(Boolean);
}

describe("TabsTrigger cursor styling", () => {
  it("shows a pointer cursor by default", () => {
    expect(classesWith()).toContain("cursor-pointer");
  });

  it("keeps the pointer cursor when unrelated custom classes are provided", () => {
    expect(classesWith("min-w-24 text-base")).toEqual(
      expect.arrayContaining(["cursor-pointer", "min-w-24", "text-base"]),
    );
  });

  it("allows consumers to override the default cursor style", () => {
    const classes = classesWith("cursor-default");

    expect(classes).toContain("cursor-default");
    expect(classes).not.toContain("cursor-pointer");
  });

  it("retains the disabled interaction styles alongside the pointer cursor", () => {
    expect(classesWith()).toEqual(
      expect.arrayContaining([
        "cursor-pointer",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
      ]),
    );
  });

  it("uses the shared class composer with consumer classes last", () => {
    expect(classNameCall.expression.getText(sourceFile)).toBe("cn");
    expect(classNameCall.arguments[1]?.getText(sourceFile)).toBe("className");
  });
});
