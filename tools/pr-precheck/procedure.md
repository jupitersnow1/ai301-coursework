# Procedure: how this tool grades a PR package

## Read order

Read the package in this order, and take the notes named at each
step. The plan comes first and the description comes last on purpose:
the side-by-side checks compare what the PR does against what the
plan promised, so build the plan's list before the PR's own story
(which can say "exactly as planned" over a diff that is not) can color
how you read the diff.

1. **Plan.** Read the plan context in full (live: `plan.md`, including
   `## Deviations`). Write three lists:
   - *Planned changes*: one line per thing the plan says it will
     change, with its file or folder ("`src/cli.rs`: map parse errors
     to messages"), including each named test and each docs or
     changelog item. Mark each one `code`, `test`, `docs`, or
     `artifact`.
   - *Out of bounds*: every Not-in-scope line, copied word for word.
   - *Recorded gaps*: every deviation, known limit, or deferral the
     plan records ("NOT covered by this change", "deliberately
     deferred"), copied word for word. Write "none" if there are none.
2. **Test plan.** From the plan's test plan, write a numbered list of
   *Cases to re-run*: each repro command or failure mode the plan says
   it will run on the fix, with the result it expects. List controls
   separately as *Controls*, and the named suite or check command as
   *Suite*. Use the repro-evidence block (live: the student's unit 2
   repro) only to understand what each case triggers.
3. **Repo's stated asks.** Read the repo-facts block (live: the PR
   template and `docs/CONTRIBUTING.md` from `main`, and `scope.md`'s
   house rules). Write:
   - *Template asks*: each section heading and checklist item the PR
     template asks for, and any artifact it requires for this kind of
     change (whatsnew, changelog, release note). "No template" if
     there is none.
   - *Link ask*: the exact form the template asks for the issue link
     ("closes #xxxx", "fixes #"), or "none stated".
   - *AI policy*: what the policy asks about AI use and where (pull
     requests, "any form", comments only, own words, nothing). In live
     mode on Path Review, write "disclosure required in Notes for
     Reviewers (course rule)".
   - *Suite asks*: the test or check commands the repo says to run.
   - *Commit convention*: any stated commit message format.
4. **Thread.** Read the thread highlights (live: the issue's comments).
   Note any maintainer-role direction the plan or PR follows or
   departs from, only as context for reading recorded gaps (a
   deferral "discussed with @maintainer" is a recorded gap). The
   thread does not grade a check on its own.
5. **Diff and commits.** Read the commit list, then the whole diff
   (live: `git log main..HEAD --oneline`, `git diff main...HEAD
   --stat`, then `git diff main...HEAD`).
6. **Test evidence.** Read the test-evidence section (live:
   `test_evidence.md`).
7. **Title and description, last.** Read the PR title and description
   (live: `pr_draft.md`). Do not re-grade the diff from it; every
   sentence in it is a claim to check against what you already read.

## Evidence gathering

Build these pairings in your notes before grading anything. In eval
mode, every fact comes from the bundle text only.

1. **Diff against plan** (for diff-matches-plan). Make a table with
   one row per file in the diff, and for files with several unrelated
   hunks, one row per hunk. For each row write: what the hunk does in
   a few words, and which *Planned changes* line covers it, or "not
   in plan". A hunk is covered when the plan names its file or folder
   AND the hunk does what that plan line says; a planned file does
   not cover an unrelated hunk inside it (a rename pass or a new
   config field in a planned file is "not in plan"). Mark any row
   that touches an *Out of bounds* item. A changelog or release-notes
   hunk the *Template asks* require counts as covered. Then go the
   other way: for each *Planned changes* line, write the diff row
   that delivers it, or "missing", and for each "missing" line, the
   *Recorded gaps* line that records it, or "unrecorded". Copy any
   commit message that names extra work ("refactor", "rename", "add
   ... option", "bump").
2. **Claims against diff and evidence** (for description-true). List
   every factual claim in the title and description, one per line:
   each "added" or "includes" item, each ticked checklist box, each
   fidelity claim ("exactly", "in full", "no other changes", "no
   changes beyond", "no functional changes outside"), and each "not
   added" claim. Next to each, write where it is proven (diff row or
   evidence line) or "not found". A fidelity claim is proven only if
   step 1 found no "not in plan" row and no "unrecorded" missing line.
3. **Evidence against test plan** (for evidence-decisive). For each
   numbered *Cases to re-run* item, copy the line of the test evidence
   that re-runs it: the command or step, and the result shown with
   it. If the evidence runs a different input or path than the case
   (a control, a single-file case, a different method, a different
   flag), write "different path" and what it runs instead. If the
   case is not there, write "absent", plus the *Recorded gaps* line
   or description sentence that says it was left out, if any. Then
   copy the line that shows the *Suite* or *Suite asks* command and
   its result, or write "suite not named".
4. **Debris scan** (for diff-clean). Go through every `+` and `-`
   line and list each of these, with its file: debug prints or logs,
   commented-out code, added functions nothing calls (or marked
   `allow(dead_code)`, prefixed `_unused`), new TODO/FIXME, and hunks
   whose `-` and `+` lines differ only in whitespace, indentation,
   import layout, or not at all. List any file in the diff that is a
   note or scratch file (`plan.md`, `pr_draft.md`, `test_evidence.md`,
   `comment.md`) or build output. A comment that explains why the new
   code works is not debris. Write "none found" if the list is empty.
5. **Asks against PR text** (for repo-standards). For each *Template
   asks* item, write the description line that answers it, or "not
   present". For the *Link ask*, copy the description's issue
   reference, or "not present". For the *AI policy*, copy the
   description's disclosure sentence, or "no disclosure".
6. **Commits** (for commits-readable). Copy each commit message's
   first line and the *Commit convention*.

## Check execution

1. Run the checks in rubric table order: diff-matches-plan,
   description-true, evidence-decisive, diff-clean, repo-standards,
   then commits-readable. Grade every check, even after a required
   check fails, so the output shows all of them.
2. Grade each check from its pairing notes against the rubric's pass
   condition as written. Re-open the package only if a note is
   missing a fact the pass condition names.
3. diff-matches-plan: any "not in plan" row fails it; quote the hunk's
   file and what it does. Any "missing" + "unrecorded" planned line
   fails it; name the line. Otherwise pass.
4. description-true: any claim marked "not found" or contradicted
   fails it; quote the claim and say what the diff shows instead.
   Otherwise pass.
5. evidence-decisive: grade half (a) case by case. A case passes with
   a re-run of that case and a specific result: pasted output, or a
   specific value written next to the command (an exit code, a
   count, an exact message or escape sequence). A case fails if it is
   "different path", if it is "absent" with no recorded reason, or if
   its only result is a general word ("works", "fixed", "passes",
   "matches expected", "verified"). Controls are not graded. Then
   grade half (b) from the suite line. In the evidence line, say which
   case or half decided it.
6. diff-clean: any item on the debris list fails it; quote the line.
7. repo-standards: grade halves (a), (b), and (c) separately and fail
   the check if any fails; say which half decided it. An unticked
   checkbox counts as answered. CLA signing, CI status, and vouching
   are never graded.
8. When the evidence a check needs is genuinely absent from the
   package (no test evidence section, no description), grade `fail`
   and say what is missing. Use `unclear` only when the evidence is
   present but can honestly be read both ways under the pass
   condition, and say what the two readings are. Do not grade
   `unclear` because a check is hard or the package is long.

## Verdict assembly

1. Apply the rubric's verdict rule: accept only if all five required
   checks (diff-matches-plan, description-true, evidence-decisive,
   diff-clean, repo-standards) are `pass`. Any required `fail` or
   `unclear` makes the verdict reject. commits-readable never changes
   the verdict.
2. For a reject, the deciding check is the first failing or unclear
   required check in table order. Lead the summary with it, and make
   its evidence line quote the fact that decided it.
3. Write one evidence line per check in the JSON, each a single line
   quoting or naming the fact that decided it, in table order.
4. In live mode, after the per-check lines and before the JSON block,
   list any voice-guide rule the title or description breaks (quoting
   the rule and the line), then any procedure gaps you hit, then one
   line per failed required check saying what to change. These notes
   never change the verdict.
5. End with the JSON block, and nothing after it.

## Live mode: when a source cannot be reached

1. If the issue thread, the PR template, or `docs/CONTRIBUTING.md`
   cannot be fetched or read, do not guess what they say. Grade every
   check that depends on the missing source `unclear`, say in its
   evidence line which source was unreachable, and tell the student
   which command or approval would unblock it. The verdict rule still
   treats `unclear` as fail.
2. If `git diff main...HEAD` fails because there is no local `main`,
   run `git fetch upstream main` or `git fetch origin main` and diff
   against that ref instead, and say which ref was used.
