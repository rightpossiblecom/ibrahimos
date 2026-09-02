import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";
import {
  ACTIVE_INCIDENT_KEY,
  DESK_LIVE_KEY,
  activateSeededIncident,
  attachEvidence,
  deployCrew,
  getActiveIncident,
  isDeskLive,
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
  window: {
    dispatchEvent() {
      return true;
    },
  },
  localStorage: localStorageMock,
});

beforeEach(() => {
  localStorageMock.clear();
});

test("fresh desk has no live incident and no figures", () => {
  assert.equal(isDeskLive(), false);
  assert.equal(getActiveIncident(), null);
  assert.equal(localStorage.getItem(DESK_LIVE_KEY), null);
});

test("activating the Kaduna seed fills the desk", () => {
  const incident = activateSeededIncident();

  assert.equal(isDeskLive(), true);
  assert.equal(incident.id, "incident-north-block-04");
  assert.equal(incident.field.name, "North Block 04");
  assert.equal(incident.field.totalHectares, 86);
  assert.equal(incident.affectedHectares, 18.4);
  assert.equal(incident.responseCost, 428000);
  assert.equal(incident.responseWindowHours, 6);
  assert.equal(incident.zones.length, 3);
  assert.equal(incident.crewTasks.length, 4);
  assert.notEqual(localStorage.getItem(ACTIVE_INCIDENT_KEY), null);
});

test("completing a crew task persists and recalculates progress", () => {
  const seeded = activateSeededIncident();

  const updated = updateIncidentTask(seeded.crewTasks[0].id, true);
  assert.equal(updated.crewTasks[0]?.complete, true);
  assert.equal(updated.recovery.completion, 25);
  assert.equal(updated.recovery.state, "responding");

  const reloaded = getActiveIncident();
  assert.equal(reloaded?.crewTasks[0]?.complete, true);
  assert.equal(reloaded?.recovery.completion, 25);

  resetIncidentDemo();
  assert.equal(isDeskLive(), false);
  assert.equal(getActiveIncident(), null);
});

test("deploying the crew marks the incident as responding", () => {
  activateSeededIncident();
  const deployed = deployCrew();
  assert.equal(typeof deployed.recovery.deployedAt, "string");
  assert.equal(deployed.recovery.state, "responding");

  const linked = attachEvidence("evidence-north-block-04");
  assert.equal(linked.assessmentId, "evidence-north-block-04");
  assert.equal(linked.evidenceAssessmentIds.includes("evidence-north-block-04"), true);
});
