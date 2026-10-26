import { useEffect, useState } from "react";

const originalImages = new Map();
const img = (name, previewName = name) => {
  const preview = new URL(`../assets/portfolio/display/${previewName}`, import.meta.url).href;
  originalImages.set(
    preview,
    new URL(`../assets/portfolio/${name}`, import.meta.url).href
  );
  return preview;
};

const githubPagesPrefix = window.location.hostname.endsWith(".github.io")
  ? "/elizaveta-barvinok.ru"
  : "";
const withBasePath = (path) => `${githubPagesPrefix}${path}` || "/";
const getRoutePath = () => {
  const path = window.location.pathname;
  if (githubPagesPrefix && (path === githubPagesPrefix || path.startsWith(`${githubPagesPrefix}/`))) {
    return path.slice(githubPagesPrefix.length) || "/";
  }
  return path;
};

const profile = {
  name: "Барвинок Елизавета Александровна",
  role: "Архитектор-проектировщик",
  intro: "Занимаюсь проектированием гражданских и промышленных объектов",
  contacts: {
    phone: "+7 (912) 417-80-81",
    email: "elizavetabarvinok@mail.ru",
    telegram: "@rozewoot"
  }
};

const projects = [
  {
    id: "yugorsky",
    title:
      "Высотное многофункциональное здание на Югорском тракте в городе Сургуте",
    place: "Сургут",
    cover: img("Визуализация 1.png", "visualization-01.jpg"),
    files: [
      {
        group: "Визуализации",
        items: [
          {
            title: "Визуализация 1",
            src: img("Визуализация 1.png", "visualization-01.jpg")
          },
          {
            title: "Визуализация 2",
            src: img("Визуализация 2.png", "visualization-02.jpg")
          }
        ]
      },
      {
        group: "Генплан и ситуация",
        items: [
          { title: "Ситуационный план", src: img("surgut-site-plan.jpg") },
          { title: "Генеральный план", src: img("surgut-general-plan.jpg") }
        ]
      },
      {
        group: "Планы этажей",
        items: [
          { title: "План 1-го этажа", src: img("surgut-floor-01.jpg") },
          { title: "План 2-го этажа", src: img("surgut-floor-02.jpg") },
          { title: "План офисного этажа", src: img("surgut-office-floor.jpg") },
          {
            title: "План этажа апартаментов",
            src: img("surgut-apartments-floor.jpg")
          },
          { title: "План этажа гостиницы", src: img("surgut-hotel-floor.jpg") },
          { title: "План подвала и парковки", src: img("surgut-parking.jpg") }
        ]
      },
      {
        group: "Фасады и разрез",
        items: [
          { title: "Фасад 1-15", src: img("surgut-facade-1-15.jpg") },
          { title: "Фасад 15-1", src: img("surgut-facade-15-1.jpg") },
          { title: "Фасад А-С", src: img("surgut-facade-a-c.jpg") },
          { title: "Фасад С-А", src: img("surgut-facade-c-a.jpg") },
          { title: "Разрез 1-1", src: img("surgut-section-01.jpg") }
        ]
      }
    ]
  },
  {
    id: "variable-residential",
    title:
      "Жилое здание переменной этажности со встроенными помещениями общественного назначения в городе Сургуте",
    place: "Сургут",
    cover: img("residential-facade-1-12.jpg"),
    files: [
      {
        group: "Ситуация и генплан",
        items: [
          { title: "Ситуационный план", src: img("residential-site-plan.jpg") },
          { title: "Генеральный план", src: img("residential-genplan.jpg") },
          {
            title: "Стройгенплан",
            src: img("residential-construction-plan.jpg")
          },
          { title: "Техкарта", src: img("residential-tech-card.jpg") }
        ]
      },
      {
        group: "Планы этажей",
        items: [
          { title: "План подвала блока А", src: img("residential-basement-block-a.jpg") },
          { title: "План подвала блока В", src: img("residential-basement-block-b.jpg") },
          { title: "План подвала блока С", src: img("residential-basement-block-c.jpg") },
          { title: "План 1-го этажа блока А", src: img("residential-floor1-block-a.jpg") },
          { title: "План 1-го этажа блока В", src: img("residential-floor1-block-b.jpg") },
          { title: "План 1-го этажа блока С", src: img("residential-floor1-block-c.jpg") },
          { title: "План 2-го этажа блока А", src: img("residential-floor2-block-a.jpg") },
          { title: "План 2-го этажа блока В", src: img("residential-floor2-block-b.jpg") },
          { title: "План 2-го этажа блока С", src: img("residential-floor2-block-c.jpg") },
          { title: "План типового этажа блока А", src: img("residential-typical-block-a.jpg") },
          { title: "План типового этажа блока В", src: img("residential-typical-block-b.jpg") },
          { title: "План типового этажа блока С", src: img("residential-typical-block-c.jpg") },
          { title: "План кровли", src: img("residential-roof.jpg") },
          { title: "Парковка", src: img("residential-parking.jpg") }
        ]
      },
      {
        group: "Конструктив",
        items: [
          { title: "Свайный фундамент", src: img("residential-foundation.jpg") },
          { title: "Армирование пилона", src: img("residential-pylon.jpg") }
        ]
      },
      {
        group: "Фасады и разрез",
        items: [
          { title: "Фасад 1-12", src: img("residential-facade-1-12.jpg") },
          { title: "Фасад 12-1", src: img("residential-facade-12-1.jpg") },
          { title: "Разрез 1-1", src: img("residential-section-1-1.jpg") }
        ]
      }
    ]
  }
];

function App() {
  const [path, setPath] = useState(getRoutePath);

  useEffect(() => {
    const onPopState = () => setPath(getRoutePath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (href) => {
    window.history.pushState({}, "", withBasePath(href));
    setPath(getRoutePath());
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const projectId = path.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const activeProject = projects.find((project) => project.id === projectId);

  return (
    <>
      <Header navigate={navigate} />
      <main>
        {activeProject ? (
          <ProjectPage project={activeProject} navigate={navigate} />
        ) : (
          <HomePage navigate={navigate} />
        )}
      </main>
    </>
  );
}

function InternalLink({ href, navigate, children, className, ariaLabel }) {
  return (
    <a
      aria-label={ariaLabel}
      className={className}
      href={withBasePath(href)}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function Header({ navigate }) {
  return (
    <header className="site-header">
      <nav className="main-nav" aria-label="Основная навигация">
        <InternalLink href="/" navigate={navigate}>
          Главная
        </InternalLink>
        <InternalLink href="/projects/yugorsky" navigate={navigate}>
          Проект 1
        </InternalLink>
        <InternalLink href="/projects/variable-residential" navigate={navigate}>
          Проект 2
        </InternalLink>
      </nav>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero hero-simple">
        <div className="hero-copy">
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.name}</h1>
          <p>{profile.intro}</p>
        </div>
      </section>

      <ContactStrip />

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Портфолио</p>
          <h2>Проекты</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <InternalLink
              className="project-card"
              href={`/projects/${project.id}`}
              navigate={navigate}
              key={project.id}
            >
              <div className="project-thumb">
                {project.cover ? (
                  <img src={project.cover} alt={project.title} />
                ) : (
                  <div className="empty-thumb">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                )}
              </div>
              <div className="project-card-text">
                <span>Проект {index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.place}</p>
              </div>
            </InternalLink>
          ))}
        </div>
      </section>

    </>
  );
}

function ContactStrip() {
  return (
    <section className="contact-strip" aria-label="Краткий контакт">
      <div>
        <span>Телефон</span>
        <strong>{profile.contacts.phone}</strong>
      </div>
      <div>
        <span>Почта</span>
        <strong>{profile.contacts.email}</strong>
      </div>
      <div>
        <span>Telegram</span>
        <strong>{profile.contacts.telegram}</strong>
      </div>
    </section>
  );
}

function ProjectPage({ project, navigate }) {
  return (
    <section className="project-detail page">
      <InternalLink className="back-link" href="/" navigate={navigate}>
        Назад к проектам
      </InternalLink>
      <div className="project-intro">
        <div>
          <h2>{project.title}</h2>
        </div>
      </div>

      {project.files.length > 0 ? (
        project.files.map((group) => (
          <div className="file-group" key={group.group}>
            <h3>{group.group}</h3>
            <div className="file-grid">
              {group.items.map((item) => (
                <a
                  href={originalImages.get(item.src) ?? item.src}
                  className="file-card"
                  target="_blank"
                  rel="noreferrer"
                  key={item.title}
                >
                  <img src={item.src} alt={item.title} loading="lazy" />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="pending-files">
          <span>Файлы проекта будут добавлены позже</span>
        </div>
      )}
    </section>
  );
}

export default App;
