from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class Task:
    title: str
    owner: str = "N/A"
    priority: str = "medium"
    done: bool = False


@dataclass
class Incident:
    description: str
    severity: str = "medium"
    resolved: bool = False


@dataclass
class OperationalDashboard:
    tasks: List[Task] = field(default_factory=list)
    incidents: List[Incident] = field(default_factory=list)
    inventory: Dict[str, int] = field(default_factory=dict)

    def add_task(self, title: str, owner: str = "N/A", priority: str = "medium") -> Task:
        task = Task(title=title, owner=owner, priority=priority)
        self.tasks.append(task)
        return task

    def add_incident(self, description: str, severity: str = "medium") -> Incident:
        incident = Incident(description=description, severity=severity)
        self.incidents.append(incident)
        return incident

    def add_inventory_item(self, item: str, quantity: int = 1) -> None:
        current = self.inventory.get(item, 0)
        self.inventory[item] = current + quantity

    def summary(self) -> Dict[str, object]:
        return {
            "tasks_total": len(self.tasks),
            "open_tasks": sum(1 for task in self.tasks if not task.done),
            "incidents_total": len(self.incidents),
            "open_incidents": sum(1 for incident in self.incidents if not incident.resolved),
            "inventory_items": len(self.inventory),
            "inventory_total": sum(self.inventory.values()),
        }

    def as_text(self) -> str:
        summary = self.summary()
        lines = [
            "SIGO-GN Operational Dashboard",
            "============================",
            f"Tasks total: {summary['tasks_total']}",
            f"Open tasks: {summary['open_tasks']}",
            f"Incidents total: {summary['incidents_total']}",
            f"Open incidents: {summary['open_incidents']}",
            f"Inventory items: {summary['inventory_items']}",
            f"Inventory total units: {summary['inventory_total']}",
        ]
        if self.tasks:
            lines.append("\nActive tasks:")
            for task in self.tasks:
                status = "done" if task.done else "open"
                lines.append(f"- [{status}] {task.title} | owner: {task.owner} | priority: {task.priority}")
        if self.incidents:
            lines.append("\nIncidents:")
            for incident in self.incidents:
                status = "resolved" if incident.resolved else "active"
                lines.append(f"- [{status}] {incident.severity}: {incident.description}")
        if self.inventory:
            lines.append("\nInventory:")
            for item, quantity in self.inventory.items():
                lines.append(f"- {item}: {quantity}")
        return "\n".join(lines)
