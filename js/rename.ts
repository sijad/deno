// Copyright 2018 the Deno authors. All rights reserved. MIT license.
import * as fbs from "gen/msg_generated";
import { flatbuffers } from "flatbuffers";
import * as dispatch from "./dispatch";

/**
 * Renames (moves) oldpath to newpath.
 *
 *     import { rename } from "deno";
 *     const oldpath = 'from/path';
 *     const newpath = 'to/path';
 *     await rename(oldpath, newpath);
 */
export async function rename(oldpath: string, newpath: string): Promise<void> {
  await dispatch.sendAsync(...req(oldpath, newpath));
}

/**
 * Renames (moves) oldpath to newpath synchronously.
 *
 *     import { renameSync } from "deno";
 *     const oldpath = 'from/path';
 *     const newpath = 'to/path';
 *     renameSync(oldpath, newpath);
 */
export function renameSync(oldpath: string, newpath: string): void {
  dispatch.sendSync(...req(oldpath, newpath));
}

function req(
  oldpath: string,
  newpath: string
): [flatbuffers.Builder, fbs.Any, flatbuffers.Offset] {
  const builder = new flatbuffers.Builder();
  const _oldpath = builder.createString(oldpath);
  const _newpath = builder.createString(newpath);
  fbs.Rename.startRename(builder);
  fbs.Rename.addOldpath(builder, _oldpath);
  fbs.Rename.addNewpath(builder, _newpath);
  const msg = fbs.Rename.endRename(builder);
  return [builder, fbs.Any.Rename, msg];
}
