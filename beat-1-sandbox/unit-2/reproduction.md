# Unit 2 — Claim and Reproduce

Path: `beat-1-sandbox/unit-2/reproduction.md`

Record of your claim and reproduction on the issue you chose in Unit 1, and of the
evaluation runs that produced `eval-run.txt`. This file is graded at the path above; a copy
kept anywhere else in the repository is not read.

Complete every labelled field below. Each is graded on its own; content placed under the wrong
label is not graded.

---

## Your identity upstream

**GitHub username**

jupitersnow1

---

## Posted upstream

**Claim comment**

https://github.com/codepath/pathreview-ai301-fa26-s3/issues/47#issuecomment-5904007180

> I'd like to work on this as my first PR. Right now `docs/API.md` gives a one-line description for each endpoint (`/health`, `/auth/*`, `/profiles`, `/reviews`) and no example request for any of them, which is the gap this issue describes.
>
> My plan: get the API running in my Codespace (Linux) by following `docs/SETUP.md`, then write and run my own curl call for each endpoint instead of copying the ones already in this thread, so I know every example I add actually works. I'll post what I get as a repro comment here, with my environment and the commit I tested, and only then start on the docs change.

**Reproduction comment**

https://github.com/codepath/pathreview-ai301-fa26-s3/issues/47#issuecomment-5904444773

> Here's my repro for #47. Before writing any examples I wanted to see the gap for myself, so I got the project running from `docs/SETUP.md` and tried to call every endpoint using only what `docs/API.md` tells you. I couldn't, so I went into `api/routes/` and `api/schemas/` to figure out each request, then ran them against my local server. Everything below is from my own run.
>
> **Environment:** GitHub Codespace, Ubuntu 24.04.5 LTS (Linux 6.8.0-1064-azure, x86_64), Python 3.14.2 (venv), Node v24.21.0, git 2.55.0, curl 8.5.0, Docker 29.8.0 with Compose v5.5.1. Fork of codepath/pathreview-ai301-fa26-s3 at commit `2f4e82f` on `main`. `.env` copied unchanged from `.env.example` (`LLM_PROVIDER=mock`).
>
> **Steps:**
>
> 1. `cp .env.example .env`, then `docker compose up -d`. `db` (postgres:16-alpine) and `redis` (redis:7-alpine) reported healthy.
> 2. `make setup`. It finished with "Setup complete": migrations 001 and 002 applied, seed data loaded, frontend installed. (I first tried Python 3.12 since 3.14 is so new, but venv creation failed with "ensurepip is not available ... apt install python3.12-venv", so I used the default 3.14, which the docs' "3.11 minimum" allows.)
> 3. Started only the API, using the uvicorn command from `make run`: `uvicorn api.main:app --host 127.0.0.1 --port 8000`.
> 4. Checked the doc, then called each documented endpoint.
>
> **The doc on this commit:**
>
> ```
> $ git rev-parse --short HEAD
> 2f4e82f
> $ grep -c -i curl docs/API.md
> 0
> $ grep -c '^```' docs/API.md
> 0
> $ grep -c -E '^`(GET|POST|PUT|PATCH|DELETE) ' docs/API.md
> 9
> ```
>
> **Each documented endpoint, as it answers today** (JWTs replaced with `<token>`, long bodies trimmed with `...`):
>
> ```
> $ curl http://localhost:8000/health
> {"detail":{"status":"unhealthy","dependencies":{"postgres":"unhealthy","redis":"unhealthy","vector_db":"healthy"},"safety_events_last_hour":0,"timestamp":"2026-09-30T04:33:25.545205"}}
> [HTTP 503]
>
> $ curl -X POST http://localhost:8000/auth/register -H 'Content-Type: application/json' \
>   -d '{"email":"jupiter47@example.com","password":"jupiter47-pass"}'
> {"access_token":"<token>","token_type":"bearer"}
> [HTTP 200]
>
> $ curl -X POST http://localhost:8000/auth/login -d 'username=user1@example.com&password=password1'
> {"access_token":"<token>","token_type":"bearer"}
> [HTTP 200]
>
> $ curl -X POST http://localhost:8000/profiles -H 'Authorization: Bearer <token>' \
>   -F github_username=jupitersnow1 -F portfolio_url=https://example.com/jupiter
> {"id":"f2a08862-4665-4a81-84e8-cd02eb932cb2","user_id":"1173deaa-7b38-4a90-b140-942ec2cad7a7","github_username":"jupitersnow1","portfolio_url":"https://example.com/jupiter","created_at":"2026-09-30T04:33:33.799584Z","resume_filename":null}
> [HTTP 200]
>
> $ curl http://localhost:8000/profiles/f2a08862-4665-4a81-84e8-cd02eb932cb2 -H 'Authorization: Bearer <token>'
> {"id":"f2a08862-4665-4a81-84e8-cd02eb932cb2", ... same body as above}
> [HTTP 200]
>
> $ curl -X POST http://localhost:8000/reviews -H 'Authorization: Bearer <token>' \
>   -H 'Content-Type: application/json' -d '{"profile_id":"f2a08862-4665-4a81-84e8-cd02eb932cb2"}'
> {"id":"f11f0b37-cb22-4749-b5f9-20b96be4a621","profile_id":"f2a08862-...","status":"pending","sections":null,"overall_score":null,"error_message":null, ...}
> [HTTP 200]
>
> $ curl http://localhost:8000/reviews/f11f0b37-cb22-4749-b5f9-20b96be4a621 -H 'Authorization: Bearer <token>'
> {"id":"f11f0b37-...","status":"complete","sections":[{"section_name":"Technical Skills", ...},{"section_name":"Project Experience", ...},{"section_name":"Career Growth", ...}], ...}
> [HTTP 200]
>
> $ curl 'http://localhost:8000/reviews?page=1&page_size=20' -H 'Authorization: Bearer <token>'
> {"items":[ ...3 reviews... ],"total":3,"page":1,"page_size":20}
> [HTTP 200]
>
> $ curl -X DELETE http://localhost:8000/profiles/f2a08862-4665-4a81-84e8-cd02eb932cb2 -H 'Authorization: Bearer <token>'
> [HTTP 204]
> ```
>
> **What a reader would likely guess from the doc alone:** the login line says "Obtain a JWT access token" and doesn't say what to send. Sending JSON with an `email` field, which is the same shape register takes, gets rejected:
>
> ```
> $ curl -X POST http://localhost:8000/auth/login -H 'Content-Type: application/json' \
>   -d '{"email":"user1@example.com","password":"password1"}'
> {"detail":[{"type":"missing","loc":["body","username"],"msg":"Field required","input":null},{"type":"missing","loc":["body","password"],"msg":"Field required","input":null}]}
> [HTTP 422]
> ```
>
> **Expected:** as someone new to this repo, I should be able to open `docs/API.md`, copy an example for an endpoint, and see it work.
>
> **Actual:** there's nothing to copy: the greps above find no curl and no code blocks in the file. The one-liners tell you what each endpoint does but not what to send, so I had to open the route code to find out. That's how I learned that register wants JSON, login wants a form with `username` instead of `email` (the 422 above is what happened when I guessed wrong), and creating a profile wants multipart form fields.
>
> **Also noticed, not part of this issue:**
>
> - `/health` returns 503 for me even though the `db` and `redis` containers are healthy. The uvicorn log for that request shows `postgres_health_check_failed error="Textual SQL expression 'SELECT 1' should be explicitly declared as text('SELECT 1')"` and `redis_health_check_failed error="'Settings' object has no attribute 'redis_host'"`. So a `/health` example will show 503 until those are fixed. I haven't looked into them further.
> - `api/routes/` also defines `PUT /profiles/{profile_id}` and `GET /reviews/{review_id}/status`, which aren't listed in `docs/API.md`. I'll ask here whether they should be documented too, rather than adding them on my own.
> - After the calls above, `docker compose ps` showed the `vector-db` container (chromadb 0.4.22) running but failing its own healthcheck, even though `/health` reported `vector_db: healthy`. The API calls above didn't need it, and I haven't dug into why:
>
>   ```
>   $ docker compose ps --format '{{.Service}} {{.Image}} {{.Status}}'
>   db postgres:16-alpine Up 2 minutes (healthy)
>   redis redis:7-alpine Up 2 minutes (healthy)
>   vector-db chromadb/chroma:0.4.22 Up 2 minutes (unhealthy)
>   ```
>
> Next I'll add a curl example under each endpoint in `docs/API.md`, using the calls above, and open a PR that references this issue.
>
> I used Claude Code to help me organize this report; the commands and output above are from my own Codespace.

## Eval iterations

Answer all four sections. Quote source text directly; paraphrase does not satisfy these
fields.

**Run history**

1. Full run (20 scored packages) with `--include-calibration`: **20/20**
   (`categories: clear-accept 8/8  disclosure 1/1  no-evidence 4/4  unfollowable-comms 3/3  wrong-target 4/4`).
   All four unscored calibration packages (`calib-01` to `calib-04`) also agreed with their
   gold labels, including the `calib-03` operator-swap trap and the `calib-04` no-environment
   borderline.
2. Confirming full run with `--save-run eval-run.txt`, same rubric and evidence guide, no
   changes in between: **20/20** (`agreement: 20/20 scored items  (bar: 18/20: PASS)`). This
   is the run recorded in `eval-run.txt`.

Since the first run already agreed on every package, I didn't need any `--only` re-runs.

**Package analysis**

`pkg-20` (source: `ghostty-org/ghostty#13604`). My rubric's decision: **reject**. Gold
label: **reject** (category `disclosure`).

This package is a strong repro, and my proof checks all pass it. The environment is recorded
("ghostty 1.3.1 (release build, Fedora 42 RPM), GTK backend, GNOME 48 (Wayland), dark system
scheme"), the steps give the exact query, and the artifact `^[[?997;2n` is literally the
issue's wrong answer (`CSI ? 997 ; 2 n`, light mode). There's even a control run with the
conditional theme pair that answers `^[[?997;1n`. The claim names mode 2031, the 1.3.1
release and the draft patch, so it passes claim-specific-and-modest too.

It gets rejected on one required check, `ai-disclosure`. The repo-facts block says "All AI
usage in any form must be disclosed, stating the tool used and the extent of the
assistance", and my check treats every package as AI-assisted work. Neither the claim
comment nor the report mentions AI at all, so the check fails, and because it's `required`
the verdict is reject. `pkg-07` is the comparison that convinced me the check was reading
the policy and not just the word "AI": its comment says "Per the AI usage policy: I used an
AI assistant to help me organize this report", and it comes out accept.

**Check rationale**

The `ai-disclosure` check, as it reads in `rubric.md`:

> | ai-disclosure | The repo-facts block's contribution policy (CONTRIBUTING.md / AI policy), read against the claim comment and repro report. Treat every package as AI-assisted work. See evidence guide: Comms. | If the repo's stated policy requires disclosing AI use in comments or "in any form", the comments disclose it (the tool and the extent). If the policy has no disclosure requirement for issue comments (no AI policy, an AI-welcome policy, a "you must understand your work" policy, or a disclosure rule that applies only to pull requests), this check passes. A policy that only asks for human-written comments passes when the comment reads as the author's own words. | required |

The simple version I rejected was "if the repo has an AI policy, the comment must disclose
AI use." Before running anything, I went through the contribution-policy line in all 24
packages, and that version would have wrongly rejected four packages gold labels as accept.
`pkg-05` (conda: "generative AI tools welcome"), `pkg-12` (prettier: "only submit code you
fully understand") and `pkg-03` (ripgrep: "comments to maintainers must be written by
humans") all have AI policies with no disclosure ask. `pkg-09` does require stating the tool,
but only "in the pull request", and "the policy states no disclosure ask for issue comments".
So the check has to read what the policy actually asks for, and where. That's why the pass
condition lists the kinds of policy that don't trigger it, instead of just "has an AI
policy".

**Trade-offs**

The case I accept `ai-disclosure` will miss: on a repo like `pkg-03`'s, where the policy
says "comments to maintainers must be written by humans" and "AI-generated comments may be
hidden", my check passes any comment that "reads as the author's own words". A grader can't
actually tell whether a human wrote a comment; it can only tell whether it sounds like one.
So a fully AI-written comment that happens to sound natural would pass. I chose that over
the alternative, failing every comment on those repos unless it proves it's human-written,
because no comment can prove that, and it would have rejected `pkg-03`, which gold labels as
accept.

Nothing else changed because of it, and here is how I know. The check can only fail a
package whose policy requires disclosure, and `pkg-20` is the only scored package like that.
All five clear-accept packages with some kind of AI policy (`pkg-03`, `pkg-05`, `pkg-07`,
`pkg-09`, `pkg-12`) stayed accept in both full runs (clear-accept 8/8 both times), and
`calib-01`, whose policy mentions AI-generated PRs but asks for no disclosure, also agreed.

---

Related paths: `eval-run.txt` in this directory; your skill's files in
`tools/repro-check/`.
