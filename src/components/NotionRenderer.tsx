"use client";

import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import ImageBlock from "./ImageBlock";
import { Fragment } from "react";
import React from "react";
import type { ExtendedBlock } from "@/types/notionTypes";

interface Props {
  blocks: ExtendedBlock[];
}

function isFullBlock(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is ExtendedBlock {
  return "type" in block;
}

function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    gray_background: "bg-gray-200",
    brown_background: "bg-amber-300",
    orange_background: "bg-orange-300 text-black",
    yellow_background: "bg-yellow-200 text-black",
    green_background: "bg-green-200 text-black",
    blue_background: "bg-blue-200 text-black",
    purple_background: "bg-purple-200",
    pink_background: "bg-pink-200 text-black",
    red_background: "bg-red-200",
  };
  return color === "default" ? "" : `px-1 rounded ${colorMap[color] ?? ""}`;
}

function renderText(text: RichTextItemResponse): React.ReactNode {
  const { plain_text, annotations } = text;
  const className = getColorClass(annotations.color);
  const parts = plain_text.split("\n");

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          <span className={className}>{part}</span>
          {i < parts.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

function renderChildren(children?: ExtendedBlock[]) {
  if (!children) return null;
  return <div className="ml-4">{renderBlocks(children)}</div>;
}

function renderBlocks(blocks: ExtendedBlock[]): React.ReactNode {
  const elements: React.ReactNode[] = [];
  let tempList: ExtendedBlock[] = [];

  const flushList = () => {
    if (tempList.length === 0) return;

    const firstType = tempList[0].type;
    const listTag = firstType === "numbered_list_item" ? "ol" : "ul";
    const className =
      firstType === "numbered_list_item"
        ? "list-decimal ml-6"
        : "list-disc ml-6";

    const items = tempList.map((block) => {
      if (block.type === "numbered_list_item") {
        return (
          <li key={block.id}>
            {block.numbered_list_item.rich_text.map((text, i) => (
              <Fragment key={i}>{renderText(text)}</Fragment>
            ))}
            {renderChildren(block.children)}
          </li>
        );
      }

      if (block.type === "bulleted_list_item") {
        return (
          <li key={block.id}>
            {block.bulleted_list_item.rich_text.map((text, i) => (
              <Fragment key={i}>{renderText(text)}</Fragment>
            ))}
            {renderChildren(block.children)}
          </li>
        );
      }

      return null;
    });

    elements.push(
      React.createElement(
        listTag,
        { key: `list-${tempList[0].id}`, className },
        items
      )
    );

    tempList = [];
  };

  for (const block of blocks) {
    if (!isFullBlock(block)) continue;

    if (
      block.type === "numbered_list_item" ||
      block.type === "bulleted_list_item"
    ) {
      if (tempList.length === 0 || tempList[0].type === block.type) {
        tempList.push(block);
      } else {
        flushList();
        tempList.push(block);
      }
    } else {
      flushList();
      elements.push(renderBlock(block));
    }
  }

  flushList();
  return elements;
}

function renderBlock(block: ExtendedBlock): React.ReactNode {
  const key = block.id;

  switch (block.type) {
    case "paragraph":
      return (
        <p key={key}>
          {block.paragraph.rich_text.map((text, i) => (
            <Fragment key={i}>{renderText(text)}</Fragment>
          ))}
        </p>
      );
    case "heading_1":
      return (
        <h1 key={key} className="text-3xl font-bold mt-6 mb-2">
          {block.heading_1.rich_text.map((text, i) => (
            <Fragment key={i}>{renderText(text)}</Fragment>
          ))}
        </h1>
      );
    case "heading_2":
      return (
        <h2 key={key} className="text-2xl font-semibold mt-5 mb-2">
          {block.heading_2.rich_text.map((text, i) => (
            <Fragment key={i}>{renderText(text)}</Fragment>
          ))}
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={key} className="text-xl font-medium mt-4 mb-2">
          {block.heading_3.rich_text.map((text, i) => (
            <Fragment key={i}>{renderText(text)}</Fragment>
          ))}
        </h3>
      );
    case "image": {
      const rawUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;

      return (
        <div key={key} className="my-4">
          <ImageBlock url={rawUrl} />
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
            {block.code.rich_text.map((text, i) => (
              <Fragment key={i}>{renderText(text)}</Fragment>
            ))}
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
              <Fragment key={i}>{renderText(text)}</Fragment>
            ))}
          </summary>
          {renderChildren(block.children)}
        </details>
      );
    }
    case "divider": {
      return <hr key={key} className="my-6 border-t border-gray-300" />;
    }
    case "table": {
      return (
        <table
          key={key}
          className="table-auto w-full my-6 border border-gray-300"
        >
          <tbody>
            {block.children?.map((row) => {
              if (!isFullBlock(row) || row.type !== "table_row") return null;
              return (
                <tr key={row.id}>
                  {row.table_row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border px-4 py-2">
                      {cell.map((text, i) => (
                        <Fragment key={i}>{renderText(text)}</Fragment>
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
}

export function NotionRenderer({ blocks }: Props) {
  return (
    <div className="prose dark:prose-invert max-w-none leading-loose">
      {renderBlocks(blocks)}
    </div>
  );
}
