# Positions and Frontiers

This roadmap highlights several research directions that are likely to define the next stage of visual generation.

## Visual Chain-of-Thought

Visual Chain-of-Thought asks the model to think before rendering. The intermediate state may be text, a layout, a sketch, a symbolic program, a coarse image, or an executable edit plan.

Open problems:

- **Faithfulness:** the trace must constrain the final pixels rather than merely rationalize them.
- **Verifiability:** intermediate visual plans need checkers, not just natural-language descriptions.
- **Cost control:** reasoning should be invoked when constraints are hard, not for every aesthetic prompt.
- **Representation:** text is cheap but spatially lossy; visual sketches preserve geometry but are harder to score.

## Closed-Loop Visual Agents

Generation becomes an action when an agent can propose, observe, verify, revise, and roll back visual outputs. This is especially natural for editing, where each image is both a state and the input to the next action.

Open problems:

- compounding error across many visual actions;
- verifier reliability when generator and judge share biases;
- latency and cost from repeated generation;
- persistent memory for identities, layouts, and user intent.

## Tool-Augmented Rendering

Future visual systems may rely less on memorized priors and more on external tools:

- web search and retrieval for up-to-date facts;
- OCR and document parsers for text-heavy inputs;
- charting, geometry, CAD, or chemistry engines for exact structure;
- segmentation, tracking, and 3D tools for localized edits;
- validators that inspect the final artifact.

The goal is not simply "image generation with tools." It is goal-conditioned visual task execution.

## Synthetic Data and Visual Self-Play

Synthetic data is moving from static distillation toward closed-loop data engines. The strongest pipelines may combine:

- frontier-model distillation;
- reward-model-guided sample selection;
- self-generated failure cases;
- VLM judges and human calibration;
- programmatic rendering for exact ground truth.

The key risk is distribution collapse: generators, reward models, and judges may amplify the same biases if no external grounding is present.

## World-Modeling Generation

World-modeling generation treats the output image or video frame as a state in a causal process. The model must predict what happens under action or intervention.

Open problems:

- long-horizon consistency and state persistence;
- physical plausibility outside familiar distributions;
- low-latency rollout for interactive simulation;
- compositional generalization across domains;
- action faithfulness as the central evaluation criterion.

## Evaluation as the Bottleneck

The frontier cannot be measured by perceptual similarity alone. New benchmarks should include:

- graph parsers for diagrams and maps;
- OCR and glyph-level text audits;
- chemistry, geometry, and scientific validators;
- layout and coordinate checkers;
- physical simulators and red-team agents;
- action-faithfulness metrics for world models.

The long-term target is a visual generation stack that can render, inspect, revise, and prove that the final artifact satisfies the requested constraints.
