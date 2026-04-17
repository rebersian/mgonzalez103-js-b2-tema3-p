// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e2.md / Enunciat disponible a u1e2.md

const CATEGORY_LIST = [
    {
        id: 1,
        name: 'design'
    }, {
        id: 2,
        name: 'development'
    }, {
        id: 3,
        name: 'consultancy'
    }
];

const PROJECT_LIST = [
    {
        id: 1,
        name: 'First Project',
        excerpt: 'Lorem <strong>ipsum</strong> dolor quan aemet...',
        categoryId: 2,
        progress: 90,
        archived: false,
        search: ['wordA', 'wordB', 'wordC'],
        tags: ['tag1', 'tag2']
    }, {
        id: 2,
        name: 'Second Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 2,
        progress: 50,
        archived: false,
        search: ['wordA', 'wordD'],
        tags: ['tag3']
    }, {
        id: 3,
        name: 'Third Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 1,
        progress: 20,
        archived: false,
        search: ['wordB', 'wordC'],
        tags: ['tag1', 'tag3']
    }, {
        id: 4,
        name: 'Fourth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB'],
        tags: ['tag2']
    }, {
        id: 5,
        name: 'Fifth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: false,
        search: ['wordA', 'wordC', 'wordD'],
        tags: ['tag1', 'tag2', 'tag3']
    }, {
        id: 6,
        name: 'Sixth Project',
        excerpt: 'Lorem ipsum <strong>dolor quan</strong> aemet...',
        categoryId: 2,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB', 'wordD'],
        tags: ['tag1']
    },
];

// MGG - render de la lista de proyectos a partir de los datos de PROJECT_LIST y CATEGORY_LIST
const renderProjects = () => {
  const projectListNode = document.querySelector(".js-project-list");
  const projectTemplate = document.getElementById("tpl-project");
  const tagTemplate = document.getElementById("tpl-tag");
  const fragment = document.createDocumentFragment();

  PROJECT_LIST.forEach((project) => {
    const projectFragment = projectTemplate.content.cloneNode(true);
    const projectElement = projectFragment.querySelector(".js-project");
    const category = CATEGORY_LIST.find((c) => c.id === project.categoryId);
    projectElement.dataset.id = project.id;
    projectElement.dataset.tags = project.tags.join(",");
    projectElement.dataset.search = project.search.join(",");
    projectElement.dataset.archived = project.archived;
    projectFragment.querySelector(".js-name").textContent = project.name;
    projectFragment.querySelector(".js-progress").textContent = project.progress;
    projectFragment.querySelector(".js-excerpt").innerHTML = project.excerpt;
    projectFragment.querySelector(".js-category").textContent = category ? category.name : "";
    const tagsContainer = projectFragment.querySelector(".js-tags");
    tagsContainer.innerHTML = "";
    project.tags.forEach((tag) => {
      const tagFragment = tagTemplate.content.cloneNode(true);
      const tagLink = tagFragment.querySelector(".js-tag-link");
      tagLink.textContent = tag;
      tagLink.dataset.tag = tag;
      tagLink.href = "#";
      tagsContainer.appendChild(tagFragment);
    });

    if (project.archived) {
      projectElement.classList.add("archived");
    }

    if (project.progress === 100) {
      projectElement.classList.add("completed");
    }

    fragment.appendChild(projectFragment);
  });
  projectListNode.appendChild(fragment);
};
renderProjects();