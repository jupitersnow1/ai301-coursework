# Evidence guide: where proof lives in a reproduction package

## Environment

- Where it lives: in an eval bundle, the repro report's environment
  line or block (usually its first lines), read against the issue
  section's stated version/platform and any thread highlight that says
  a factor changes the failure. The repo-facts block's "latest
  release" and bug-report template asks say which fields the repo
  expects. In live mode, the student's draft repro comment, read
  against the issue body and thread on GitHub and the repo's issue
  template / README setup section.
- What good looks like: the report names the OS/platform and the
  software version it ran, plus any factor the issue or thread says
  matters (driver, build profile, shell, backend, browser, locale). If
  the version or platform differs from the issue's, the report states
  the difference instead of letting the reader assume a match. A terse
  one-line record is enough if it covers those fields; an old version
  used without comment is a silent deviation, not a record.

## Steps

- Where it lives: the repro report's steps (numbered or prose), plus
  any command lines inside its code blocks. Read them against the
  issue body's trigger: the exact command, flags, input file, syntax,
  or config the reporter used. In live mode, the draft repro comment,
  read against the issue on GitHub.
- What good looks like: a stranger starting from a clean install of
  the named version could type or paste each step and reach the
  trigger. Inputs are shown inline or are public (a playground link,
  a file whose contents are in the report). The trigger is the issue's
  trigger: if the report changed an operator, swapped syntax (a colon
  for `=`), edited an expression, or used a different range form, the
  steps no longer test the issue. Steps that live in a private repo,
  an internal build, or an unshared config cannot be re-run.

## Behavior shown

- Where it lives: the artifacts in the repro report: pasted terminal
  output, logs, exit codes, error messages, produced files, and
  described screenshots; plus the report's "expected" and "actual"
  lines. Read them against the issue's specific symptom: its error
  text, exit code, crash vs graceful failure, or wrong value. In live
  mode, the same parts of the draft, against the issue on GitHub.
- What good looks like: the artifact itself shows the issue's
  behavior. Match on the thing, not the narration: a panic/abort
  (exit 101, stack trace) versus a clean usage error (exit 1); the
  issue's runtime error versus a compile or syntax error; a blank pane
  versus a program that merely starts; garbled output with the process
  still alive versus a crash. A report that shows no artifact, or
  only shows that the software runs, has shown nothing. For a
  cannot-reproduce, the artifact is the real output of the attempt.

## Honesty

- Where it lives: every sentence in the claim comment and repro report
  that says what happened ("reproduced", "confirmed", "I verified",
  "the root cause is", "also happens on X", "guaranteed"), set side by
  side with the artifacts under Behavior shown.
- What good looks like: each claim points at an artifact that shows
  it, and no claim is bigger than its artifact. Red flags: a root
  cause stated with no transcript or measurement behind it;
  generalizing to a release, platform, or version the report did not
  test (especially one the thread says maintainers could not
  reproduce on); certainty language ("on two machines", "guaranteed
  reproducible") standing in for evidence; "expected" and "actual"
  that contradict the shown output. An honest cannot-reproduce says it
  could not reproduce, shows the attempt, names what differed from the
  reporter's setup, and suggests what a triggering setup might need;
  that is a pass. In a claim-only draft, a claim comment that asserts
  a reproduction or diagnosis with no report behind it fails; one that
  promises the report does not.

## Comms

- Where it lives: the claim comment, read against the issue; both
  comments read against the repo-facts block's bug-report template
  and contribution policy (CONTRIBUTING.md, AI_POLICY.md or similar).
  In live mode, the draft claim comment against the issue on GitHub,
  and the repo's CONTRIBUTING / AI policy files and PR/issue
  templates (plus any house rules in scope.md).
- What good looks like: the claim is specific (names this issue's
  symptom, file, function, or version, so it could not be pasted onto
  another issue) and states a concrete next step. It does not demand
  assignment, reserve the issue, self-assign, promise a fix by a date,
  or open with flattery or a +1. For AI use, treat every package as
  AI-assisted and read the policy's actual ask: only a policy that
  requires disclosing AI use in comments or in any form (for example
  "all AI usage must be disclosed, stating the tool and extent")
  requires a disclosure in the comments. A policy that welcomes AI,
  asks you to understand your work, asks for human-written comments,
  or asks for disclosure only in pull requests does not require a
  disclosure in issue comments. A disclosure that is present, like
  "I used an AI assistant to organize this report; I ran and verified
  every step", is what the pass looks like when one is required.
