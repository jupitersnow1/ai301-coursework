# Rubric: is this a good first issue?

## Checks

| Check | Evidence | Pass condition | Weight |
|---|---|---|---|
| Maintainer alive | The last 5 default-branch commit dates and authors (repo-facts block, or the repo front page's commit list in live mode) | At least one of the last 5 default-branch commits was authored by a human (non-`[bot]`) account within 90 days of the capture/current date | required |
| Repo in use | `archived:` flag, latest release date, and last push to any branch (repo-facts block, or the repo front page + Releases box in live mode) | Repo is not archived, AND at least one of (a release, a push to any branch) occurred within 12 months | required |
| Scope fits a newcomer | The issue body and comment thread (bundle text, or issue page + thread in live mode) | Issue is not a pure usage/support question, no maintainer comment in the thread states the fix requires core/internal changes, and it is not a tracking issue whose sub-items are meant to be split across separate contributors/PRs — evidenced by explicit split language ("pick one to work on", "split into separate issues"), checklist items that link out to other issue numbers, or a maintainer directing it to be broken up. A single proposal with several concrete steps toward one cohesive change (e.g. one new doc page plus the existing pages updated to point to it) is still one bounded piece of work, even when written as a numbered or checklist plan | required |
| Nobody already on it | Assignees, linked PRs, and claim comments (repo-facts block's "this issue: assignees/linked PRs" plus the Comments section, or the Assignees/Development boxes + thread in live mode) | Issue has no assignee, no open linked PR, and any "I'll take this"-style claim comment is 21+ days old with no follow-up activity since | required |
| AI-contribution policy allowed | The "contribution policy" line in the repo-facts block, or `CONTRIBUTING.md` / `AI_POLICY.md` / PR template in live mode | Fails only on an outright ban on AI-generated contributions; disclosure/testing/review conditions pass, and silence (no stated policy) passes | required |
| No abandoned-attempt history | Linked PRs and the comment thread's date span (repo-facts block's "linked PRs" line plus comment dates, or the Development box + thread in live mode) | Fails when the issue carries two or more closed, unmerged linked PRs AND a comment thread spanning multiple years of unresolved discussion — that combination means real difficulty beyond what a friendly label suggests, even though nobody currently holds it. A single closed PR or a short thread does not trigger this | required |
| Concrete spec present | The issue body's own description of the requested change (bundle text, or issue body in live mode) | Only applies to issues framed as a feature/enhancement request, not a bug report: a confirmed bug (something demonstrably broken) passes automatically regardless of how the fix approach is described, since candidate fix approaches are normal engineering discretion, not an unresolved spec. For a feature/enhancement request, fails when the ask itself is undecided — hedging language ("TBD", "possibly X if needed", "not yet identified"), no maintainer sign-off that the feature is wanted, and the requested behavior left unspecified | required |
| Good-first-issue labeled | Issue labels (repo-facts block or issue sidebar) | Issue carries a "good first issue" label or clear equivalent | preferred |

## Verdict rule

Accept only if every `required` check grades `pass`. A single `required`
check graded `fail` or `unclear` rejects the issue — an issue you cannot
verify is not a first issue you should take. `preferred` checks never
change the verdict; they only rank issues that are already accepted
(an accepted issue with the good-first-issue label ranks above one
without it, all else equal).
