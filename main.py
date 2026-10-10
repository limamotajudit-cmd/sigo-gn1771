from __future__ import annotations

import argparse

from sigo_gn.manager import OperationalDashboard


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="SIGO-GN operational management CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("dashboard", help="Show an operational dashboard summary")

    list_tasks = subparsers.add_parser("list-tasks", help="List tasks")
    list_tasks.add_argument("--all", action="store_true", help="Include all tasks, even done items")

    add_task = subparsers.add_parser("add-task", help="Add a task")
    add_task.add_argument("title")
    add_task.add_argument("--owner", default="N/A")
    add_task.add_argument("--priority", choices=["low", "medium", "high"], default="medium")

    add_incident = subparsers.add_parser("add-incident", help="Add an incident")
    add_incident.add_argument("description")
    add_incident.add_argument("--severity", choices=["low", "medium", "high", "critical"], default="medium")

    add_item = subparsers.add_parser("add-item", help="Add inventory quantity")
    add_item.add_argument("item")
    add_item.add_argument("quantity", type=int, default=1)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    dashboard = OperationalDashboard()

    if args.command == "dashboard":
        print(dashboard.as_text())
        return

    if args.command == "add-task":
        dashboard.add_task(args.title, owner=args.owner, priority=args.priority)
        print(f"Task added: {args.title}")
        return

    if args.command == "add-incident":
        dashboard.add_incident(args.description, severity=args.severity)
        print(f"Incident logged: {args.description}")
        return

    if args.command == "add-item":
        dashboard.add_inventory_item(args.item, args.quantity)
        print(f"Inventory updated: {args.item} = {args.quantity}")
        return

    if args.command == "list-tasks":
        if not dashboard.tasks:
            print("No tasks registered.")
            return
        print("Tasks:")
        for task in dashboard.tasks:
            state = "done" if task.done else "open"
            print(f"- [{state}] {task.title} | owner: {task.owner} | priority: {task.priority}")
        return

    parser.error(f"Unknown command: {args.command}")


if __name__ == "__main__":
    main()
