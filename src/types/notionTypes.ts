import {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type ExtendedBlock =
  | (BulletedListItemBlockObjectResponse & { children?: ExtendedBlock[] })
  | (NumberedListItemBlockObjectResponse & { children?: ExtendedBlock[] })
  | (BlockObjectResponse & { children?: ExtendedBlock[] });
