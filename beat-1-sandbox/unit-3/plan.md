# Plan: add curl examples to docs/API.md (fixes #47)

Issue: https://github.com/codepath/pathreview-ai301-fa26-s3/issues/47
Repro comment: https://github.com/codepath/pathreview-ai301-fa26-s3/issues/47#issuecomment-5904444773

## Diagnosis

`docs/API.md` on commit `2f4e82f` lists nine endpoints with a
one-line description each and no example invocation for any of
them. My repro confirmed this directly:

```
$ grep -c -i curl docs/API.md
0
$ grep -c '^```' docs/API.md
0
$ grep -c -E '^`(GET|POST|PUT|PATCH|DELETE) ' docs/API.md
9
```

The gap matters because the request bodies the endpoints expect are
inconsistent across the API and the one-liners do not tell you which
one each takes. I only worked them out by reading
`api/routes/auth.py`, `api/routes/profiles.py`, and
`api/routes/reviews.py`: `/auth/register` wants a JSON body,
`/auth/login` wants an OAuth2 **form** body with the field named
`username` (not `email`), and `POST /profiles` wants multipart form
fields. Trying to log in with the same JSON `{"email": ...,
"password": ...}` that register takes returns HTTP 422:

> `{"detail":[{"type":"missing","loc":["body","username"],"msg":"Field required", ...}]}`

So the fix is a documentation change: add a working `curl` example
to each endpoint entry, built from the calls I actually ran against
my local server in the repro, so a new developer can paste one and
see a response.

## Scope

In scope:

- `docs/API.md`: add a fenced `bash` block containing a working
  `curl` example under each of the nine documented endpoint
  entries, using the same requests from my repro (JWTs replaced with
  `<token>`, long responses trimmed with `...`).
- A one-line note at the top of the file saying the examples assume
  the local server at `http://localhost:8000` from `docs/SETUP.md`.

Not in scope (deferred, with reasons):

- The `/health` 503 on fresh setup (the `postgres_health_check_failed`
  / `redis_health_check_failed` log lines my repro noted). That is a
  code bug in `api/routes/health.py` and `core/settings`, not a docs
  gap, and it has its own issue surface.
- Documenting `PUT /profiles/{profile_id}` and
  `GET /reviews/{review_id}/status`, which exist in `api/routes/`
  but are not listed in `docs/API.md`. My repro comment flagged
  them and asked whether they should be documented too, rather than
  adding them on my own; until a maintainer answers, this PR
  documents only the nine endpoints the issue names.
- The `vector-db` unhealthy container; unrelated to the docs gap.
- Any change to the endpoints themselves or their request/response
  shapes.

## Files

- `docs/API.md` (the only file changed by this PR).

## Approach

1. For each of the nine endpoint entries, add a fenced `bash` block
   immediately under the description containing the exact `curl`
   command and the response body (or `[HTTP 204]` for the delete).
   The commands match the ones in my repro comment, in the same
   order, so the doc shows what a working request looks like today
   on commit `2f4e82f`.
2. Where an endpoint needs authentication, show the `Authorization:
   Bearer <token>` header on the example and add a one-line note
   under the first authenticated example that the `<token>` comes
   from `POST /auth/login`.
3. Where the request body shape is non-obvious (login takes a form
   body with `username`, create-profile takes multipart form fields),
   the example shows the exact `-d`/`-F` flags so a reader does not
   have to read the route source to find out.
4. Keep every other line in `docs/API.md` as it is, including the
   "Interactive Docs" section at the bottom.

## Test plan

Re-run my unit 2 repro steps against the changed file and the same
running local API, and compare the before and after:

1. Before (on commit `2f4e82f`, the main-branch state):

   ```
   $ grep -c -i curl docs/API.md    # 0
   $ grep -c '^```' docs/API.md     # 0
   ```

2. After (on this branch, same checked-out working tree):

   ```
   $ grep -c -i curl docs/API.md    # 9  (one curl per documented endpoint)
   $ grep -c '^```' docs/API.md     # 18 (nine opening + nine closing fences)
   ```

3. Confirm each example in the changed file still runs end to end
   against the local API started with `uvicorn api.main:app --host
   127.0.0.1 --port 8000`: register returns a token, login returns a
   token, profile and review calls succeed with that token, delete
   returns `[HTTP 204]`. Each one is a copy-paste of a command whose
   output is in the repro report, so a passing re-run is the
   observable: a command printed in `docs/API.md` is working today
   if it returns the body shown next to it.

The before and after of step 1 vs step 2 is what Evidence in the
unit-3 phase file will record.

## Risks and unknowns

- `/health` currently returns HTTP 503 on a fresh setup (the two
  errors in my repro). The example for `/health` will therefore
  show a 503 response, which is the honest current behavior. I
  think that is correct for a docs PR scoped to #47, but a reviewer
  may prefer a note next to the example saying "this returns 503
  until the health-check bugs are fixed in a separate issue"; I
  will add that note on request rather than guess.
- The one unknown I flag at build time: whether to put the examples
  in a bash fence (what I plan) or a plain fence. I will go with
  bash for syntax highlighting; a reviewer can tell me to switch.
- No risk to any code path, since the change is `.md`-only.

## Deviations

Three things changed between the plan above and what I built, all
in `docs/API.md`:

1. **Two fences per endpoint instead of one.** The plan said one
   fenced `bash` block per endpoint holding the command and the
   response together, so the test plan expected 18 fences. In the
   build I put the `curl` command in a `bash` fence and the response
   in a separate `json` (or `text`) fence, so each gets the right
   syntax highlighting and the response can be copied on its own.
   The after-count is therefore `grep -c '^\`\`\`' docs/API.md` =
   **36**, not 18. The curl count is 9 as planned, one per endpoint.
2. **A note next to the `/health` example.** The plan listed "add a
   note saying this returns 503 until the health-check bugs are
   fixed" as something I would do only if a reviewer asked. When I
   wrote the example and saw the 503 body sitting there with no
   explanation, it read like a broken setup, so I added a one-line
   callout saying it is a separate health-check bug. The example
   itself still shows the real 503 response from my run, as planned.
3. **`-i` on two examples.** `/health` and `DELETE /profiles/{id}`
   use `curl -i` so the status line is visible, because for those two
   the status code is the interesting part (503, and 204 with an
   empty body). The other seven examples are unchanged from the plan.

Nothing else moved: still one file, still the nine endpoints the
issue names, still the same request shapes and auth header notes.
