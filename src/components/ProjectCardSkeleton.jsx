function ProjectCardSkeleton() {
  return (
    <div className="project-card skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line skeleton-line-short"></div>
      <div className="skeleton-pills">
        <div className="skeleton skeleton-pill"></div>
        <div className="skeleton skeleton-pill"></div>
        <div className="skeleton skeleton-pill"></div>
      </div>
    </div>
  );
}

export default ProjectCardSkeleton;