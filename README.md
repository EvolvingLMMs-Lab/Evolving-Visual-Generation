# Evolving Visual Generation

**Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling**

This repository hosts a living survey and roadmap on modern visual generation. The project organizes recent progress in image generation and editing around a capability-oriented view of **visual intelligence**: moving from one-shot appearance synthesis toward controllable composition, persistent context, agentic interaction, and causal world modeling.

> This manuscript is a preprint and an evolving roadmap. Its taxonomy, references, and viewpoints may be corrected, updated, or revised as the field develops.

![Five-level taxonomy of visual generation](assets/figures/overview/fig_5levels_overview.png)

## Core Thesis

Recent visual generation models have improved photorealism and instruction following, but stronger images do not automatically imply stronger visual intelligence. The next bottlenecks are structural, temporal, and causal: models must preserve identity, obey spatial constraints, render exact symbols, reason over external data, interact through closed loops, and verify that generated artifacts satisfy the intended constraints.

We frame this evolution as a five-level progression:

| Level | Capability | Short Description |
| --- | --- | --- |
| L1 | **Atomic Generation** | One-shot probabilistic rendering from prompts or latent codes. |
| L2 | **Conditional Generation** | Faithful generation under explicit controls, layouts, references, or constraints. |
| L3 | **In-Context Generation** | Multi-reference, multi-condition, and long-context generation with persistent state. |
| L4 | **Agentic Generation** | Multi-call planning, generation, verification, rollback, and tool use. |
| L5 | **World-Modeling Generation** | Causal, physical, and action-conditioned simulation of visual worlds. |

## What Is in This Repo

- [`docs/taxonomy.md`](docs/taxonomy.md): the five-level taxonomy of visual intelligence.
- [`docs/technical_drivers.md`](docs/technical_drivers.md): generative paradigms, architectures, and unified understanding-generation systems.
- [`docs/training_data_alignment.md`](docs/training_data_alignment.md): data construction, pre-training, post-training, reward modeling, and acceleration.
- [`docs/applications.md`](docs/applications.md): controllability, personalization, editing, embodied generation, and data-centric visualization.
- [`docs/stress_tests.md`](docs/stress_tests.md): in-the-wild stress tests that expose failures beyond visual realism.
- [`docs/frontiers.md`](docs/frontiers.md): open positions on visual CoT, closed-loop agents, tool-augmented rendering, synthetic self-play, and world simulation.
- [`docs/reading_list.md`](docs/reading_list.md): a curated entry point into the cited literature.
- [`references/citation.bib`](references/citation.bib): BibTeX references used by the survey.

## Roadmap at a Glance

The survey argues that progress is no longer a single axis of image fidelity. It is a nested expansion of capability:

1. **Modeling** moves from GANs to diffusion, flow matching, autoregressive modeling, and hybrid AR-diffusion systems.
2. **Architecture** converges toward tokenizers/VAEs, transformer backbones, condition modules, and multimodal fusion mechanisms.
3. **Training** shifts from scale alone to data density, VLM relabeling, continued training, SFT, preference optimization, and deployment acceleration.
4. **Applications** increasingly demand verifiable constraints: exact text, layout, identity, domain rules, external data, and physical interaction.
5. **Evaluation** must move from perceptual similarity toward parsers, OCR, graph validators, simulators, theorem checkers, and red-team agents.

## Selected Figures

| Topic | Figure |
| --- | --- |
| Research landscape | ![Research landscape](assets/figures/overview/fig_research_landscape.png) |
| Modeling paradigms | ![Modeling paradigms](assets/figures/method/fig_modeling_paradigms.png) |
| Training pipeline | ![Training pipeline](assets/figures/training/fig_training_pipeline.png) |

## Stress-Test Examples

Standard metrics can miss failures that matter. This repo includes selected qualitative cases where outputs are visually polished but violate geometric, topological, physical, or procedural constraints.

| Test | Target Capability | Typical Failure |
| --- | --- | --- |
| Jigsaw reconstruction | Spatial structuring | Hallucinates plausible content instead of rigidly reassembling pieces. |
| Metro map | Graph/topology following | Produces a convincing map but violates transfer and crossing constraints. |
| Isometric tile map | Coordinate grounding | Places objects in nearby but incorrect grid cells. |
| Fluid dynamics | Causal state transition | Must distinguish plausible appearance from physically faithful intervention. |

See [`docs/stress_tests.md`](docs/stress_tests.md) for details.

## Reference Organization

The bibliography currently covers work on:

- generative paradigms: GANs, diffusion, flow matching, autoregressive, and hybrid models;
- control and personalization: ControlNet-style conditioning, layout control, identity preservation, multi-view and 3D consistency;
- unified understanding-generation systems and multimodal token streams;
- data engines: VLM captioning, synthetic data distillation, human annotation, programmatic rendering, and quality control;
- alignment: SFT, DPO, DDPO/DPOK, GRPO-style optimization, reward models, and VLM-as-judge;
- agentic generation, visual Chain-of-Thought, closed-loop editing, and world models.

Community suggestions are welcome through the issue template in this repository.

## Citation

If you find this roadmap useful, please cite the project. A formal arXiv citation will be added once available.

```bibtex
@misc{evolvingvisualgeneration2026,
  title  = {Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling},
  author = {Wu, Keming and Yang, Zuhao and Zhang, Kaichen and Wang, Shizun and Zhu, Haowei and others},
  year   = {2026},
  note   = {Preprint and evolving roadmap},
  url    = {https://github.com/EvolvingLMMs-Lab/Evolving-Visual-Generation}
}
```

## Project Status

This is an initial public repository scaffold. The project page, paper PDF, arXiv link, and license will be updated before release.
