# Automatic-code-Plagiarim-Detection
A robust, NLP-powered tool designed to detect structural and semantic similarities between source code files across multiple programming languages.
🚀 Key Features & Upgrades
Multi-Layer Similarity Engine: Implements a dual-detection protocol using Winnowing (MOSS-style fingerprinting) for rapid text overlap and Abstract Syntax Tree (AST) hashing to detect logic-level copying.

Boilerplate Filtering & Whitening: Features an intelligent "Base Code" exclusion layer that prevents false positives by ignoring instructor-provided templates or common library imports.

Structural Robustness: Resilient against common obfuscation techniques, including variable/function renaming, comment insertion, and shifting blocks of code.

Visual Similarity Heatmaps: An interactive React dashboard that generates side-by-side code comparisons with highlighted "collision zones" for manual verification.

Cluster Analysis & Collusion Detection: Grouping logic that identifies "rings" of plagiarism where multiple submissions share a common source, visualized through dynamic relationship graphs.

Real-time Processing Pipeline: A Flask-based API that tokenizes and hashes submissions in parallel, capable of cross-referencing hundreds of files in seconds.

Comprehensive Audit Logs: Uses MongoDB to store historical similarity scores and plagiarism reports, allowing educators to track recurring patterns over multiple semesters.
