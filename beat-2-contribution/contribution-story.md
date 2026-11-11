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

**Unit 5: built issue-scout and a search strategy scoped to the Jupyter/conda orgs**

I installed issue-scout over my Unit 1 skill and wrote three queries (good first issue, help wanted, and documentation in the Jupyter and conda orgs) with ranking filters that drop assigned issues and long threads and put good-first-issue results first. The broad `--language python` searches returned mostly brand-new solo repos, so I scoped the queries to orgs, and the "Nobody already on it" check missed open PRs that weren't linked on the issue (5 of the 8 issues I graded had one). I added a PR search to that check in my rubric.

**Unit 6: voice guard, upstream rules, and a CLAUDE.local.md for test-infra**

I merged my voice guide into one file, added Upstream rules for claims, questions, and pings, installed the guard hook, and wrote a CLAUDE.local.md with test-infra's CI checks and the navbar files. The thing that stuck with me is that the guard passed my claim while the post silently failed: `gh` was using my codespace's built-in token, which can't write to other repos. I fixed it with `unset GITHUB_TOKEN` and `gh auth login`, and repro-check also caught my first draft opening with "I'd like to work on this" before asking the earlier claimant, so I moved the question first.

**Unit 7: [one line on the tool work]**

[2-4 sentences: the ship-gate and your gate manifest. What it produced
on your real branch, what fought you, what changed because of it.]

**Unit 8: [one line on the tool work]**

[2-4 sentences: the PR-monitor and your playbook. What it read, what it
drafted, what you did with the draft.]

---

## Why I Chose This Issue

My scan searched the Jupyter and conda orgs and accepted only one issue (jupyterlab/lumino#449), so I picked three issues on the Issue Selection site instead: pytorch/test-infra#5226, pytorch/pytorch#106571, and pytorch/pytorch#121587. My scout rejected all three. #106571 is a codebase-wide checklist with new claims from the last two weeks, and #121587 already has two open PRs. #5226 failed only one check, "Nobody already on it", because devesh-2002 claimed it in May 2024 and their PR #5274 is still open, even though it hasn't changed since 2024-05-29. It got no difficulty note since it wasn't accepted; by hand I'd call it ambitious, because the menu layout is still an open design question.

I chose #5226 anyway. I have some experience using PyTorch and was looking to enhance something, and this is a React/TypeScript change in one file (`NavBar.tsx`) with a dropdown component the repo already uses. Instead of claiming over devesh-2002, my claim asks them if they're still working on it. I hope to learn how to properly contribute to issues on GitHub.

I was surprised that the scout rejected the issue even though it was last worked on a really long time ago. My rubric treats an old claim comment as abandoned after 21 days, but treats any open PR as live forever. It also missed open PRs that weren't linked on the issue, which I fixed by adding a PR search to that check.

Claim comment: https://github.com/pytorch/test-infra/issues/5226#issuecomment-6788361965. After posting, I edited it to remove "I'll post what I find here within a few days," because we were taught not to post a timeline until we actually have the info to post.

**Toolkit**

- Tool: issue-scout (my search strategy and rubric): one scan, then direct grading of my three picks, then a regrade after the Unit 6 scope patch
- What it produced: 60 unique results, 45 after ranking, top 5 graded with 1 accept (lumino#449); all three of my picks rejected, #5226 only on "Nobody already on it" (open PR #5274, untouched since 2024-05-29)
- Difficulties: the claim check missed open PRs not linked on the issue, and it treats a 2.5-year-old PR as a live claim
- What changed: added a PR search to "Nobody already on it"; replaced "Scope fits a newcomer" with scope-feasible plus a difficulty note (it changed #106571's reason, not any verdict); would add "no PR activity for 6+ months counts as abandoned"

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

- Tool: repro-check, grading my claim draft and repro report together, three rounds
- What it produced: accept on the third round (all six required checks plus the control run)
- Difficulties: round 1 rejected my report for saying the unlisted pages "render" with no output shown; round 2 for saying "below 1350px" without measuring 1350, for tidying the script's output instead of pasting it, and for a script nobody else could see
- What changed: measured 1351px vs 1350px (60px vs 126px), added a screenshot of the ao page, pasted output unedited, put the script inline, and committed the evidence to my course repo

---

## Solution Approach

**Analysis**

The repo links are hard-coded in `torchci/components/layout/NavBar.tsx`: the left `<ul className={styles.navbarlinkslist}>` holds the "PyTorch CI HUD" home link, then one `<li><Link prefetch={false} href="/hud/pytorch/<repo>/main">` per repo (PyTorch, ExecuTorch, TorchVision, Helion), then CRCR. So every repo is its own top-level menu item, and onboarding a repo to the menu means adding another one.

The space limit comes from `torchci/components/layout/NavBar.module.css`: under `@media screen and (max-width: 1350px)` each half of the navbar takes a full row. My reproduction measured the bar at 60px tall at 1351px and 126px at 1350px, with the repo links filling the top row. Meanwhile the HUD already serves pages for repos that have no link (`/hud/pytorch/ao/main`, `/audio/main`, `/tutorials/main`, `/torchtune/main` all returned 200).

The same file already solves this for other links: Benchmarks, Metrics, and Dev Infra are each one `NavBarGroupDropdown` (`torchci/components/layout/NavBarGroupDropdown.tsx`), which takes a list of `NavItem`s (`{label, route, type: "item"}`) and shows them in a menu on hover (desktop) or tap (touch).

**Proposed Solution**

Group the repo links into one "Repos" dropdown using the existing `NavBarGroupDropdown`, following huydhn's suggestion in the thread ("I'm thinking grouping similar items into drop down lists could be a great way to achieve this"). The four repo links become one top-level item, and adding a repo later is one line in a list instead of a new top-level slot.

What it does not fix: the two-row wrap under 1350px. That comes from the `@media screen and (max-width: 1350px)` rule in `NavBar.module.css`, which gives each half of the bar `width: 100%` no matter how many links it holds, so the bar will still be about 126px tall at 1350px. The fix is about top-level slots, not the wrap.

What I'm deliberately NOT changing:
- Which repos are listed. The dropdown keeps the same four (PyTorch, ExecuTorch, TorchVision, Helion). Adding ao, audio, etc. is a maintainer decision, so I'll ask in the PR instead of choosing.
- The "PyTorch CI HUD" home link, the CRCR link, and everything on the right side (Tests, Help, Requests, KPIs, Benchmarks, Metrics, Dev Infra, login).
- `NavBarGroupDropdown.tsx` and `NavBar.module.css`.
- Any other page.

Credit: devesh-2002's PR #5274 (2024) took the same approach, moving the repo links into a "Tools" dropdown in what was then `torchci/components/NavBar.tsx`. That file has since moved to `torchci/components/layout/NavBar.tsx` and the old `NavBarDropdown` was replaced by `NavBarGroupDropdown`, so #5274 no longer applies cleanly. My change redoes that idea on today's code, and my PR will say so and credit #5274.

Risks and open questions:

- Which repos belong in the list is the maintainers' call; I keep the four and ask about ao, audio, and the rest.
- One click becomes a hover plus a click to reach PyTorch's HUD. "PyTorch CI HUD" on the left still links to `/`, so the main page stays one click away.
- devesh-2002's PR #5274 (the same dropdown idea, on the old file) is still open and they haven't answered my claim yet. I build on my fork, and I'll check the thread again before opening a PR.
- `NavBarGroupDropdown` renders its items as plain `<a href>` rather than Next.js `Link`, the same as the other dropdowns, so these links do a full page load.

Deviations will be recorded here as they happen.

**Implementation Plan**

1. Make a branch `fix/5226-repos-dropdown` from upstream `main`.
2. In `torchci/components/layout/NavBar.tsx`, add an exported `repoNavItems: NavItem[]` list with the four repos and their existing routes, and replace the four repo `<li><Link>` items with `<NavBarGroupDropdown title="Repos" items={repoNavItems} />`.
3. Add `torchci/test/navBar.test.tsx`, following the repo's `renderToStaticMarkup` pattern (as in `test/crcrLevelHistory.test.tsx`), mocking `LoginSection`, `ThemeModePicker`, and the benchmark nav group. It checks that `repoNavItems` has the four repo routes, and that the rendered navbar has a "Repos" dropdown and no top-level `/hud/pytorch/executorch/main` link. It fails on `main` (no `repoNavItems`, and the link is top-level).
4. Run `yarn format`, then every check in my manifest: `yarn lint`, `yarn prettier --check .`, `yarn tsc`, `yarn test`.
5. Re-run my reproduction (the Playwright script at 1351px and 1350px, hovering "Repos" to show the four links) for before/after evidence, in both light and dark mode, because `torchci/CLAUDE.md` requires both. Expected: one "Repos" item where four links were, the four links inside it on hover, and the bar still about 126px tall at 1350px (the wrap isn't part of this fix).

Deviations: none in the code. The plan itself changed before the build: plan-check showed that my first draft described the 1350px wrap as the problem, which this fix doesn't change, and that I had wrongly called #5274 "a search bar" when it was the same dropdown idea. I reframed the problem as top-level slots and added credit to #5274.

**Toolkit**

- Tool: plan-check, grading plan.md and a draft plan comment (plan-comment.md, not posted) together, three rounds
- What it produced: accept on round 3 with all six checks passing
- Difficulties: round 1 rejected the comment for not saying it followed huydhn's dropdown suggestion, and warned that my 60px-to-126px numbers described a wrap my fix doesn't change; round 2 accepted but failed "unknowns-named" because I called #5274 "a search bar" when its diff is the same dropdown approach. It also couldn't find my voice guide through the symlink until I gave it the real path.
- What changed: credited huydhn and #5274 in the plan and comment, reframed the problem as top-level slots, added a Risks section, and predicted the wrap stays at about 126px

---

## Testing Strategy

Three things prove the fix, each run before and after:

1. **The reproduction, re-run.** The same Playwright script at 1920, 1440, 1351, 1350, 1280, 1024 and 768px. Before: four top-level repo links. After: one "Repos ▾" item in their place, and hovering it lists all four repos with the same routes, in both light and dark mode (`torchci/CLAUDE.md` requires both). As planned, the bar is still 126px at 1350px, because the wrap comes from CSS I didn't change.

   ```
   before width=1920: navbar height=60px; repo links: PyTorch@(184,23) ExecuTorch@(268,23) TorchVision@(379,23) Helion@(489,23) CRCR@(561,23)
   after  width=1920: navbar height=60px; visible repo items: Repos ▾@(171,15) CRCR@(262,23)
   after  dark mode, hover Repos: ["PyTorch -> /hud/pytorch/pytorch/main","ExecuTorch -> /hud/pytorch/executorch/main","TorchVision -> /hud/pytorch/vision/main","Helion -> /hud/pytorch/helion/main"]
   ```

   Full output: [after-output.txt](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/after-output.txt); screenshots: [after, 1920px](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/after-navbar-1920.png), [menu open, light](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/after-repos-open-light.png), [menu open, dark](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/after-repos-open-dark.png).

2. **A new test that fails without the fix.** `torchci/test/navBar.test.tsx` checks the four repos are in `repoNavItems` and that the navbar renders "Repos ▾" with no top-level repo links. With the old `NavBar.tsx`: `Tests: 2 failed, 2 total`; on the branch: `Tests: 2 passed, 2 total` ([before](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/navbar-test-before.txt), [after](https://github.com/jupitersnow1/ai301-coursework/blob/main/beat-2-contribution/evidence/navbar-test-after.txt)).

3. **The repo's own CI checks**, from `.github/workflows/torchci.yml`, each run in a fresh shell: `yarn lint`, `yarn prettier --check .`, `yarn tsc`, and `yarn test` all exit 0 on the branch (206 test suites pass, up from 205 on main with the new one).

**Toolkit**

- Tool: my Playwright screenshot script (re-run with a hover step and light/dark mode), jest, and the CI checks from my ship manifest
- What it produced: before/after measurements and screenshots, the new test failing on the old code and passing on the fix, and all four CI checks passing
- Difficulties: the dev server had stopped by the time I re-ran the script (connection refused), so I restarted it; the numbers showed "Repos" 8px above CRCR, which I checked in the screenshot and found was the button's padding, not a misalignment
- What changed: added the 1350/1351 boundary, the hover, and dark mode to the after run so it answers the plan's predictions

---

## Implementation Notes

**2026-11-11 (morning): picked, claimed, reproduced**

Picked #5226 against my scout's reject (its only blocker was #5274, untouched since May 2024). Posted my claim asking devesh-2002 if they're still on it. The first two posting attempts passed my voice guard but failed, because `gh` was using the codespace token; fixed with `gh auth login`. Reproduced on upstream `c901b1dcc`: four top-level repo links, and HUD pages for ao, audio, tutorials, and torchtune with no link.

**2026-11-11: planned**

Decided on one "Repos" dropdown with the existing `NavBarGroupDropdown`, keeping the same four repos so the PR doesn't decide which repos belong. Wrong turn: I first described the 1350px wrap as the problem, but the wrap comes from CSS and won't change. Second wrong turn: I described #5274 as a search bar without reading its diff; it's the same dropdown idea on the old file, so the PR now credits it.

**2026-11-11: built and tested**

Branch `fix/5226-repos-dropdown`. Wrote `test/navBar.test.tsx` first and watched both tests fail on the old code, then exported `repoNavItems` and replaced the four `<li><Link>` items with `<NavBarGroupDropdown title="Repos" items={repoNavItems} />` (commit `1c2c5ed84`, +10/-20 in `NavBar.tsx`). Tightened the test from checking for the word "Repos" to `>Repos ▾</button>` so it can't pass by accident. Ran `yarn format` on the two files. All manifest checks pass in a fresh shell. Commits use my GitHub noreply email.

**Toolkit**

- Tool: Claude Code in my clone, with CLAUDE.local.md loaded (the navbar files and CI commands were already in it), plus jest for test-first
- What it produced: a two-file change (NavBar.tsx and a new test) on its own branch, and these dated notes
- Difficulties: the plan's two wrong turns above (the wrap, and #5274) were caught by plan-check, not by me
- What changed: I now read an earlier PR's diff before describing it

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
