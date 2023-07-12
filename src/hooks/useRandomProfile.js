import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";


export function randomProfile(id) {
  let svg = createAvatar(style, {
    seed: id,
  });
  return svg;
}
