// Copyright 2018 the Deno authors. All rights reserved. MIT license.
import { test, testPerm, assert, assertEqual } from "./test_util.ts";
import * as deno from "deno";

testPerm({ write: true }, function renameSync() {
  const testDir = deno.makeTempDirSync() + "/test-rename";
  const oldpath = testDir + "/oldpath";
  const newpath = testDir + "/newpath";
  deno.mkdirSync(oldpath);
  deno.renameSync(oldpath, newpath);
  const newPathInfo = deno.statSync(newpath);
  assert(newPathInfo.isDirectory());

  let caughtErr = false;
  let oldPathInfo;

  try {
    oldPathInfo = deno.statSync(oldpath);
  } catch (err) {
    caughtErr = true;
    assertEqual(err.kind, deno.ErrorKind.NotFound);
    assertEqual(err.name, "NotFound");
  }

  assert(caughtErr);
  assertEqual(oldPathInfo, undefined);
});

test(function renameSyncPerm() {
  let err;
  try {
    const oldpath = "/oldbaddir";
    const newpath = "/newbaddir";
    deno.renameSync(oldpath, newpath);
  } catch (err_) {
    err = err_;
  }
  assertEqual(err.kind, deno.ErrorKind.PermissionDenied);
  assertEqual(err.name, "PermissionDenied");
});

testPerm({ write: true }, async function rename() {
  const testDir = deno.makeTempDirSync() + "/test-rename";
  const oldpath = testDir + "/oldpath";
  const newpath = testDir + "/newpath";
  deno.mkdirSync(oldpath);
  await deno.rename(oldpath, newpath);
  const newPathInfo = deno.statSync(newpath);
  assert(newPathInfo.isDirectory());

  let caughtErr = false;
  let oldPathInfo;

  try {
    oldPathInfo = deno.statSync(oldpath);
  } catch (err) {
    caughtErr = true;
    assertEqual(err.kind, deno.ErrorKind.NotFound);
    assertEqual(err.name, "NotFound");
  }

  assert(caughtErr);
  assertEqual(oldPathInfo, undefined);
});

test(async function renamePerm() {
  let err;
  try {
    const oldpath = "/oldbaddir";
    const newpath = "/newbaddir";
    await deno.renameSync(oldpath, newpath);
  } catch (err_) {
    err = err_;
  }
  assertEqual(err.kind, deno.ErrorKind.PermissionDenied);
  assertEqual(err.name, "PermissionDenied");
});
