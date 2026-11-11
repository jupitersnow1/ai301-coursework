# Rubric: is this a good first issue?

## Checks

| Check | Evidence | Pass condition | Weight |
|---|---|---|---|
| Maintainer alive | The last 5 default-branch commit dates and authors (repo-facts block, or the repo front page's commit list in live mode) | At least one of the last 5 default-branch commits was authored by a human (non-`[bot]`) account within 90 days of the capture/current date | required |
| Repo in use | `archived:` flag, latest release date, and last push to any branch (repo-facts block, or the repo front page + Releases box in live mode) | Repo is not archived, AND at least one of (a release, a push to any branch) occurred within 12 months | required |
| scope-feasible | Issue body: the work it asks for | The issue describes one identifiable piece of work someone could start: a behavior, a gap, or a task you can point at. It fails only when there is no single piece of work in it: a codebase-wide checklist, an "improve X everywhere", or a container issue tracking many sub-tasks. An open design edge, an "etc.", or several files involved never fails this check; that raises the difficulty note instead. | required |
| Nobody already on it | Assignees, linked PRs, and claim comments (repo-facts block's "this issue: assignees/linked PRs" plus the Comments section, or the Assignees/Development boxes + thread in live mode). In live mode also search the repo's PRs for the issue number (`gh search prs --repo <owner/repo> <number>`) and list each claimant's PRs in that repo, because PRs are often opened without linking the issue | Issue has no assignee, no open PR that addresses it (linked, mentioned, or found by the PR search), and any "I'll take this"-style claim comment is 21+ days old with no follow-up activity since; an open PR by the claimant counts as follow-up | required |
| AI-contribution policy allowed | The "contribution policy" line in the repo-facts block, or `CONTRIBUTING.md` / `AI_POLICY.md` / PR template in live mode | Fails only on an outright ban on AI-generated contributions; disclosure/testing/review conditions pass, and silence (no stated policy) passes | required |
| No abandoned-attempt history | Linked PRs and the comment thread's date span (repo-facts block's "linked PRs" line plus comment dates, or the Development box + thread in live mode) | Fails when the issue carries two or more closed, unmerged linked PRs AND a comment thread spanning multiple years of unresolved discussion — that combination means real difficulty beyond what a friendly label suggests, even though nobody currently holds it. A single closed PR or a short thread does not trigger this | required |
| Concrete spec present | The issue body's own description of the requested change (bundle text, or issue body in live mode) | Only applies to issues framed as a feature/enhancement request, not a bug report: a confirmed bug (something demonstrably broken) passes automatically regardless of how the fix approach is described, since candidate fix approaches are normal engineering discretion, not an unresolved spec. For a feature/enhancement request, fails when the ask itself is undecided — hedging language ("TBD", "possibly X if needed", "not yet identified"), no maintainer sign-off that the feature is wanted, and the requested behavior left unspecified | required |
| Good-first-issue labeled | Issue labels (repo-facts block or issue sidebar) | Issue carries a "good first issue" label or clear equivalent | preferred |

## Difficulty note

With each accepted candidate, report a one-line difficulty note in
the read-out summary:

- **straightforward**: the issue names where the change lives and the
  change is bounded.
- **moderate**: the location is yours to find, or several files are
  involved.
- **ambitious**: an open design edge, or an unfamiliar subsystem;
  name the edge, because claiming this issue means raising it with
  the maintainer early.

The note is information for the chooser, never a verdict input: it
does not appear in the fenced JSON block, it never changes accept or
reject, and in eval mode it is skipped entirely.

## Verdict rule

Accept only if every `required` check grades `pass`. A single `required`
check graded `fail` or `unclear` rejects the issue — an issue you cannot
verify is not a first issue you should take. `preferred` checks never
change the verdict; they only rank issues that are already accepted
(an accepted issue with the good-first-issue label ranks above one
without it, all else equal).
