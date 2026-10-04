# Procedure: how this skill grades a plan package

## Read order

1. Read the repro-evidence block first, before the plan. Write down
   a numbered list of every step and every control run with its
   result in one line each (for example "control: same items, no
   `-v` flag, parses fine"). Also note the Actual line. This list is
   what the diagnosis and the test plan get graded against, so build
   it before the plan's own story can color how you read the
   evidence.
2. Read the issue section: title, the reported behavior, and the
   Expected line. Note in one line what "fixed" means for this issue.
3. Read the thread highlights. List every comment whose author role
   is OWNER, MEMBER, COLLABORATOR, or CONTRIBUTOR and that gives
   direction (names a culprit or fix site, proposes or rejects an
   approach, posts a patch or test build, asks for testing, says
   "works as intended"). Write "no maintainer direction" if there is
   none.
4. Read the repo-facts block's contribution policy line. Write down
   exactly what it asks about AI use and where (comments, "any form",
   pull requests only, or nothing).
5. Read the candidate plan, then the candidate plan comment, last.

In live mode, steps 1 to 4 come from: the student's own posted
repro comment (as quoted in the drafts) for step 1, the issue page
for steps 2 and 3, and the repo's policy files for step 4: read
`CONTRIBUTING.md` or `docs/CONTRIBUTING.md`, `AI_POLICY.md` or any
file whose name mentions AI, and the `.github` issue and PR
templates. Classmates' claim and repro comments on the same issue
are context only; never use them as the repro evidence (house rule
in `scope.md`), and a classmate's plan does not count as maintainer
direction. Read `scope.md` before step 1 and stop if the repo is out
of scope.

## Evidence gathering

For each check, pull these facts into notes before grading. Use only
the package text in eval mode.

1. diagnosis-grounded: copy the plan's stated cause in one sentence
   (from Diagnosis / Cause / the first lines of the plan, plus any
   "root cause" claim in the comment). Next to it, put your step-1
   list of repro steps and controls.
2. scope-bounded: list every separate thing the plan says it will
   build or change (one line each, from the change list, scope lines,
   and files). Mark each "needed for the fix", "test for the fix", or
   "extra". Copy any Not-in-scope line.
3. executable: copy the named files, functions, or code paths, and
   the one-sentence approach. Copy any wording that leaves the
   location or the choice open.
4. test-decisive: copy the test plan's success criteria word for
   word.
5. thread-and-policy: put your step-3 maintainer-direction list next
   to the plan comment, and quote the sentence in the comment that
   engages each direction (or write "not mentioned"). Put the step-4
   policy note next to any AI disclosure sentence in the comment (or
   write "no disclosure").
6. unknowns-named: copy the plan's risk or unknowns lines, if any.

## Check execution

1. Run the checks in table order: diagnosis-grounded, scope-bounded,
   executable, test-decisive, thread-and-policy, then unknowns-named.
   Grade every check, even after a required check fails, so the
   output shows all of them.
2. Grade each check only from the notes gathered for it, against the
   rubric's pass condition as written. Re-open the package only if
   the notes are missing a fact the pass condition names.
3. diagnosis-grounded: for each repro step and control, ask "if the
   plan's cause were true, would this result happen?" One "no" is a
   fail; quote that step or control as the evidence. A cause that
   goes beyond the evidence but fits every result passes.
4. scope-bounded: any item marked "extra" is a fail; quote it. A plan
   whose only change is documentation of a workaround fails.
5. executable: fail if the location or the approach is left open;
   quote the open wording. A named area with the exact function left
   as a stated unknown passes.
6. test-decisive: pass only if the criteria name a specific
   observable result tied to the reproduced behavior.
7. thread-and-policy: grade half (a) and half (b) separately and fail
   the check if either fails. In the evidence line, say which half
   decided it.
8. If the evidence a check needs is genuinely absent from the package
   (for example, no test plan at all), grade it `fail` and say what
   is missing. Use `unclear` only when the evidence is present but
   can honestly be read both ways, and say what the two readings are.

## Verdict assembly

1. Apply the rubric's verdict rule: accept only if all five required
   checks are `pass`. Any required `fail` or `unclear` makes the
   verdict reject. unknowns-named never changes the verdict.
2. For a reject, name the first failing required check in table
   order as the deciding check and quote the fact that decided it in
   that check's evidence line.
3. Write one evidence line per check in the JSON, each quoting the
   fact or sentence that decided it.
4. In live mode, before the JSON block, list any voice-guide rule
   the draft comment breaks, quoting the rule. This never changes the
   verdict.
5. End with the JSON block, and nothing after it.

## Live mode: when a source cannot be reached

1. If the issue thread, the posted repro comment, or the repo's
   policy files cannot be fetched in live mode, do not guess what
   they say. Grade every check that depends on the missing source
   `unclear`, say in its evidence line which source was unreachable,
   and tell the student which command or approval would unblock it.
   The verdict rule still treats `unclear` as fail.
