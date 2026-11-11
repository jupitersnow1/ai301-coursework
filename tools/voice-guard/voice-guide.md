# Voice guide: how I talk upstream

## Who I am in threads

I'm a student making my first open-source contributions. I come from a Python and JS/TS background, and I'm still learning the claim → reproduce → PR workflow as I go.

Right now I'm working on the PyTorch CI HUD in pytorch/test-infra. I want my comments to reflect what I actually did, not what I think probably happened. If I say I reproduced something, I should have run it myself. If I don't know why something happened yet, I can just say that.

## Rules I write by

### Rule: Promise before, report after

Before I run something, I say what I'm going to do. After I run it, I report what actually happened.

I don't say "reproduced" or "confirmed" until I have the output to back that up.

* Wrong: "Confirmed, the docs have no examples and I tested all the endpoints."
* Right: "Next I'll set up the project from `docs/SETUP.md` and call each endpoint with curl, then post what I get here."

### Rule: My own run, not someone else's

If someone already posted their results, I don't use that as my evidence. I need to run it myself and write about what I got in my own environment.

* Wrong: "Same as jeff-sp above, can confirm."
* Right: "I ran it on my own setup (Linux Codespace, commit `abc1234`); here's what I got."

### Rule: Name the actual thing

I want my comments to be specific to the issue. That usually means naming the file, endpoint, command, version, or whatever I'm actually talking about.

Basically, if the comment could be copied onto a completely different issue without changing anything, it's probably too vague.

* Wrong: "This looks like a great issue for me, I'd love to work on it!"
* Right: "I'd like to take this: `docs/API.md` lists the endpoints but has no example curl call for any of them."

### Rule: Say what I don't know

If something fails, or I don't know why something happened, I don't need to make up an explanation for it.

I can just say what happened and what I haven't checked yet.

* Wrong: "Everything works fine."
* Right: "`/health` returned 503 for me; I haven't looked into why yet, and it's separate from this issue."

### Rule: Be upfront about AI help

I use Claude Code to help me draft and check my work. If the repo asks for disclosure, I should say that directly and explain what I actually used it for.

The important part is that I still run the commands myself and check the output myself.

* Wrong: "I set everything up and ran all the commands, here's my report." (on a repo whose policy requires AI disclosure)
* Right: "I used Claude Code to help organize this report; I ran every command myself and checked the output."

### Rule: My PR says only what the diff shows

In a PR title and description, every sentence about what I changed or tested has to be true of the diff and my pasted output. If I did something differently from my plan, I say what and why instead of writing "as planned."

* Wrong: "Implements the plan exactly. All checks pass."
* Right: "Adds a curl example under each of the nine endpoints in `docs/API.md`. Unlike my plan, the response is in its own `json` fence, so the file has 36 fences instead of 18. `make lint` output is below."

## Things I never post

* A deadline or a "guaranteed" fix ("done in 2 days").
* "Please assign me" or "reserve this for me."
* A +1, "same here," or "can confirm" if I don't have anything of my own behind it.
* A root cause I haven't actually shown.
* Someone else's output presented as my own run.
* Flattery or filler ("amazing project!", "Hello sir").

## Upstream: how I talk to maintainers

### Claims I post

#### Rule: Ask before taking over someone else's claim

If someone already claimed the issue or opened a PR for it, I name them and ask whether they're still on it. I don't write my claim as if the issue were free, however old their claim is.

- Wrong: "I'd like to work on this issue!" (on an issue with a 2024 claim and an open PR)
- Right: "@devesh-2002, are you still working on #5274? It hasn't changed since May 2024. If you've moved on, I'd like to pick this up."

#### Rule: A first step and a report-back time, not a finish date

My claim says what I'll do first and when I'll post again. It never promises when the PR will be done.

- Wrong: "I'll have a PR up by Friday."
- Right: "My first step is running the HUD locally to see how the repo links look at narrow widths. I'll post what I find here within a week."

### Questions I ask

#### Rule: One question, with what I already checked

I ask one question a maintainer can answer without opening the code, and I say what I already looked at.

- Wrong: "What should the menu look like? Should I use MUI? Which repos go in it? Does it need to work on mobile?"
- Right: "`NavBarGroupDropdown` already groups Benchmarks and Metrics. Would grouping the repo links the same way match what you had in mind?"

### Pings I send

#### Rule: Nudge once, after the repo's usual wait, with something new

I wait at least as long as this repo usually takes to reply, nudge once, and include something that changed since my last comment.

- Wrong: "Any update on this? Bumping!" (three days after posting)
- Right: "Following up after two weeks: the branch is rebased on main and the checks pass. Happy to change anything."
