# Unit 3 — Plan and Build

Path: `beat-1-sandbox/unit-3/plan-and-implement.md`

Record of your plan, the branch you built it on, and the evaluation runs that produced
`eval-run.txt`. This file is graded at the path above; a copy kept anywhere else in the
repository is not read.

Complete every labelled field below. Each is graded on its own; content placed under the wrong
label is not graded.

---

## Posted upstream

**GitHub username**

jupitersnow1

**Plan comment**

https://github.com/codepath/pathreview-ai301-fa26-s3/issues/47#issuecomment-5977579246

> Plan for #47.
> 
> **Diagnosis.** `docs/API.md` on `2f4e82f` lists nine endpoints with a one-line description each and no example invocation anywhere in the file (my repro grepped 0 curls, 0 code blocks, 9 endpoint headers). The thing that actually trips a new reader is that the request-body shape is inconsistent and the descriptions do not say which one each endpoint takes: `/auth/register` wants JSON, `/auth/login` wants an OAuth2 form body with `username` (not `email`), and `POST /profiles` wants multipart form fields. I only worked those out by reading `api/routes/`, which is exactly the gap.
> 
> **Scope.** `docs/API.md` only. One fenced `bash` block with a working `curl` command under each of the nine documented endpoints, plus a one-line note that examples assume the local server from `docs/SETUP.md`. Not in scope: the `/health` 503 (that is a code bug in `api/routes/health.py` + settings, not a docs gap), the two unlisted routes (`PUT /profiles/{profile_id}`, `GET /reviews/{review_id}/status`), and the `vector-db` unhealthy container. I noted all three in my repro; the unlisted routes are the ones I asked about there, and I'll add them only if a maintainer says they belong in this doc.
> 
> **Approach.** Reuse the exact commands from my repro comment above (JWTs replaced with `<token>`, long bodies trimmed), in the same order, so the examples match what the API returns on `2f4e82f` today. Each endpoint gets a `bash` fence with the command and a second fence with the response. Where auth is needed, the example shows the `Authorization: Bearer <token>` header, with a one-line note under the first authenticated example that the token comes from `POST /auth/login`.
> 
> **Test plan.** Re-run the two greps from my repro before and after:
> 
> ```
> $ grep -c -i curl docs/API.md     # before: 0  → after: 9
> $ grep -c '^```' docs/API.md      # before: 0  → after: 36 (command + response fence per endpoint)
> ```
> 
> Then re-run each example against the local uvicorn server and confirm each returns the body shown next to it (same calls I ran for the repro).
> 
> **Risks.** The `/health` example shows the 503 the API actually returns on a fresh setup, with a one-line note that this is a separate health-check bug and not a setup problem; happy to drop or reword that note if you'd rather.
> 
> Branch: `docs/47-api-curl-examples` on my fork, PR coming after I run the examples against the built change.
> 
> (I used Claude Code to help me draft and check this plan; I read every route myself, wrote the commands myself, and ran them against my own Codespace.)

---

## Your branch

**Branch**

`docs/47-api-curl-examples`

**Evidence**

**Before** (from my unit 2 repro comment, on `main` at commit `2f4e82f`, API started with
`uvicorn api.main:app --host 127.0.0.1 --port 8000`):

```
$ git rev-parse --short HEAD
2f4e82f
$ grep -c -i curl docs/API.md
0
$ grep -c '^```' docs/API.md
0
$ grep -c -E '^`(GET|POST|PUT|PATCH|DELETE) ' docs/API.md
9

$ curl http://localhost:8000/health
{"detail":{"status":"unhealthy","dependencies":{"postgres":"unhealthy","redis":"unhealthy","vector_db":"healthy"},"safety_events_last_hour":0,"timestamp":"2026-09-30T04:33:25.545205"}}
[HTTP 503]

$ curl -X POST http://localhost:8000/auth/login -H 'Content-Type: application/json' \
  -d '{"email":"user1@example.com","password":"password1"}'
{"detail":[{"type":"missing","loc":["body","username"],"msg":"Field required","input":null},{"type":"missing","loc":["body","password"],"msg":"Field required","input":null}]}
[HTTP 422]
```

That is the gap: nothing in the file to copy, and the one request shape a reader would
guess for login (JSON with `email`, the same as register) is rejected with a 422.

**After** (branch `docs/47-api-curl-examples`, commit `8f27e4e`, same Codespace, same
`uvicorn` command, database re-seeded with `make setup`'s steps; this is every example in the
new `docs/API.md`, run in order, with JWTs replaced by `<token>` and long bodies trimmed):

```
$ git branch --show-current && git rev-parse --short HEAD
docs/47-api-curl-examples
2f4e82f

$ grep -c -i curl docs/API.md
9
$ grep -c '^```' docs/API.md
36

$ curl -i http://localhost:8000/health
HTTP/1.1 503 Service Unavailable
{"detail":{"status":"unhealthy","dependencies":{"postgres":"unhealthy","redis":"unhealthy","vector_db":"healthy"},"safety_events_last_hour":0,"timestamp":"2026-10-04T06:17:30.895093"}}

$ curl -X POST http://localhost:8000/auth/register -H 'Content-Type: application/json' -d '{"email":"docs47-1791094650@example.com","password":"a-strong-password"}'
{"access_token":"<token>","token_type":"bearer"}
[HTTP 200]

$ curl -X POST http://localhost:8000/auth/login -d 'username=user1@example.com&password=password1'
{"access_token":"<token>","token_type":"bearer"}
[HTTP 200]

$ curl -X POST http://localhost:8000/profiles -H 'Authorization: Bearer <token>' -F github_username=octocat -F portfolio_url=https://example.com/octocat
{"id":"fddfad46-6de9-45cc-8383-bec7538d4d10","user_id":"cb438436-872a-4b57-a14c-0ed590e7fd91","github_username":"octocat","portfolio_url":"https://example.com/octocat","created_at":"2026-10-04T06:17:31.561817Z","resume_filename":null}
[HTTP 200]

$ curl http://localhost:8000/profiles/fddfad46-6de9-45cc-8383-bec7538d4d10 -H 'Authorization: Bearer <token>'
{"id":"fddfad46-6de9-45cc-8383-bec7538d4d10","user_id":"cb438436-872a-4b57-a14c-0ed590e7fd91","github_username":"octocat","portfolio_url":"https://example.com/octocat","created_at":"2026-10-04T06:17:31.561817Z","resume_filename":null}
[HTTP 200]

$ curl -X POST http://localhost:8000/reviews -H 'Authorization: Bearer <token>' -H 'Content-Type: application/json' -d '{"profile_id":"fddfad46-6de9-45cc-8383-bec7538d4d10"}'
{"id":"d2a52c79-a16f-4452-8ad6-653758a35568","profile_id":"fddfad46-6de9-45cc-8383-bec7538d4d10","status":"pending","sections":null,"overall_score":null,"error_message":null,"created_at":"2026-10-04T06:17:31.618942Z","updated_at":"2026-10-04T06:17:31.618945Z"}
[HTTP 200]

$ curl http://localhost:8000/reviews/d2a52c79-a16f-4452-8ad6-653758a35568 -H 'Authorization: Bearer <token>'
{"id":"d2a52c79-a16f-4452-8ad6-653758a35568","profile_id":"fddfad46-6de9-45cc-8383-bec7538d4d10","status":"complete","sections":[{"section_name":"Technical Skills","content":"Detailed feedback on technical skills based on portfolio analysis","confidence":0.85,"suggestions":["Add more detail on AI/ML experience","Include specific technologies and frameworks"]},{"section_name":"Project Experience","
[HTTP 200]

$ curl 'http://localhost:8000/reviews?page=1&page_size=20' -H 'Authorization: Bearer <token>'
{"items":[ ...3 reviews... ],"total":3,"page":1,"page_size":20}
[HTTP 200]

$ curl -X DELETE http://localhost:8000/profiles/fddfad46-6de9-45cc-8383-bec7538d4d10 -H 'Authorization: Bearer <token>' -i
HTTP/1.1 204 No Content
```

Nine `curl` examples in the file, and all nine return the body printed next to them in the
doc: the two auth calls return a bearer token, the five profile/review calls return 200 with
the documented shapes, `DELETE` returns 204, and `/health` returns the same 503 body my repro
saw, which is what the doc now shows with a note that the 503 is a separate health-check bug.

## Eval iterations

Answer all four sections. Quote source text directly; paraphrase does not satisfy these
fields.

**Run history**

Starting point: my group's activity worksheet. Its Phase 1 grade of `calib-03` with the
sample rubric came out `hold` only because `test` failed (the plan has no automated test),
while `diagnosis` passed on "passes if the plan says what causes the bug", even though the
repro evidence rules that cause out (step 3: 25.8 s with `--paging=never`, no pager in the
loop). Our Phase 2 draft kept that diagnosis wording. So the first thing I changed before any
run was that check: `diagnosis-grounded` reads the stated cause against every repro step and
control, and fails when a control shows the blamed part working. The `scope` and `test` ideas
from the worksheet became `scope-bounded` and `test-decisive`, rewritten to judge the change
and the observable outcome instead of whether files are listed or a test is "provided".

1. Smoke run, `--limit 3` (pkg-01, pkg-02, pkg-03), to check the harness and the CLI before
   spending a full run: **3/3** (`categories: clear-accept 2/2  wrong-cause 1/1`).
2. Full run with `--save-run eval-run.txt`: **20/20** (`categories: clear-accept 7/7
   scope-creep 4/4  thread-convention 2/2  unbuildable 3/3  wrong-cause 4/4`, `agreement:
   20/20 scored items  (bar: 18/20: PASS)`).
3. One `--only pkg-04` re-grade, not to change anything but to pull the per-check grades for
   the Package analysis below (the full-run table only names failed checks when a package
   disagrees). Still **reject**, agreeing with gold.
4. After run 2, I ran the skill in live mode on my own `plan.md` (step 8). It reported two
   procedure gaps that eval mode never reaches (what to do when the issue thread cannot be
   fetched; which policy files to read, and to ignore classmates' repro comments). I added
   those lines to `procedure.md`, then did a confirming full run with
   `--include-calibration --save-run eval-run.txt` so the fingerprints in the saved run match
   the uploaded files: **20/20**, same category line as run 2, and all four unscored
   calibration packages agreed as well (`calib-01` accept; `calib-02`, `calib-03`, `calib-04`
   reject). `calib-03` rejecting on `diagnosis-grounded` is the worksheet problem fixed. This
   is the run recorded in `eval-run.txt`.

No package disagreed in any run, so I never needed a canary-style `--only` list.

**Package analysis**

`pkg-04` (source: `junegunn/fzf#4260`, category `thread-convention`). My rubric's decision:
**reject**. Gold label: **reject**.

This is a docs-only plan: it proposes a Windows note in the man page, README examples with
`> /dev/tty`, and an FAQ entry, and says "Not in scope: any change to fzf's input handling
code." Three of my checks pass it. The diagnosis ("fzf keeps reading console input while an
`execute` child runs") fits every repro step and both controls, the plan names exactly where
the docs changes go, and the test plan ("confirm the documented command form gives a fully
interactive `less` (j, k, q all work)") is observable.

It fails on two required checks, and either one alone would have rejected it. `scope-bounded`
fails because my pass condition says the plan "Also fails if the plan only documents a
workaround and leaves the reproduced behavior unfixed", and that is exactly what this plan
does. `thread-and-policy` fails on half (a): the thread highlights have the OWNER, junegunn,
saying "This seems to be the culprit" about `src/tui/light_windows.go`, posting a patched
test binary, and asking the reporter to test it, and the plan comment never mentions any of
that. It opens with "Hi!" and pitches the docs workaround as if the owner had not already
isolated the bug. My procedure makes the grader list every OWNER/MEMBER/COLLABORATOR/
CONTRIBUTOR comment that gives direction before reading the plan comment, and then quote the
sentence in the comment that engages each one or write "not mentioned". Here it was "not
mentioned" for all three.

The reason I care about this one is that it is the package that a rubric with only
plan-quality checks would get wrong: the plan is grounded, bounded in the ordinary sense (one
area, three small edits), executable, and testable. It is the comms half, reading the comment
against the thread, that catches it, which is why the `thread-convention` category exists.

**Check rationale**

The `thread-and-policy` check, as it reads in `rubric.md`:

> | thread-and-policy | The plan comment, read against (a) the thread highlights from anyone with an OWNER, MEMBER, COLLABORATOR, or CONTRIBUTOR role, and (b) the repo-facts block's contribution policy. Treat every package as AI-assisted work. See evidence guide: Comms. | Both halves hold. (a) If a maintainer-role comment gives explicit direction (identifies the culprit or fix site, proposes or rejects an approach, posts a patch or test build, asks for testing, or says it works as intended), the plan comment engages it: it follows the direction and says so, or names the direction and gives a reason for going another way. Silence about such direction fails. With no maintainer direction in the thread, (a) passes. (b) If the policy requires disclosing AI use in comments or "in any form", the comment discloses it, naming the tool or that AI was used and the extent. A policy with no disclosure requirement for issue comments (no AI policy, AI welcome, "understand your work", human-written comments, or disclosure only in pull requests) passes (b); a human-written-comments rule passes when the comment reads as the author's own words. | required |

Two decisions shaped it. First, I merged the thread check and the AI-disclosure check into
one row with two halves instead of keeping two rows. In unit 2, `ai-disclosure` was its own
check and I reused its policy-reading logic almost word for word in half (b). The thread
half is new. I combined them because the procedure gathers their evidence from the same
place (the plan comment) at the same step, and a single row with "Both halves hold" keeps the
JSON output shorter while the evidence line still says which half decided it.

Second, the half (a) wording lists what counts as "explicit direction" (culprit or fix site,
proposes or rejects an approach, posts a patch or test build, asks for testing, works as
intended) and restricts it to maintainer roles. The first version I wrote said "engages the
thread", which would have failed `pkg-13`: the maintainer comments there are "That ain't
right" and "Oh, it's a RENDERING bug!", and the plan comment does engage them ("the stale
blank region that DHowett called out as an invalidation bug"), but a vaguer check could read
the mouse-selection comment from a NONE user as unaddressed direction. Listing the kinds of
direction, and limiting them to OWNER/MEMBER/COLLABORATOR/CONTRIBUTOR, is what makes
`pkg-13`, `pkg-05`, `pkg-08`, and `pkg-20` pass half (a) while `pkg-04` fails it.

**Trade-offs**

What `thread-and-policy` gives up: half (a) only fires on explicit direction from someone with
a maintainer-ish role. A thread where a NONE-role contributor has already found the real
cause and the plan ignores them passes this check. `pkg-07` is the live example: BHARATH0153
(NONE) correctly explains in-thread that static methods call `this._friendlyError` where
`this` is the constructor, and the plan ignores that and blames tree-shaking. My check lets
the comment through on half (a). The package still rejects, because `diagnosis-grounded`
catches the wrong cause against the repro's instance-method control, so nothing flipped. But
if a package ever had a correct NONE-role diagnosis, an ungrounded-but-not-contradicted plan,
and a comment that ignored the thread, my rubric would accept it. I chose that over counting
every commenter as direction because in `pkg-03`, `pkg-08`, and `pkg-14` the NONE-role
comments are "me too" reports and PR links, and requiring engagement with all of them would
have produced spurious fails on clear accepts.

How I know nothing else changed: this check can only fail a package that has maintainer
direction or a disclosure-requiring policy. The packages with maintainer direction are
`pkg-04`, `pkg-05`, `pkg-07`, `pkg-08`, `pkg-09`, `pkg-13`, `pkg-15`, `pkg-16`, `pkg-18`,
`pkg-19`, and `pkg-20`, and the only one with a disclosure requirement is `pkg-20`. Every
clear-accept in that list (`pkg-05`, `pkg-08`, `pkg-09`, `pkg-13`) came out accept in the full
run (clear-accept 7/7), and the two `thread-convention` packages both rejected (2/2), so the
check is firing on exactly the two it was written for and no others.

---

Related paths: `plan.md` and `eval-run.txt` in this directory; your skill's files in
`tools/plan-check/`.
