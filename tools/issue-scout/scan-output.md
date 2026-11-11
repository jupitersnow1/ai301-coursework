# Scan output

## Scan 1 — 2026-11-11 (`issue-scout: run a scan`)

Search: q1 (good first issue, Jupyter/conda orgs) returned 10, q2 (help wanted) 21, q3 (documentation) 36; 60 unique after dropping duplicates. Ranking filters left 45. Top 5 graded below, all surfaced by q1 and ranked by "good first issue first, then fewest comments, then most recently updated".

**Accepted**

1. https://github.com/jupyterlab/lumino/issues/449 — Horizontal scrolling for data grid with shift + wheel. Query: q1. Rank signals: good first issue, 0 comments, updated 2026-10-29. Fit: a TypeScript change in one mouse handler, with the fix approach written out by a maintainer, so the scope is clear (your profile asks for exactly that). Preferred: good-first-issue label present.
   - Maintainer alive: pass (jtpio, human, committed 2026-10-08)
   - Repo in use: pass (not archived, release v2026.10.8 on 2026-10-08)
   - Scope fits a newcomer: pass (one handler: "Detect if shift is pressed in onWheel handler and swap dx with dy")
   - Nobody already on it: pass (no assignee, no comments, no PR found by searching the repo's PRs)
   - AI-contribution policy: pass (CONTRIBUTING.md says nothing about AI)
   - No abandoned-attempt history: pass (no PRs ever linked)
   - Concrete spec present: pass (opened by maintainer krassowski with a proposed solution)

**Rejected**

2. https://github.com/jupyter-widgets/ipywidgets/issues/3701 — Lumino deepCopy fallback. Query: q1. Rank signals: good first issue, 1 comment. Sank on **Nobody already on it**: ansaryzafar claimed it on 2026-09-17 and opened PR #4046 the next day. That PR rewrites the same copy code, and the issue doesn't link to it.
3. https://github.com/jupyterlab/jupyter-ai/issues/1327 — Explore PEP 563. Query: q1. Rank signals: good first issue, 1 comment. Sank on **Concrete spec present**: the maintainer wrote "There are a couple of open questions, which is why I think we should explore first before taking action". A 2026-08-15 comment says the v3 restructure has largely made the issue moot.
4. https://github.com/jupyter-widgets/ipywidgets/issues/1669 — Docs for `embed_minimal_html` templates. Query: q1. Rank signals: good first issue, 2 comments. Sank on **Nobody already on it**: open PR #4045 ("docs: describe how to customize the embed_minimal_html template") by the 2026-09-17 claimant. The issue doesn't link to it.
5. https://github.com/jupyterlab/jupyterlab/issues/12178 — Output font size not changing for code cells. Query: q1. Rank signals: good first issue, 5 comments. Sank on **Nobody already on it**: open PR #18978 by nightcityblade, who claimed it on 2026-05-31. Also **No abandoned-attempt history**: closed, unmerged PRs #12537 and #18510, and a thread running from 2022 to 2026.

```json
[
  {"item": "https://github.com/jupyterlab/lumino/issues/449", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "jtpio (human) authored commits on 2026-10-08, 34 days before today"},
    {"name": "Repo in use", "grade": "pass", "evidence": "archived=false; release v2026.10.8 on 2026-10-08; last push 2026-11-01"},
    {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "\"Detect if shift is pressed in onWheel handler and swap dx with dy\": one handler in basicmousehandler.ts"},
    {"name": "Nobody already on it", "grade": "pass", "evidence": "no assignees, 0 comments, no PRs mention #449 or shift/horizontal wheel scrolling"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "CONTRIBUTING.md (102 lines) has no AI policy: silence passes"},
    {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "no linked or mentioned PRs, closed or open"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "enhancement opened by MEMBER krassowski with a concrete Proposed Solution; only open point is Mac handling"},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "labels: enhancement, good first issue"}
  ], "verdict": "accept"},
  {"item": "https://github.com/jupyter-widgets/ipywidgets/issues/3701", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "jasongrout commit 2026-08-19 (84 days)"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release 8.1.9 on 2026-08-18"},
    {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "one call site: widget.ts#L528"},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "claim by ansaryzafar 2026-09-17 followed by open PR #4046 (2026-09-18) replacing the same JSON round-trip copy"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "CONTRIBUTING.md silent on AI"},
    {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "one closed PR (#3768, 2023): a single closed PR does not trigger"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "maintainer names the exact fallback and line"},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "label: good first issue"}
  ], "verdict": "reject"},
  {"item": "https://github.com/jupyterlab/jupyter-ai/issues/1327", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "jarrodmillman commits 2026-11-06"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release v3.2.0 on 2026-09-03; push 2026-11-10"},
    {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "not support, not tracking, no maintainer says core changes"},
    {"name": "Nobody already on it", "grade": "pass", "evidence": "no assignee; the one commenter declined to open a PR"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "PR template states no AI policy; repo has AGENTS.md"},
    {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "no PRs"},
    {"name": "Concrete spec present", "grade": "fail", "evidence": "\"There are a couple of open questions, which is why I think we should explore first before taking action\""},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "label: good first issue"}
  ], "verdict": "reject"},
  {"item": "https://github.com/jupyter-widgets/ipywidgets/issues/1669", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "jasongrout commit 2026-08-19"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release 8.1.9 on 2026-08-18"},
    {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "one docs section"},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "open PR #4045 \"docs: describe how to customize the embed_minimal_html template\" by the 2026-09-17 claimant"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "CONTRIBUTING.md silent on AI"},
    {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "no closed PRs"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "maintainer pbugnion asks for a docs section on writing the template"},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "labels: good first issue, docs"}
  ], "verdict": "reject"},
  {"item": "https://github.com/jupyterlab/jupyterlab/issues/12178", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "jtpio commit 2026-11-09"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release v4.7.0b1 on 2026-11-06"},
    {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "krassowski: allow overriding --jp-code-font-size"},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "open PR #18978 by claimant nightcityblade (claimed 2026-05-31)"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "PR template asks for AI disclosure: a condition, not a ban"},
    {"name": "No abandoned-attempt history", "grade": "fail", "evidence": "closed unmerged PRs #12537 and #18510; thread spans 2022-2026"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "bug report, confirmed by maintainer"},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "label: good first issue"}
  ], "verdict": "reject"}
]
```

## Grade — 2026-11-11 (`issue-scout: grade` the three Issue Selection picks)

All three picks came in direct (by URL), and all three were rejected. Each one already has someone on it.

1. https://github.com/pytorch/test-infra/issues/5226 — A better HUD menu. Sank on **Nobody already on it**: devesh-2002 claimed it on 2024-05-21, a maintainer said "Of course!", and PR #5274 "Improved HUD Menu" is still open. The PR is 2.5 years old, but the rubric's condition is "no open linked PR". The menu has also changed since then (#8246 removed TorchAudio from the top menu in 2026-07).
2. https://github.com/pytorch/pytorch/issues/106571 — Enable more flake8-bugbear lints. Sank on **Scope fits a newcomer**: it's a checklist of 11 lint codes split across contributors, and the maintainer wrote "Even just fixing some would be great". Also sank on **Nobody already on it**: claims on 2026-10-31 and 2026-11-03 are under 21 days old, and #189319 already covers B007.
3. https://github.com/pytorch/pytorch/issues/121587 — Clearer docs for `torch.distributed` vs `torch.distributed.nn`. Sank on **Nobody already on it**: open PRs #199576 and #199544 (both 2026-10-02). Also sank on **No abandoned-attempt history**: closed, unmerged PRs #190317, #190419 and #191531, with a thread running from 2024 to 2026.

```json
[
  {"item": "https://github.com/pytorch/test-infra/issues/5226", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "georgehong, atalman, jathu commits 2026-11-10/11"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release v20261109-232755; push 2026-11-11"},
    {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "one nav-menu redesign; maintainer suggests grouping into dropdowns"},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "open PR #5274 \"Improved HUD Menu\" by claimant devesh-2002 (2024-05-29)"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "CONTRIBUTING.md silent on AI"},
    {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "no closed unmerged PRs"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "opened by maintainer huydhn; direction given: \"grouping similar items into drop down lists\""},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "label: good first issue"}
  ], "verdict": "reject"},
  {"item": "https://github.com/pytorch/pytorch/issues/106571", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "human commits 2026-11-11"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release v2.15.0 on 2026-10-28"},
    {"name": "Scope fits a newcomer", "grade": "fail", "evidence": "checklist of 11 codes split per contributor; maintainer: \"Even just fixing some would be great\""},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "claims 2026-10-31 (PushkarSingh20) and 2026-11-03 (siddardh-core) under 21 days; #189319 covers B007"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "AI_POLICY.md: disclose and contain AI content, a condition not a ban"},
    {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "no closed unmerged PRs linked"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "each lint code is a defined change"},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "label: good first issue"}
  ], "verdict": "reject"},
  {"item": "https://github.com/pytorch/pytorch/issues/121587", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "human commits 2026-11-11"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release v2.15.0 on 2026-10-28"},
    {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "docs note plus docstrings; no maintainer says core changes"},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "open PRs #199576 and #199544 (2026-10-02)"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "AI_POLICY.md: disclosure condition, not a ban"},
    {"name": "No abandoned-attempt history", "grade": "fail", "evidence": "closed unmerged PRs #190317, #190419, #191531; thread spans 2024-2026"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "maintainer wanchaol: \"document torch.distributed collectives does not back propagate gradients\""},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "labels include good first issue"}
  ], "verdict": "reject"}
]
```

## Regrade — 2026-11-11 (after the Unit 6 scope patch: `issue-scout: grade` the same three picks)

The patch swapped "Scope fits a newcomer" for scope-feasible. It changed one grade and no verdicts:

1. https://github.com/pytorch/test-infra/issues/5226 — **reject**. scope-feasible: pass (one menu, one component). Still sinks on **Nobody already on it**: open PR #5274 by the 2024 claimant, untouched since 2024-05-29. It isn't accepted, so the rubric gives it no difficulty note. Scored by hand for choosing, it would be **ambitious**, because the layout is an open design edge: the maintainer only said "I'm thinking grouping similar items into drop down lists could be a great way". My claim has to raise that, and the old claim too.
2. https://github.com/pytorch/pytorch/issues/106571 — **reject**. scope-feasible: **fail** ("a codebase-wide checklist": 11 lint codes, each fixed across the whole tree). Nobody already on it: fail (claims on 2026-10-31 and 2026-11-03).
3. https://github.com/pytorch/pytorch/issues/121587 — **reject**. scope-feasible: pass (one docs note plus docstrings). Still sinks on **Nobody already on it** (open PRs #199576, #199544) and **No abandoned-attempt history** (3 closed unmerged PRs, thread 2024-2026).

```json
[
  {"item": "https://github.com/pytorch/test-infra/issues/5226", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "human commits 2026-11-10/11"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release v20261109-232755"},
    {"name": "scope-feasible", "grade": "pass", "evidence": "one identifiable piece of work: the repo links in torchci/components/layout/NavBar.tsx"},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "open PR #5274 by claimant devesh-2002, no activity since 2024-05-29"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "CONTRIBUTING.md silent on AI"},
    {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "no closed unmerged PRs"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "maintainer-opened; direction: group items into dropdowns"},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "label: good first issue"}
  ], "verdict": "reject"},
  {"item": "https://github.com/pytorch/pytorch/issues/106571", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "human commits 2026-11-11"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release v2.15.0"},
    {"name": "scope-feasible", "grade": "fail", "evidence": "codebase-wide checklist of 11 lint codes"},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "claims 2026-10-31 and 2026-11-03"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "AI_POLICY.md: disclosure condition"},
    {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "no closed unmerged PRs linked"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "each code is a defined change"},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "label: good first issue"}
  ], "verdict": "reject"},
  {"item": "https://github.com/pytorch/pytorch/issues/121587", "checks": [
    {"name": "Maintainer alive", "grade": "pass", "evidence": "human commits 2026-11-11"},
    {"name": "Repo in use", "grade": "pass", "evidence": "release v2.15.0"},
    {"name": "scope-feasible", "grade": "pass", "evidence": "one docs note plus the affected docstrings"},
    {"name": "Nobody already on it", "grade": "fail", "evidence": "open PRs #199576 and #199544"},
    {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "AI_POLICY.md: disclosure condition"},
    {"name": "No abandoned-attempt history", "grade": "fail", "evidence": "closed unmerged #190317, #190419, #191531; thread 2024-2026"},
    {"name": "Concrete spec present", "grade": "pass", "evidence": "maintainer wanchaol states what to document"},
    {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "labels include good first issue"}
  ], "verdict": "reject"}
]
```
