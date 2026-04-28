# Five-Level Taxonomy of Visual Intelligence

The survey treats visual generation as a staged expansion of capability rather than a single race toward higher perceptual quality.

![Five-level taxonomy](../assets/figures/overview/fig_5levels_overview.png)

## L1: Atomic Generation

**Core capability:** one-shot probabilistic mapping from text or latent codes to plausible images.

Atomic generation is the foundation of the field: GANs, diffusion models, flow models, and autoregressive image models all learn to map a prompt or latent representation into a visually coherent output. The main objective is appearance realism and broad semantic alignment.

**Limitation:** strong aesthetics can coexist with weak structure. A model can produce a convincing image without satisfying counts, geometry, text, or causal constraints.

## L2: Conditional Generation

**Core capability:** controllable generation under explicit prompts, references, layouts, masks, depth maps, pose, edges, or other conditions.

Conditional generation asks the model to respect external constraints rather than merely produce a plausible sample. It includes ControlNet-style spatial conditioning, layout control, identity preservation, domain adaptation, typography, and other forms of structured prompt following.

**Limitation:** conditions are often treated as soft hints. Failures appear as off-by-one coordinates, wrong object bindings, malformed text, or visually plausible but constraint-violating diagrams.

## L3: In-Context Generation

**Core capability:** persistent state across multiple references, conditions, turns, viewpoints, edits, or temporal steps.

In-context generation is where the model must bind several pieces of evidence into a single coherent state. Examples include multi-reference customization, full-body character consistency, multi-view generation, layered design, and long-context editing.

**Limitation:** identity drift, feature leakage, geometry inconsistency, and repeated re-rendering artifacts expose the absence of explicit state memory.

## L4: Agentic Generation

**Core capability:** generation embedded in a planner-verifier loop.

At this level, visual generation becomes an action inside a larger system. An agent may decompose the request, retrieve external evidence, call tools, generate intermediate states, inspect results, revise failures, and commit only after verification.

**Limitation:** the generator, verifier, and planner can share the same blind spots. Closed loops need reliable rollback, grounded tools, calibrated uncertainty, and latency-aware stopping criteria.

## L5: World-Modeling Generation

**Core capability:** causal and action-conditioned simulation of visual worlds.

World-modeling generation asks the system to predict what would happen under intervention. The output is not just an image, but a state in a dynamic process. Examples include playable worlds, neural game engines, embodied simulation, action-conditioned video generation, and physically faithful counterfactual rendering.

**Limitation:** current systems still struggle with long-horizon consistency, physical plausibility, real-time rollout, and compositional generalization beyond familiar domains.

## Why This Taxonomy Matters

The taxonomy explains why visual quality alone overstates progress. A model may excel at L1 while failing L2 constraints, or pass simple L2 prompts while lacking L3 persistence. Similarly, an L4 agent can appear impressive while depending on fragile verifiers, and an L5 world simulator can look plausible while ignoring action faithfulness.

The roadmap therefore measures progress by the ability to satisfy increasingly explicit invariants:

- **L1:** visual plausibility;
- **L2:** controllable faithfulness;
- **L3:** persistent context and state;
- **L4:** closed-loop action and verification;
- **L5:** causal dynamics under intervention.
