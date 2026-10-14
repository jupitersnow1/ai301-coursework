# Unit 4 — Test and Submit

Path: `beat-1-sandbox/unit-4/pull-request.md`

Record of the pull request you opened against the Path Review repo, and of the evaluation
runs that produced `eval-run.txt`. This file is graded at the path above; a copy kept
anywhere else in the repository is not read.

Complete every labelled field below. Each is graded on its own; content placed under the wrong
label is not graded.

---

## Your pull request

**Pull request**

https://github.com/codepath/pathreview-ai301-fa26-s3/pull/234

**Branch**

`docs/47-api-curl-examples`

## Eval iterations

Answer all four sections. Quote source text directly; paraphrase does not satisfy these
fields.

**Run history**

Starting point: my group's activity worksheet on `calib-03`. Its "no" rows were all in the
Claims table (rows 5, 8, 9, 11, 12, 13), and they became `description-true` and
`evidence-decisive`. Rereading it against the package, we got Files row 2 wrong: we wrote
"yes" for `src/language-js/print/property.js`, but the plan's Files list is
`statement.js`, `tests/format/js/if/`, and a changelog, so that hunk is an unplanned
rewrite. That is what `diff-matches-plan` is built to catch.

0. A first targeted run crashed before grading anything (`FileNotFoundError: [Errno 2] No
   such file or directory: 'claude'`): my rebuilt Codespace had no `claude` on the PATH.
   No packages were graded, so it has no score.
1. Targeted run, `--include-calibration --only
   pkg-11,pkg-13,pkg-16,pkg-08,pkg-01,pkg-20,calib-03,calib-04`, picked to test the
   riskiest parts of the rubric before paying for a full run: **6/6** scored items
   (`categories: clear-accept 4/4  standards-wall 2/2`), and both calibration packages
   agreed (`calib-03` reject on `diff-matches-plan`, `calib-04` reject on
   `evidence-decisive`).
2. Full run with `--save-run eval-run.txt`: **18/20** (`categories: clear-accept 5/7
   not-tested 4/4  silent-drift 4/4  standards-wall 2/2  unreviewable 3/3`, `agreement:
   18/20 scored items  (bar: 18/20: PASS)`). The two misses were `pkg-02` (`failed:
   diff-clean`) and `pkg-05` (`failed: evidence-decisive`). This is the run in
   `eval-run.txt`.

I did not revise after run 2. It already met the bar with every category matched, and any
edit to `rubric.md` would change its fingerprint, so I would have needed canary re-grades
and a second full run to submit files that match the run. I explain both misses below
instead.

**Package analysis**

`pkg-02` (source: `Textualize/rich#4208`, category `clear-accept`). My rubric's decision:
**reject**. Gold label: **accept**.

The PR fixes `save_text`, `save_html`, and `save_svg` so they clear the record buffer only
after the write succeeds. Four checks passed: the diff touches only the plan's three files
(`rich/console.py`, `tests/test_console.py`, `CHANGELOG.md`), the description's claims
hold, the before/after output is shown, and the template's changelog ask is met.

It failed `diff-clean`, and the grader's evidence line was: "The save_html and save_svg
hunks remove and re-add identical lines (`html = self.export_html(`, `theme=theme,`, `svg =
self.export_svg(`, `title=title,`), with only clear=clear -> clear=False changing." The
grader matched those hunks to the churn rule in my pass condition: "whitespace-only,
re-indent, import-reordering, or identical-line remove-and-re-add hunks on code the fix
does not change". But that rule is about code the fix does not change, and these hunks are
the fix: `clear=clear` becoming `clear=False` is the whole point of the PR. The identical
lines are just how the diff shows the call around the changed argument. So my rubric read
it as debris because the pass condition names the shape of churn ("identical-line
remove-and-re-add") without saying that a hunk with even one real change is not churn. The
gold is right and my wording was too loose.

**Check rationale**

The `evidence-decisive` check, as it reads in `rubric.md`:

> | evidence-decisive | The test evidence, read against the plan's test plan and the repro evidence it built on. See evidence guide: Test evidence. | (a) Every failing case the plan's test plan says it will re-run (each repro command, each named failure mode, not the controls) is shown re-run on the changed code, as the command or concrete step that triggers the reported bug, with a specific observable result on it: printed output, an exit code, a value, a count, or an exact message, either pasted or stated as a specific value right next to the command (`# after: ESC[?997;1n (dark)` counts). "Works now", "fixed", "colors work", "verified on my machine", "matches expected", or a run that only exercises the control or an unchanged path (a different input, a single-file case when the bug needs two files, a GET when the bug is a POST) does not count. A plan case left out passes only if the plan's deviation notes or the description say it was left out and why. (b) The repo's own test command (or the suite the plan names) is shown run by name with a result; a failing or skipped check reported with its reason counts. "All tests pass" with no command named fails (b). If neither the repo's stated asks nor the plan name a test command or suite, (b) passes. | required |

It reads this way because I rejected one rule from our worksheet. The worksheet said "For
the Test evidence rows, a yes needs a command and its printed output. A note after #
saying what it printed doesn't count." But two gold accepts use exactly that style:
`pkg-11` writes `# after: searches normally, no error` and `pkg-13` writes `-- after:`
lines with the exit code. A check that banned `#` notes would reject both. What actually
separates them from `calib-03` ("# after: matches the issue's expected output byte for
byte") is whether the note names a specific value, so the check accepts a specific value
next to the command and lists "matches expected" with the vague words that do not count.

The "different path" list comes from the not-tested packages where evidence exists but
proves the wrong thing: `pkg-07` runs only the single-file case when the bug needs two
files, and `pkg-14` runs a GET when the bug is a POST. "Every failing case the plan's test
plan says it will re-run" is there for `calib-04`, which re-runs repro 1 and never repro 2
(`-j 200000 -x echo .`). The "left out ... say it was left out and why" clause keeps the
honest-shortfall rule, so a recorded gap is not graded as a missing test.

**Trade-offs**

What `evidence-decisive` gives up: a case proven only by a unit test in the diff, with no
re-run shown. `pkg-05` is the package it cost me. Its test plan names two cases: "re-run the
issue's script, expect both `atuin` rows; re-run with two same-name same-key bindings,
expect one row plus a warning". The evidence shows the first case as real tables, but the
second is only the sentence "Same-key redefine prints the one-time warning." The diff does
add `fn same_name_same_key_replaces_with_warning()`, and "`cargo test -p nu-protocol` passes (312
tests)", which the gold counted as proof. My check required the case to be "shown
re-run on the changed code", so it graded the second case as not shown and rejected a
clear accept.

I kept it strict on purpose. The fix would be to let a case pass when a test added in the
diff exercises that exact case and the suite holding it is shown passing. But the same
loosening is exactly how a not-tested PR slips through when its added test exercises the
wrong path: `pkg-14`'s new `test_header_casing_preserved` tests GET header casing, and
`pkg-07`'s new test puts all edits in `a.go`. Before loosening it I would re-grade those two
plus `calib-04` as canaries (`--include-calibration --only
pkg-05,pkg-07,pkg-14,calib-04`). I chose to accept one false reject in `clear-accept` over risking a miss in
`not-tested`, and the run still passed with every category matched.

---

Related paths: `eval-run.txt` in this directory; your skill's files in
`tools/pr-precheck/`.
