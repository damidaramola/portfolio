const $ = (sel) => document.querySelector(sel);

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "text") node.textContent = value;
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) if (child) node.append(child);
  return node;
}

function externalLink(href, label, className) {
  const attrs = { href, target: "_blank", rel: "noopener noreferrer", text: label };
  if (className) attrs.class = className;
  return el("a", attrs);
}

const pad = (n) => String(n).padStart(2, "0");

// Hero
document.title = `${PROFILE.name} | ${PROFILE.role}`;
const [first, ...rest] = PROFILE.name.split(" ");
$("#hero-name").replaceChildren(first, " ", el("em", { text: rest.join(" ") }));
$("#hero-role").textContent = PROFILE.role;
$("#hero-tagline").textContent = PROFILE.tagline;

// Projects
const list = $("#project-list");
const sortedProjects = [...PROJECTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

function projectThumb(p, href) {
  const placeholder = () => el("span", { class: "thumb-empty mono", text: "Screenshot coming soon" });
  const frame = el("a", { class: "project-thumb", "aria-hidden": "true", tabindex: "-1" });
  if (href) Object.assign(frame, { href, target: "_blank", rel: "noopener noreferrer" });

  if (p.image) {
    const img = el("img", { src: p.image, alt: `${p.title} landing page`, loading: "lazy" });
    img.addEventListener("error", () => img.replaceWith(placeholder()));
    frame.append(img);
  } else {
    frame.append(placeholder());
  }
  return frame;
}

function projectRow(p, i) {
  const href = p.demo || p.repo;
  const title = href ? externalLink(href, `${p.title} ↗`, "project-title") : p.title;
  return el("li", { class: "project" }, [
    el("span", { class: "project-num mono", text: pad(i + 1) }),
    projectThumb(p, href),
    el("div", { class: "project-main" }, [
      el("h3", {}, title),
      el("ul", { class: "project-tags mono" }, p.tags.map((t) => el("li", { text: t }))),
      el("p", { text: p.description }),
    ]),
  ]);
}

list.replaceChildren(...sortedProjects.map(projectRow));

// About
if (PROFILE.about.length === 0) {
  $("#about").remove();
  document.querySelector('.nav-links a[href="#about"]').remove();
} else {
  $("#about-text").replaceChildren(...PROFILE.about.map((text) => el("p", { text })));
}

// Skills
$("#skills-list").replaceChildren(
  ...Object.entries(SKILLS).map(([group, items]) =>
    el("div", { class: "skill-group" }, [
      el("h3", { class: "mono", text: group }),
      el("ul", {}, items.map((s) => el("li", { text: s }))),
    ])
  )
);

// Experience
if (EXPERIENCE.length === 0) {
  $("#experience").remove();
  $("#nav-experience").remove();
} else {
  $("#timeline").replaceChildren(
    ...EXPERIENCE.map((e) =>
      el("li", { class: "job" }, [
        el("span", { class: "job-period mono", text: e.period }),
        el("div", {}, [
          el("h3", {}, [e.role, el("span", { class: "job-org", text: ` at ${e.org}` })]),
          e.points?.length && el("ul", {}, e.points.map((pt) => el("li", { text: pt }))),
        ]),
      ])
    )
  );
}

// Number the remaining sections 01, 02… in page order, in both the labels and the nav
document.querySelectorAll(".section").forEach((section, i) => {
  section.querySelector(".section-label span").textContent = pad(i + 1);
  const navNum = document.querySelector(`.nav-links a[href="#${section.id}"] span`);
  if (navNum) navNum.textContent = pad(i + 1);
});

// Contact
const email = $("#contact-email");
if (PROFILE.email) {
  email.href = `mailto:${PROFILE.email}`;
  email.textContent = PROFILE.email;
} else {
  email.remove();
}

// Accept links written without https:// (e.g. "www.linkedin.com/in/...")
const fullUrl = (url) => (/^https?:\/\//.test(url) ? url : `https://${url}`);

$("#contact-links").replaceChildren(
  ...[
    PROFILE.links.linkedin && externalLink(fullUrl(PROFILE.links.linkedin), "LinkedIn"),
    PROFILE.links.github && externalLink(fullUrl(PROFILE.links.github), "GitHub"),
    PROFILE.resume && el("a", { href: PROFILE.resume, download: "", text: "Résumé ↓" }),
  ]
    .filter(Boolean)
    .map((a) => el("li", {}, a))
);

$("#footer").textContent = `© ${new Date().getFullYear()} ${PROFILE.name}`;

// Highlight the nav link for the section in view
const navLinks = [...document.querySelectorAll(".nav-links a")];
const spy = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const a of navLinks) {
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
      }
    }
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll(".section").forEach((s) => spy.observe(s));
