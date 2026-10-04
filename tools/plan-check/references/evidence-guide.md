# Evidence guide: where evidence lives in a plan package

## Diagnosis and grounding

- Where it lives: the cause is in the candidate plan's Diagnosis /
  Cause / Problem statement section (first lines of the plan when it
  has no headings), and in any "root cause is" sentence in the plan
  comment. The behavior it must explain is in the repro-evidence
  block: its numbered steps, every "Control" line, and its Expected /
  Actual lines. In live mode, the cause is in `plan.md`'s diagnosis;
  the evidence is the student's posted repro comment on the issue, as
  quoted in the drafts.
- What good looks like: put each repro result next to the stated
  cause and ask "if this cause were true, would this result happen?"
  A grounded cause answers yes for every step and every control, the
  way calib-01's "the commits view is not refreshed after push"
  explains both the stale color (step 3) and the fix on re-entry
  (step 4). A cause is ruled out when a control shows the blamed part
  working: the parser handles the same items without the flag, the
  error system prints for instance methods in the same build, the
  operator yields `[null]` at top level, the zeros are already gone
  before the blamed cast, or the slowness happens with the blamed
  pager out of the loop. A confident cause borrowed from the thread is
  graded the same way: the repro wins.

## Scope

- Where it lives: the plan's Scope / "In scope" / "Not in scope"
  lines, its numbered change list (Proposed changes, Changes,
  Approach), and its Files / areas list. Read them against the
  issue's title and Expected line, and the repro's Actual line. In
  live mode, the scope, files, and approach sections of `plan.md`.
- What good looks like: every item on the change list is needed to
  make the reproduced behavior go away, plus tests for it. Count the
  things the plan will build: a clamp at two sites plus a test is one
  change; "regenerate preloads, upgrade containerd, unify three
  runtimes, add a CI matrix" is a campaign even if one item is the
  real fix. Red flags: "while touching", "while in there", "rather
  than patch just", "fix the class rather than the instance", a new
  option or setting, a migration, a module split. A "Not in scope"
  line that defers the larger rework with a reason is a good sign. A
  plan that only documents a workaround does not fix the issue.

## Executability

- Where it lives: the plan's Files list, its Approach / Steps, and
  named functions or code paths inside the Diagnosis or Change lines.
  In live mode, the files and approach sections of `plan.md`.
- What good looks like: the plan says where (a file, a function, a
  module, a code path like "the erase-scrollback branch of
  `EraseInDisplay`") and what (one chosen change: "append `--` before
  the file path", "compare against the cache's stored timestamp").
  "Exact function to be pinned while tracing, inside the named
  attach path" is still executable. Steps that are all verbs of
  looking ("investigate", "profile", "try different", "look at what
  changed"), an unchosen location ("somewhere", "not sure which
  layer"), or an unchosen option ("whichever is easier") mean a
  stranger cannot start.

## Test plan

- Where it lives: the plan's Test plan / Test line, read against the
  repro-evidence block's steps, controls, and Actual line. In live
  mode, the test plan section of `plan.md` read against the posted
  repro comment's commands and output.
- What good looks like: the test re-runs the repro steps (or turns
  them into a test) and names the result that proves the fix: "exit
  0 and drawn output", "the three commands print `1`, `{}`, `true`",
  "the color flips at step 3 without leaving the view", "sync
  succeeds 10 of 10 runs". Re-running the controls unchanged is a
  bonus. A vague test names no result that could fail: "should feel
  fast", "works correctly", "nothing else feels broken", or only "run
  the full suite and nothing regresses".

## Honesty

- Where it lives: the plan's Risk / Unknowns / open-question lines,
  and certainty language in the plan comment ("the root cause is",
  "confirmed", "should be a small PR"). In live mode, the risks
  section and `## Deviations` in `plan.md`; a deviation recorded
  there after the build is graded as part of the plan.
- What good looks like: unknowns are named as unknowns ("I have not
  verified which layer clamps the viewport", "I have not measured the
  cost yet") with what the author will do about them. False
  confidence is a cause or result stated as settled that the package
  does not show. "Risk: none identified" with a reason is honest; a
  missing risks line is not a failure by itself.

## Comms

- Where it lives: the candidate plan comment, read against the
  Thread highlights (each line starts with a date, author, and role
  in parentheses) and against the repo-facts block's
  "contribution policy" line. In live mode, the draft `comment.md`
  against the issue thread on GitHub (author association shows the
  role) and the repo's CONTRIBUTING / AI policy files, plus the house
  rules in `scope.md`.
- What good looks like: when an OWNER, MEMBER, COLLABORATOR, or
  CONTRIBUTOR has given direction (named the culprit file, proposed
  or rejected an approach, posted a test build, asked for testing,
  called it working as intended), the comment names that direction
  and either follows it or says why not, the way pkg-05's comment
  says "along the lines already agreed here". A comment that pitches
  a different plan as if the maintainer never spoke fails. Comments
  from users with role NONE are context, not direction. For AI use,
  read what the policy actually asks: only a policy requiring
  disclosure in comments or "in any form" needs a disclosure line
  like "I used Claude Code to help draft this plan; I reviewed every
  step". Policies that welcome AI, ask you to understand your work,
  ask for human-written comments, or ask for disclosure only in pull
  requests do not.
