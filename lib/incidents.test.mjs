import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";
import {
  ACTIVE_INCIDENT_KEY,
  attachEvidence,
  deployCrew,
  getActiveIncident,
  resetIncidentDemo,
  updateIncidentTask,
} from "./incidents.ts";

class MemoryStorage {
  #store = new Map();

  clear() {
    this.#store.clear();
  }

  getItem(key) {
    return this.#store.get(key) ?? null;
  }

  removeItem(key) {
    this.#store.delete(key);
  }

  setItem(key, value) {
    this.#store.set(key, value);
  }
}

const localStorageMock = new MemoryStorage();

Object.assign(globalThis, {
  window: {},
  localStorage: localStorageMock,
});

beforeEach(() => {
  localStorageMock.clear();
});

test("loads the Kaduna seed deterministically on fresh browser state", () => {
  const incident = getActiveIncident();

  assert.equal(incident.id, "incident-north-block-04");
  assert.equal(incident.field.name, "North Block 04");
  assert.equal(incident.field.totalHectares, 86);
  assert.equal(incident.affectedHectares, 18.4);
  assert.equal(incident.responseCost, 428000);
  assert.equal(incident.responseWindowHours, 6);
  assert.equal(incident.zones.length, 3);
  assert.equal(incident.crewTasks.length, 4);
  assert.equal(incident.recovery.completion, 0);
  assert.equal(incident.recovery.state, "planned");
  assert.notEqual(localStorage.getItem(ACTIVE_INCIDENT_KEY), null);
});

test("completing a crew task persists and recalculates progress", () => {
  const seeded = getActiveIncident();

  const updated = updateIncidentTask(seeded.crewTasks[0].id, true);
  assert.equal(updated.crewTasks[0]?.complete, true);
  assert.equal(updated.recovery.completion, 25);
  assert.equal(updated.recovery.state, "responding");

  const reloaded = getActiveIncident();
  assert.equal(reloaded.crewTasks[0]?.complete, true);
  assert.equal(reloaded.recovery.completion, 25);
  assert.equal(reloaded.recovery.state, "responding");

  resetIncidentDemo();
  const reset = getActiveIncident();
  assert.equal(reset.crewTasks.every((task) => !task.complete), true);
  assert.equal(reset.recovery.completion, 0);
});

test("deploying the crew marks the incident as responding", () => {
  getActiveIncident();
  const deployed = deployCrew();
  assert.equal(typeof deployed.recovery.deployedAt, "string");
  assert.equal(deployed.recovery.state, "responding");

  const linked = attachEvidence("evidence-north-block-04");
  assert.equal(linked.assessmentId, "evidence-north-block-04");
  assert.equal(linked.evidenceAssessmentIds.includes("evidence-north-block-04"), true);
});
