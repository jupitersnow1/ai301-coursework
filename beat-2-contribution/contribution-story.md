# Contribution: A better HUD menu for PyTorch repos family

Path: `beat-2-contribution/contribution-story.md`

This file is Assignment 5, and it is graded at the path above; a copy kept anywhere else in
the repository is not read. **Keep every section header below under its exact name** — the
format criteria grade exactly that. Your course repo link is the whole submission: no tool
files and no evidence uploads are part of Assignment 5.

**Contribution Number:** [1]
**Student:** Jacqueline Sanchez
**GitHub Username:** jupitersnow1
**Issue:** https://github.com/pytorch/test-infra/issues/5226
**Pull Request:** [GitHub PR link, once opened]

One repository, built across units 5 to 8, telling the whole story of your real
contribution. Fill it as you work, not at the end — the sections below ask for evidence that
is far easier to write down as it happens than to reconstruct in the last weekend.

Contribution Number stays `[1]` unless you make more than one contribution this term; it
just numbers them.

---

## Toolkit

Every story section below, from Why I Chose This Issue through Pull
Request, ends with a Toolkit block: which tool did that phase's work
and how you used it, what it produced, what difficulties or
shortcomings it presented, and what you changed or would change
because of them. Together the blocks are the thread the rubric's
Toolkit points read, and they are the raw material for your unit-9
portfolio, so keep them current as you work rather than
reconstructing them later.

A Toolkit block looks like this (copy it into each story section and
fill it there):

```text
**Toolkit**

- Tool: [which tool did this phase's work, and how you used it]
- What it produced: [described in a sentence or a short excerpt]
- Difficulties: [what fought you or fell short, or "none met"]
- What changed: [the patch, revision, or workaround, what you would
  update, or "nothing"]
```

This section also keeps one short dated entry per week of tool work,
starting below: what you built or changed that week, what broke, and
what you changed because of it. The blocks tell the story where it
happened; these entries are the toolkit's own timeline.

All four entries are graded. Keep every heading below, and fill each
one in the week it belongs to.

**Unit 5: [one line on the tool work]**

[2-4 sentences: what you built (the scout, your strategy), what broke
or fell short, what changed because of it.]

**Unit 6: [one line on the tool work]**

[2-4 sentences: the voice-guard, the repo-memory file. What broke or
fell short, and what changed because of it. "Nothing broke" counts when
it is true - say how you know.]

**Unit 7: [one line on the tool work]**

[2-4 sentences: the ship-gate and your gate manifest. What it produced
on your real branch, what fought you, what changed because of it.]

**Unit 8: [one line on the tool work]**

[2-4 sentences: the PR-monitor and your playbook. What it read, what it
drafted, what you did with the draft.]

---

## Why I Chose This Issue

[1-2 paragraphs in your own words: how you searched, what your scan
surfaced, what your scout's verdict said, why this issue fits your
profile, and what you hope to learn. If your scout's verdict on it
was reject and you chose it anyway, say so here and say why; choosing
against your own tool silently is what loses points. Close with an
honest read of the tool itself: where the scout fell short on a real
wild search and what you changed or would change, or what convinced
you it held up. **Record the link to your claim comment in this section too.**
Not claimed yet? Write `claim pending` and today's date where the link goes,
and add the link the moment your claim lands.]

**Toolkit**

- Tool: issue-scout (your scout: your search strategy, your rubric),
  and how you used it
- What it produced: [the scan and its verdict on this issue, described]
- Difficulties: [where it fell short, or "none met" if none did]
- What changed: [what you patched or would update, or "nothing"]

---

## Understanding the Issue

**Problem Description**

[In your own words, what is broken or missing?]

**Expected Behavior**

[What should happen?]

**Current Behavior**

[What actually happens?]

**Affected Components**

[Which parts of the codebase are involved?]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Reproduction Process

**Environment Setup**

- OS: Ubuntu 24.04.5 LTS (GitHub Codespace)
- Node v24.22.2, yarn 1.22.22, Next.js 15.5.16 (from `torchci/package.json`)
- Code: my fork `jupitersnow1/test-infra`, `main` at upstream commit `c901b1dcc` (2026-11-11 00:34 UTC), no changes
- Setup: `cd torchci && yarn install --frozen-lockfile && yarn dev`, then http://localhost:3000. No `.env.local`: data panels show "Error loading HUD data" without the ClickHouse keys, but the navbar and page frames still draw.
- Challenges: `yarn install` took about 3 minutes with one network retry. The live hud.pytorch.org answered my scripted request with HTTP 429, so all evidence below is from the local run. Before any of this, `gh` in my codespace was logged in with the codespace's own token, which can't write to other repos: my first claim attempts passed the voice guard and then failed silently. I fixed it with `unset GITHUB_TOKEN` in `~/.bashrc` and `gh auth login`.

**Steps to Reproduce**

1. Open http://localhost:3000/hud/pytorch/pytorch/main and look at the left side of the top menu.
2. Count the repo links: PyTorch, ExecuTorch, TorchVision, Helion. These are four hard-coded `<li><Link>` items in `torchci/components/layout/NavBar.tsx`, followed by CRCR.
3. Request HUD pages for repos that are not in the menu: `/hud/pytorch/ao/main`, `/hud/pytorch/audio/main`, `/hud/pytorch/tutorials/main`, `/hud/pytorch/torchtune/main`. Open one of them in a browser.
4. Run the screenshot script ([navbar-shots.js](evidence/navbar-shots.js), Playwright 1.48.2) at widths on both sides of the `@media screen and (max-width: 1350px)` rule in `NavBar.module.css`.
5. Observed: four repo links; the HUD serves pages for repos with no link; at 1350px and below the bar wraps to two rows and the repo links take the whole top row.

**Reproduction Evidence**

- **Commit showing reproduction:** none (reproduced on unmodified upstream `c901b1dcc`)
- **Screenshots/logs:** [navbar at 1351px](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/navbar-1351.png), [navbar at 1350px](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/navbar-1350.png), [navbar at 768px](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/navbar-768.png), [pytorch/ao HUD page](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/hud-ao-page.png), [script output](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/shot-output.txt), [curl output](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/unlisted-repos-curl.txt). Script output, unedited:

  ```
  width=1920: navbar height=60px; repo links: PyTorch@(184,23) ExecuTorch@(268,23) TorchVision@(379,23) Helion@(489,23) CRCR@(561,23)
  width=1440: navbar height=60px; repo links: PyTorch@(170,24) ExecuTorch@(249,24) TorchVision@(351,24) Helion@(452,24) CRCR@(520,24)
  width=1351: navbar height=60px; repo links: PyTorch@(166,25) ExecuTorch@(243,25) TorchVision@(344,25) Helion@(443,25) CRCR@(509,25)
  width=1350: navbar height=126px; repo links: PyTorch@(166,16) ExecuTorch@(243,16) TorchVision@(344,16) Helion@(443,16) CRCR@(509,16)
  width=1280: navbar height=124px; repo links: PyTorch@(165,15) ExecuTorch@(243,15) TorchVision@(343,15) Helion@(442,15) CRCR@(508,15)
  width=1024: navbar height=112px; repo links: PyTorch@(155,13) ExecuTorch@(227,13) TorchVision@(322,13) Helion@(417,13) CRCR@(478,13)
  width=768: navbar height=106px; repo links: PyTorch@(151,13) ExecuTorch@(222,13) TorchVision@(316,13) Helion@(409,13) CRCR@(468,13)
  ao page: h1/h2 text = [":"]
  ```

  curl status for the unlisted repos (titles are empty because the page sets them in the browser):

  ```
  200 http://localhost:3000/hud/pytorch/ao/main  title: 
  200 http://localhost:3000/hud/pytorch/audio/main  title: 
  200 http://localhost:3000/hud/pytorch/tutorials/main  title: 
  200 http://localhost:3000/hud/pytorch/torchtune/main  title: 
  ```

- **My findings:** The issue is still real on today's `main`. The menu has room for a handful of repos, each its own top-level link, while Benchmarks, Metrics, and Dev Infra next to it already group their items with `NavBarGroupDropdown`. The HUD serves pages for repos that have no menu link (`/hud/pytorch/ao/main` draws a page headed `pytorch/ao : main` under a menu with no ao entry), and `lib/bot/utils.ts` lists 13 repos with Dr.CI enabled. Since the issue was filed, audio was removed from the menu (PR #8246) and Helion was added. At 1351px the bar is one 60px row; at 1350px it wraps to 126px and the repo links fill the top row, so each repo added the current way costs another top-level item there. The `h1/h2` line in the output is the script failing to read the ao heading (it isn't in an h1/h2), so the screenshot is the evidence for that page.

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Solution Approach

**Analysis**

[Your analysis of the root cause: what is causing the issue, traced
to the files and functions involved.]

**Proposed Solution**

[High-level description of your fix approach, and what you are
deliberately NOT changing.]

**Implementation Plan**

1. [Modify file X to do Y]
2. [Add or change Z]
3. [Update tests]

[Record deviations here as they happen: what changed mid-build and
why. A recorded deviation is honest work; silent drift is not.]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Testing Strategy

[What observable checks prove the fix: your reproduction steps re-run
against the built change (before and after), and the repo's own test
suite or checks with the outcome shown. "Tests pass" with nothing
observable named is not a strategy.]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Implementation Notes

[A running log, added to as you work. Date each entry. What you
built, decisions you made when you made them, wrong turns included.]

**[Date]**

[Entry]

**[Date]**

[Entry]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Pull Request

**PR Link:** [GitHub PR URL when opened]

**PR Description:** [what the PR says; much of the content above
adapts into it]

**Maintainer Feedback:**

- [Date]: [feedback received, or "none yet"; silence is a normal
  state and costs you nothing]
- [Date]: [how you addressed it]

**Status:** [Awaiting review / Iterating / Merged / Closed. The
status is a fact you record, never a grade: the PR is graded as
opened.]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Learnings and Reflections

**Technical Skills Gained**

[What you learned technically, named concretely.]

**Challenges Overcome**

[What was hard and how you solved it; point at the real events, the
Toolkit blocks above are full of them.]

**What I'd Do Differently Next Time**

[Reflection on your process.]

---

## Resources Used

[What actually helped, not a reading list. List things this story
already shows you using: the doc you followed to set the environment
up, the thread that explained the bug, the person who answered you.
One real entry beats ten plausible ones.]

- [Link to documentation that helped]
- [Discussion, issue, or post that helped]
