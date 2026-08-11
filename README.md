# code-humanizer

An Agent Skill for Claude that removes the tells of AI-generated code and
rewrites it to read like a real developer wrote it — calibrated to the
person's actual skill level and context (student project, capstone,
production code, personal script, etc.).

Modeled after [blader/humanizer](https://github.com/blader/humanizer) (text
humanizer), but for code instead of prose.

## What it fixes

- Comment spam / restating the obvious
- Docstring spam on trivial functions
- Over-defensive error handling
- Generic boilerplate headers ("Author: [Your Name]")
- Suspiciously uniform formatting and naming
- Over-engineered abstractions for simple scripts
- Robotic print/log messages ("Initializing process...", emoji)
- Unnecessary type hints/annotations
- Exhaustive edge-case handling in contexts that don't need it
- "Rule of three" over-structuring

## Safety checks built in

- **Security-aware**: under no circumstances will the skill strip, bypass, or
  weaken critical security controls, defenses, or parameters (e.g., input
  validation/sanitization, parameterized queries, authentication/authorization,
  or cryptography) in the name of humanization.
- **Autograder-aware**: if the code will run against hidden test cases
  (Gradescope, Canvas, HackerRank, a `tests/` folder), it won't strip
  load-bearing edge-case handling — only simplifies the phrasing.
- **Linter-aware**: checks for `.eslintrc`, `.flake8`, `pyproject.toml`, etc.
  before introducing natural style variance, so it won't break CI.
- **Scaffolding-aware**: won't touch real framework-generated boilerplate
  (Django `startapp`, Create React App, Rails, etc.) — only fake AI
  author/date banners.

## Install

Works as a [Claude Agent Skill](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview).
Drop `SKILL.md` into your skills directory, or install the packaged
`.skill` file in claude.ai / Claude Code.

## Usage

Just ask Claude to humanize AI-generated code, or mention you're about to
submit AI-assisted code for a school project and want it to read naturally.
Works across languages (examples included for Python, PHP, JavaScript).

## Test cases

See `evals/evals.json` for sample prompts used to validate the skill,
including an autograder-safety scenario.

## A note on academic integrity

This skill is meant to make AI-assisted code match your own voice and
habits — not to help you misrepresent authorship where disclosure is
required. Check your school's or workplace's AI-use policy before using it
on graded or reviewed work.

## License

MIT
