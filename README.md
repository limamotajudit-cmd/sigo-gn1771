# SIGO-GN

SIGO-GN is a lightweight operational management project scaffold for the course project "Sistema Integral de Gestión Operativa".

## Overview
This repository provides a starter implementation for tracking operational tasks, incidents, and inventory. It is designed as a simple foundation that can be expanded into a larger management application.

## Included features
- Task registration and tracking
- Incident logging
- Inventory management
- Simple dashboard summary

## Quick start

```bash
python3 -m venv .venv
source .venv/bin/activate
python main.py dashboard
```

## Example commands

```bash
python main.py add-task "Review equipment status" --owner "Operations" --priority high
python main.py add-incident "Generator fan alarm" --severity high
python main.py add-item "Safety kit" 5
python main.py dashboard
```

## Project structure

- `main.py` - command-line entry point
- `sigo_gn/manager.py` - core operational logic
- `sigo_gn/__init__.py` - package exports

## Author
Lima Mota Judit de Jesus - 2024601771