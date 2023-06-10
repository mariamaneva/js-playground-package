import routes from "./../../../nav.generated";

const findSectionById = (sections: NavConfigItem[], id: string) => {
  for (const section of sections) {
    if (section.id === id) {
      return section;
    }
    if (section.children) {
      const match = findSectionById(section.children, id);
      if (match) return match;
    }
  }
};

const sectionCleanup = (unmount?: () => void) => {
  if (typeof unmount === "function") {
    unmount();
  }
  console.clear();
};

export const handleLocationChange = (routes: NavConfigItem[]) => {
  const currentId = `${window.location.pathname}`.split("/").reverse()[0];
  const matchedSection = findSectionById(routes, currentId);
  if (matchedSection) {
    document.title = `Topic: ${matchedSection.name}`;
    document.getElementById("title").innerHTML = matchedSection.name;
    document.getElementById("content").innerHTML = "";
    const navLinks = document.getElementsByClassName("nav-link");

    for (const navLink of navLinks) {
      if (navLink.id === matchedSection.id) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    }
    matchedSection.code();
  }
};

const handleMenuClick = (event: MouseEvent) => {
  const target = event.target as HTMLAnchorElement;

  event.preventDefault();
  const isAParent = target.href.startsWith("#");
  if (!isAParent) {
    history.pushState({}, null, target.id);
    const popStateEvent = new PopStateEvent("popstate", null);
    dispatchEvent(popStateEvent);
  }
};

export const createMenuItem = (info: NavConfigItem) => {
  const link = document.createElement("a");
  const { id, children, name } = info;
  link.innerHTML = name;
  link.classList.add("nav-link");
  link.href = !children ? id : `#${id}`;
  if (info.children) {
    link.classList.add("dropdown-toggle", "text-primary", "bg-transparent");
    link.dataset.bsToggle = "collapse";
    link.setAttribute("aria-expanded", "false");
    link.setAttribute("aria-controls", id);
  } else {
    link.id = id;
  }
  return link;
};

const createNavSubsection = (id: string) => {
  const url = window.location.pathname.replace("/", '')
  const container = document.createElement("div");
  container.classList.add("collapse");
  // persist open menu
  if(url.startsWith(id)) {
    container.classList.add("show")
  }
  container.id = id;
  container.style.paddingLeft = "20px";
  return container;
};

const renderNav = (routes: NavConfigItem[], parent: HTMLElement) => {
  routes.forEach((item) => {
    parent.append(createMenuItem(item));
    if (item.children) {
      const subsectionContainer = createNavSubsection(item.id);
      renderNav(item.children, subsectionContainer);
      parent.append(subsectionContainer);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  let unmount: () => void;
  const rootElement: HTMLElement = document.querySelector(".container");
  const navContainer: HTMLElement = document.querySelector("#mainNav");

  window.addEventListener("load", () => {
    handleLocationChange(routes);
  });

  window.addEventListener("popstate", () => {
    sectionCleanup(unmount);
    handleLocationChange(routes);
  });

  rootElement.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.className.includes("nav-link")) {
      return handleMenuClick(event);
    }

    if (target.id === "switch-mode") {
      const darkCSS = document.getElementById("dark") as HTMLLinkElement;
      const lightCSS = document.getElementById("light") as HTMLLinkElement;
      if (darkCSS.media === "") {
        darkCSS.media = "none";
        lightCSS.media = "";
      } else {
        darkCSS.media = "";
        lightCSS.media = "none";
      }
    }
  });

  renderNav(routes, navContainer);
});
