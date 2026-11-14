# Academic Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a research-led portfolio for researchers, graduate supervisors, and recruiters.

**Architecture:** A static homepage links to a print-ready CV. Both share a responsive stylesheet and work without JavaScript.

**Tech Stack:** HTML and CSS.

**Spec:** [Approved design](../specs/2026-11-13-academic-portfolio-design.md)

## Global Constraints

Keep the site local and dependency-free. Omit the unconfirmed graduation date, unpublished lab data, and personal phone number. State paper statuses explicitly.

## Review Focus

Check fragment navigation, narrow-screen overflow, print styles, unavailable external assets, and paper status accuracy.

### Task 1: Portfolio and CV

**Files:** `index.html`, `cv.html`, `styles.css`, and a local portrait asset if the public portrait can be reused.

**Interfaces:** Homepage sections use `#research`, `#experience`, `#projects`, `#teaching`, and `#contact`. Both pages use relative stylesheet and page links.

- [ ] Check that the two HTML entry points are absent before implementation.
- [ ] Build the portfolio and CV with sourced content and the approved color and type system.
- [ ] Verify both pages over HTTP and check every local link and fragment target. Confirm acceptance and in-preparation labels.
- [ ] Render both pages, check the homepage at desktop and mobile widths, and inspect the CV print styling.
