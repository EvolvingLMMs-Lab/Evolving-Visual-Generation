# Applications and Evolving Frontiers

Applications reveal why visual generation must move beyond perceptual realism. Real use cases increasingly impose explicit constraints: identity, coordinates, text, domain grammar, physical interaction, data faithfulness, and long-horizon state.

## Fine-Grained Controllability

Conditional generation reduces prompt ambiguity through additional control signals:

- spatial layouts and bounding boxes;
- edge, depth, pose, segmentation, and normal maps;
- style, subject, and identity references;
- multi-view or 3D cues;
- region-level masks and localized attention.

Representative problem families include layout-guided generation, personalized subject generation, full-body character consistency, multi-entity composition, and view-consistent generation.

## Constructionist Paradigms

Some visual domains are governed by explicit design rules rather than photographic realism. Examples include:

- typography and exact glyph rendering;
- poster, slide, UI, and document design;
- layered transparent images;
- scientific diagrams and technical illustrations;
- structured charts and infographics.

These tasks demand symbolic precision: exact text, valid geometry, correct labels, and editable structure.

## Reasoning-Driven Editing

Editing turns generation into a controlled state transition. The model must modify requested regions while preserving everything else that should remain invariant. This makes editing a natural bridge from L2 conditional generation to L4 agentic workflows.

Key directions include:

- multi-step edit decomposition;
- symbolic or executable edit programs;
- visual Chain-of-Thought for planning edits;
- preservation of identity, background, lighting, and geometry;
- multi-turn editing without compounding drift.

## Embodied and Physical Domains

Embodied generation uses visual models to support physical agents:

- robot data augmentation;
- future visual prediction for planning;
- action-conditioned video generation;
- simulation of manipulation or navigation outcomes;
- cross-morphology editing between human and robot embodiments.

The decisive criterion is not visual smoothness, but **action faithfulness**: whether the generated future reflects the causal consequence of the action.

## Data-Centric Visualization

A growing class of applications requires models to understand structured data before rendering:

- charts from natural language queries;
- tables and semi-structured documents;
- multi-page reports with text, figures, and tables;
- dashboards and data-driven infographics;
- analytical visualizations grounded in databases.

This connects visual generation with data management: the system must parse, reason, choose an encoding, render, and verify the visual artifact.

## Why Applications Matter for the Taxonomy

Applications expose the gap between "looks right" and "is right." A visually polished metro map can be topologically invalid; a beautiful dashboard can encode the wrong numbers; a professional-looking diagram can violate domain rules. This is why the future evaluation stack must include OCR, graph parsers, validators, simulators, and domain checkers.
