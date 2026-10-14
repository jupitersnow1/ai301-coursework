# Evidence guide: where evidence lives in a PR package

## Plan fidelity (harness category: silent-drift)

- Where it lives, eval bundle: the plan side is the "Plan context"
  section: its Plan paragraph names the change, a "Files:" list, a
  "Not in scope:" sentence, and any "Known limit", "deferred", or
  deviation note. The PR side is "Candidate PR": the Diff (one
  `--- a/` / `+++ b/` header per file), the Commits list, and the
  Title and Description, whose fidelity claims ("Implements the plan
  on #N exactly", "in full", "No other behavior changes") are read
  against the diff here.
- Where it lives, live: `plan.md`'s Scope, Files, Approach, and
  `## Deviations` sections; `git diff main...HEAD --stat` and the full
  `git diff main...HEAD` on the branch; `git log main..HEAD --oneline`;
  and `pr_draft.md`'s Summary and Changes bullets. For issue #47 the
  plan names one file, `docs/API.md`, and its Deviations record the
  36-fence count and the `/health` note.
- What good looks like: every file and hunk in the diff traces to one
  plan line or one deviation note, and every plan deliverable is in
  the diff or recorded as left out, as in pkg-02 (`console.py`, the
  test, the `CHANGELOG.md` entry, all three named in the plan).
  Silent drift, more than the plan: a hunk the plan never names, even
  inside a planned file, such as calib-03's `print/property.js`
  rewrite, pkg-03's new `resolve_symlinks` option (scoped out by the
  plan), pkg-06's rename pass and settings field, pkg-09's new
  `--time-format` flag. Commit titles often name it ("refactor",
  "add ... option"). Silent drift, less than the plan: a planned
  deliverable missing with no note, such as pkg-17's docs page, made
  worse when the description says it is there ("now documents the
  limitation"). An honest deviation re-ties the mismatch: pkg-13
  leaves `%VAR%` unhandled, but the plan recorded it as a known limit
  and the description restates it, so it is ready.

## Test evidence (harness category: not-tested)

- Where it lives, eval bundle: the plan's test plan is the "Test
  plan:" sentence at the end of "Plan context", and the repro steps it
  re-runs are in the "Repro evidence" paragraph above it. The proof is
  the "Test evidence" section at the end of "Candidate PR": fenced
  command blocks and the prose after them. The repo's suite ask is in
  "Repo facts" (pull requests and contribution lines).
- Where it lives, live: the plan's `## Test plan` in `plan.md`, the
  before (on `main`) and after (on the branch) runs pasted in
  `test_evidence.md`, and the output of the four checks the Path
  Review template lists: `make test-unit`, `make test-integration`
  (expected "no tests ran", pasted as is), `make lint`, `make
  typecheck`. The same output is pasted into the Testing section of
  `pr_draft.md`.
- What good looks like: each failing case the test plan names is
  re-run, with the same command or step, and shows a specific result:
  pkg-16's transcript prints the error and `$?` = 1; pkg-19's `diff`
  prints `IDENTICAL`; pkg-20 states `# after: ESC[?997;1n (dark)` next
  to the command, which is a specific value. The repo's suite is run
  by name with a result ("`cargo test -p ignore` passes (214 tests)").
  Not tested: no command at all (pkg-04 "colors work now", pkg-10
  "verified working on my machine for a full day"); the control or an
  unchanged path run instead of the bug (pkg-07 runs the single-file
  case when the bug needs two files; pkg-14 runs a GET when the bug is
  a POST); a named case silently skipped (calib-04 never re-runs repro
  2, the `--exec` abort); "all tests pass" with nothing named.

## Diff quality (harness category: unreviewable)

- Where it lives, eval bundle: the `+` and `-` lines of the Diff in
  "Candidate PR", and the Commits list ("wip", "fmt + cleanup", "misc
  cleanups while debugging" are pointers to debris).
- Where it lives, live: `git diff main...HEAD` line by line, and
  `git diff main...HEAD --stat` for stray files (none of `plan.md`,
  `comment.md`, `pr_draft.md`, `test_evidence.md` may appear).
- What good looks like: every changed line is the fix, its test, or a
  required artifact, and a reviewer can read the fix in one pass, as
  in pkg-11's one trim helper and its test. Debris tells: debug
  output (`eprintln!("DEBUG accept err = ...")` in pkg-15),
  commented-out code (`// eprintln!(...)` in pkg-12 and pkg-18, a
  commented-out first attempt "keeping for reference"), dead helpers
  (`fn _unused_buffer_probe`, `#[allow(dead_code)] fn
  count_open_fds`), a new `// TODO: ring buffer?`, and churn: import
  blocks restructured, lines re-indented, or byte-identical lines
  removed and re-added (pkg-18). A comment explaining why the new
  code does what it does (pkg-13's note on the `%VAR%` gap, pkg-19's
  emitter comment) is not debris.

## Standards and comms (harness category: standards-wall)

- Where it lives, eval bundle: the "Repo facts" block: the "pull
  requests:" line (template sections, required checklist, required
  artifacts like a whatsnew or changelog entry, closing-line format)
  and the "contribution policy" line (including any AI policy). The
  PR side is the Description (section headings, checklist, issue
  reference, disclosure sentence) and the Diff (for required
  artifacts).
- Where it lives, live: `.github/PULL_REQUEST_TEMPLATE.md` on `main`
  (Summary, Issue with `Closes #`, Changes, Testing checklist,
  Screenshots / Demo, Notes for Reviewers), `docs/CONTRIBUTING.md`
  (branch naming `<type>/<issue>-<desc>`, Conventional Commits, the
  four `make` checks, remove a seeded bug's xfail marker), and
  `scope.md`'s house rules. The course requires an AI-use disclosure
  in Notes for Reviewers. The PR side is `pr_draft.md`.
- What good looks like: every section the template asks for is there
  with real content, and every required artifact is in the diff;
  pkg-08 answers each lazygit checklist item ("cheatsheets regenerated
  (no binding changes, no diff)"). The issue is linked in the form the
  template asks for (pkg-16's "fixes #23471"). Where the policy asks
  for AI disclosure, the description says what was used and how far,
  in the author's words (pkg-11: "this change was AI-assisted with me
  reviewing and understanding every line, and this text is in my own
  words"). An unticked box is an honest answer, so Path Review's CI
  box left unticked before CI runs is fine. Standards wall: a
  technically strong PR that ignores the stated asks, such as pkg-01
  (pandas requires "closes #xxxx", the checklist, and a whatsnew entry;
  none present) and pkg-20 (ghostty requires disclosing "all AI usage
  in any form"; the description has no disclosure). Requirements
  outside the PR text (CLA, CI status, vouching) are not graded.
