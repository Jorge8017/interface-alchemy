import { Navigate, useParams } from 'react-router-dom'
import ProjectPage from '../components/ProjectPage'
import { getProjectBySlug } from '../data/projects'

export default function ProjectRoute() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project || project.comingSoon || !project.published) {
    return <Navigate to="/work" replace />
  }

  return <ProjectPage project={project} />
}
