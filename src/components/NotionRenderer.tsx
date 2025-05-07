"use client";

import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import { Fragment } from "react";
import React from "react";

interface Props {
  blocks: (BlockObjectResponse | PartialBlockObjectResponse)[];
}

function isFullBlock(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return "type" in block;
}

export function NotionRenderer({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return <p>내용이 없습니다.</p>;

  const renderBlock = (
    block: BlockObjectResponse | PartialBlockObjectResponse
  ) => {
    if (!isFullBlock(block)) return null;

    const key = block.id;

    switch (block.type) {
      case "paragraph":
        return (
          <p key={key}>
            {block.paragraph.rich_text.map((text, i) => (
              <Fragment key={i}>{text.plain_text}</Fragment>
            ))}
          </p>
        );
      case "heading_1":
        return (
          <h1 key={key} className="text-3xl font-bold mt-6 mb-2">
            {block.heading_1.rich_text.map((text, i) => (
              <Fragment key={i}>{text.plain_text}</Fragment>
            ))}
          </h1>
        );
      case "heading_2":
        return (
          <h2 key={key} className="text-2xl font-semibold mt-5 mb-2">
            {block.heading_2.rich_text.map((text, i) => (
              <Fragment key={i}>{text.plain_text}</Fragment>
            ))}
          </h2>
        );
      case "heading_3":
        return (
          <h3 key={key} className="text-xl font-medium mt-4 mb-2">
            {block.heading_3.rich_text.map((text, i) => (
              <Fragment key={i}>{text.plain_text}</Fragment>
            ))}
          </h3>
        );
      case "bulleted_list_item":
        return (
          <li key={key} className="list-disc ml-6">
            {block.bulleted_list_item.rich_text.map((text, i) => (
              <Fragment key={i}>{text.plain_text}</Fragment>
            ))}
          </li>
        );
      case "numbered_list_item":
        return (
          <li key={key} className="list-decimal ml-6">
            {block.numbered_list_item.rich_text.map((text, i) => (
              <Fragment key={i}>{text.plain_text}</Fragment>
            ))}
          </li>
        );
      case "image": {
        const source =
          block.image.type === "external"
            ? block.image.external.url
            : block.image.file.url;
        return (
          <div key={key} className="my-4">
            <Image
              src={source}
              alt="notion image"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        );
      }
      case "code": {
        return (
          <pre
            key={key}
            className="bg-gray-800 text-white p-4 rounded my-4 overflow-x-auto"
          >
            <code>
              {block.code.rich_text.map((text) => text.plain_text).join("")}
            </code>
          </pre>
        );
      }
      case "video": {
        const url =
          block.video.type === "external"
            ? block.video.external.url
            : block.video.file.url;
        return (
          <video key={key} controls className="w-full my-4 rounded">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }
      case "toggle": {
        return (
          <details key={key} className="my-4 cursor-pointer">
            <summary className="font-semibold">
              {block.toggle.rich_text.map((text, i) => (
                <Fragment key={i}>{text.plain_text}</Fragment>
              ))}
            </summary>
          </details>
        );
      }
      case "table": {
        const tableBlock = block as BlockObjectResponse & {
          children?: BlockObjectResponse[];
        };
        return (
          <table
            key={key}
            className="table-auto w-full my-6 border border-gray-300"
          >
            <tbody>
              {tableBlock.children?.map((rowBlock, rowIndex) => {
                if (!("type" in rowBlock) || rowBlock.type !== "table_row")
                  return null;
                return (
                  <tr key={rowBlock.id} className="border-t border-gray-300">
                    {rowBlock.table_row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2">
                        {cell.map((text, i) => (
                          <Fragment key={i}>{text.plain_text}</Fragment>
                        ))}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }
      default:
        return <p key={key}>[지원하지 않는 블록: {block.type}]</p>;
    }
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      {blocks.map((block) => renderBlock(block))}
    </div>
  );
}
