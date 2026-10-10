"""SIGO-GN operational management package."""

__all__ = ["OperationalDashboard", "Task", "Incident"]

from .manager import Incident, OperationalDashboard, Task

__version__ = "0.1.0"
