import assert from "node:assert/strict";
import { dictionaries } from "../lib/content.ts";

const expectedCategories = new Set(["professional", "freelance", "personal", "academic"]);
const expectedStatuses = new Set(["production", "internal", "paused", "completed", "development", "prototype", "mockup"]);
const spanish = dictionaries.es.projects.items;
const english = dictionaries.en.projects.items;

assert.deepEqual(
  spanish.map((project) => project.id),
  english.map((project) => project.id),
  "Spanish and English project ids must stay in the same order",
);

for (const lang of ["es", "en"]) {
  const dictionary = dictionaries[lang];
  const ids = new Set();
  const priorities = new Set();

  for (const project of dictionary.projects.items) {
    assert(!ids.has(project.id), `${lang}: duplicate project id ${project.id}`);
    assert(!priorities.has(project.priority), `${lang}: duplicate priority ${project.priority}`);
    assert(expectedCategories.has(project.category), `${lang}: invalid category for ${project.id}`);
    assert(expectedStatuses.has(project.status), `${lang}: invalid status for ${project.id}`);
    assert(dictionary.caseStudies[project.id], `${lang}: missing case study for ${project.id}`);
    assert(project.metaDescription.length <= 180, `${lang}: meta description too long for ${project.id}`);
    ids.add(project.id);
    priorities.add(project.priority);
  }
}

console.log(`Validated ${spanish.length} bilingual projects and case studies.`);
