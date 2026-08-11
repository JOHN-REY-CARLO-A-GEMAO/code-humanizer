# Bolt's Performance Journal

This journal tracks critical, non-obvious performance learnings and insights discovered while optimizing the `code-humanizer` codebase.

## 2025-02-15 - LLM Skill & Prompt Latency Performance
**Learning:** In a codebase that contains only system instructions and LLM Agent Skills (defined in `SKILL.md`), the application's performance is governed by LLM inference efficiency rather than raw code execution. Specifically:
1. **Prompt Token Overhead**: Every extra or redundant word in the instruction prompt adds cost, memory overhead, and latency to every single interaction. Condensing instructions while preserving exact intent directly improves LLM parsing speed and reduces input token costs.
2. **Tool-Calling Latency**: Sequential tool-calling patterns (such as executing multiple separate `Read` or `Glob` commands to inspect files) are the single biggest bottleneck in LLM interactions because each tool call incurs full network and agent turn-taking latency.
3. **Generation Latency (Write vs Edit)**: Output generation speed is a major latency factor. Instructing agents to use localized `Edit` operations rather than rewriting entire files with `Write` significantly reduces output tokens and makes executions exponentially faster.

**Action:** When working with LLM-based skill definitions, optimize the prompts to be highly concise and include explicit instructions directing the model to minimize tool calls, perform checks in parallel/targeted queries, and prefer targeted editing tools over full-file overwrites.
