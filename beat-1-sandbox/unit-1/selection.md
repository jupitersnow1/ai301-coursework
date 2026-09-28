# Unit 1 — Issue Selection

Path: `beat-1-sandbox/unit-1/selection.md`

Record of the issue carried into Unit 2, and of the evaluation runs that produced
`eval-run.txt`. This file is graded at the path above; a copy kept anywhere else in
the repository is not read.

Complete every labelled field below. Each is graded on its own; content placed under the
wrong label is not graded.

---

## Selected issue

**Issue link**

https://github.com/codepath/pathreview-ai301-fa26-s3/issues/47

**Verdict output**

```
## Summary

| Issue | Verdict | Key reason |
|---|---|---|
| **#47** — API docs missing curl examples | **Accept** | Bounded doc task, confirmed no examples exist, GFI-labeled, no claim blocks it (house rule) |
| **#55** — Skill extractor misses JS/TS | **Accept** | Confirmed bug (reproduced failing tests), bounded fix in one file, no open PR against it |
| #62 — Health check `redis_host` typo | **Reject** | PR #82 is **open** and formally closes #62 (`closingIssuesReferences` via GraphQL) — someone already has a live fix in flight |

**Ranked read-out (accepted only):**
1. **#47** — fits best: it's a self-contained docs task (a commenter already worked out every endpoint's exact curl invocation in the thread), carries the "good first issue" label, and lines up with your stated goal of getting better at explaining technical work clearly.
2. **#55** — also solid: confirmed bug with root cause already diagnosed in the comments, touches JS/TS detection logic which matches your JS/TS background, but it isn't GFI-labeled and is more debugging/regex work than writing.

**Rejected:** #62 looked identical to #55/#47 on paper (confirmed bug, GFI-labeled, clean repro thread) but PR #82 already exists, is open, and is formally linked via GitHub's closing-keyword mechanism ("Fixes #61, fixes #62") — not just a comment claim, which the Path Review house rule would ignore, but an actual in-flight PR. Taking it risks a wasted PR once #82 merges.

```json
[
  {
    "item": "https://github.com/codepath/pathreview-ai301-fa26-s3/issues/47",
    "checks": [
      {"name": "Maintainer alive", "grade": "pass", "evidence": "Last 5 default-branch commits all authored by human account Aburke225, most recent 2026-09-16 (within 90 days of 2026-09-28)"},
      {"name": "Repo in use", "grade": "pass", "evidence": "Not archived; pushedAt 2026-09-16T21:50:20Z, within 12 months"},
      {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "Body: 'docs/API.md describes each endpoint but has no example invocations' — one file, one cohesive change, not a tracking issue"},
      {"name": "Nobody already on it", "grade": "pass", "evidence": "No assignee; GraphQL closingIssuesReferences for issue 47 is empty (no linked PR); house rule voids the jeff-sp claim comment as a blocker"},
      {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "No CONTRIBUTING.md/AI_POLICY.md/AGENTS.md in repo root (404s); PR template has no AI-disclosure checkbox — silence passes"},
      {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "Zero linked PRs; thread spans only 2026-09-27 to 2026-09-27 (one day)"},
      {"name": "Concrete spec present", "grade": "pass", "evidence": "Body names exact file, gives concrete ask ('example curl commands'), and effort estimate ('2–3 hours'); opener has COLLABORATOR association"},
      {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "Labels include 'good first issue'"}
    ],
    "verdict": "accept"
  },
  {
    "item": "https://github.com/codepath/pathreview-ai301-fa26-s3/issues/55",
    "checks": [
      {"name": "Maintainer alive", "grade": "pass", "evidence": "Same commit evidence as above (repo-level fact)"},
      {"name": "Repo in use", "grade": "pass", "evidence": "Same repo-level fact"},
      {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "Bug confined to `ingestion/parsers/skill_extractor.py`'s `_detect_languages/_detect_tools/_detect_databases`; not a tracking issue"},
      {"name": "Nobody already on it", "grade": "pass", "evidence": "No assignee; GraphQL closingIssuesReferences for issue 55 is empty; house rule voids the ArshAnan claim/repro comments as blockers"},
      {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "Same silence-passes finding as #47"},
      {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "Zero linked PRs; thread spans 2026-09-10 (open) to 2026-09-28 (2 comments, no unresolved multi-year debate)"},
      {"name": "Concrete spec present", "grade": "pass", "evidence": "Confirmed bug: reproducer ran `pytest` and got the exact 5 named failing tests the issue predicted — bug-report auto-pass applies"},
      {"name": "Good-first-issue labeled", "grade": "fail", "evidence": "Labels are 'bug', 'ingestion', 'tier-1' — no 'good first issue' label"}
    ],
    "verdict": "accept"
  },
  {
    "item": "https://github.com/codepath/pathreview-ai301-fa26-s3/issues/62",
    "checks": [
      {"name": "Maintainer alive", "grade": "pass", "evidence": "Same repo-level fact"},
      {"name": "Repo in use", "grade": "pass", "evidence": "Same repo-level fact"},
      {"name": "Scope fits a newcomer", "grade": "pass", "evidence": "Single fix in `api/routes/health.py`'s Redis probe; not a tracking issue"},
      {"name": "Nobody already on it", "grade": "fail", "evidence": "GraphQL: PR #82 (state OPEN) has closingIssuesReferences including issue #62 — a genuine open linked PR, not just a comment claim the house rule would excuse"},
      {"name": "AI-contribution policy allowed", "grade": "pass", "evidence": "Same silence-passes finding as #47"},
      {"name": "No abandoned-attempt history", "grade": "pass", "evidence": "The one linked PR (#82) is open, not closed/unmerged, so the two-closed-PRs trigger doesn't apply"},
      {"name": "Concrete spec present", "grade": "pass", "evidence": "Confirmed bug: five independent commenters reproduced the exact `AttributeError` for `redis_host` against a live Redis instance"},
      {"name": "Good-first-issue labeled", "grade": "pass", "evidence": "Labels include 'good first issue'"}
    ],
    "verdict": "reject"
  }
]
```

---

## Eval iterations

Quote source text directly in each field below. Paraphrase does not satisfy them.

**Run history**

1. `--limit 3` (issue-01, issue-02, issue-03): 2/3
2. `--only issue-01`, after rewording the "Scope fits a newcomer" check: 1/1
3. `--limit 10` (issue-01 through issue-10): 10/10
4. Full run (20 issues): 18/20 — missed issue-15 and issue-20 (scope category 2/4)
5. `--only issue-15,issue-20,issue-09,issue-01,issue-05,issue-10`, after adding the
   "No abandoned-attempt history" and "Concrete spec present" checks: 6/6
6. Full run (20 issues): 18/20 — the previous two fixes were now correct, but issue-16
   and issue-19 newly disagreed (clear-accept category dropped to 6/8): a regression
   from the new "Concrete spec present" check being too broad
7. `--only issue-16,issue-19,issue-20`, after scoping "Concrete spec present" to
   feature/enhancement requests only (bug reports pass automatically): 3/3
8. Full run (20 issues), confirmed and saved with `--save-run`: **20/20** — this is the
   run recorded in `eval-run.txt` (`agreement: 20/20 scored items (bar: 18/20: PASS)`).

**Issue analysis**

`issue-20` (source: `excalidraw/excalidraw#11811`). My rubric's decision: **reject**.
Gold label: **reject**. Gold's note: "one-line feature wish with no spec and a product
decision hiding inside."

My rubric's "Concrete spec present" check produced the same verdict for the same
reason. The issue's own body reads: "Logo asset TBD" and "possibly app wiring in
`excalidraw-app` if needed" — hedging language from the opener (itself a bot account,
`cursor[bot]`) about whether the feature is even needed, not just how to build it.
No maintainer commented on the issue at all (0 comments), so nobody has confirmed the
feature is wanted. My check's pass condition specifically fails a feature/enhancement
request (as opposed to a confirmed bug) when "the ask itself is undecided — hedging
language ('TBD', 'possibly X if needed', ...) ... and no maintainer comment settling
the approach," which is exactly what's present here — the difficulty isn't the size of
the code change, it's that accepting the feature at all is still an open product
decision no maintainer has made.

**Check rationale**

The "Scope fits a newcomer" check, as currently written in `rubric.md`:

> Issue is not a pure usage/support question, no maintainer comment in the thread
> states the fix requires core/internal changes, and it is not a tracking issue whose
> sub-items are meant to be split across separate contributors/PRs — evidenced by
> explicit split language ("pick one to work on", "split into separate issues"),
> checklist items that link out to other issue numbers, or a maintainer directing it
> to be broken up. A single proposal with several concrete steps toward one cohesive
> change (e.g. one new doc page plus the existing pages updated to point to it) is
> still one bounded piece of work, even when written as a numbered or checklist plan.

I wrote it this way because my first draft just said "not a tracking/umbrella issue
listing sub-items," and that wrongly rejected `issue-01` (a docs task written as five
numbered steps toward one cohesive change) as an umbrella issue, when gold said accept.
The evidence guide's own definition of an umbrella issue is one whose sub-items are
"meant to be split into separate work" — the operative word is *meant*. A checklist of
implementation steps within a single proposal isn't the same shape as a tracking issue
whose checkboxes are meant to fan out to different contributors, so the check now asks
for actual evidence of intent to split, not just the presence of a list.

**Trade-offs**

The check's leniency toward "a single proposal with several concrete steps" is exactly
what flips `issue-01` from reject to accept — that's the issue whose result this check
changes. The trade-off: by requiring explicit split language before rejecting a
multi-step issue, the check risks accepting a genuinely oversized piece of work that
never uses split language but is still too big for a newcomer (e.g., a "single
proposal" that actually touches a dozen files across multiple subsystems). It trades
strictness against structure (numbered lists, checklists) for permissiveness on true
size, so a large task disguised as "one cohesive change" without any explicit
splitting cue could still slip through.

---

## Selection rationale

Graded on whether all three are answered, in your own words. Not on how good the
reasoning is, and not on length — a short honest answer to each earns the full marks.
This is also the basis for the claim comment you write in Unit 2.

**Selection rationale**

1. **Fit to interests and time available.** It's a docs issue — adding example `curl`
   commands to `docs/API.md`. That's basically the exact skill I said I want to build:
   explaining technical stuff clearly instead of writing jargon. It's also estimated at
   2-3 hours, which is realistic for a first PR, not something I'll be stuck on for a
   week.
2. **What the verdict identified correctly, and what I weighed that the rubric
   couldn't.** The rubric got the easy stuff right: no assignee, no PR already open on
   it, good-first-issue label, and someone in the comments already figured out the
   working `curl` calls for every endpoint, so I'm not starting from zero. What it
   couldn't weigh: it also accepted `issue-55`, which is honestly a closer match to my
   actual language background (JS/TS), but I want my very first PR to be low-risk on
   the code side so I can focus on learning the claim → PR → review workflow itself,
   not get stuck debugging something in a codebase I don't know yet.
3. **Anticipated difficulty in claiming it.** Writing it shouldn't be hard since the
   groundwork's already in the thread, but I'm not just going to copy-paste someone
   else's `curl` calls into a PR. I want to actually run them against the API myself
   first so I understand what I'm submitting, not just reformat someone else's work.

---

Related paths: `eval-run.txt` in this directory; your skill's files in
`tools/issue-select/`.
