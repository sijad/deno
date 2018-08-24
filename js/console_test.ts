// Copyright 2018 the Deno authors. All rights reserved. MIT license.
import { test, assert, assertEqual } from "./test_util.ts";

test(function tests_console_assert() {
  console.assert(true);

  let hasThrown = false;
  try {
    console.assert(false);
  } catch {
    hasThrown = true;
  }
  assertEqual(hasThrown, true);
});

test(function tests_console_stringify_circular() {
  class Base {
    a = 1;
    m1() {}
  }

  class Extended extends Base {
    b = 2;
    m2() {}
  }

  // tslint:disable-next-line:no-any
  const nestedObj: any = {
    num: 1,
    bool: true,
    str: "a",
    method() {},
    un: undefined,
    nu: null,
    arrowFunc: () => {},
    extendedClass: new Extended(),
    nFunc: new Function(),
    extendedCstr: Extended
  };

  const circularObj = {
    num: 2,
    bool: false,
    str: "b",
    method() {},
    un: undefined,
    nu: null,
    nested: nestedObj,
    emptyObj: {},
    arr: [1, "s", false, null, nestedObj],
    baseClass: new Base()
  };

  nestedObj.o = circularObj;

  try {
    console.log(1);
    console.log("s");
    console.log(false);
    console.log(Symbol(1));
    console.log(null);
    console.log(undefined);
    console.log(new Extended());
    console.log(function f() {});
    console.log(nestedObj);
    console.log(JSON);
    console.log(console);
  } catch {
    throw new Error("Expected no crash on circular object");
  }
});
