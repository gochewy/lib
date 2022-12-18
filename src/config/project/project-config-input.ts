import ProjectConfig from './project-config';

type ProjectConfigInput = Omit<ProjectConfig, 'id'>;

export default ProjectConfigInput;
