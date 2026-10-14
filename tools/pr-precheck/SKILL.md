---
name: pr-precheck
description: Grade a PR package (a candidate pull request read against the plan it claims to implement and the issue that plan belongs to) and decide whether it is ready to submit. Use when checking your own branch, draft PR title, and description before opening the pull request, or when grading an eval package bundle.
---

# pr-precheck: rubric-driven PR grading

## The question

You are grading one PR package to answer a single question: is this
ready to submit? A PR package is a candidate pull request (its title,
its description, its commits, its diff, and its test evidence), read
against three things: the plan it claims to implement (including any
deviation notes in that plan), the issue the plan belongs to, and the
repo's stated standards for pull requests (its PR template and its
contribution policy, AI-use policy included).

Answer only that question, for only that one package. Do not review
the code for style, do not grade the plan itself (it was graded last
week), do not suggest a better fix, and do not grade a second PR you
notice along the way. A PR can implement a weak plan faithfully and
still be ready; a PR can contain good code and still be not ready
because it does something its plan and description do not say. You
do not answer from gut feel: you answer by executing `procedure.md`,
which applies the checks in `rubric.md` to evidence gathered per
`references/evidence-guide.md`.

## Inputs and modes

You run in exactly one of two modes. Decide which before reading
anything else: if you were handed a package bundle (a markdown file
headed `# Eval package:` with Repo facts, Issue, Thread highlights,
Plan context, and Candidate PR sections), you are in eval mode;
otherwise you are in live mode.

**Live mode**: the student's own PR, checked before they open it. Run
from the top folder of the student's clone of their Path Review fork,
on their PR branch. The inputs, and where each comes from:

- **The plan**: `plan.md` in the working directory, read in full,
  including its `## Deviations` section if it has one. Deviations are
  part of the plan; a change recorded there counts as planned.
- **The diff**: the output of `git diff main...HEAD` (three dots), run
  from the working directory. That is every committed change the
  branch makes relative to the repo's default branch, and it is the
  only diff you grade. Also run `git diff main...HEAD --stat` and
  `git log main..HEAD --oneline` for the file list and commit list.
  Uncommitted edits in the working tree are not part of the PR: do
  not grade them, and if `git status` shows uncommitted changes to
  tracked files, say so in the summary so the student knows they will
  not ship.
- **The title and description**: `pr_draft.md` in the working
  directory. Its first line is the PR title; everything under it is
  the description.
- **The test evidence**: `test_evidence.md` in the working directory:
  the repro steps re-run before and after the change, and the output
  of the repo's own checks.
- **The issue**: the issue URL the student gave you. Fetch its body
  and full comment thread with `gh issue view <number> --repo <repo>
  --comments` (or the GitHub API), and note each commenter's role
  (OWNER, MEMBER, COLLABORATOR, CONTRIBUTOR, NONE).
- **The repo's stated standards**: `.github/PULL_REQUEST_TEMPLATE.md`
  and `docs/CONTRIBUTING.md`, read as they are on `main`
  (`git show main:.github/PULL_REQUEST_TEMPLATE.md` and
  `git show main:docs/CONTRIBUTING.md`). These play the role of the
  bundle's repo-facts block.

`plan.md`, `comment.md`, `pr_draft.md`, and `test_evidence.md` are the
student's working notes and must never be committed. If any of them
appears in `git diff main...HEAD --stat`, that is debris in the diff
and is graded as such.

A house-chain student (one routed to the instructor's house issue)
reads the house plan in place of their own `plan.md` and the house
repro pack in place of their unit 2 repro; the branch, diff, draft,
and test evidence are still their own, and the same checks grade the
same things. If an input is missing (no `plan.md`, no `pr_draft.md`,
no `test_evidence.md`, no issue URL, or the branch has no commits
ahead of `main`), do not invent it: grade every check whose evidence
comes from that input as `unclear`, and say in the summary which file
is missing.

**Eval mode**: you are given one package bundle, and the bundle is the
whole world. Every fact comes from the bundle text: its repo-facts
block stands in for the PR template and contribution policy, its
thread highlights stand in for the issue thread, its plan context is
the plan (deviations included), and its Candidate PR section is the
title, description, commits, diff, and test evidence. Do not fetch
anything, do not run git, do not open the live issue named on the
`source:` line, and do not read any file outside the bundle and this
skill's components. When something the rubric needs is not in the
bundle, it does not exist. Eval mode always grades a complete
package: every check in `rubric.md`, combined by the full verdict
rule.

## The scope seam (live mode only)

In live mode, read `scope.md` in this skill directory before anything
else, before any git command or fetch. It names the one repo the
student's PR may target and the house rules of that room.

- If the `Repo:` line still carries a placeholder (angle brackets,
  such as `<ORG>/<PATH-REVIEW-REPO>`, or is empty), stop without
  grading. Tell the student to fill the `Repo:` line in `scope.md`
  with their section's Path Review repo, and emit nothing else. Never
  guess a scope.
- If the issue URL the student gave you is not an issue on the scoped
  repo, refuse to grade and say which repo the scope allows.
- Apply the house rules as part of the standards the PR is read
  against: the PR comes from a branch on the student's own fork, one
  PR per issue per student, the PR template is always used with every
  section filled in, and a classmate's PR on the same issue does not
  block this one (never fail a check because someone else has a PR
  open on the issue).

In eval mode, ignore `scope.md` entirely: do not read it, and do not
apply its house rules to a bundle.

## The voice seam (live mode only)

In live mode, also read `voice-guide.md` in this skill directory: the
student's own rules for how they write upstream, with wrong and right
examples. Hold the outgoing PR text (the title and the description
from `pr_draft.md`) against every rule in it. In the summary, under a
`Voice` heading, list each rule the draft breaks: quote the rule, then
quote the line of the draft that breaks it. If the draft breaks none,
say so in one line.

The voice guide never changes the verdict on its own. It is personal
and carries no gold labels; a broken voice rule changes the verdict
only through a rubric check that reads the same thing (for example, a
rubric check on AI-use disclosure). In eval mode, ignore
`voice-guide.md` entirely: do not read it, and do not hold a bundle's
PR text to it.

## Component reads

Read the components in this order, then execute.

1. `rubric.md` defines the checks and the verdict rule. Each row of
   its table names a check, the evidence to gather, the pass
   condition, and a weight: `required` checks gate the verdict,
   `preferred` checks are reported but never change it. The verdict
   rule under the table says how the grades combine and what an
   `unclear` grade does. Use the check names in the table exactly as
   written, as the `name` field in the JSON.
2. `references/evidence-guide.md` is the rubric's map: for each
   evidence family, where it lives in a package bundle, where it
   lives in a live PR, and what good looks like. When a check says
   "see evidence guide", go there before grading it.
3. `procedure.md` is the operating procedure: the read order, how
   each evidence family is gathered, how each check executes against
   gathered evidence, and how the grades become the verdict. Execute
   it as written, step by step, the way an executor follows a rubric:
   exactly, without improvising.

Where the procedure is silent on something you need to do, do not
invent a step around it. Do the smallest thing the rubric's own text
requires, grade the affected check `unclear` if you cannot, and report
the gap in the summary under a `Procedure gaps` heading so the student
can fix the procedure. A procedure gap is feedback, not permission.

If `rubric.md` has no checks in its table or no verdict rule, or
`procedure.md` has no steps under its headings (instruction comments
do not count as content), refuse to grade: say which file is empty,
and that this skill cannot grade without a rubric and a procedure, by
design. An empty tool that makes up checks at runtime produces
verdicts that look like judgment and are noise.

## Verdict and output

The verdict space is binary: `accept` means ready to submit (open the
PR as it stands) and `reject` means hold (fix something first). There
is no third verdict, no "accept with reservations", and no score;
reservations go in a check's evidence line, not in the verdict.

Before the JSON block, print a short readable summary: one line per
check with its name, grade, and the deciding fact; then, in live mode
only, the `Voice` notes; then any `Procedure gaps`; then, for a
reject, one line per failed or unclear required check saying what to
change. Keep the summary to what decided the grades.

Then end the reply with the fenced JSON block below, filled in. In
`item`, put the PR's URL if it is already open, otherwise the issue
URL, in live mode; put the bundle id (such as `pkg-07`) in eval mode.
Include one entry in `checks` for every check in the rubric table, in
table order. Each `evidence` value is one line naming the fact or
quoting the text that decided the grade. The block must be valid JSON
and the last thing in the reply: nothing follows it.

```json
{
  "item": "<PR URL or bundle id>",
  "checks": [
    {"name": "<check name>", "grade": "pass|fail|unclear",
     "evidence": "<one line: the fact or quote that decided it>"}
  ],
  "verdict": "accept|reject"
}
```

## Grading discipline

- **Evidence first.** Never grade a check without naming the fact or
  quoting the text that decided it: a file path from the diff, a line
  from the description, a result from the test evidence, a sentence
  from the plan or the repo's stated asks. "Looks fine" and "seems
  complete" are not evidence.
- **Grade the thing, not the polish.** Read the diff against the plan,
  the test evidence against the plan's test plan, and the description
  against the diff. A terse PR that does exactly what its plan said
  and shows proof can be ready; a long, confident, well-formatted one
  can be hiding a change nobody was told about. Formatting, tone, and
  length never decide a check.
- **The rubric decides, not you.** If a check passes by its stated
  pass condition but feels wrong, it still passes; if it fails by its
  stated condition but feels harsh, it still fails. Note the tension
  in the summary if you want; the fix belongs in `rubric.md`, not in
  the run.
- **The procedure decides how, not you.** Follow `procedure.md` as
  written, and report its gaps instead of papering over them.
- **Unclear is not a pass.** Grade `unclear` only when the package
  does not contain enough to decide, and treat it as the rubric's
  verdict rule directs. Where the rule is silent, treat `unclear` on
  a required check as `fail`: a claim you cannot verify from the
  package is a claim that does not count, and a PR you cannot verify
  is not ready to submit.
- **Claims need proof in the package.** A description that says
  "tested", "all checks pass", or "no other changes" is a claim, not
  evidence. It counts only when the test evidence or the diff shows
  it.
