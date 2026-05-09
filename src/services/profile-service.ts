import { appDb } from "../db/app-db";
import type { Profile } from "../types/salary";

export async function saveProfile(profile: Profile) {
  await appDb.profiles.put(profile);
  return profile;
}

export async function listProfiles() {
  return appDb.profiles.orderBy("updatedAt").reverse().toArray();
}
