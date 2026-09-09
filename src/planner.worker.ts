import { planArmMotion, type PlanRequest } from "./kinematics";

self.onmessage = (event: MessageEvent<PlanRequest>) => {
  try {
    self.postMessage(planArmMotion(event.data));
  } catch {
    self.postMessage({ status: "error" });
  }
};
