interface Resource {
  resources: string[];
  projects: string[];
}

type LanguageKeys = "react" | "golang" | "python" | "rust";

const resources: Record<LanguageKeys, Resource> = {
  react: {
    resources: [
      "React Documentation: https://reactjs.org/docs/getting-started.html",
      "React Tutorial: https://reactjs.org/tutorial/tutorial.html",
    ],
    projects: [
      "React Project Ideas: https://github.com/florinpop17/app-ideas#react",
      "React Projects on Frontend Mentor: https://www.frontendmentor.io/challenges",
    ],
  },
  golang: {
    resources: [
      "Go Documentation: https://golang.org/doc/",
      "Go by Example: https://gobyexample.com/",
    ],
    projects: [
      "Golang Project Ideas: https://github.com/awesome-go/awesome-go#projects",
      "Golang Challenges: https://exercism.io/tracks/go/exercises",
    ],
  },
  python: {
    resources: [
      "Python Official Documentation: https://docs.python.org/3/",
      "Automate the Boring Stuff with Python: https://automatetheboringstuff.com/",
    ],
    projects: [
      "Python Project Ideas: https://github.com/karan/Projects",
      "Python Challenges: https://exercism.io/tracks/python/exercises",
    ],
  },
  rust: {
    resources: [
      "Rust Book: https://doc.rust-lang.org/book/",
      "Rust by Example: https://doc.rust-lang.org/stable/rust-by-example/",
    ],
    projects: [
      "Rust Project Ideas: https://github.com/florinpop17/app-ideas#rust",
      "Rust Challenges: https://exercism.io/tracks/rust/exercises",
    ],
  },
};

// Tailwind CSS resources
const tailwindResources: string[] = [
  "Tailwind CSS Documentation: https://tailwindcss.com/docs/installation",
  "Tailwind CSS Cheatsheet: https://nerdcave.com/tailwind-cheat-sheet",
];

// Project ideas
const projectResources: string[] = [
  "Project Ideas: https://github.com/florinpop17/app-ideas",
  "Frontend Mentor: https://www.frontendmentor.io/challenges",
];

// Resource map
const resourceMap: {
  lang: Record<LanguageKeys, Resource>;
  tailwind: string[];
  projects: string[];
} = {
  lang: resources,
  tailwind: tailwindResources,
  projects: projectResources,
};

// Function to get language resources
export function getLanguageResources(
  lang: LanguageKeys,
  sub?: "projects" | "resources",
): { resources: string[]; projects: string[] } {
  const languageResource = resourceMap.lang[lang];

  if (languageResource) {
    if (sub === "projects") {
      return { resources: [], projects: languageResource.projects };
    } else if (sub === "resources") {
      return { resources: languageResource.resources, projects: [] };
    }

    return {
      resources: languageResource.resources,
      projects: languageResource.projects,
    };
  }

  return {
    projects: [],
    resources: [],
  };
}

// General function to get resources
export function getResource(
  category: string,
  subCategory?: string,
  type?: "projects" | "resources",
): { projects: string[]; resources: string[] } {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory === "lang" && subCategory) {
    return getLanguageResources(subCategory as LanguageKeys, type);
  }

  if (normalizedCategory === "tailwind") {
    return { projects: [], resources: tailwindResources };
  }

  if (normalizedCategory === "projects") {
    return { projects: projectResources, resources: [] };
  }

  // Return empty if category doesn't match
  return { projects: [], resources: [] };
}
