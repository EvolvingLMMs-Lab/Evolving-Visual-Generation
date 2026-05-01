window.STRESS_TESTS = [
  {
    "id": "jigsaw",
    "title": "Jigsaw Puzzle Reconstruction",
    "dimension": "Spatial Structuring",
    "level": "L2 boundary",
    "model": "Nano Banana",
    "summary": "The model recovers the semantic theme but hallucinates a plausible image instead of rigidly reassembling puzzle pieces.",
    "finding": "Semantic plausibility dominates over geometric rigidity.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/spatial/puzzle_input.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/spatial/puzzle_output.jpg",
        "label": "Model output"
      },
      {
        "src": "assets/figures/stress-tests/full/spatial/puzzle_gt.jpg",
        "label": "Ground truth"
      }
    ]
  },
  {
    "id": "topology-layout",
    "title": "Metro Map and Tile-Map Constraints",
    "dimension": "Spatial Structuring",
    "level": "L2",
    "model": "GPT-Image-2",
    "summary": "Visually polished structured diagrams still violate graph topology and exact coordinate placement.",
    "finding": "Current generators often reproduce visual grammar without executing the underlying discrete program.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/spatial/metro_map.jpg",
        "label": "Metro map"
      },
      {
        "src": "assets/figures/stress-tests/full/spatial/tile_map.jpg",
        "label": "Isometric tile map"
      }
    ]
  },
  {
    "id": "fluid",
    "title": "Fluid Dynamics Counterfactual",
    "dimension": "Physical Reasoning",
    "level": "L5 probe",
    "model": "Nano Banana",
    "summary": "A floating orange slice is transformed into a submerged state with bubbles and altered refraction.",
    "finding": "The model shows emerging causal artifacts but not a certified physical simulator.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/physics/orange_input.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/orange_explainer.jpg",
        "label": "Analytical explainer"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/orange_sink.jpg",
        "label": "Counterfactual sinking"
      }
    ]
  },
  {
    "id": "driving",
    "title": "Action-Conditioned Driving Prediction",
    "dimension": "Physical Reasoning",
    "level": "L5 probe",
    "model": "Nano Banana",
    "summary": "Navigation and collision prompts test whether visual generation can predict consequences of intervention.",
    "finding": "High-speed cues and crash deformation emerge, but causal faithfulness still needs external verification.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/physics/driving_turn_in.jpg",
        "label": "Initial intersection"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/driving_turn_out.jpg",
        "label": "Perspective shift"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/driving_highway_in.png",
        "label": "Highway anchor"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/driving_speed.jpg",
        "label": "High speed"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/driving_crash.jpg",
        "label": "Collision"
      }
    ]
  },
  {
    "id": "robot-grasp",
    "title": "Robotic Grasp Grounding",
    "dimension": "Physical Reasoning",
    "level": "L5 probe",
    "model": "Nano Banana",
    "summary": "The model combines mug and gripper inputs to synthesize a plausible contact-rich grasp.",
    "finding": "Generation begins to act like a proxy for physical action planning, but force and contact remain implicit.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/physics/grasp_mug.png",
        "label": "Mug input"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/grasp_gripper.png",
        "label": "Gripper input"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/grasp.jpg",
        "label": "Generated grasp"
      }
    ]
  },
  {
    "id": "trajectory",
    "title": "Sequential Trajectory Synthesis",
    "dimension": "Physical Reasoning",
    "level": "L5 probe",
    "model": "Nano Banana",
    "summary": "A spoon manipulation task asks the model to preserve identity while generating a plausible path through time.",
    "finding": "Identity persistence and containment are strong, but trajectory correctness is still visually judged.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/physics/robot_init.png",
        "label": "Initial state"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/robot_traj.jpg",
        "label": "Generated trajectory"
      }
    ]
  },
  {
    "id": "human2robot",
    "title": "Video Re-rendering with Causal Divergence",
    "dimension": "Physical Reasoning",
    "level": "L2 vs L5",
    "model": "Nano Banana",
    "summary": "A humanoid robot is rendered along a human sequence while the functional pouring action disappears.",
    "finding": "Style transfer can preserve appearance and motion path while dropping causal task grounding.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/physics/human2robot_1.jpg",
        "label": "Original human sequence"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/human2robot_2.jpg",
        "label": "Edited humanoid sequence"
      }
    ]
  },
  {
    "id": "materials",
    "title": "Irreversible Material Transformation",
    "dimension": "Physical Reasoning",
    "level": "L5 probe",
    "model": "Nano Banana",
    "summary": "Cutting and peeling examples test whether internal material structure remains consistent after state changes.",
    "finding": "The model often preserves object-specific interior cues, suggesting useful causal identity priors.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/physics/zucchini_input.jpg",
        "label": "Zucchini input"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/zucchini_cut.jpg",
        "label": "Cut zucchini"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/carrot_input.jpg",
        "label": "Carrot input"
      },
      {
        "src": "assets/figures/stress-tests/full/physics/carrot_cut.jpg",
        "label": "Peeled carrot"
      }
    ]
  },
  {
    "id": "physics-solver",
    "title": "Physics Solver on the Image",
    "dimension": "Visual-Textual Integration",
    "level": "L4",
    "model": "Nano Banana",
    "summary": "The model reads a Chinese physics problem, solves it, and writes the derivation back onto the visual artifact.",
    "finding": "This exposes a productive but fragile OCR-to-reasoning-to-rendering loop.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/math/input.jpg",
        "label": "Problem input"
      },
      {
        "src": "assets/figures/stress-tests/full/math/output.jpg",
        "label": "Annotated solution"
      }
    ]
  },
  {
    "id": "manga-drift",
    "title": "Multi-Panel Sequential Editing Drift",
    "dimension": "Multi-Turn Editing",
    "level": "L3/L4",
    "model": "Nano Banana",
    "summary": "Each turn fills one manga panel, yet previous panels silently degrade and drift across turns.",
    "finding": "Single-forward in-context editing creates cumulative representational drift.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/multi_turn/banana-turn0.jpg",
        "label": "Turn 0"
      },
      {
        "src": "assets/figures/stress-tests/full/multi_turn/banana-turn1.jpg",
        "label": "Turn 1"
      },
      {
        "src": "assets/figures/stress-tests/full/multi_turn/banana-turn2.jpg",
        "label": "Turn 2"
      },
      {
        "src": "assets/figures/stress-tests/full/multi_turn/banana-turn3.jpg",
        "label": "Turn 3"
      }
    ]
  },
  {
    "id": "cat-restore",
    "title": "Restore-to-Original Long-Range Recall",
    "dimension": "Multi-Turn Editing",
    "level": "L3/L4",
    "model": "Nano Banana",
    "summary": "A later instruction asks the model to restore the original cat state after multiple edits.",
    "finding": "Semantic drift compounds when the system lacks explicit history or state memory.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/multi_turn/cat-turn0.jpg",
        "label": "Turn 0"
      },
      {
        "src": "assets/figures/stress-tests/full/multi_turn/cat-turn1.jpg",
        "label": "Turn 1"
      },
      {
        "src": "assets/figures/stress-tests/full/multi_turn/cat-turn2.jpg",
        "label": "Turn 2"
      },
      {
        "src": "assets/figures/stress-tests/full/multi_turn/cat-turn3.jpg",
        "label": "Turn 3"
      }
    ]
  },
  {
    "id": "children",
    "title": "Predicting Children Appearance",
    "dimension": "Human-Centric Editing",
    "level": "L2/L4/L5",
    "model": "Nano Banana",
    "summary": "Two parent portraits test whether the model blends inherited traits or falls back to source-region composition.",
    "finding": "The capability exists but depends strongly on explicit prompt wording.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/children/children_before_mom.jpg",
        "label": "Female input"
      },
      {
        "src": "assets/figures/stress-tests/full/children/children_before_dad.jpg",
        "label": "Male input"
      },
      {
        "src": "assets/figures/stress-tests/full/children/children_after_attempt1.jpg",
        "label": "Attempt 1"
      },
      {
        "src": "assets/figures/stress-tests/full/children/children_after_attempt2.jpg",
        "label": "Attempt 2"
      }
    ]
  },
  {
    "id": "surgery",
    "title": "Plastic Surgery Simulation",
    "dimension": "Human-Centric Editing",
    "level": "L2/L4/L5",
    "model": "Nano Banana",
    "summary": "Vague beautification and analysis-chart prompts produce different output modalities.",
    "finding": "The model decomposes aesthetic goals and can render domain-specific consultation-style documents.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/surgery/surgery_before.png",
        "label": "Example 1 input"
      },
      {
        "src": "assets/figures/stress-tests/full/surgery/surgery_after.jpg",
        "label": "Example 1 output"
      },
      {
        "src": "assets/figures/stress-tests/full/surgery/surgery_before_girl.png",
        "label": "Example 2 input"
      },
      {
        "src": "assets/figures/stress-tests/full/surgery/surgery_after_girl.jpg",
        "label": "Example 2 output"
      }
    ]
  },
  {
    "id": "hair",
    "title": "Culturally Specific Hairstyle Editing",
    "dimension": "Human-Centric Editing",
    "level": "L2",
    "model": "Nano Banana",
    "summary": "A foil-perm request tests culturally grounded styling knowledge and identity-preserving local editing.",
    "finding": "Concrete styling requests are a practical sweet spot for current visual models.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/hair/hair_before.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/hair/hair_after.jpg",
        "label": "Foil-perm output"
      }
    ]
  },
  {
    "id": "sr",
    "title": "Super-Resolution",
    "dimension": "Low-Level Vision",
    "level": "L1/L2",
    "model": "Nano Banana",
    "summary": "The model recovers sharper edges and richer texture from low-resolution input.",
    "finding": "Some details look synthesized rather than faithfully reconstructed.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_sr_in.png",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_sr_out.jpg",
        "label": "Model output"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_sr_gt.png",
        "label": "Ground truth"
      }
    ]
  },
  {
    "id": "lowlight",
    "title": "Low-Light Enhancement",
    "dimension": "Low-Level Vision",
    "level": "L1/L2",
    "model": "Nano Banana",
    "summary": "The model brightens a dark image and reveals hidden scene content.",
    "finding": "Enhancement is visually strong but can rewrite local texture and illumination.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_lowlight_in.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_lowlight_out.jpg",
        "label": "Model output"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_lowlight_gt.jpg",
        "label": "Ground truth"
      }
    ]
  },
  {
    "id": "denoise",
    "title": "Denoising",
    "dimension": "Low-Level Vision",
    "level": "L1/L2",
    "model": "Nano Banana",
    "summary": "Heavy noise is removed while the global racing-scene layout remains recognizable.",
    "finding": "Perceptual cleanup is strong, though exact signal fidelity remains uncertain.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_denoise_in.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_denoise_out.jpg",
        "label": "Model output"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_denoise_gt.png",
        "label": "Ground truth"
      }
    ]
  },
  {
    "id": "derain",
    "title": "Deraining",
    "dimension": "Low-Level Vision",
    "level": "L1/L2",
    "model": "Nano Banana",
    "summary": "Dominant rain streaks are suppressed and the bear scene becomes clearer.",
    "finding": "The restoration likely combines degradation removal with learned natural-image priors.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_derain_in.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_derain_out.jpg",
        "label": "Model output"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_derain_gt.png",
        "label": "Ground truth"
      }
    ]
  },
  {
    "id": "deblur",
    "title": "Deblurring",
    "dimension": "Low-Level Vision",
    "level": "L1/L2",
    "model": "Nano Banana",
    "summary": "A severely blurred street image is transformed into a clearer urban scene.",
    "finding": "The output is useful perceptually but may rely on plausible detail synthesis.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_deblur_in.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_deblur_out.jpg",
        "label": "Model output"
      }
    ]
  },
  {
    "id": "depth",
    "title": "Out-of-Distribution Depth Estimation",
    "dimension": "Low-Level Vision",
    "level": "L1/L2",
    "model": "Nano Banana",
    "summary": "A real-world scene tests whether the model can estimate depth rather than only recognize objects.",
    "finding": "Object recognition is strong, but depth shades collapse across distinct distances.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_depth_in.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/low_level/low_level_depth_out.jpg",
        "label": "Depth output"
      }
    ]
  },
  {
    "id": "city",
    "title": "Historical Urban Planning Design",
    "dimension": "Real-World Applications",
    "level": "L4/L5",
    "model": "Nano Banana",
    "summary": "A Tang Dynasty Chang'an city layout tests historical world knowledge, spatial planning, and Chinese labels.",
    "finding": "Global layout and historical style are strong, but small text and unique labels remain fragile.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/real_world/real_world_city_design.jpg",
        "label": "City design"
      }
    ]
  },
  {
    "id": "ui",
    "title": "Professional UI Dashboard Design",
    "dimension": "Real-World Applications",
    "level": "L4/L5",
    "model": "Nano Banana",
    "summary": "A football manager dashboard combines UI composition, world knowledge, and fine-grained logical constraints.",
    "finding": "The interface is polished and readable, but small logical details can be inconsistent.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/real_world/real_world_ui_design.jpg",
        "label": "Dashboard design"
      }
    ]
  },
  {
    "id": "code-ui",
    "title": "Coding Problem Solving as Visual UI Generation",
    "dimension": "Real-World Applications",
    "level": "L4",
    "model": "GPT-Image-2",
    "summary": "Screenshots of LeetCode problems are converted into new UI images containing correct Python solutions.",
    "finding": "The model behaves like a read-solve-render interface for coding tasks.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/code/input_easy.png",
        "label": "Easy input"
      },
      {
        "src": "assets/figures/stress-tests/full/code/easy_output.jpg",
        "label": "Easy output"
      },
      {
        "src": "assets/figures/stress-tests/full/code/hard_input.png",
        "label": "Hard input"
      },
      {
        "src": "assets/figures/stress-tests/full/code/hard_output.jpg",
        "label": "Hard output"
      }
    ]
  },
  {
    "id": "math-diagram",
    "title": "Mathematical Proof Diagram Generation",
    "dimension": "Real-World Applications",
    "level": "L4",
    "model": "GPT-Image-2",
    "summary": "A dense Euclidean proof prompt is rendered as a structured golden-ratio pentagram diagram.",
    "finding": "Structure-aware diagram synthesis is strong, but exact proof validity still needs verification.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/math/math_2.jpg",
        "label": "Proof diagram"
      }
    ]
  },
  {
    "id": "posters",
    "title": "Cross-Disciplinary Poster and Infographic Generation",
    "dimension": "Real-World Applications",
    "level": "L4/L5",
    "model": "GPT-Image-2",
    "summary": "Food and biomedical prompts test multilingual typography, domain knowledge, and professional information design.",
    "finding": "Large-scale document layout is impressive; dense small text remains the hard part.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/real_world/real_world_food_poster.jpg",
        "label": "Culinary poster"
      },
      {
        "src": "assets/figures/stress-tests/full/real_world/real_world_lime_drug_design.jpg",
        "label": "Biomedical infographic"
      }
    ]
  },
  {
    "id": "ocr",
    "title": "Optical Character Recognition",
    "dimension": "High-Level Vision",
    "level": "L2",
    "model": "Nano Banana",
    "summary": "The model converts document text regions into explicit rendered text output.",
    "finding": "Global layout is recovered, while character-level precision degrades on small or degraded text.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/high_level/ocr_input.png",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/high_level/ocr_output.jpg",
        "label": "Output"
      }
    ]
  },
  {
    "id": "keypoints",
    "title": "Keypoint Estimation",
    "dimension": "High-Level Vision",
    "level": "L2",
    "model": "Nano Banana",
    "summary": "A human pose is converted into a sparse structured keypoint configuration.",
    "finding": "Global articulation is plausible, but occluded and ambiguous joints remain difficult.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/high_level/keypoint_input.png",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/high_level/keypoint_output.jpg",
        "label": "Output"
      }
    ]
  },
  {
    "id": "segmentation",
    "title": "Semantic Segmentation",
    "dimension": "High-Level Vision",
    "level": "L2",
    "model": "Nano Banana",
    "summary": "The model renders dense masks for major objects and scene regions.",
    "finding": "Semantic regions are coherent, while boundaries remain coarse in cluttered areas.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/high_level/segment_input.png",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/high_level/segment_output.jpg",
        "label": "Output"
      }
    ]
  },
  {
    "id": "detection",
    "title": "Object Detection",
    "dimension": "High-Level Vision",
    "level": "L2",
    "model": "Nano Banana",
    "summary": "The model localizes people and salient objects with bounding boxes.",
    "finding": "Scene-level localization is credible, but duplicates and ambiguous boxes appear in crowded regions.",
    "images": [
      {
        "src": "assets/figures/stress-tests/full/high_level/detect_input.jpg",
        "label": "Input"
      },
      {
        "src": "assets/figures/stress-tests/full/high_level/detect_output.jpg",
        "label": "Output"
      }
    ]
  }
];
