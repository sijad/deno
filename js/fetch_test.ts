// Copyright 2018 the Deno authors. All rights reserved. MIT license.
import { testPerm, assertEqual } from "./test_util.ts";

testPerm({ net: true }, async function tests_fetch() {
  const response = await fetch("http://localhost:4545/package.json");
  const json = await response.json();
  assertEqual(json.name, "deno");
});
