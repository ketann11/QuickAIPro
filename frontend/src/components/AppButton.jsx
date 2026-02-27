import React from "react";
import styled from "styled-components";

export default function AppButton({
  children,
  variant = "primary", // primary | outline | pill
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <Btn
      type={type}
      onClick={onClick}
      $variant={variant}
      className={className}
    >
      <span className="label">{children}</span>

      {/* show arrow only for pill */}
      {variant === "pill" && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </Btn>
  );
}

const Btn = styled.button`
  --primary: #4f5dff;       /* your purple/blue */
  --primary-dark: #3f4cff;
  --border: #d9dbe7;

  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  transition: 200ms ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  user-select: none;
  outline: none;

  &:active {
    transform: translateY(1px);
  }

  /* ✅ Primary button (Start creating now) */
  ${({ $variant }) =>
    $variant === "primary" &&
    `
    background: var(--primary);
    color: #fff;
    padding: 14px 22px;
    border-radius: 10px;
    min-width: 220px;

    &:hover { background: var(--primary-dark); }
  `}

  /* ✅ Outline button (Watch demo) */
  ${({ $variant }) =>
    $variant === "outline" &&
    `
    background: #fff;
    color: #111;
    padding: 14px 22px;
    border-radius: 10px;
    border: 1px solid var(--border);
    min-width: 180px;

    &:hover { border-color: #b9bdd3; }
  `}

  /* ✅ Top-right pill (Get started) */
  ${({ $variant }) =>
    $variant === "pill" &&
    `
    background: var(--primary);
    color: #fff;
    padding: 12px 18px;
    border-radius: 999px;
    min-width: 180px;

    .arrow{
      width: 34px;
      height: 34px;
      border-radius: 999px;
      display:flex;
      align-items:center;
      justify-content:center;
      background: rgba(255,255,255,0.16);
      transition: 200ms ease;
    }

    &:hover .arrow{
      transform: translateX(2px);
      background: rgba(255,255,255,0.22);
    }

    &:hover { background: var(--primary-dark); }
  `}
`;